import { MouseEvent } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";

import { purposes } from "../../../../constants/purposes";

type Phase = "showMe" | "sexual";

interface Props {
  values: string[];
  onChange: (category: string, values: string[]) => void;
  onChangePhase: (phase: Phase) => void;
}

export const Purpose = ({ values, onChange, onChangePhase }: Props) => {
  const remove = (chosen: string) => {
    const index = values.indexOf(chosen);
    onChange(
      "purposes",
      values.filter((_, idx) => idx !== index)
    );
  };
  const add = (chosen: string) => onChange("purposes", [...values, chosen]);
  const handleClick = (e: MouseEvent<HTMLElement>) => {
    const chosenPurpose = e.currentTarget.dataset.purpose as string;
    values.includes(chosenPurpose) ? remove(chosenPurpose) : add(chosenPurpose);
  };

  const navigatePrev = () => onChangePhase("showMe");
  const navigateNext = () => onChangePhase("sexual");

  return (
    <StyledWrapper>
      <Wrapper>
        <Typography variant='h2' gutterBottom align='center'>
          I want to Find
        </Typography>
      </Wrapper>
      <Wrapper>
        <Grid container spacing={2}>
          {purposes.map((purpose) => (
            <Grid key={purpose.name} item xs={4}>
              <Button
                fullWidth
                key={purpose.name}
                variant={
                  values.includes(purpose.name) ? "contained" : "outlined"
                }
                data-purpose={purpose.name}
                onClick={handleClick}
              >
                {purpose.name}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Wrapper>
      <Wrapper
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button variant='outlined' sx={{ margin: 1 }} onClick={navigatePrev}>
          Back
        </Button>
        <Button variant='contained' sx={{ margin: 1 }} onClick={navigateNext}>
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
