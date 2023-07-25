import { useEffect, useState } from "react";
import { Grid, Switch, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/system";
import { DistanceInputSlider } from "../../../Discovery/components/DistanceInputSlider";
import { AgePreferenceInputSlider } from "../../../Discovery/components/AgePreferenceInputSlider";
import { FilterClient } from "../../../Discovery/api/filter";
import { FilterDialog } from "../FilterDialog";
import { lookingFor } from "../../../../constants/lookingfor";
import { sexualOrientations } from "../../../../constants/sexualOrientations";
import { purposes } from "../../../../constants/purposes";
import { Navigation } from "../../../../components/Navigation";
import { ListItemGrid } from "../LIstItemGrid";
import { InterestClient } from "../../api/interest";

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

export interface Interest {
  id: number;
  name: string;
}

export const DiscoveryNavigation = () => {
  const [distance, setDistance] = useState(50);
  const [distanceChecked, setDistanceChecked] = useState(false);
  const [ageRange, setAgeRange] = useState([20, 40]);
  const [ageRangeChecked, setAgeRangeChecked] = useState(false);
  const [selectedLookingFor, setSelectedLookingFor] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<Interest[]>([]);
  const [selectedSexualOrientations, setSelectedSexualOrientations] = useState<
    string[]
  >([]);
  const [sexualOrientationChecked, setSexualOrientationChecked] =
    useState(false);
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([]);
  const [purposeChecked, setPurposeChecked] = useState(false);
  // const [interests, setInterests] = useState<Item[]>([]);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const data = await InterestClient.getInterests();
      } catch (error) {}
    };
    const fetchFilterData = async () => {
      try {
        const data = await FilterClient.getFilters();
        if (data) {
          setDistance(data.distance);
          setDistanceChecked(data.isDistanceFiltered);
          setAgeRange([data.minAge, data.maxAge]);
          setAgeRangeChecked(data.isAgeFiltered);
          setSelectedLookingFor([data.showMe]);
          setSelectedSexualOrientations(data.sexualOrientations);
          setSexualOrientationChecked(data.isSexualOrientationFiltered);
          setSelectedPurposes(data.purposes);
          setPurposeChecked(data.isPurposeFiltered);
          setSelectedInterests(data.interests);
          // setFilter(data);
        }
      } catch (error) {}
    };
    fetchFilterData();
    fetchInterests();
  }, []);

  const handleDistanceChange = (value: number) => {
    setDistance(value);
  };

  const handleDistanceCheckedChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDistanceChecked(event.target.checked);
  };

  const handleAgeRangeChange = (values: number[]) => {
    setAgeRange(values);
  };

  const handleAgeRangeCheckedChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAgeRangeChecked(event.target.checked);
  };

  const handleSelectedLookingForChange = (values: string[]) => {
    setSelectedLookingFor(values);
  };

  const handleSelectedsexualOrientationsChange = (values: string[]) => {
    setSelectedSexualOrientations(values);
  };

  const handleSexualOrientationCheckedChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSexualOrientationChecked(event.target.checked);
  };

  const handleSelectedInterestsChange = (values: Interest[]) => {
    setSelectedInterests(values);
  };

  const handleSelectedPurposesChange = (values: string[]) => {
    setSelectedPurposes(values);
  };

  const handlePurposeCheckedChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPurposeChecked(event.target.checked);
  };

  const handleFilterClick = () => {
    const filterCondition = {
      profileId: "723e4567-e89b-12d3-a456-426614174000",
      showMe: selectedLookingFor[0],
      distance: distance,
      distanceChecked: distanceChecked,
      ageRange: ageRange,
      ageRangeChecked: ageRangeChecked,
      sexualOrientations: selectedSexualOrientations,
      sexualOrientationChecked: sexualOrientationChecked,
      purposes: selectedPurposes,
      purposeChecked: purposeChecked,
    };
    FilterClient.updateFilters(filterCondition);
  };

  const DiscoveryList = () => (
    <>
      <StyledList>
        <ListItem key="distance" disablePadding>
          <DistanceInputSlider
            distance={distance}
            onChange={handleDistanceChange}
            checked={distanceChecked}
            onCheckedChange={handleDistanceCheckedChange}
          />
        </ListItem>
        <ListItem key="age-preference" disablePadding>
          <AgePreferenceInputSlider
            ageRange={ageRange}
            onChange={handleAgeRangeChange}
            checked={ageRangeChecked}
            onCheckedChange={handleAgeRangeCheckedChange}
          />
        </ListItem>
        <StyledListItem key="looking-for" disablePadding>
          <Grid container>
            <StyledDialog
              title="Looking For"
              items={lookingFor}
              selectedItems={selectedLookingFor}
              onChange={handleSelectedLookingForChange}
            />
          </Grid>
          <StyledTypography>{selectedLookingFor}</StyledTypography>
        </StyledListItem>
        <StyledListItem key="sexual-orientation" disablePadding>
          <ListItemGrid
            titleComponent={
              <StyledDialog
                title="Sexual Orientation"
                items={sexualOrientations}
                selectedItems={selectedSexualOrientations}
                onChange={handleSelectedsexualOrientationsChange}
              />
            }
            switchComponent={
              <Switch
                checked={sexualOrientationChecked}
                onChange={handleSexualOrientationCheckedChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
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
          <ListItemGrid
            titleComponent={
              <StyledDialog
                title="Purposes"
                items={purposes}
                selectedItems={selectedPurposes}
                onChange={handleSelectedPurposesChange}
              />
            }
            switchComponent={
              <Switch
                checked={purposeChecked}
                onChange={handlePurposeCheckedChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
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
      </StyledList>
    </>
  );
  return <Navigation Outlet={DiscoveryList()} />;
};

const StyledList = styled(List)`
  padding: 0.5rem 1rem;
`;

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
