import { ChangeEvent, FormEvent, KeyboardEvent } from "react";
import SendIcon from "@mui/icons-material/Send";
import { Paper } from "@mui/material";
import { IconButton, TextField } from "@mui/material";
import { styled } from "@mui/material";

interface Props {
  message: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickEnter: (event: KeyboardEvent<HTMLDivElement>) => void;
  onSubmit: (event: FormEvent) => void;
  disabled: boolean;
}

export const Form = ({
  message,
  onChange,
  onClickEnter,
  onSubmit,
  disabled,
}: Props) => {
  return (
    <StyledPaper>
      <StyledForm onSubmit={onSubmit}>
        <TextField
          label='Message'
          value={message}
          onChange={onChange}
          onKeyDown={onClickEnter}
          fullWidth
          multiline
          rows={1}
          variant='outlined'
          disabled={disabled}
        />
        <IconButton type='submit' color='primary'>
          <SendIcon />
        </IconButton>
      </StyledForm>
    </StyledPaper>
  );
};

const StyledPaper = styled(Paper)`
  margin-left: 16px;
  position: absolute;
  bottom: 10px;

  @media (min-width: 100px) {
    width: 90%;
  }

  @media (min-width: 600px) {
    width: 60%;
  }

  @media (min-width: 1000px) {
    width: 70%;
  }

  @media (min-width: 1620px) {
    width: 80%;
  }
`;

const StyledForm = styled("form")`
  display: flex;
`;
