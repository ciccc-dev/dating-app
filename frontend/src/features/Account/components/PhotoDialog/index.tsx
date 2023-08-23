import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { Box, styled, Divider } from "@mui/material";
import { Photo } from "../../../../pages/Account";
import { useAuth0 } from "@auth0/auth0-react";
import { _photoClient } from "../../../Discovery/api/photo";
import PersonIcon from "@mui/icons-material/Person";
import { useRef, useState } from "react";

interface PhotoDialogProps {
  photoUrl: Photo;
  index: number;
  profileId: string;
}

export const PhotoDialog = ({
  index,
  photoUrl,
  profileId,
}: PhotoDialogProps) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeletePhoto = async () => {
    try {
      const token = await getAccessTokenSilently();
      if (token.length !== 0 && process.env.REACT_APP_SERVER_URL) {
        const ProfileClient = new _photoClient(
          process.env.REACT_APP_SERVER_URL ?? "",
          token
        );
        return await ProfileClient.deletePhoto(photoUrl.id);
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <StyleImg
        id={photoUrl.id}
        src={photoUrl.photoUrl}
        alt={`userPhoto-${index}`}
        onClick={handleClickOpen}
      />
      <Dialog open={open} onClose={handleClose}>
        <StyledBox>
          <StyledButton onClick={handleDeletePhoto} autoFocus>
            Delete photo
          </StyledButton>
          <Divider />
          <StyledButton onClick={handleClose}>Replace photo</StyledButton>
          <Divider />
          <StyledButton onClick={handleClose}>Cancel</StyledButton>
        </StyledBox>
      </Dialog>
    </>
  );
};

const StyleImg = styled("img")`
  aspect-ratio: 0.75;
  width: 100%;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
    outline: 2px solid #ec407a;
  }
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const StyledButton = styled(Button)`
  width: 100%;
  padding: 0.7rem 3rem;
  font-size: 1.5rem;
`;
