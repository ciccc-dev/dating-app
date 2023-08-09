import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { _InterestsAPI } from "../features/Interests/api";

interface Interest {
  id: number;
  name: string;
}

export const useFetchInterests = () => {
  const [interests, setInterests] = useState<Interest[]>([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently();
      if (token.length !== 0 && process.env.REACT_APP_SERVER_URL) {
      }
      const InterestAPI = new _InterestsAPI(
        process.env.REACT_APP_SERVER_URL ?? "",
        token
      );
      const interests = await InterestAPI.FetchInterests();
      setInterests(interests);
    })();
  }, [getAccessTokenSilently]);

  return interests;
};
