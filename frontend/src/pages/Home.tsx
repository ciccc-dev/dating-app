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
          alignItems='center'
          justifyContent='center'
          direction='column'
        >
          <StyledGrid item xs={12}>
            <StyledTitle>
              <Typography variant='h3' align='center' color='white'>
                <div>Find Friends, dates, relationships</div>
                <div>Start here.</div>
              </Typography>
            </StyledTitle>
          </StyledGrid>
          <StyledGrid item xs={12}>
            <Button
              variant='contained'
              color='secondary'
              size='large'
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

const StyledTitle = styled(`div`)`
  background-color: #d81b60;
  opacity: 0.6;
  border-radius: 20px;
  padding: 10px;
`;

const styles = {
  paperContainer: {
    opacity: 0.8,
    height: 890,
    backgroundImage: `url(${process.env.PUBLIC_URL}/top.png)`,
    backgroundSize: "cover",
  },
};
