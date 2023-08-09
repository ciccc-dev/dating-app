import { ChangeEvent } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";

type Phase = "gender" | "showMe";

interface Props {
  value: string;
  onChange: (category: string, birthday: string) => void;
  onChangePhase: (phase: Phase) => void;
}

export const Birthday = ({ value, onChange, onChangePhase }: Props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    onChange("birthday", event.currentTarget.value as string);

  const navigatePrev = () => onChangePhase("gender");
  const navigateNext = () => {
    if (value.length > 0) onChangePhase("showMe");
  };

  return (
    <StyledWrapper>
      <Wrapper>
        <Typography variant='h2' gutterBottom align='center'>
          I was born in
        </Typography>
      </Wrapper>
      <Wrapper>
        <StyledTextField
          label='YYYY-MM-DD'
          variant='standard'
          value={value}
          onChange={handleChange}
        />
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

const StyledTextField = styled(TextField)`
  width: 50%;
`;
