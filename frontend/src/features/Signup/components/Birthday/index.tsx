import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import { InputLabel, Input, styled } from "@mui/material";

export const Birthday = () => {
  return (
    <StyledWrapper>
      <Wrapper>
        <Typography variant='h2' gutterBottom align='center'>
          I was born in
        </Typography>
      </Wrapper>
      <Wrapper>
        <StyledFromControl>
          <InputLabel size='normal'>YYYY / MM / DD</InputLabel>
          <Input />
        </StyledFromControl>
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

const StyledFromControl = styled(FormControl)`
  width: 50%;
`;

const StyledWrapper = styled(Box)`
  justify-content: center;
  width: 100%;
`;

const Wrapper = styled(`div`)`
  margin: 100px;
  display: flex;
  justify-content: center;
`;
