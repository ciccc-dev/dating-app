import { useAuth0 } from "@auth0/auth0-react";
import { Stack, Box, Button, Grid, styled } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { _photoClient } from "../../../Discovery/api/photo";
import PersonIcon from "@mui/icons-material/Person";
import { PhotoDialog } from "../PhotoDialog";
import { Photo } from "../../../../pages/Account";
import { Point, Area } from "react-easy-crop/types";

export interface IFile {
  url: string;
  name: string;
}

interface ProfilePhotosProps {
  photoUrls: Photo[];
  profileId: string;
}

export const ProfilePhotos = ({ photoUrls, profileId }: ProfilePhotosProps) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const postPhotos = async (files: FileList) => {
    try {
      if (files) {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          formData.append("photos", files[i]);
        }
        const token = await getAccessTokenSilently();
        if (token.length !== 0 && process.env.REACT_APP_SERVER_URL) {
          const PhotoClient = new _photoClient(
            process.env.REACT_APP_SERVER_URL ?? "",
            token
          );
          const data = await PhotoClient.postPhotos(profileId, formData);
        }
      }
    } catch (error) {
      throw error;
    }
  };

  const postPhoto = async (file: File) => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append("photo", file);
        const token = await getAccessTokenSilently();
        if (token.length !== 0 && process.env.REACT_APP_SERVER_URL) {
          const PhotoClient = new _photoClient(
            process.env.REACT_APP_SERVER_URL ?? "",
            token
          );
          // const data = await PhotoClient.postPhotos(profileId, formData);
        }
      }
    } catch (error) {
      throw error;
    }
  };

  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const selectImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    let images: Array<string> = [];
    let files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        images.push(URL.createObjectURL(files[i]));
      }
      setSelectedFiles(files);
      postPhotos(files);
    }
  };

  const handleBoxClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <StyledGrid container spacing={1}>
        {[...Array(5)].map((e, index) => (
          <Grid key={index} item xs={index === 0 ? 12 : 3}>
            {photoUrls && photoUrls[index] ? (
              <PhotoDialog
                photoUrl={photoUrls[index]}
                index={index}
                profileId={profileId}
              />
            ) : (
              <StyledBox
                key={index}
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
                <PersonIcon
                  sx={{ color: "grey", width: "100%", fontSize: "300%" }}
                />
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  name="photo"
                  onChange={selectImage}
                />
              </StyledBox>
            )}
            {/* {selectedFiles && selectedFiles[index] ? (
                <StyleImg
                  src={URL.createObjectURL(selectedFiles[index])}
                  alt={`userPhoto-${index}`}
                  sx={{
                    width: "100%",
                    aspectRatio: "0.75",
                  }}
                />
              ) : null} */}
          </Grid>
        ))}
      </StyledGrid>
      <Box sx={{ marginTop: "1rem" }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Button
            variant="outlined"
            component="label"
            sx={{ width: "100%", fontSize: "1.2rem", marginBottom: "1rem" }}
          >
            Choose Photos
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              name="photos"
              ref={inputRef}
              onChange={selectImages}
            />
          </Button>
        </Stack>
        {/* <Button
          variant="outlined"
          sx={{ width: "100%", fontSize: "1.2rem", marginBottom: "1rem" }}
        >
          Upload
        </Button> */}
      </Box>
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

const StyledGrid = styled(Grid)`
  width: 300px;
`;

const StyledBox = styled(Box)`
  &:hover {
    cursor: pointer;
    border: 2px solid #ec407a;
  }
`;
