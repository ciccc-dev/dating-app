import { SyntheticEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Button, Tab, Tabs, Typography } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/system";

// TODO: Replace to constant
const tabValues = ["discovery", "likes", "messages"];

export const DatingAppNavigation = () => {
  // Prepare variables to set tab from current url path
  const location = useLocation();
  const currentPath = location.pathname.replace("/app/", "");
  const tabIndex = tabValues.indexOf(currentPath);

  const { user, logout } = useAuth0();
  const handleLogout = () => logout();

  const navigate = useNavigate();
  const handleNavigateToProfile = () => navigate("/app/profile");
  const handleChange = (e: SyntheticEvent) =>
    e.currentTarget.textContent && navigate(e.currentTarget.textContent);

  const MyAccount = () => (
    <StyledAccountBox onClick={handleNavigateToProfile}>
      <Typography variant="inherit" color="common.white">
        {user?.name ?? "---"}
      </Typography>
    </StyledAccountBox>
  );

  return (
    <div>
      <MyAccount />
      <Toolbar />
      <Box>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <StyledTab label="discovery" />
          <StyledTab label="likes" />
          <StyledTab label="messages" />
        </Tabs>
      </Box>
      <Divider />
      <List>
        <ListItem key="email" disablePadding>
          <ListItemButton>
            <ListItemText primary="email" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <StyledLogoutBox>
        <Button onClick={handleLogout}>LOGOUT</Button>
      </StyledLogoutBox>
      <Toolbar />
    </div>
  );
};

const StyledAccountBox = styled(Box)`
  padding: 10px;
  background-color: #ec407a;
  text-align: center;
  border-bottom: 1px;
`;

const StyledTab = styled(Tab)`
  font-size: 10px;
`;

const StyledLogoutBox = styled(Box)`
  width: 256px;
  text-align: center;
  border-bottom: 1px;
  position: fixed;
  bottom: 0;
`;
