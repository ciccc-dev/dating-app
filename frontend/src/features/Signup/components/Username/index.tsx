import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";

import { useDialogState } from "../../../../hooks/useDialogState";
import { NotificationBar } from "../../../../components/NotificationBar";

type NextPhase = "gender";

interface Props {
  name: string;
  onChange: (key: string, value: string) => void;
  onChangePhase: (value: NextPhase) => void;
}

export const Username = ({ name, onChange, onChangePhase }: Props) => {
  const [isOpen, { open, close }] = useDialogState();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    onChange("username", event.currentTarget.value);

  const handleNext = () => {
    if (name.length === 0) return open();
    onChangePhase("gender");
  };

  return (
    <StyledWrapper>
      <Wrapper>
        <Typography variant='h2' gutterBottom align='center'>
          My name is
        </Typography>
      </Wrapper>
      <Wrapper>
        <StyledTextField
          label='USERNAME'
          variant='standard'
          value={name}
          onChange={handleChange}
        />
      </Wrapper>
      <Wrapper>
        <Button variant='contained' onClick={handleNext}>
          Next
        </Button>
      </Wrapper>
      <NotificationBar
        isOpen={isOpen}
        onClose={close}
        isSuccess={false}
        message='Please input your username'
      />
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
