import { useAuth0 } from "@auth0/auth0-react";

export const FetchAccessToken = async () => {
  const { getAccessTokenSilently } = useAuth0();
  try {
    return await getAccessTokenSilently();
  } catch (e) {
    console.error(e);
  }
};
