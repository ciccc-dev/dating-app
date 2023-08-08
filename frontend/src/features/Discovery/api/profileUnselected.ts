import axios from "axios";

export class _profileUnselectedClient {
  private apiUrl: string;
  private accessToken: string;

  constructor(apiUrl: string, accesToken: string) {
    this.apiUrl = apiUrl;
    this.accessToken = accesToken;
  }
  postProfileUnselected = async (profileId: string, profileIds: string[]) => {
    try {
      const res = await axios({
        url: `${this.apiUrl}/api/profileUnselected`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ profileId: profileId, profileIds: profileIds }),
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  };
}
