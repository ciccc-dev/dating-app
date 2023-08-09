import { Prisma, PrismaClient } from "@prisma/client";

class _ProfileUnselectedRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  createProfileUnselected = async (
    profiles: Prisma.ProfileUnselectedCreateManyInput[]
  ) => {
    const result = await this.db.profileUnselected.createMany({
      data: profiles,
      skipDuplicates: true,
    });
    return result;
  };
}

const db = new PrismaClient();
export const ProfileUnselectedRepository = new _ProfileUnselectedRepository(db);
