import { useAuth0 } from "@auth0/auth0-react";
import { Typography } from "@mui/material";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const redirectLoginPage = () => loginWithRedirect();

  return <Typography onClick={redirectLoginPage}>LOGIN</Typography>;
};
