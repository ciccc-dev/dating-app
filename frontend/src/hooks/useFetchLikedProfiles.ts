import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { _LikesAPI } from "../features/Likes";

interface Profile {
  aboutMe: string;
  birthday: string;
  gender: string;
  id: string;
  registeredAt: string;
  sexualOrientation: string;
  updatedAt: string;
  userId: string;
  userName: string;
}

export interface IUseFetchLinkedProfilesResponse {}

export const useFetchLikedProfiles = ({
  category = "sent",
}: {
  category: string;
}): [Profile[]] => {
  const { getAccessTokenSilently } = useAuth0();
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently();
      if (token.length !== 0 && process.env.REACT_APP_SERVER_URL) {
        const LikesAPI = new _LikesAPI(
          process.env.REACT_APP_SERVER_URL ?? "",
          token
        );
        const profiles = await LikesAPI.FetchSentLikes();
        setProfiles(profiles);
      }
    })();
  }, [getAccessTokenSilently]);

  return [profiles];
};
