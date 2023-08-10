import { Prisma, PrismaClient } from "@prisma/client";

class _GeolocationRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  createGeolocation = async (geolocation: Prisma.GeolocationCreateInput) => {
    const result = this.db.geolocation.create<Prisma.GeolocationCreateArgs>({
      data: geolocation,
    });
    return result;
  };

  updateGeolocationByProfileId = async (
    profileId: string,
    geolocation: Prisma.GeolocationUpdateInput
  ) => {
    const result = this.db.geolocation.update<Prisma.GeolocationUpdateArgs>({
      where: { profileId },
      data: geolocation,
    });
    return result;
  };
}

const db = new PrismaClient();
export const GeolocationRepository = new _GeolocationRepository(db);
