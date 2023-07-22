import axios from "axios";

export class _LikesAPI {
  private apiUrl: string;
  private accessToken: string;

  constructor(apiUrl: string, accesToken: string) {
    this.apiUrl = apiUrl;
    this.accessToken = accesToken;
  }

  FetchSentLikes = async (userId: string) => {
    const res = await axios({
      url: `${this.apiUrl}/api/likes/${userId}/sent`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  };
}
