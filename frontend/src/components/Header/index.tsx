import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "../../features/Auth";

export const Header = () => {
  const { isAuthenticated, user } = useAuth0();

  return <div>{isAuthenticated ? user?.name : <LoginButton />}</div>;
};
