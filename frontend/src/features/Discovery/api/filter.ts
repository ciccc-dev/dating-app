import axios from "axios";

export class _filterClient {
  private apiUrl: string;
  private accessToken: string;

  constructor(apiUrl: string, accesToken: string) {
    this.apiUrl = apiUrl;
    this.accessToken = accesToken;
  }
  getFilter = async (profileId: string) => {
    try {
      const res = await axios({
        url: `${this.apiUrl}/api/filter`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ profileId: profileId }),
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  updateFilter = async (filterdata: any) => {
    try {
      const res = await axios({
        url: `${this.apiUrl}/api/filter/update`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
        data: JSON.stringify(filterdata),
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  };
}
