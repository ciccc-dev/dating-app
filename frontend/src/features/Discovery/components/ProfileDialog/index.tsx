import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import GradeRoundedIcon from "@mui/icons-material/GradeRounded";
import { useContext, useState } from "react";
import { Grid, styled } from "@mui/material";
import { Profile, UserProfiles } from "../../../../pages/Discovery";
import { useAuth0 } from "@auth0/auth0-react";
import { _likeClient } from "../../api/like";
import { _messageClient } from "../../api/messages";
import { _profileUnselectedClient } from "../../api/profileUnselected";

interface ProfileDialogProps {
  profile: Profile;
}

export const ProfileDialog = ({ profile }: ProfileDialogProps) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const profilesId = useContext(UserProfiles);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleClickSend = () => {
    if (message.trim() !== "") {
      sendLike();
      sendUnselected();
      sendMessage();
      alert("Message has been sent!");
      setOpen(false);
    }
  };

  const sendLike = async () => {
    try {
      const token = await getAccessTokenSilently();
      if (token.length !== 0 && process.env.REACT_APP_SERVER_URL) {
        const LikeClient = new _likeClient(
          process.env.REACT_APP_SERVER_URL ?? "",
          token
        );
        if (user?.sub) {
          await LikeClient.sendLike(profile.userId);
        }
      }
    } catch (error) {
      throw error;
    }
  };

  const sendUnselected = async () => {
    try {
      const token = await getAccessTokenSilently();
      if (token.length !== 0 && process.env.REACT_APP_SERVER_URL) {
        const profileUnselected = profilesId.filter((id) => id !== profile.id);
        const ProfileUnselectedClient = new _profileUnselectedClient(
          process.env.REACT_APP_SERVER_URL ?? "",
          token
        );
        if (user?.sub) {
          await ProfileUnselectedClient.postProfileUnselected(
            profile.id,
            profileUnselected
          );
        }
      }
    } catch (error) {
      throw error;
    }
  };

  const sendMessage = async () => {
    try {
      const token = await getAccessTokenSilently();
      if (token.length !== 0 && process.env.REACT_APP_SERVER_URL) {
        const MessageClient = new _messageClient(
          process.env.REACT_APP_SERVER_URL ?? "",
          token
        );
        if (user?.sub) {
          await MessageClient.sendMessage(profile.userId, message);
        }
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <StyleGradeIcon onClick={handleClickOpen} />
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth={true}>
        <Grid container>
          <Grid item xs={5}>
            <DialogContent>
              <StyleCardContainer>
                <StyleImg
                  src="https://swiperjs.com/demos/images/nature-1.jpg"
                  alt="profile1"
                />
                <StyleGrid container>
                  <Grid item xs={10}>
                    <div>{profile.userName}</div>
                  </Grid>
                  <Grid item xs={2}>
                    <div>{profile.age}</div>
                  </Grid>
                </StyleGrid>
              </StyleCardContainer>
            </DialogContent>
          </Grid>
          <StyleMessageWrapper item xs={7}>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Message"
                type="text"
                fullWidth
                variant="outlined"
                onChange={handleChangeMessage}
              />
            </DialogContent>
            <DialogActions>
              <StyledButton onClick={handleClose}>Cancel</StyledButton>
              <StyledButton onClick={handleClickSend}>Send</StyledButton>
            </DialogActions>
          </StyleMessageWrapper>
        </Grid>
      </Dialog>
    </>
  );
};

const StyleCardContainer = styled("div")`
  position: relative;
  width: 300px;
  height: 400px;
`;

const StyleGradeIcon = styled(GradeRoundedIcon)`
  z-index: 2;
  position: absolute;
  border: 2px solid #ec407a;
  border-radius: 50%;
  font-size: 2rem;
  top: 10px;
  right: 10px;
  background-color: white;
  color: #ec407a;
  padding: 0.2rem;
  cursor: pointer;
`;

const StyleImg = styled("img")`
  display: block;
  width: 300px;
  height: 400px;
`;

const StyleGrid = styled(Grid)`
  position: relative;
  width: 80%;
  left: 10%;
  bottom: 18%;
  color: white;
  font-size: 1.8rem;
`;

const StyleMessageWrapper = styled(Grid)`
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled(Button)`
  padding: 0.5rem 1rem;
  font-size: 1rem;
`;
