import axios from "axios";
import { Coordinate } from "../../../pages/Account";

export class _geolocationClient {
  private apiUrl: string;
  private accessToken: string;

  constructor(apiUrl: string, accesToken: string) {
    this.apiUrl = apiUrl;
    this.accessToken = accesToken;
  }

  fetchGeolocation = async (coordinate: Coordinate, profileId: string) => {
    try {
      const res = await axios({
        url: `${this.apiUrl}/api/geolocation`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
        data: { coordinate: coordinate, profileId: profileId },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  };
}
