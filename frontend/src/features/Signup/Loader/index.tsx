import { useAuth0 } from "@auth0/auth0-react";
import { _profileClient } from "../../Discovery/api/profile";

export const SignupLoader = async () => {
  const { getAccessTokenSilently, user } = useAuth0();

  const token = await getAccessTokenSilently();
  const ProfileClient = new _profileClient(
    process.env.REACT_APP_SERVER_URL ?? "",
    token
  );
  const profile = await ProfileClient.getProfile(user?.sub ?? "");
  return Boolean(profile);
};
