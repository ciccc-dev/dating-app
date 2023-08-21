import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  styled,
} from "@mui/material";
import React, { useCallback, useRef, useState } from "react";
import Cropper, { Area, Point } from "react-easy-crop";
import { uploadImage } from "../../../../utils/cropImage";
import PersonIcon from "@mui/icons-material/Person";

const aspect = 3 / 4;
const zoomInit = 1;
const cropInit = { x: 0, y: 0 };
const croppedAreaInit = {
  width: 0,
  height: 0,
  x: 0,
  y: 0,
};

export const ImageCropDialog = () => {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [zoom, setZoom] = useState(zoomInit);
  const [crop, setCrop] = useState<Point>(cropInit);
  const [croppedArea, setCroppedArea] = React.useState<Area>(croppedAreaInit);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBoxClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onCropComplete = (croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onUpload = async () => {
    const data = await uploadImage(
      URL.createObjectURL(selectedFile!),
      selectedFile!.name,
      croppedArea
    );
    if (data) {
      setSelectedFile(data);
    }
  };

  const onCancel = () => {
    handleClose();
    setSelectedFile(null);
  };

  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
      setSelectedFileUrl(URL.createObjectURL(event.target.files[0]));
      handleClickOpen();
    }
  };

  return (
    <>
      <StyledBox
        sx={{
          aspectRatio: "0.75",
          width: "100%",
          background: "lightgrey",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={handleBoxClick}
      >
        <input
          hidden
          accept="image/*"
          type="file"
          name="photo"
          ref={inputRef}
          onChange={selectImage}
        />
        <PersonIcon sx={{ color: "grey", width: "100%", fontSize: "300%" }} />
      </StyledBox>

      {selectedFile && (
        <Dialog open={open} onClose={handleClose}>
          <DialogContent sx={{ width: "600px" }}>
            <StyledCropContainerBox>
              <Cropper
                image={selectedFileUrl}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </StyledCropContainerBox>
          </DialogContent>
          <StlyedDialogActions>
            <Button variant="contained" color="secondary" onClick={onUpload}>
              Upload
            </Button>
            <Button variant="contained" color="secondary" onClick={onCancel}>
              Cancel
            </Button>
          </StlyedDialogActions>
        </Dialog>
      )}
    </>
  );
};

const StyledCropContainerBox = styled(Box)`
  position: relative;
  width: 100%;
  height: 500px;
`;

const StlyedDialogActions = styled(DialogActions)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 0 1.2rem 0;
`;

const StyledBox = styled(Box)`
  &:hover {
    cursor: pointer;
    border: 2px solid #ec407a;
  }
`;
