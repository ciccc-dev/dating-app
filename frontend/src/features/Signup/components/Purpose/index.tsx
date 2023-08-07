import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";

import { purposes } from "../../../../constants/purposes";

export const Purpose = () => {
  const [chosen, choose] = useState("");

  return (
    <StyledWrapper>
      <Wrapper>
        <Typography variant='h2' gutterBottom align='center'>
          I want to Find
        </Typography>
      </Wrapper>
      <Wrapper>
        <Grid container spacing={2}>
          {purposes.map((purpose) => {
            return (
              <Grid item xs={4}>
                <Button
                  fullWidth
                  key={purpose.name}
                  variant={purpose.name === chosen ? "contained" : "outlined"}
                >
                  {purpose.name}
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
