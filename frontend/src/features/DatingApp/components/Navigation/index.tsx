import { SyntheticEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Tab, Tabs, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/system";
import { TabPanel } from "../TabPanel";

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

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

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
          <StyledTab label="discovery" {...a11yProps(0)} />
          <StyledTab label="likes" {...a11yProps(1)} />
          <StyledTab label="messages" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <Divider />
      <TabPanel value={tabIndex} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        Item Three
      </TabPanel>
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
