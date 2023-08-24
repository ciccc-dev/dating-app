import {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { Box, Paper, Typography, styled } from "@mui/material";
import { TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import { useAskQuestionToAi } from "../hooks/useAskQuestionToAi";
import { Message } from "../features/OpenAi";

interface IMessage {
  text: string;
  sender: "user" | "ai";
}

interface State {
  question: string;
  ongoingQuestion: string;
  messages: IMessage[];
}

export const AiAvator = () => {
  const [state, update] = useState<State>({
    question: "",
    ongoingQuestion: "",
    messages: [],
  });
  const { userId } = useParams();
  const { answer, ask } = useAskQuestionToAi();

  useEffect(() => {
    if (answer.length > 0) {
      update((prev) => ({
        ...prev,
        messages: [...prev.messages, { text: answer, sender: "ai" }],
      }));
    }
  }, [answer]);

  const CreateMessageHistoryPrompt = () => {
    if (state.messages.length > 1) {
      let question = "You and the user previously talked these conversion. ";
      state.messages.forEach(({ sender, text }: IMessage) => {
        const subject = sender === "ai" ? "You" : "The user";
        const prev = `${subject} said that`;
        question += `${prev} ${text}.  /`;
      });
      return question;
    }
    return "";
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    update((prev) => ({ ...prev, ongoingQuestion: event.target.value }));
  };

  const handleSubmit = () => {
    if (userId && state.ongoingQuestion.length > 0) {
      const conversationHistory = CreateMessageHistoryPrompt();
      ask(
        userId,
        `${conversationHistory} Please answer  ${state.ongoingQuestion}`
      );
      update((prev) => ({
        ...prev,
        ongoingQuestion: "",
        question: state.ongoingQuestion,
        messages: [
          ...state.messages,
          { text: state.ongoingQuestion, sender: "user" },
        ],
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
    <StyledContainer>
      <StyledWraper>
        <Typography variant='h6'>AI Avator (This is a beta feature)</Typography>
        <Typography variant='h5'>{}</Typography>
      </StyledWraper>

      <StyledMessageWrapper>
        <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
          {state.messages.map((message, idx) => (
            <Message key={idx} sender={message.sender} text={message.text} />
          ))}
        </Box>
        {/* </Box> */}
      </StyledMessageWrapper>
      <StyledFormWraper>
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
      </StyledFormWraper>
    </StyledContainer>
  );
};

const StyledContainer = styled(`div`)`
  background-color: #f5f5f5;
  height: 100vh;
`;

const StyledWraper = styled(`div`)`
  margin: 0px 20px;
  margin-bottom: 100px;
`;

const StyledMessageWrapper = styled(Box)`
  height: 800px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;

const StyledFormWraper = styled(`div`)`
  display: flex;
  justify-content: center;
`;

const StyledPaper = styled(Paper)`
  margin-left: 16px;
  position: absolute;
  bottom: 10px;
  width: 80%;
  display: flex;
  justify-content: center;
`;

const StyledForm = styled("form")`
  width: 100%;
  display: flex;
`;
