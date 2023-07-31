import axios from "axios";

export class _LikesAPI {
  private apiUrl: string;
  private accessToken: string;

  constructor(apiUrl: string, accesToken: string) {
    this.apiUrl = apiUrl;
    this.accessToken = accesToken;
  }

  FetchLikeProfiles = async () => {
    const res = await axios({
      url: `${this.apiUrl}/api/likes`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  };

  CreateLike = async (userId: string) => {
    try {
      const res = await axios({
        url: `${this.apiUrl}/api/likes`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ like_to: userId }),
      });
      return { status: res.status, message: "Success" };
    } catch (err: any) {
      return { status: err.status, message: err.response.data.error.err };
    }
  };
}
