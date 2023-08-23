import { useContext, useEffect, useState } from "react";
import { Button, Grid, Switch, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { styled } from "@mui/system";
import { DistanceInputSlider } from "../../../Discovery/components/DistanceInputSlider";
import { AgePreferenceInputSlider } from "../../../Discovery/components/AgePreferenceInputSlider";
import { _filterClient } from "../../../Discovery/api/filter";
import { FilterDialog } from "../FilterDialog";
import { lookingFor } from "../../../../constants/lookingfor";
import { sexualOrientations } from "../../../../constants/sexualOrientations";
import { purposes } from "../../../../constants/purposes";
import { Navigation } from "../../../../components/Navigation";
import { ListItemGrid } from "../LIstItemGrid";
import { _interestClient } from "../../api/interest";
import { useAuth0 } from "@auth0/auth0-react";
import {
  UserProfileIdContext,
  isFilteredContext,
} from "../../../../pages/Discovery";

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
  interests: Item[];
  isInterestFiltered: boolean;
  purposes: string[];
  isPurposeFiltered: boolean;
}

const defaultFilter = {
  id: "",
  profileId: "",
  showMe: "",
  minAge: 0,
  maxAge: 100,
  isAgeFiltered: false,
  distance: 50,
  isDistanceFiltered: false,
  sexualOrientations: [],
  isSexualOrientationFiltered: false,
  purposes: [],
  isPurposeFiltered: false,
  interests: [],
  isInterestFiltered: false,
};

export interface Item {
  name: string;
}

export const DiscoveryNavigation = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [filter, setFilter] = useState<Filter>(defaultFilter);
  const [interests, setInterests] = useState<Item[]>([]);
  const { profileId } = useContext(UserProfileIdContext);
  const { setIsfiltered } = useContext(isFilteredContext);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const token = await getAccessTokenSilently();
        if (token.length !== 0 && process.env.REACT_APP_SERVER_URL) {
          const InterestClient = new _interestClient(
            process.env.REACT_APP_SERVER_URL ?? "",
            token
          );
          const data = await InterestClient.getInterests();
          setInterests(data);
        }
      } catch (error) {
        throw error;
      }
    };
    fetchInterests();
  }, [getAccessTokenSilently]);

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        if (profileId) {
          const token = await getAccessTokenSilently();
          if (token.length !== 0 && process.env.REACT_APP_SERVER_URL) {
            const FilterClient = new _filterClient(
              process.env.REACT_APP_SERVER_URL ?? "",
              token
            );
            const data = await FilterClient.getFilter(profileId);
            if (data) {
              setFilter(data);
            }
          }
        }
      } catch (error) {
        throw error;
      }
    };
    fetchFilterData();
  }, [getAccessTokenSilently, profileId]);

  const handleChange = <T,>(title: string, value: T) => {
    setFilter({ ...filter, [title]: value });
  };

  const handleFilterClick = async () => {
    const token = await getAccessTokenSilently();
    if (token.length !== 0 && process.env.REACT_APP_SERVER_URL) {
      const FilterClient = new _filterClient(
        process.env.REACT_APP_SERVER_URL ?? "",
        token
      );
      await FilterClient.updateFilter(filter);
      setIsfiltered(true);
    }
  };

  const DiscoveryList = () => (
    <>
      <StyledList>
        <ListItem key="distance" disablePadding>
          <DistanceInputSlider
            data={filter.distance}
            onChange={handleChange}
            checked={filter.isDistanceFiltered}
            distance={"distance"}
            isDistanceFiltered={"isDistanceFiltered"}
          />
        </ListItem>
        <ListItem key="age-preference" disablePadding>
          <AgePreferenceInputSlider
            minAgeData={filter.minAge}
            maxAgeData={filter.maxAge}
            minAge={"minAge"}
            maxAge={"maxAge"}
            onChange={handleChange}
            checked={filter.isAgeFiltered}
            isAgeFiltered={"isAgeFiltered"}
          />
        </ListItem>
        <StyledListItem key="looking-for" disablePadding>
          <Grid container>
            <StyledDialog
              type="radio"
              title="Looking For"
              property="showMe"
              datatype="string"
              items={lookingFor}
              selectedItems={filter.showMe}
              onChange={handleChange}
            />
          </Grid>
          <StyledTypography>{filter.showMe}</StyledTypography>
        </StyledListItem>
        <StyledListItem key="sexual-orientation" disablePadding>
          <ListItemGrid
            titleComponent={
              <StyledDialog
                type="checkbox"
                title="Sexual Orientation"
                property="sexualOrientations"
                datatype="stringArray"
                items={sexualOrientations}
                selectedItems={filter.sexualOrientations}
                onChange={handleChange}
              />
            }
            switchComponent={
              <Switch
                checked={filter.isSexualOrientationFiltered}
                onChange={() =>
                  handleChange(
                    "isSexualOrientationFiltered",
                    !filter.isSexualOrientationFiltered
                  )
                }
                inputProps={{ "aria-label": "controlled" }}
              />
            }
          />
          <StyledListBlock>
            {filter.sexualOrientations.map((sexualOrientation, index) => (
              <StyledListSpan key={index}>{sexualOrientation}</StyledListSpan>
            ))}
          </StyledListBlock>
        </StyledListItem>
        <StyledListItem key="purposes" disablePadding>
          <ListItemGrid
            titleComponent={
              <StyledDialog
                type="checkbox"
                title="Purposes"
                property="purposes"
                datatype="stringArray"
                items={purposes}
                selectedItems={filter.purposes}
                onChange={handleChange}
              />
            }
            switchComponent={
              <Switch
                checked={filter.isPurposeFiltered}
                onChange={() =>
                  handleChange("isPurposeFiltered", !filter.isPurposeFiltered)
                }
                inputProps={{ "aria-label": "controlled" }}
              />
            }
          />
          <StyledListBlock>
            {filter.purposes.map((purpose, index) => (
              <StyledListSpan key={index}>{purpose}</StyledListSpan>
            ))}
          </StyledListBlock>
        </StyledListItem>
        <StyledListItem key="interests" disablePadding>
          <ListItemGrid
            titleComponent={
              <StyledDialog
                type="checkbox"
                title="Interests"
                property="interests"
                datatype="objectArray"
                items={interests}
                selectedItems={filter.interests}
                onChange={handleChange}
              />
            }
            switchComponent={
              <Switch
                checked={filter.isInterestFiltered}
                onChange={() =>
                  handleChange("isInterestFiltered", !filter.isInterestFiltered)
                }
                inputProps={{ "aria-label": "controlled" }}
              />
            }
          />
          <StyledListBlock>
            {filter.interests.map(({ name }, index) => (
              <StyledListSpan key={index}>{name}</StyledListSpan>
            ))}
          </StyledListBlock>
        </StyledListItem>
        <StyledListItem key="filter" disablePadding>
          <StyledButton variant="contained" onClick={handleFilterClick}>
            Filter
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

const StyledButton = styled(Button)`
  width: 100%;
  margin: 1.5rem 0;
  text-align: center;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 0.25rem;
`;

const StyledListItem = styled(ListItem)`
  flex-direction: column;
`;

const StyledTypography = styled(Typography)`
  padding: 0.5rem 1rem;
`;

const StyledListBlock = styled("div")`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0.5rem 1rem;
  max-height: 150px;
  overflow: auto;
`;

const StyledListSpan = styled("span")`
  padding: 0.25rem 0.5rem;
  border: 1px solid black;
  border-radius: 0.7rem;
  margin: 0 0.25rem 0.25rem 0.25rem;
`;

const StyledDialog = styled(FilterDialog)`
  width: 100%;
`;
