import { MouseEvent } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";

import { useFetchInterests } from "../../../../hooks/useFetchInterests";

type Phase = "sexual";

interface Props {
  values: string[];
  onChange: (category: string, value: string[]) => void;
  onChangePhase: (phase: Phase) => void;
  onCreate: () => Promise<void>;
}

export const Interests = ({
  values,
  onChange,
  onChangePhase,
  onCreate,
}: Props) => {
  const interests = useFetchInterests();
  const navigatePrev = () => onChangePhase("sexual");

  const add = (interest: string) =>
    onChange("interests", [...values, interest]);
  const remove = (interest: string) => {
    const index = values.indexOf(interest);
    onChange(
      "interests",
      values.filter((_, idx) => index !== idx)
    );
  };
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const chosen = event.currentTarget.dataset.interest as string;
    values.includes(chosen) ? remove(chosen) : add(chosen);
  };

  return (
    <StyledWrapper>
      <Wrapper>
        <Typography variant='h2' gutterBottom align='center'>
          I'm interested in
        </Typography>
      </Wrapper>
      <Wrapper>
        <Grid container spacing={2}>
          {interests.map((interest) => {
            return (
              <Grid key={interest.id} item xs={4}>
                <Button
                  fullWidth
                  key={interest.id}
                  variant={
                    values.includes(interest.name) ? "contained" : "outlined"
                  }
                  data-interest={interest.name}
                  onClick={handleClick}
                >
                  {interest.name}
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
        <Button variant='outlined' sx={{ margin: 1 }} onClick={navigatePrev}>
          Back
        </Button>
        <Button variant='contained' sx={{ margin: 1 }} onClick={onCreate}>
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
