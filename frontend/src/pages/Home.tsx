import { useAuth0 } from "@auth0/auth0-react";
import { Button, Grid } from "@mui/material";
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
  const { user } = useAuth0();
  const handleClickCreateAccountButton = () => {
    console.log("Redirect to signup page");
  };

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
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={handleClickCreateAccountButton}
            >
              Create account
            </Button>
          </StyledGrid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

const StyledGrid = styled(Grid)`
  margin-top: 300px;
`;

const styles = {
  paperContainer: {
    opacity: 0.7,
    height: 890,
    backgroundImage: `url(${"https://tinder.com/static/build/f527e47b80b40fa123bc1093175cb7dd.webp"})`,
  },
};
