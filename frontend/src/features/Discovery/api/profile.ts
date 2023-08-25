import axios from "axios";
import { MyProfile, ProfileHookForm } from "../../../pages/Account";

export class _profileClient {
  private apiUrl: string;
  private accessToken: string;

  constructor(apiUrl: string, accesToken: string) {
    this.apiUrl = apiUrl;
    this.accessToken = accesToken;
  }

  getProfileId = async (userId: string) => {
    try {
      const res = await axios({
        url: `${this.apiUrl}/api/profiles/${userId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error: any) {
      throw error;
    }
  };

  getProfiles = async () => {
    try {
      const res = await axios({
        url: `${this.apiUrl}/api/profiles`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error: any) {
      throw error;
    }
  };

  getProfile = async (userId: string) => {
    try {
      const res = await axios({
        url: `${this.apiUrl}/api/profiles/${userId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error: any) {
      throw error;
    }
  };

  updateProfile = async (data: ProfileHookForm, profile: MyProfile) => {
    try {
      const res = await axios({
        url: `${this.apiUrl}/api/profiles/update`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ data, profile }),
      });
      return res.data;
    } catch (error: any) {
      throw error;
    }
  };

  CreateProfile = async ({
    username,
    gender,
    birthday,
    sexualOrientation,
    showMe,
    purposes,
    aboutMe,
    interests,
  }: {
    username: string;
    gender: string;
    birthday: string;
    sexualOrientation: string;
    showMe: string[];
    purposes: string[];
    aboutMe: string;
    interests: { id: number; name: string }[];
  }) => {
    try {
      const res = await axios({
        url: `${this.apiUrl}/api/profiles`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          username,
          gender,
          birthday,
          sexual_orientation: sexualOrientation,
          show_me: showMe,
          purposes,
          about_me: aboutMe,
          interests,
        }),
      });
      return { status: res.status, message: "Success" };
    } catch (err: any) {
      return { status: err.status, message: err.response.data.error.err };
    }
  };
}
