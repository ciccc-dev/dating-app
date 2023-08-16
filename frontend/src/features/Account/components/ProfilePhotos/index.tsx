import { Stack, Box, Button, Grid, styled } from "@mui/material";
import { useState } from "react";

export interface IFile {
  url: string;
  name: string;
}

export const ProfilePhotos = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const photos = [
    {
      id: "001",
      photoUrl: "https://swiperjs.com/demos/images/nature-1.jpg",
      sortOrder: 1,
    },
    {
      id: "002",
      photoUrl: "https://swiperjs.com/demos/images/nature-2.jpg",
      sortOrder: 2,
    },
    {
      id: "003",
      photoUrl: "https://swiperjs.com/demos/images/nature-3.jpg",
      sortOrder: 3,
    },
    {
      id: "004",
      photoUrl: "https://swiperjs.com/demos/images/nature-4.jpg",
      sortOrder: 4,
    },
    {
      id: "005",
      photoUrl: "https://swiperjs.com/demos/images/nature-5.jpg",
      sortOrder: 5,
    },
  ];

  const selectImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    let images: Array<string> = [];
    let files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        images.push(URL.createObjectURL(files[i]));
      }
      setSelectedFiles(files);
    }
  };

  return (
    <>
      <StyledGrid container spacing={0}>
        {photos.map((photo, index) => (
          <Grid key={photo.id} item xs={photo.sortOrder === 1 ? 12 : 3}>
            <Box
              key={index}
              sx={{
                width: index === 0 ? "300px" : "75px",
                height: index === 0 ? "400px" : "100px",
                background: "grey",
              }}
            >
              {selectedFiles && selectedFiles[index] ? (
                <StyleImg
                  src={URL.createObjectURL(selectedFiles[index])}
                  alt={`userPhoto-${index}`}
                  sx={{
                    width: photo.sortOrder === 1 ? "300px" : "75px",
                    height: photo.sortOrder === 1 ? "400px" : "100px",
                  }}
                />
              ) : null}
            </Box>
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
              onChange={selectImages}
            />
          </Button>
        </Stack>
        <Button
          variant="outlined"
          sx={{ width: "100%", fontSize: "1.2rem", marginBottom: "1rem" }}
        >
          Upload
        </Button>
      </Box>
    </>
  );
};

const StyleImg = styled("img")``;

const StyledGrid = styled(Grid)`
  width: 300px;
`;
