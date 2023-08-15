import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { pink } from "@mui/material/colors";
import { _profileClient } from "../features/Discovery/api/profile";

const theme = createTheme({
  palette: {
    primary: {
      main: pink[400],
    },
  },
});

export const Root = () => {
  const { getAccessTokenSilently, isAuthenticated, isLoading, user } =
    useAuth0();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) return navigate("/home");
    if (!isAuthenticated && location.pathname === "/") return navigate("/home");

    if (isAuthenticated) {
      (async () => {
        const token = await getAccessTokenSilently();
        const ProfileClient = new _profileClient(
          process.env.REACT_APP_SERVER_URL ?? "",
          token
        );
        const profile = await ProfileClient.getProfile(user?.sub ?? "");

        if (!profile) return navigate("/signup");
        return navigate("/discovery");
      })();
    }
  }, [
    getAccessTokenSilently,
    isAuthenticated,
    isLoading,
    location.pathname,
    navigate,
    user?.sub,
  ]);

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Outlet context={user} />
      </ThemeProvider>
    </>
  );
};
