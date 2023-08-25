import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { _LikesAPI } from "../features/Likes";
import { Profile } from "../types";

export interface UseFetchLinkedProfilesResponse {
  sentTo: Profile[];
  receivedFrom: Profile[];
  matched: Profile[];
}

const initialValue = {
  sentTo: [],
  receivedFrom: [],
  matched: [],
};

export const useFetchLikedProfiles = (): UseFetchLinkedProfilesResponse => {
  const { getAccessTokenSilently } = useAuth0();
  const [profiles, setProfiles] =
    useState<UseFetchLinkedProfilesResponse>(initialValue);

  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently();
      if (token.length !== 0 && process.env.REACT_APP_SERVER_URL) {
        const LikesAPI = new _LikesAPI(
          process.env.REACT_APP_SERVER_URL ?? "",
          token
        );
        const profiles = await LikesAPI.FetchLikeProfiles();
        setProfiles(profiles);
      }
    })();
  }, [getAccessTokenSilently]);

  return profiles;
};
