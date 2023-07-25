import { SyntheticEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Tab, Tabs, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Drawer } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/system";

import { navigationWidth } from "../../constants/navigation";

// TODO: Replace to constant
const tabValues = ["discovery", "likes", "messages"];

export const Navigation = ({ Outlet }: { Outlet: any }) => {
  // Set a current tab from url path
  const location = useLocation();
  const currentPath = location.pathname.replace("/", "");
  const tabIndex = tabValues.indexOf(currentPath);

  const { user, logout } = useAuth0();
  const handleLogout = () => logout();
  const navigate = useNavigate();
  const handleNavigateToProfile = () => navigate("/app/profile");
  const handleChange = (e: SyntheticEvent) =>
    e.currentTarget.textContent && navigate(`/${e.currentTarget.textContent}`);

  const MyAccount = () => (
    <StyledAccountBox onClick={handleNavigateToProfile}>
      <Typography variant="inherit" color="common.white">
        {user?.name ?? "---"}
      </Typography>
    </StyledAccountBox>
  );

  return (
    <StyledDrawer variant="permanent" open>
      <MyAccount />
      <Toolbar />
      <Box>
        <Tabs value={tabIndex} onChange={handleChange} centered>
          <StyledTab label="discovery" />
          <StyledTab label="likes" />
          <StyledTab label="messages" />
        </Tabs>
      </Box>

      <StyledNavigationItemWrapper>{Outlet}</StyledNavigationItemWrapper>
      <StyledLogoutBox>
        <Button onClick={handleLogout}>LOGOUT</Button>
      </StyledLogoutBox>
      <Toolbar />
    </StyledDrawer>
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

const StyledNavigationItemWrapper = styled("div")`
  margin-top: 20px;
`;

const StyledLogoutBox = styled(Box)`
  width: 256px;
  text-align: center;
  border-bottom: 1px;
  position: fixed;
  bottom: 0;
`;

const StyledDrawer = styled(Drawer)`
  display: none;

  @media (min-width: 600px) {
    display: block;
  }

  & .MuiDrawer-paper {
    box-sizing: border-box;
    width: ${navigationWidth}px;
  }
`;
