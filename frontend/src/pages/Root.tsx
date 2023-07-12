import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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

  useEffect(() => {
    if (!isLoading) {
      console.log(isLoading, isAuthenticated);
      if (!isAuthenticated) return navigate("/home");
      navigate("/app");
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Outlet context={user} />
      </ThemeProvider>
    </>
  );
};
