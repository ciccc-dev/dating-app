import { PrismaClient } from "@prisma/client";

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
}

const db = new PrismaClient();
export const ProfileRepository = new _ProfileRepository(db);
