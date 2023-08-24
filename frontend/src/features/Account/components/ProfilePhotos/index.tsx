import { useAuth0 } from "@auth0/auth0-react";
import { Grid, styled } from "@mui/material";
import { _photoClient } from "../../../Discovery/api/photo";
import { PhotoDialog } from "../PhotoDialog";
import { Photo } from "../../../../pages/Account";
import { ImageCropDialog } from "../ImageCropDialog";
import React from "react";

export interface IFile {
  url: string;
  name: string;
}

interface ProfilePhotosProps {
  photoUrls: Photo[];
  profileId: string;
}

export const ProfilePhotos = React.memo(
  ({ photoUrls, profileId }: ProfilePhotosProps) => {
    const { getAccessTokenSilently } = useAuth0();

    const postPhoto = async (file: File): Promise<boolean> => {
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
            await PhotoClient.postPhoto(profileId, formData);
            return true;
          }
          return false;
        }
        return false;
      } catch (error) {
        return false;
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
                <ImageCropDialog postPhoto={postPhoto} />
              )}
            </Grid>
          ))}
        </StyledGrid>
      </>
    );
  }
);

const StyledGrid = styled(Grid)`
  width: 300px;
`;
