import { Prisma, PrismaClient, PrismaPromise } from "@prisma/client";

import { calculateAge, convertAgetoDate } from "../../utils/caluculateAge";
import { Profile } from "./profile";
import { Decimal } from "@prisma/client/runtime";

interface Item {
  name: string;
}

interface Geolocation {
  distance: string;
}

interface FilteredProfile {
  id: number;
  user_id: number;
  user_name: string;
  birthday: Date;
  gender: string;
  sexual_orientation: string;
  about_me: string;
  purposes: Item[];
  interests: Item[];
  geolocation: Geolocation;
}

class _ProfileRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  fetchProfileByUserId = async (userId: string) => {
    const result = await this.db.profile.findUnique({
      where: { userId },
      include: {
        interests: { select: { name: true } },
        purposes: { select: { name: true } },
        geolocation: {
          select: { location: true, latitude: true, longitude: true },
        },
      },
    });
    return result;
  };

  fetchProfilesByFilter = async (
    userId: string,
    filter: any,
    longitude: Decimal | undefined,
    latitude: Decimal | undefined
  ) => {
    console.log(filter, longitude, latitude);
    const convertLookingForToGender = (lookingFor: string) => {
      switch (lookingFor) {
        case "Men":
          return "Man";
        case "Women":
          return "Woman";
        default:
          return undefined;
      }
    };

    const purposes = filter.purposes.map((purpose: Item) => ({
      name: purpose,
    }));

    const minAge = convertAgetoDate(filter.minAge);
    const maxAge = convertAgetoDate(filter.maxAge);

    const fetchProfiles = await this.db.$queryRaw<
      PrismaPromise<FilteredProfile[]>
    >`
    SELECT 
      pr.id AS "id",
      pr.user_id AS "user_id",
      pr.user_name AS "user_name",
      pr.birthday AS "birthday",
      pr.gender AS "gender",
      pr.sexual_orientation AS "sexual_orientation",
      pr.about_me AS "about_me",
      (
        SELECT json_agg(json_build_object(
          'name', pu.name
        )) AS purposes
        FROM purpose pu
        WHERE pu.profile_id = pr.id
        ${
          filter.isPurposeFiltered && filter.purposes.length > 0
            ? `AND pu.name IN ${filter.purposes}`
            : Prisma.empty
        }
      ),
      (
        SELECT json_agg(json_build_object(
          'name', inte.name
        )) AS interests
        FROM interest inte
        JOIN "_InterestToProfile" intp ON intp."A" = inte.id
        WHERE intp."B" = pr.id
        ${
          filter.isInterestFiltered && filter.interests.length > 0
            ? `AND inte.name IN ${filter.interests}`
            : Prisma.empty
        }
      ),
      (
        SELECT json_build_object(
          'distance', st_distance(
            st_makepoint(${longitude}, ${latitude}),
            st_makepoint(g.longitude, g.latitude)
          )
        ) AS distance
        FROM geolocation g
        WHERE g.profile_id = pr.id
        ${
          filter.isDistanceFiltered
            ? `AND st_distance(st_makepoint(${longitude}, ${latitude}),
              st_makepoint(g.longitude, g.latitude)
            ) <= ${filter.distance}`
            : Prisma.empty
        }
      )
    FROM profile pr
    WHERE pr.id != ${filter.profileId}::uuid
       AND pr.id NOT IN (SELECT unselected_profile FROM profile_unselected
         WHERE unselected_by = ${filter.profileId}::uuid)
         AND user_id NOT IN (SELECT received_by FROM likes
           WHERE sent_by = ${userId})
           ${
             filter.isSexualOrientationFiltered
               ? `AND pr.sexual_orientation IN ${filter.sexualOrientations}`
               : Prisma.empty
           }
           ${
             filter.isAgeFiltered
               ? `AND pr.birthday >= ${minAge} AND pr.birthday <= ${maxAge}`
               : Prisma.empty
           }
     ORDER BY RANDOM()
     LIMIT 3;
  `;

    const convertedProfiles = fetchProfiles.map(({ birthday, ...rest }) => ({
      ...rest,
      age: calculateAge(birthday),
    }));

    return convertedProfiles;
  };

  updateProfileByUserId = async (data: any, profile: any) => {
    const deletepurposes = this.db.purpose.deleteMany({
      where: {
        profileId: profile.id,
      },
    });

    const createPurposes = this.db.purpose.createMany({
      data: profile.purposes.map(({ name }: any) => ({
        profileId: profile.id,
        name: name,
      })),
    });

    const updateProfile = this.db.profile.update({
      where: {
        userId: profile.userId,
      },
      data: {
        userName: data.userName,
        birthday: data.birthday,
        gender: profile.gender,
        sexualOrientation: profile.sexualOrientation,
        aboutMe: data.aboutMe,
        updatedAt: new Date(),
        interests: { set: profile.interests },
      },
    });
    const transaction = await this.db.$transaction([
      deletepurposes,
      createPurposes,
      updateProfile,
    ]);
    return transaction;
  };

  createProfile = async (profile: Profile, userId: string) => {
    const data: Prisma.ProfileCreateInput = {
      id: profile.id(),
      userId,
      userName: profile.username(),
      birthday: profile.birthday(),
      gender: profile.gender() ?? "",
      sexualOrientation: profile.sexualOrientation() ?? "",
      aboutMe: profile.aboutMe() ?? "",
      registeredAt: new Date(),
      updatedAt: new Date(),
    };
    return await this.db.profile.create<Prisma.ProfileCreateArgs>({ data });
  };
}

const db = new PrismaClient();
export const ProfileRepository = new _ProfileRepository(db);
