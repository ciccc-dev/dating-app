import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";

import { sexualOrientations } from "../../../../constants/sexualOrientations";

export const Interests = () => {
  const [chosen, choose] = useState("");

  return (
    <StyledWrapper>
      <Wrapper>
        <Typography variant='h2' gutterBottom align='center'>
          I'm interested in
        </Typography>
      </Wrapper>
      <Wrapper>
        <Grid container spacing={2}>
          {sexualOrientations.map((orientation) => {
            return (
              <Grid key={orientation.name} item xs={4}>
                <Button
                  fullWidth
                  key={orientation.name}
                  variant={
                    orientation.name === chosen ? "contained" : "outlined"
                  }
                >
                  {orientation.name}
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </Wrapper>
      <Wrapper
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button variant='outlined' sx={{ margin: 1 }}>
          Back
        </Button>
        <Button variant='contained' sx={{ margin: 1 }}>
          Create
        </Button>
      </Wrapper>
    </StyledWrapper>
  );
};

const StyledWrapper = styled(Box)`
  justify-content: center;
  width: 100%;
`;

const Wrapper = styled(`div`)`
  margin: 100px;
  display: flex;
  justify-content: center;
`;
