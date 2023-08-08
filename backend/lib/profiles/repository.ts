import { PrismaClient } from "@prisma/client";

import { calculateAge, convertAgetoDate } from "../../utils/caluculateAge";

class _ProfileRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  fetchProfileByUserId = async (userId: string) => {
    const result = await this.db.profile.findUnique({
      where: { userId },
      select: { id: true },
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

    const profiles = await this.db.profile.findMany({
      where: {
        id: { not: filter.profile_id },
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
}

const db = new PrismaClient();
export const ProfileRepository = new _ProfileRepository(db);
