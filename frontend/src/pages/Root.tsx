import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Header } from "../components/Header";
import { useEffect } from "react";

export const Root = () => {
  const { isAuthenticated, isLoading, loginWithRedirect, user } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) loginWithRedirect();
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  return (
    <div>
      <Header user={user} />
      <Outlet />
    </div>
  );
};
