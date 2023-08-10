import axios from "axios";
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
    console.log(profileId, geolocation);
    const result = this.db.geolocation.update<Prisma.GeolocationUpdateArgs>({
      where: { profileId: profileId },
      data: geolocation,
    });
    console.log("result", result);
    return result;
  };
}

class _ExternalGeolocationRepository {
  fetchGeolocationfromExterenalApi = async (ipaddress: string) => {
    const apiUrl = process.env.GEOLOCATION_API_URL;
    const apiKey = process.env.GEOLOCATION_API_KEY;
    const geolocationUrl = `${apiUrl}/${ipaddress}?access_key=${apiKey}`;
    const { data } = await axios.get(geolocationUrl);
    const geolocation = {
      latitude: data.latitude,
      longitude: data.longitude,
      location: data.city,
    };
    return geolocation;
  };
}

const db = new PrismaClient();
export const GeolocationRepository = new _GeolocationRepository(db);
export const ExterenalGeolocationRepository =
  new _ExternalGeolocationRepository();
