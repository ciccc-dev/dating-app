import axios from "axios";

export class _photoClient {
  private apiUrl: string;
  private accessToken: string;

  constructor(apiUrl: string, accesToken: string) {
    this.apiUrl = apiUrl;
    this.accessToken = accesToken;
  }

  postPhotos = async (photos: FormData) => {
    try {
      const res = await axios({
        url: `${this.apiUrl}/api/photos`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
        data: photos,
      });
      console.log("okay");
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  fetchPhotos = async (profileId: string) => {
    try {
      const res = await axios({
        url: `${this.apiUrl}/api/photos/${profileId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("okay");
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}
