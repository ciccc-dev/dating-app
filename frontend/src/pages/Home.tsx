import { useAuth0 } from "@auth0/auth0-react";
import { Button, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey, pink } from "@mui/material/colors";

import { Header } from "../components/Header";

export const Home = () => {
  const headerTheme = createTheme({
    palette: {
      primary: {
        main: grey[800],
      },
      secondary: {
        main: pink[400],
      },
    },
  });

  const { user } = useAuth0();

  const handleClickCreateAccountButton = () => {
    console.log("Redirect to signup page");
  };

  return (
    <ThemeProvider theme={headerTheme}>
      <Header user={user} />
      <Container>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleClickCreateAccountButton}
        >
          Create account
        </Button>
      </Container>
    </ThemeProvider>
  );
};
