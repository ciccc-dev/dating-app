import axios from "axios";

export class _profileClient {
  private apiUrl: string;
  private accessToken: string;

  constructor(apiUrl: string, accesToken: string) {
    this.apiUrl = apiUrl;
    this.accessToken = accesToken;
  }

  getProfileId = async (userId: string) => {
    try {
      const res = await axios({
        url: `${this.apiUrl}/api/profiles/${userId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error: any) {
      throw error;
    }
  };

  getProfiles = async (profileId: string) => {
    try {
      const res = await axios({
        url: `${this.apiUrl}/api/profiles`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ profileId: profileId }),
      });
      return res.data;
    } catch (error: any) {
      throw error;
    }
  };
}
