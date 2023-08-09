import axios from "axios";

export class _InterestsAPI {
  private apiUrl: string;
  private accessToken: string;

  constructor(apiUrl: string, accesToken: string) {
    this.apiUrl = apiUrl;
    this.accessToken = accesToken;
  }

  FetchInterests = async () => {
    const res = await axios({
      url: `${this.apiUrl}/api/interests`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  };
}
