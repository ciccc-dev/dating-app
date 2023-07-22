import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { _LikesAPI } from "../features/Likes";

export const useLikes = (userId: string) => {
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState("");
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    (async () => {
      setToken(await getAccessTokenSilently());
    })();
  }, [getAccessTokenSilently]);

  useEffect(() => {
    (async () => {
      if (token.length && process.env.REACT_APP_SERVER_URL) {
        const LikesAPI = new _LikesAPI(process.env.REACT_APP_SERVER_URL, token);
        setLikes(await LikesAPI.FetchSentLikes(userId));
      }
    })();
  }, [getAccessTokenSilently, token, userId]);

  return likes;
};
