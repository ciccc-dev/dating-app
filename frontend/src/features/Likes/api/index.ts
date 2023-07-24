import axios from "axios";

export class _LikesAPI {
  private apiUrl: string;
  private accessToken: string;

  constructor(apiUrl: string, accesToken: string) {
    this.apiUrl = apiUrl;
    this.accessToken = accesToken;
  }

  FetchSentLikes = async () => {
    const res = await axios({
      url: `${this.apiUrl}/api/likes/sent`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const profiles = res.data.profiles.map((profile: any) => profile);
    return profiles;
  };

  FetchSentMeLikes = async () => {
    const res = await axios({
      url: `${this.apiUrl}/api/likes/sent`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const profiles = res.data.profiles.map((profile: any) => profile);
    console.log(profiles);
    return profiles;
  };
}
