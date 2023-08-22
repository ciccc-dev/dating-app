import axios from "axios";

export class _photoClient {
  private apiUrl: string;
  private accessToken: string;

  constructor(apiUrl: string, accesToken: string) {
    this.apiUrl = apiUrl;
    this.accessToken = accesToken;
  }

  postPhotos = async (profileId: string, photos: FormData) => {
    try {
      const res = await axios({
        url: `${this.apiUrl}/api/photos/${profileId}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
        data: photos,
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  postPhoto = async (profileId: string, photo: FormData) => {
    try {
      const res = await axios({
        url: `${this.apiUrl}/api/photos/single/${profileId}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
        data: photo,
      });
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
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  deletePhoto = async (photoUrlId: string) => {
    try {
      const res = await axios({
        url: `${this.apiUrl}/api/photos/${photoUrlId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}
