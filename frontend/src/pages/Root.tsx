import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { differenceInSeconds, parseISO } from "date-fns";
import { useAuth0 } from "@auth0/auth0-react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { pink } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: pink[400],
    },
  },
});

export const Root = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const navigate = useNavigate();
  const LOGIN_DURATION = 1;

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) return navigate("/home");

    if (user?.updated_at) {
      const secondsAfterLogin = differenceInSeconds(
        new Date(),
        parseISO(user?.updated_at)
      );
      secondsAfterLogin < LOGIN_DURATION && navigate("/app");
    }
  }, [isAuthenticated, isLoading, navigate, user?.updated_at]);

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Outlet context={user} />
      </ThemeProvider>
    </>
  );
};
