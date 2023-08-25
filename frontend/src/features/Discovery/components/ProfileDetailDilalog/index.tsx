import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import { Box, Grid, styled } from "@mui/material";
import unknowUser from "../../../../pic/unkown_user.png";
import { StyledGenderSpan, StyledSpan } from "../ProfileCard/ProfileDetail";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { pink } from "@mui/material/colors";
import { Profile } from "../../../../types";

interface ProfileDetailDialogProps {
  profile: Profile;
}

export const ProfileDetailDialog = ({ profile }: ProfileDetailDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <StyledInfoIcon onClick={handleClickOpen} />
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth={true}>
        <Grid container>
          <Grid item xs={5}>
            <DialogContent>
              <StyledCardContainer>
                {profile.photos.length > 0 ? (
                  <StyledImg src={profile.photos[0].photoUrl} alt="profile1" />
                ) : (
                  <StyledImg src={unknowUser} alt="unknowUser" />
                )}
              </StyledCardContainer>
            </DialogContent>
          </Grid>
          <StyledDetailWrapper item xs={7}>
            <DialogActions>
              <StyledCloseIcon onClick={handleClose} />
            </DialogActions>
            <DialogContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingRight: "0.7rem",
                }}
              >
                <StyledMainItemBox>{profile.userName}</StyledMainItemBox>
                <StyledMainItemBox>{profile.age}</StyledMainItemBox>
              </Box>
              <StyledDivider />
              <StyledBox>
                <StyledGenderSpan gender={profile.gender}>
                  {profile.gender}
                </StyledGenderSpan>
                <StyledSpan>{profile.sexualOrientation}</StyledSpan>
              </StyledBox>
              {profile.purposes[0].name && (
                <StyledBox
                  sx={{
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
                </StyledBox>
              )}
              {profile.interests[0].name &&
                profile.interests.map((interest, index) => (
                  <StyledSpan key={index}>{`${interest.name}`}</StyledSpan>
                ))}
              <StyledBox
                sx={{ border: "1px solid black", borderRadius: "0.5rem" }}
              >
                {profile.aboutMe && (
                  <StyledParagraph>{`${profile.aboutMe}`}</StyledParagraph>
                )}
              </StyledBox>
            </DialogContent>
          </StyledDetailWrapper>
        </Grid>
      </Dialog>
    </>
  );
};

const StyledCardContainer = styled("div")`
  position: relative;
  width: 300px;
  height: 400px;
  border-radius: 1.2rem;
`;

const StyledInfoIcon = styled(InfoIcon)`
  z-index: 2;
  position: absolute;
  font-size: 2rem;
  top: 10px;
  right: 10px;
  color: white;
  cursor: pointer;
`;

const StyledImg = styled("img")`
  display: block;
  width: 300px;
  height: 400px;
  border-radius: 1.2rem;
`;

const StyledDivider = styled("div")`
  height: 0.5rem;
  background-image: linear-gradient(90deg, #4e9ff3, #8eefff);
  background-repeat: no-repeat;
  background-size: 100% 100%;
`;

const StyledDetailWrapper = styled(Grid)`
  display: flex;
  flex-direction: column;
`;

const StyledCloseIcon = styled(CancelPresentationIcon)`
  margin: 0.5rem 1rem 0 0;
  font-size: 2.5rem;
  color: ${pink[400]};
`;

const StyledMainItemBox = styled(Box)`
  font-size: 2.5rem;
`;

const StyledBox = styled(Box)`
  margin-top: 0.5rem;
`;

const StyledParagraph = styled("p")`
  margin: 0;
  padding: 0.25rem;
  color: black;
  font-size: 1rem;
  overflow: auto;
  max-height: 100%;
`;
