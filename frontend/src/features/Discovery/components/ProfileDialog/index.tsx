import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import GradeRoundedIcon from "@mui/icons-material/GradeRounded";
import { useState } from "react";
import { Grid, styled } from "@mui/material";
import { Profile } from "../../../../pages/Discovery";

interface ProfileDialogProps {
  profile: Profile;
}

export const ProfileDialog = ({ profile }: ProfileDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
                <StyleTitle>{`${profile.userName}  ${profile.birthday}`}</StyleTitle>
              </StyleCardContainer>
            </DialogContent>
          </Grid>
          <Grid item xs={7}>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Message"
                type="email"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose}>Send</Button>
            </DialogActions>
          </Grid>
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

const StyleTitle = styled("h5")`
  position: relative;
  width: 80%;
  left: 10%;
  bottom: 30%;
  color: white;
  font-size: 1rem;
`;
