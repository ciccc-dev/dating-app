import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { Box, styled, Divider } from "@mui/material";

interface PhotoDialogProps {
  photoUrls: string[];
  index: number;
}

export const PhotoDialog = ({ index, photoUrls }: PhotoDialogProps) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <StyleImg
        src={photoUrls[index]}
        alt={`userPhoto-${index}`}
        onClick={handleClickOpen}
      />
      <Dialog open={open} onClose={handleClose}>
        <StyledBox>
          <StyledButton onClick={handleClose} autoFocus>
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
    border: 2px solid #ec407a;
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
