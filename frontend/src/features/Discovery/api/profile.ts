import axios from "axios";

export class _profileClient {
  private apiUrl: string;
  private accessToken: string;

  constructor(apiUrl: string, accesToken: string) {
    this.apiUrl = apiUrl;
    this.accessToken = accesToken;
  }

  getProfileById = async () => {
    try {
      const res = await axios({
        url: `${this.apiUrl}/api/profile`,
        method: "POST",
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

  getProfiles = async () => {
    try {
      const res = await axios({
        url: `${this.apiUrl}/api/profiles`,
        method: "POST",
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
}
