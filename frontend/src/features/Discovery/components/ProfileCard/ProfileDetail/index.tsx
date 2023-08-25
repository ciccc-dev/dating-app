import { Grid, styled } from "@mui/material";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { Profile } from "../../../../../types";

interface MainProfileProps {
  profile: Profile;
  index: number;
}

interface StyledGenderSpanProps {
  gender: string;
}

const CaseProfile = ({ profile, index }: MainProfileProps) => {
  let content;

  switch (index) {
    case 0:
      content = (
        <>
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
        </>
      );
      break;
    case 1:
      content = (
        <>
          <Grid item xs={10}>
            <StledSubBox>{profile.userName}</StledSubBox>
          </Grid>
          <Grid item xs={2}>
            <StledSubBox>{profile.age}</StledSubBox>
          </Grid>
          <Grid item xs={12}>
            <StyledSpan>{profile.sexualOrientation}</StyledSpan>
          </Grid>
          {profile.purposes.length > 0 && (
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "0.25rem",
              }}
            >
              <PersonSearchIcon />
              <span
                style={{
                  marginRight: "0.5rem",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                :
              </span>
              <div>
                {profile.purposes.map((purpose, index) => (
                  <StyledSpan key={index}>{`${purpose.name}`}</StyledSpan>
                ))}
              </div>
            </Grid>
          )}
        </>
      );
      break;
    case 2:
      content = (
        <>
          <Grid item xs={10}>
            <StledSubBox>{profile.userName}</StledSubBox>
          </Grid>
          <Grid item xs={2}>
            <StledSubBox>{profile.age}</StledSubBox>
          </Grid>
          <Grid
            item
            xs={12}
            maxHeight={"60px"}
            sx={{ border: "1px solid white", borderRadius: "0.5rem" }}
          >
            <StyledParagraph>{`${profile.aboutMe}`}</StyledParagraph>
          </Grid>
        </>
      );
      break;
    case 3:
      content = (
        <>
          <Grid item xs={10}>
            <StledSubBox>{profile.userName}</StledSubBox>
          </Grid>
          <Grid item xs={2}>
            <StledSubBox>{profile.age}</StledSubBox>
          </Grid>
          {profile.interests.length > 0 && (
            <Grid item xs={12} maxHeight={"50px"}>
              {profile.interests.map((interest, index) => (
                <StyledSpan key={index}>{`${interest.name}`}</StyledSpan>
              ))}
            </Grid>
          )}
        </>
      );
      break;
    default:
      content = (
        <>
          <Grid item xs={10}>
            <StledSubBox>{profile.userName}</StledSubBox>
          </Grid>
          <Grid item xs={2}>
            <StledSubBox>{profile.age}</StledSubBox>
          </Grid>
        </>
      );
      break;
  }
  return content;
};

export const ProfileDetail = ({ profile, index }: MainProfileProps) => {
  return (
    <StyledGrid container sx={{ overflow: "scroll" }}>
      <CaseProfile profile={profile} index={index} />
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
`;

export const getBackgroundStyle = (gender: string) => {
  switch (gender) {
    case "Man":
      return "linear-gradient(-225deg, #3D4E81 0%, #5753C9 48%, #6E7FF3 100%)";
    case "Woman":
      return "linear-gradient(to top, #f77062 0%, #fe5196 100%)";
    default:
      return "linear-gradient(to top, #9be15d 0%, #00e3ae 100%)";
  }
};

export const StyledGenderSpan = styled("span")<StyledGenderSpanProps>(
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

export const StyledDistanceSpan = styled("span")`
  border: 1px solid white;
  border-radius: 1rem;
  padding: 0.25rem 0.5rem;
  color: white;
  background-color: #006600;
  font-size: 0.7rem;
  font-weight: 600;
  margin-right: 0.5rem;
`;

export const StyledSpan = styled("span")`
  display: inline-block;
  border: 1px solid white;
  border-radius: 1rem;
  padding: 0.1rem 0.5rem;
  color: white;
  background-color: grey;
  font-size: 0.6rem;
  font-weight: 600;
  margin-right: 0.5rem;
`;

const StledMainBox = styled("span")`
  font-size: 1.8rem;
  background-image: linear-gradient(90deg, #4e9ff3, #8eefff);
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: 100% 20%;
`;

const StledSubBox = styled("span")`
  font-size: 1.4rem;
  background-image: linear-gradient(90deg, #4e9ff3, #8eefff);
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: 100% 20%;
`;

export const StyledParagraph = styled("p")`
  margin: 0;
  padding: 0.25rem;
  color: white;
  font-size: 1rem;
  overflow: auto;
  max-height: 100%;
`;
