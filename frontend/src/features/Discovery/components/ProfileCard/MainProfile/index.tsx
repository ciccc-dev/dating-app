import { Grid, styled } from "@mui/material";
import React from "react";
import { Profile } from "../../../../../pages/Discovery";

interface MainProfileProps {
  profile: Profile;
}

interface StyledGenderSpanProps {
  gender: string;
}

export const MainProfile = ({ profile }: MainProfileProps) => {
  return (
    <StyledGrid container>
      <Grid item xs={12}>
        <StyledGenderSpan gender={profile.gender}>
          {profile.gender}
        </StyledGenderSpan>
        {profile.distance ? (
          <StyledDistanceSpan>{profile.distance}km away</StyledDistanceSpan>
        ) : null}
      </Grid>
      <Grid item xs={10}>
        <StledMainBox>{profile.userName}</StledMainBox>
      </Grid>
      <Grid item xs={2}>
        <StledMainBox>{profile.age}</StledMainBox>
      </Grid>
    </StyledGrid>
  );
};

const StyledGrid = styled(Grid)`
  padding: 0.5rem 1rem;
  position: relative;
  width: 100%;
  max-height: 30%;
  bottom: 30%;
  color: white;
  font-size: 1.8rem;
`;

const getBackgroundStyle = (gender: string) => {
  switch (gender) {
    case "Man":
      return "linear-gradient(-225deg, #3D4E81 0%, #5753C9 48%, #6E7FF3 100%)";
    case "Woman":
      return "linear-gradient(to top, #f77062 0%, #fe5196 100%)";
    default:
      return "linear-gradient(to top, #9be15d 0%, #00e3ae 100%)";
  }
};

const StyledGenderSpan = styled("span")<StyledGenderSpanProps>(
  ({ gender }) => ({
    border: "1px solid white",
    borderRadius: "1rem",
    padding: "0.25rem 0.5rem",
    color: "white",
    fontSize: "0.7rem",
    fontWeight: "600",
    marginRight: "0.5rem",
    backgroundImage: getBackgroundStyle(gender),
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom",
    backgroundSize: "100% 100%",
  })
);

const StyledDistanceSpan = styled("span")`
  border: 1px solid white;
  border-radius: 1rem;
  padding: 0.25rem 0.5rem;
  color: white;
  background-color: #006600;
  font-size: 0.7rem;
  font-weight: 600;
  margin-right: 0.5rem;
`;

const StledMainBox = styled("span")`
  background-image: linear-gradient(90deg, #4e9ff3, #8eefff);
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: 100% 20%;
`;
