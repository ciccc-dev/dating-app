import axios from "axios";
import { ProfileHookForm } from "../../../pages/Account";

export class _accountClient {
  private apiUrl: string;
  private accessToken: string;

  constructor(apiUrl: string, accesToken: string) {
    this.apiUrl = apiUrl;
    this.accessToken = accesToken;
  }

  updateAccount = async (data: ProfileHookForm, userId: string) => {
    try {
      const res = await axios({
        url: `https://dev-ciccc.auth0.com/api/v2/users/${userId}`,
        // url: `${this.apiUrl}/users/${userId}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
        // data: JSON.stringify({ name: data.name, email: data.email }),
        data: JSON.stringify({ name: data.name }),
      });
      return res.data;
    } catch (error: any) {
      throw error;
    }
  };
}
