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
}

export const Form = ({ message, onChange, onClickEnter, onSubmit }: Props) => {
  return (
    <StyledPaper>
      <StyledForm onSubmit={onSubmit}>
        <TextField
          label="Message"
          value={message}
          onChange={onChange}
          onKeyDown={onClickEnter}
          fullWidth
          multiline
          rows={1}
          variant="outlined"
        />
        <IconButton type="submit" color="primary">
          <SendIcon />
        </IconButton>
      </StyledForm>
    </StyledPaper>
  );
};

const StyledPaper = styled(Paper)`
  padding: 16;
`;

const StyledForm = styled("form")`
  display: flex;
`;