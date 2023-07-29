import axios from "axios";

export class _likeClient {
  private apiUrl: string;
  private accessToken: string;

  constructor(apiUrl: string, accesToken: string) {
    this.apiUrl = apiUrl;
    this.accessToken = accesToken;
  }
  sendLike = async (userId: string) => {
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
      return res.data;
    } catch (error) {
      throw error;
    }
  };
}
