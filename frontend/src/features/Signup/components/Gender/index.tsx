import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";

import { genders } from "../../../../constants/gender";

export const Gender = () => {
  const [chosen, choose] = useState("");

  return (
    <Box sx={{ justifyContent: "center", width: "100%" }}>
      <Wrapper>
        <Typography variant='h2' gutterBottom align='center'>
          I am a
        </Typography>
      </Wrapper>
      <Wrapper>
        <Grid container spacing={2}>
          {Object.values(genders).map((gender) => {
            return (
              <Grid item xs={4}>
                <Button
                  fullWidth
                  key={gender}
                  variant={gender === chosen ? "contained" : "outlined"}
                >
                  {gender}
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
          Next
        </Button>
      </Wrapper>
    </Box>
  );
};

const Wrapper = styled(`div`)`
  margin: 100px;
  display: flex;
  justify-content: center;
`;
