import { Prisma, PrismaClient } from "@prisma/client";

import { calculateAge, convertAgetoDate } from "../../utils/caluculateAge";
import { Profile } from "./profile";

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
      },
    });
    return result;
  };

  fetchProfilesByFilter = async (filter: any) => {
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

    const fetchUnselectedProfileIds = await this.db.profileUnselected.findMany({
      where: {
        unselectedBy: filter.profile_id,
      },
      select: {
        unselectedProfile: true,
      },
    });

    // const fetchLikedUserIds = await this.db.like.findMany({
    //   where: {
    //     sentBy: filter.userId,
    //   },
    //   select: {
    //     receivedBy: true,
    //   },
    // });

    const unselectedProfileIds = fetchUnselectedProfileIds
      ? [
          ...fetchUnselectedProfileIds.map(
            ({ unselectedProfile }) => unselectedProfile
          ),
          filter.profile_id,
        ]
      : undefined;

    // const likedUserIds = fetchLikedUserIds
    //   ? fetchLikedUserIds.map(({ receivedBy }) => receivedBy)
    //   : undefined;

    const profiles = await this.db.profile.findMany({
      where: {
        id: unselectedProfileIds
          ? { notIn: unselectedProfileIds }
          : { not: filter.profile_id },
        // userId: likedUserIds ? { notIn: likedUserIds } : undefined,
        gender: convertLookingForToGender(filter.showMe),
        birthday: filter.isAgeFiltered
          ? {
              gte: convertAgetoDate(filter.maxAge),
              lte: convertAgetoDate(filter.minAge),
            }
          : undefined,
        sexualOrientation: filter.isSexualOrientationFiltered
          ? { in: filter.sexualOrientations }
          : undefined,
        interests: filter.isInterestFiltered
          ? { some: { OR: filter.interests } }
          : undefined,
        purposes: filter.isPurposeFiltered
          ? {
              some: {
                OR: filter.purposes.map((purpose: any) => ({ name: purpose })),
              },
            }
          : undefined,
      },
      include: {
        interests: { select: { name: true } },
        purposes: { select: { name: true } },
      },
      take: 3,
    });
    const convertedProfiles = profiles.map(({ birthday, ...rest }) => ({
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
