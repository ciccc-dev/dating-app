import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { User } from "@auth0/auth0-react";
import { LoginButton } from "../../features/Auth";

interface Props {
  user?: User;
}

export const Header = ({ user }: Props) => {
  return (
    <Box sx={{ flexGrow: 1 }} color="inherit">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Matching App
          </Typography>
          <Button color="inherit">{user?.name || <LoginButton />}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
