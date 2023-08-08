import axios from "axios";

export class _ProfileAPI {
  private apiUrl: string;
  private accessToken: string;

  constructor(apiUrl: string, accesToken: string) {
    this.apiUrl = apiUrl;
    this.accessToken = accesToken;
  }

  CreatePost = async ({
    username,
    gender,
    birthday,
    sexualOrientation,
    aboutMe,
  }: {
    username: string;
    gender: string;
    birthday: string;
    sexualOrientation: string;
    aboutMe: string;
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
          about_me: aboutMe,
        }),
      });
      return { status: res.status, message: "Success" };
    } catch (err: any) {
      return { status: err.status, message: err.response.data.error.err };
    }
  };
}
