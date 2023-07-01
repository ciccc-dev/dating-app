import { Outlet, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Header } from "../components/Header";
import { useEffect } from "react";

export const Root = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      console.log(isLoading, isAuthenticated);
      if (!isAuthenticated) return navigate("/home");
      navigate("/app");
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <>
      <Header user={user} />
      <Outlet />
    </>
  );
};
