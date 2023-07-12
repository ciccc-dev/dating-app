import { useAuth0 } from "@auth0/auth0-react";
import { Button, Grid, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey, pink } from "@mui/material/colors";

import { Header } from "../components/Header";
import { styled } from "@mui/system";

export const Home = () => {
  const headerTheme = createTheme({
    palette: {
      primary: { main: grey[800] },
      secondary: { main: pink[600] },
    },
  });

  const { loginWithRedirect, user } = useAuth0();
  const handleClickCreateAccountButton = () =>
    loginWithRedirect({ authorizationParams: { screen_hint: "signup" } });

  return (
    <ThemeProvider theme={headerTheme}>
      <Header user={user} />
      <div style={styles.paperContainer}>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <StyledGrid item xs={12}>
            <Typography variant="h3">Connect</Typography>
          </StyledGrid>
          <StyledGrid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={handleClickCreateAccountButton}
            >
              Create Account
            </Button>
          </StyledGrid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

const StyledGrid = styled(Grid)`
  margin-top: 200px;
`;

const styles = {
  paperContainer: {
    opacity: 0.7,
    height: 890,
    backgroundImage: `url(${"https://tinder.com/static/build/f527e47b80b40fa123bc1093175cb7dd.webp"})`,
  },
};
