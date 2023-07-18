import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  SyntheticEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Tab, Tabs, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";

import { WebsocketClient } from "../features/Messages/api/websocketClient";

interface Chatroom {
  id: string;
  users: string[];
}

interface Message {
  roomId: string;
  userId: string;
  time: string;
  text: string;
}

interface State {
  chatrooms: Chatroom[];
  messages: Message[];
  currentChatroom: string;
}

const initialState = {
  chatrooms: [],
  messages: [],
  currentChatroom: "",
};

export const Messages = () => {
  const [state, update] = useState<State>(initialState);
  const [message, setMessage] = useState("");

  const { isLoading, user } = useAuth0();

  useEffect(() => {
    if (!isLoading && user) WebsocketClient.initialLoad(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const handleUpdateChatrooms = (chatrooms: Chatroom[]) =>
    update((prev) => ({ ...prev, chatrooms }));

  const handleUpdateMessages = (messages: Message[]) =>
    update((prev) => ({ ...prev, messages }));

  WebsocketClient.onChatrooms(handleUpdateChatrooms);
  WebsocketClient.onMessages(handleUpdateMessages);

  const handleChangeChatroom = (e: SyntheticEvent) =>
    update((prev) => ({
      ...prev,
      currentChatroom: e.currentTarget.textContent as string,
    }));

  const handleChangeMessage = (event: ChangeEvent<HTMLInputElement>) =>
    setMessage(event.target.value);

  const onSubmit = () => {
    WebsocketClient.emitSendMessage({ message, userId: user?.sub ?? "" });
    setMessage("");
  };

  const handleSendMessage = (event: FormEvent) => {
    event.preventDefault();
    onSubmit();
  };

  const handleClickEnter = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSubmit();
    }
  };

  const currentRoomMessages = useMemo(
    () =>
      state.messages.filter(
        (message) => message.roomId === state.currentChatroom
      ),
    [state.currentChatroom, state.messages]
  );

  const currentTabIndex = useMemo(() => {
    const chatroomIds = state?.chatrooms.map((chatroom) => chatroom.id);
    return chatroomIds.indexOf(state.currentChatroom);
  }, [state.currentChatroom, state?.chatrooms]);

  return (
    <>
      <Box>
        <Tabs value={currentTabIndex} onChange={handleChangeChatroom} centered>
          {state?.chatrooms.map((chatroom) => (
            <StyledTab key={chatroom.id} label={chatroom.id} />
          ))}
        </Tabs>
      </Box>
      {currentRoomMessages.map((message) => (
        <div>{message.text}</div>
      ))}
      <Box>
        <form onSubmit={handleSendMessage}>
          <StyledTextField
            fullWidth
            margin="normal"
            rows={1}
            onKeyDown={handleClickEnter}
            multiline
            variant="outlined"
            placeholder="Message"
            value={message}
            onChange={handleChangeMessage}
          />
          <StyledButton variant="contained" color="primary" type="submit">
            Send
          </StyledButton>
        </form>
      </Box>
    </>
  );
};

const StyledTab = styled(Tab)`
  font-size: 10px;
`;

const StyledButton = styled(Button)`
  position: absolute;
  right: 5%;
  bottom: 0;
`;
const StyledTextField = styled(TextField)`
  position: absolute;
  width: 70%;
  bottom: 0;
`;
