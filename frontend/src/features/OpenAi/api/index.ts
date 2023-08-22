import axios from "axios";

export class _OpenAiAPI {
  private apiUrl: string;
  private accessToken: string;

  constructor(apiUrl: string, accesToken: string) {
    this.apiUrl = apiUrl;
    this.accessToken = accesToken;
  }

  AskAboutUser = async (userId: string, question: string) => {
    const res = await axios({
      url: `${this.apiUrl}/api/openai/ask/${userId}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      },
      params: { question },
    });
    return res.data;
  };
}
