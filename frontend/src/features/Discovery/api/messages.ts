import axios from "axios";

export class _messageClient {
  private apiUrl: string;
  private accessToken: string;

  constructor(apiUrl: string, accesToken: string) {
    this.apiUrl = apiUrl;
    this.accessToken = accesToken;
  }

  sendMessage = async (userId: string, message: string) => {
    try {
      const res = await axios({
        url: `${this.apiUrl}/api/messages/${userId}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ message: message }),
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  };
}
