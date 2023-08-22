import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { Paper, Typography, styled } from "@mui/material";
import { TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import { useAskQuestionToAi } from "../hooks/useAskQuestionToAi";

interface State {
  question: string;
  ongoingQuestion: string;
}

export const AiAvator = () => {
  const [state, update] = useState<State>({
    question: "",
    ongoingQuestion: "",
  });
  const { userId } = useParams();
  const { answer, ask } = useAskQuestionToAi();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    update((prev) => ({ ...prev, ongoingQuestion: event.target.value }));
  };

  const handleSubmit = () => {
    if (userId && state.ongoingQuestion.length > 0) {
      ask(userId, state.ongoingQuestion);
      update((prev) => ({
        ...prev,
        ongoingQuestion: "",
        question: state.ongoingQuestion,
      }));
    }
  };

  const handleClickEnter = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      <StyledWraper>
        <Typography variant='h6'>AI Avator (This is a beta feature)</Typography>
      </StyledWraper>

      {state.question.length > 0 && (
        <StyledWraper>
          <Typography variant='h4'>YOUR QUESTION: {state.question}</Typography>
        </StyledWraper>
      )}
      {answer.length > 0 && (
        <StyledWraper>
          <Typography variant='h4'>AI ANSWER: {answer}</Typography>
        </StyledWraper>
      )}
      <StyledPaper>
        <StyledForm onSubmit={handleSubmit}>
          <TextField
            label='Ask a question to AI'
            value={state.ongoingQuestion}
            onChange={handleChange}
            onKeyDown={handleClickEnter}
            fullWidth
            multiline
            rows={1}
            variant='outlined'
          />
          <IconButton type='submit' color='primary'>
            <SendIcon />
          </IconButton>
        </StyledForm>
      </StyledPaper>
    </>
  );
};

const StyledWraper = styled(`div`)`
  margin: 20px;
  margin-bottom: 100px;
`;

const StyledPaper = styled(Paper)`
  margin-left: 16px;
  position: absolute;
  bottom: 10px;
  width: 100%;
`;

const StyledForm = styled("form")`
  display: flex;
`;
