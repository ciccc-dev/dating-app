import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import { InputLabel, Input, styled } from "@mui/material";

export const Username = () => {
  return (
    <Box sx={{ justifyContent: "center", width: "100%" }}>
      <Wrapper>
        <Typography variant='h2' gutterBottom align='center'>
          My name is
        </Typography>
      </Wrapper>
      <Wrapper>
        <FormControl fullWidth>
          <InputLabel size='normal'>USERNAME</InputLabel>
          <Input />
        </FormControl>
      </Wrapper>
      <Wrapper
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button variant='contained'>Next</Button>
      </Wrapper>
    </Box>
  );
};

const Wrapper = styled(`div`)`
  margin: 100px;
  display: flex;
  justify-content: center;
`;
