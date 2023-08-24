import axios from "axios";

export class _geolocationClient {
  private apiUrl: string;
  private accessToken: string;

  constructor(apiUrl: string, accesToken: string) {
    this.apiUrl = apiUrl;
    this.accessToken = accesToken;
  }

  fetchGeolocation = async (ipaddress: string, profileId: string) => {
    try {
      const res = await axios({
        url: `${this.apiUrl}/api/geolocation`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
        data: { ipaddress: ipaddress, profileId: profileId },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  };
}
