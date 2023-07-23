import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/system";
import { DistanceInputSlider } from "../../../Discovery/components/DistanceInputSlider";
import { AgePreferenceInputSlider } from "../../../Discovery/components/AgePreferenceInputSlider";
import { FilterClient } from "../../../Discovery/api/filter";
import { FilterDialog } from "../../../Discovery/components/FilterDialog/FilterDialog";
import { lookingFor } from "../../../../constants/lookingfor";
import { sexualOrientations } from "../../../../constants/sexualOrientations";
import { purposes } from "../../../../constants/purposes";
import { Navigation } from "../../../../components/Navigation";

export interface Filter {
  id: string;
  profileId: string;
  showMe: string;
  minAge: number;
  maxAge: number;
  isAgeFiltered: boolean;
  distance: number;
  isDistanceFiltered: boolean;
  sexualOrientations: string[];
  isSexualOrientationFiltered: boolean;
  purposes: string[];
  isPurposeFiltered: boolean;
}

export interface Item {
  name: string;
}

export const DiscoveryNavigation = () => {
  // const [filter, setFilter] = useState<Filter>({
  //   id: "",
  //   profileId: "",
  //   showMe: "",
  //   minAge: 20,
  //   maxAge: 40,
  //   isAgeFiltered: false,
  //   distance: 50,
  //   isDistanceFiltered: false,
  //   sexualOrientations: [],
  //   isSexualOrientationFiltered: false,
  //   purposes: [],
  //   isPurposeFiltered: false,
  // });
  const [distance, setDistance] = useState(50);
  const [ageRange, setAgeRange] = useState([20, 40]);
  const [selectedLookingFor, setSelectedLookingFor] = useState<string[]>([]);
  // const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedSexualOrientations, setSelectedSexualOrientations] = useState<
    string[]
  >([]);
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FilterClient.getFilters();
        if (data) {
          setDistance(data.distance);
          setAgeRange([data.minAge, data.maxAge]);
          setSelectedLookingFor([data.showMe]);
          setSelectedSexualOrientations(data.sexualOrientations);
          setSelectedPurposes(data.purposes);
          // setFilter(data);
        }
      } catch (error) {}
    };
    fetchData();
  }, []);

  const handleDistanceChange = (value: number) => {
    setDistance(value);
  };

  // const handleMinAgeChange = (value: number) => {
  //   setMinAge(value);
  // };

  // const handleMaxAgeChange = (value: number) => {
  //   setMaxAge(value);
  // };

  const handleAgeRangeChange = (values: number[]) => {
    setAgeRange(values);
  };

  const handleSelectedLookingForChange = (values: string[]) => {
    setSelectedLookingFor(values);
  };

  const handleSelectedsexualOrientationsChange = (values: string[]) => {
    setSelectedSexualOrientations(values);
  };

  // const handleSelectedInterestsChange = (values: string[]) => {
  //   setSelectedInterests(values);
  // };

  const handleSelectedPurposesChange = (values: string[]) => {
    setSelectedPurposes(values);
  };

  const handleFilterClick = () => {
    const filterCondition = {
      profileId: "723e4567-e89b-12d3-a456-426614174000",
      showMe: selectedLookingFor[0],
      ageRange: ageRange,
      distance: distance,
      sexualOrientations: selectedSexualOrientations,
      purposes: selectedPurposes,
    };
    FilterClient.updateFilters(filterCondition);
  };

  // if (isLoading) {
  //   return <div style={{ color: "black" }}>Loading...</div>;
  // } else {
  const DiscoveryList = () => (
    <>
      <List>
        <ListItem key="distance" disablePadding>
          <DistanceInputSlider
            distance={distance}
            onChange={handleDistanceChange}
          />
        </ListItem>
        <ListItem key="age-preference" disablePadding>
          <AgePreferenceInputSlider
            ageRange={ageRange}
            onChange={handleAgeRangeChange}
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
            selectedItems={selectedSexualOrientations}
            onChange={handleSelectedsexualOrientationsChange}
          />
          <StyledListBlock>
            {selectedSexualOrientations.map(
              (selectedSexualOrientation, index) => (
                <StyledListSpan key={index}>
                  {selectedSexualOrientation}
                </StyledListSpan>
              )
            )}
          </StyledListBlock>
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
    </>
  );
  return <Navigation Outlet={<DiscoveryList />} />;
};

const StyledButton = styled(ListItemButton)`
  background-color: #ec407a;
  text-align: center;
  color: white;
`;

const StyledListItem = styled(ListItem)`
  flex-direction: column;
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
