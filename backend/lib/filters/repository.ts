import { PrismaClient } from "@prisma/client";

import { Filter } from "./filter";

class _FilterRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  fetchFilterByUserId = async (userId: string) => {
    const profile = await this.db.profile.findUnique({ where: { userId } });
    if (!profile) return;

    const response = await this.db.filter.findUnique({
      where: { profileId: profile.id },
      include: {
        interests: { select: { name: true } },
        profile: { select: { id: true } },
      },
    });
    const result = new Filter(response);
    return result;
  };
}

const db = new PrismaClient();
export const FilterRepository = new _FilterRepository(db);
