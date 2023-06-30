import { useAuth0 } from "@auth0/auth0-react";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const redirectLoginPage = () => loginWithRedirect();

  return <button onClick={redirectLoginPage}>Log In</button>;
};
