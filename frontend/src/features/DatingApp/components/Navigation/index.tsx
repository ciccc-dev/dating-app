import { SyntheticEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Tab, Tabs, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/system";
import { TabPanel } from "../../../Discovery/components/TabPanel";
import { DistanceInputSlider } from "../../../Discovery/components/DistanceInputSlider";
import { AgePreferenceInputSlider } from "../../../Discovery/components/AgePreferenceInputSlider";
import { FilterClient } from "../../../Discovery/api/filter";
import { FilterDialog } from "../../../Discovery/components/FilterDialog/FilterDialog";
import { lookingFor } from "../../../../constants/lookingfor";
import { sexualOrientations } from "../../../../constants/sexualOrientations";
import { purposes } from "../../../../constants/purposes";

// TODO: Replace to constant
const tabValues = ["discovery", "likes", "messages"];

export interface Filter {
  id: string;
  profileId: string;
  showMe: string;
  minAge: number;
  maxAge: number;
  isAgeFiltered: boolean;
  minDistance: number;
  maxDistance: number;
  isDistanceFiltered: boolean;
  sexualOrientation: string;
  isSexualOrientationFiltered: boolean;
  purposes: string[];
  isPurposeFiltered: boolean;
}

export interface Item {
  name: string;
}

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

  const [filter, setFilter] = useState<Filter>({
    id: "",
    profileId: "",
    showMe: "",
    minAge: 20,
    maxAge: 40,
    isAgeFiltered: false,
    minDistance: 0,
    maxDistance: 50,
    isDistanceFiltered: false,
    sexualOrientation: "",
    isSexualOrientationFiltered: false,
    purposes: [],
    isPurposeFiltered: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLookingFor, setSelectedLookingFor] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedsexualOrientations, setSelectedSexualOrientations] = useState<
    string[]
  >([]);
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await FilterClient.getFilters();
        if (data) {
          setSelectedLookingFor([data.showMe]);
          setSelectedSexualOrientations([data.sexualOrientation]);
          setSelectedPurposes(data.purposes);
          setFilter(data);
          setIsLoading(false);
        }
      } catch (error) {}
    };
    fetchData();
  }, []);

  const MyAccount = () => (
    <StyledAccountBox onClick={handleNavigateToProfile}>
      <Typography variant="inherit" color="common.white">
        {user?.name ?? "---"}
      </Typography>
    </StyledAccountBox>
  );

  const handleSelectedLookingForChange = (values: string[]) => {
    setSelectedLookingFor(values);
  };

  const handleSelectedsexualOrientationsChange = (values: string[]) => {
    setSelectedSexualOrientations(values);
  };

  const handleSelectedInterestsChange = (values: string[]) => {
    setSelectedInterests(values);
  };

  const handleSelectedPurposesChange = (values: string[]) => {
    setSelectedPurposes(values);
  };

  const handleFilterClick = () => {};

  if (isLoading) {
    return <div style={{ color: "black" }}>Loading...</div>;
  } else {
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
          <List>
            <ListItem key="distance" disablePadding>
              <DistanceInputSlider distance={filter.maxDistance} />
            </ListItem>
            <ListItem key="age-preference" disablePadding>
              <AgePreferenceInputSlider
                minAge={filter.minAge}
                maxAge={filter.maxAge}
              />
            </ListItem>
            <StyledListItem key="looking-for" disablePadding>
              <StyledDialog
                title="Looking For"
                items={lookingFor}
                selectedItems={selectedLookingFor}
                onChange={handleSelectedLookingForChange}
              />
              <StyledTypography>{selectedLookingFor}</StyledTypography>
            </StyledListItem>
            <StyledListItem key="sexual-orientation" disablePadding>
              <StyledDialog
                title="Sexual Orientation"
                items={sexualOrientations}
                selectedItems={selectedsexualOrientations}
                onChange={handleSelectedsexualOrientationsChange}
              />
              <StyledTypography>{filter.sexualOrientation}</StyledTypography>
            </StyledListItem>
            {/* <StyledListItem key="interests" disablePadding>
              <StyledDialog
                title="Interests"
                items={purposes}
                selectedItems={selectedInterests}
                onChange={handleSelectedInterestsChange}
              />
              <StyledTypography>Hello</StyledTypography>
            </StyledListItem> */}
            <StyledListItem key="purposes" disablePadding>
              <StyledDialog
                title="Purposes"
                items={purposes}
                selectedItems={selectedPurposes}
                onChange={handleSelectedPurposesChange}
              />
              <StyledListBlock>
                {selectedPurposes.map((purpose, index) => (
                  <StyledListSpan key={index}>{purpose}</StyledListSpan>
                ))}
              </StyledListBlock>
            </StyledListItem>
            <StyledListItem key="filter" disablePadding>
              <StyledButton onClick={handleFilterClick}>
                <ListItemText primary="Filter" />
              </StyledButton>
            </StyledListItem>
          </List>
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
  }
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

const StyledButton = styled(ListItemButton)`
  background-color: #ec407a;
  text-align: center;
  color: white;
`;

const StyledListItem = styled(ListItem)`
  flex-direction: column;
`;

const StyledListItemButton = styled(ListItemButton)`
  padding: 0.5rem 0;
  width: 100%;
`;

const StyledTypography = styled(Typography)`
  padding: 0.5rem 1rem;
`;

const StyledListBlock = styled("div")`
  padding: 0.5rem 1rem;
`;

const StyledListSpan = styled("span")`
  padding: 0.25rem 0.5rem;
  border: 1px solid black;
  border-radius: 0.7rem;
  margin: 0 0.25rem;
`;

const StyledDialog = styled(FilterDialog)`
  width: 100%;
`;
