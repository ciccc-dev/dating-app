import { useEffect, useState } from "react";
import { _profileClient } from "../features/Discovery/api/profile";
import { useAuth0 } from "@auth0/auth0-react";

interface State {
  isSignup: boolean;
  profile?: { id: string };
}

export const useFetchProfile = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const [state, setState] = useState<State>({ isSignup: true });

  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently();

      const ProfileClient = new _profileClient(
        process.env.REACT_APP_SERVER_URL ?? "",
        token
      );

      if (!user?.sub) return;

      const profile = await ProfileClient.getProfile(user?.sub ?? "");

      if (profile) setState({ isSignup: true, profile });
    })();
  }, [getAccessTokenSilently, user?.sub]);

  return state;
};
