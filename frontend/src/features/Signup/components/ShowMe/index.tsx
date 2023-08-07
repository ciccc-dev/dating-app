import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";

const showMeGenders = ["Man", "Woman", "Other"];

export const ShowMe = () => {
  const [chosen, choose] = useState("");

  return (
    <StyledWrapper>
      <Wrapper>
        <Typography variant='h2' gutterBottom align='center'>
          Show me for
        </Typography>
      </Wrapper>
      <Wrapper>
        <Grid container spacing={2}>
          {showMeGenders.map((gender) => {
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
