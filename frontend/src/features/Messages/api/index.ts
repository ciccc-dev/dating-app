import axios from "axios";

export class _MessagesAPI {
  private apiUrl: string;
  private accessToken: string;

  constructor(apiUrl: string, accesToken: string) {
    this.apiUrl = apiUrl;
    this.accessToken = accesToken;
  }

  FetchMessages = async () => {
    const res = await axios({
      url: `${this.apiUrl}/api/messages`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  };
}
