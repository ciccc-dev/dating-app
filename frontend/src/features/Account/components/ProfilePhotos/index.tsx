import { Grid, styled } from "@mui/material";

export const ProfilePhotos = () => {
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

  return (
    <>
      <StyledGrid container spacing={0}>
        {photos.map((photo) => (
          <Grid key={photo.id} item xs={photo.sortOrder === 1 ? 12 : 3}>
            <StyleImg
              src={photo.photoUrl}
              alt={`userPhoto-${photo.id}`}
              sx={{
                width: photo.sortOrder === 1 ? "300px" : "75px",
                height: photo.sortOrder === 1 ? "400px" : "100px",
              }}
            />
          </Grid>
        ))}
      </StyledGrid>
    </>
  );
};

const StyleImg = styled("img")``;

const StyledGrid = styled(Grid)`
  width: 300px;
`;
