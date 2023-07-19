import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";

import { WebsocketClient } from "../features/Messages/api/websocketClient";
import { Chats } from "../features/Messages/components/Chats";
import { PartnerList } from "../features/Messages/components/PartnerList";

interface Partner {
  userId: string;
  userName: string;
}

interface Message {
  id: string;
  sentBy: string;
  receivedBy: string;
  message: string;
  hasRead: boolean;
  timestamp: string;
  sender: Profile;
  receiver: Profile;
}

interface Profile {
  userName: string;
}

interface State {
  messages: Message[];
  currentChatroom: string;
  partners: Partner[];
  selectedPartner: string;
}

const initialState = {
  chatrooms: [],
  messages: [],
  currentChatroom: "",
  partners: [],
  selectedPartner: "",
};

export const Messages = () => {
  const [state, update] = useState<State>(initialState);
  const [message, setMessage] = useState("");
  const { isLoading, user } = useAuth0();

  useEffect(() => {
    if (!isLoading && user) WebsocketClient.initialLoad(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const handleUpdateMessages = (messages: Message[]) =>
    update((prev) => ({ ...prev, messages }));

  const handleUpdatePartners = (partners: Partner[]) =>
    update((prev) => ({ ...prev, partners }));

  WebsocketClient.onMessages(handleUpdateMessages);
  WebsocketClient.onPartners(handleUpdatePartners);

  const handleChangePartner = (e: any) =>
    update((prev) => ({
      ...prev,
      selectedPartner: e.currentTarget.dataset.id as string,
    }));

  const handleChangeMessage = (event: ChangeEvent<HTMLInputElement>) =>
    setMessage(event.target.value);

  const onSubmit = () => {
    WebsocketClient.emitSendMessage({
      message,
      sentBy: user?.sub ?? "",
      receivedBy: state.selectedPartner,
    });
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

  const currentMessages = useMemo(
    () =>
      state.messages.filter(
        (message) =>
          message.sentBy === state.selectedPartner ||
          message.receivedBy === state.selectedPartner
      ),
    [state.messages, state.selectedPartner]
  );

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <PartnerList
            partners={state.partners}
            onClick={handleChangePartner}
          />
        </Grid>
        <Chats messages={currentMessages} />
      </Grid>
      <Box>
        <form onSubmit={handleSendMessage}>
          <Grid container spacing={2}>
            <Grid item xs={11}>
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
            </Grid>
            <Grid item xs={1}>
              <StyledButton variant="contained" color="primary" type="submit">
                SEND
              </StyledButton>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

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
