import { PrismaClient } from "@prisma/client";

import { Filter } from "./filter";

class _FilterRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  fetchFilterByProfileId = async (profileId: string) => {
    const response = await this.db.filter.findUnique({
      where: { profileId },
      include: {
        interests: { select: { name: true } },
        profile: { select: { id: true } },
      },
    });
    if (!response) return {};
    const result = new Filter(response);
    return result;
  };
}

const db = new PrismaClient();
export const FilterRepository = new _FilterRepository(db);
