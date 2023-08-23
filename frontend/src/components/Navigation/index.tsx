import { SyntheticEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Tab, Tabs, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Drawer } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/system";

import { navigationWidth } from "../../constants/navigation";
import { useFetchProfile } from "../../hooks/useFetchProfile";

// TODO: Replace to constant
const tabValues = ["discovery", "likes", "messages"];

export const Navigation = ({ Outlet }: { Outlet: any }) => {
  // Set a current tab from url path
  const currentPath = useLocation().pathname.replace("/", "");
  const tabIndex = tabValues.indexOf(currentPath);
  const { profile } = useFetchProfile();

  const { logout } = useAuth0();
  const handleLogout = () => logout();
  const navigate = useNavigate();
  const handleNavigateToAccount = () => navigate("/account");
  const handleChange = (e: SyntheticEvent) =>
    e.currentTarget.textContent && navigate(`/${e.currentTarget.textContent}`);

  return (
    <StyledDrawer variant='permanent' open>
      <StyledAccountBox onClick={handleNavigateToAccount}>
        <StyledTypography variant='inherit' color='common.white'>
          {profile?.userName ?? "---"}
        </StyledTypography>
      </StyledAccountBox>
      <Toolbar />
      <Box>
        <Tabs value={tabIndex} onChange={handleChange} centered>
          <StyledTab label='discovery' />
          <StyledTab label='likes' />
          <StyledTab label='messages' />
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

const StyledTypography = styled(Typography)`
  font-size: 1.2rem;
  font-weight: bold;
`;

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
  width: 300px;
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
