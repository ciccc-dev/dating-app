import { Prisma, PrismaClient, PrismaPromise } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";

import { calculateAge, convertAgetoDate } from "../../utils/caluculateAge";
import { Profile } from "./profile";
import { Filter } from "../filters/filter";
import { url } from "../photoUrls/repository";

interface Item {
  name: string;
}

interface Photo {
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
  photos: url[];
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
    filter: Filter,
    longitude: Decimal | undefined,
    latitude: Decimal | undefined
  ) => {
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

    const gender = convertLookingForToGender(filter.showMe());
    const newBirthday = convertAgetoDate(filter.minAge());
    const oldBirthday = convertAgetoDate(filter.maxAge());
    const interests = filter.interests().map((interest: Item) => interest.name);

    const fetchProfiles = await this.db.$queryRaw<
      PrismaPromise<FilteredProfile[]>
    >`
   WITH profile_distance AS (
      SELECT
        pr.id,
        CEILING(st_distance(st_makepoint(${longitude}, ${latitude}),
                    st_makepoint(g.longitude, g.latitude))) AS "distance"
      FROM profile pr
      JOIN geolocation g ON g.profile_id = pr.id
   )

  SELECT
    pr.id AS "id",
    pr.user_id AS "userId",
    pr.user_name AS "userName",
    pr.birthday AS "birthday",
    pr.gender AS "gender",
    pr.sexual_orientation AS "sexualOrientation",
    pr.about_me AS "aboutMe",
    pd.distance AS "distance",
    json_agg(DISTINCT jsonb_build_object(
        'name', pu.name
      )) AS purposes,
    json_agg(DISTINCT jsonb_build_object(
        'name', inte.name
      )) AS interests,
    json_agg(DISTINCT jsonb_build_object(
        'id', ph.id,
        'photoUrl', ph.photo_url
      )) AS "photos"
  FROM profile pr
  LEFT OUTER JOIN photo_url ph ON ph.profile_id = pr.id
  LEFT OUTER JOIN "_InterestToProfile" intp ON intp."B" = pr.id
  LEFT OUTER JOIN interest inte ON inte.id =  intp."A"
  LEFT OUTER JOIN purpose pu ON pu.profile_id = pr.id
  LEFT OUTER JOIN profile_distance pd ON pd.id = pr.id
  WHERE pr.id != ${filter.profileId()}::uuid
  AND pr.id NOT IN (SELECT unselected_profile FROM profile_unselected
    WHERE unselected_by = ${filter.profileId()}::uuid)
    AND pr.user_id NOT IN (SELECT received_by FROM likes
      WHERE sent_by = ${userId})
      ${gender ? Prisma.sql`AND pr.gender = ${gender}` : Prisma.empty}
      ${
        filter.isAgeFiltered()
          ? Prisma.sql`AND pr.birthday >= ${oldBirthday} AND pr.birthday <= ${newBirthday}`
          : Prisma.empty
      }
      ${
        filter.isSexualOrientationFiltered() &&
        filter.sexualOrientations().length > 0
          ? Prisma.sql`AND pr.sexual_orientation IN (${Prisma.join(
              filter.sexualOrientations()
            )})`
          : Prisma.empty
      }
      ${
        filter.isPurposeFiltered() && filter.purposes().length > 0
          ? Prisma.sql`AND pr.id IN (
          SELECT pr.id
          FROM profile pr
          JOIN purpose pu ON pu.profile_id = pr.id
          WHERE pu.name IN (${Prisma.join(filter.purposes())}))`
          : Prisma.empty
      }
     ${
       filter.isInterestFiltered() && filter.interests().length > 0
         ? Prisma.sql`AND pr.id IN (
         SELECT pr.id
         FROM profile pr
         JOIN "_InterestToProfile" intp ON intp."B" = pr.id
         JOIN interest inte ON inte.id = intp."A"
         WHERE inte.name IN (${Prisma.join(interests)}))`
         : Prisma.empty
     }
     ${
       filter.isDistanceFiltered()
         ? Prisma.sql`AND pd.distance <= ${filter.distance()}`
         : Prisma.sql`AND pd.distance <= 100 OR pd.distance IS NULL`
     }
     GROUP BY pr.id, pd.distance
     ORDER BY RANDOM()
     LIMIT 3
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

  createProfile = async (profile: Profile, filter: Filter, userId: string) => {
    const interests: any[] = profile.interests().map((interest) => {
      return { id: interest.id };
    });

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
      filter: {
        create: {
          id: filter.id(),
          showMe: filter.showMe(),
          purposes: filter.purposes(),
        },
      },
      interests: { connect: interests },
    };
    return await this.db.profile.create<Prisma.ProfileCreateArgs>({ data });
  };
}

const db = new PrismaClient();
export const ProfileRepository = new _ProfileRepository(db);
