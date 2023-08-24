import axios from "axios";
import { Prisma, PrismaClient } from "@prisma/client";

export interface Coordinate {
  latitude: number;
  longitude: number;
}

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

  upsertGeolocation = async (geolocation: Prisma.GeolocationCreateInput) => {
    const result = this.db.geolocation.upsert<Prisma.GeolocationUpsertArgs>({
      where: {
        profileId: geolocation.profile.connect?.id,
      },
      create: geolocation,
      update: geolocation,
    });
    return result;
  };

  updateGeolocationByProfileId = async (
    profileId: string,
    geolocation: Prisma.GeolocationUpdateInput
  ) => {
    const result = this.db.geolocation.update<Prisma.GeolocationUpdateArgs>({
      where: { profileId: profileId },
      data: geolocation,
    });
    return result;
  };

  fetchGeolocation = async (profileId: string) => {
    const result = await this.db.geolocation.findUnique({
      where: {
        profileId: profileId,
      },
      select: {
        longitude: true,
        latitude: true,
      },
    });
    return result;
  };
}

class _ExternalGeolocationRepository {
  fetchGeolocationfromExterenalApi = async (coordinate: Coordinate) => {
    const apiUrl = process.env.GOOGLE_MAPS_API_URL;
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const geolocationUrl = `${apiUrl}/maps/api/geocode/json?latlng=${coordinate.latitude},${coordinate.longitude}&result_type=locality&key=${apiKey}`;
    const { data } = await axios.get(geolocationUrl);
    return data.results[0].formatted_address;
  };
}

const db = new PrismaClient();
export const GeolocationRepository = new _GeolocationRepository(db);
export const ExterenalGeolocationRepository =
  new _ExternalGeolocationRepository();
