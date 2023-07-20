import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material";

import { WebsocketClient } from "../features/Messages/api/websocketClient";
import { Chats } from "../features/Messages/components/Chats";
import { MessagesNavigation } from "../features/Messages/components/Navigation";
import { Form } from "../features/Messages/components/Form";
import { Message, Profile } from "../features/Messages/types";

interface State {
  messages: Message[];
  currentChatroom: string;
  partners: Profile[];
  selectedPartner: string;
}

const initialState = {
  chatrooms: [],
  messages: [],
  currentChatroom: "",
  partners: [],
  selectedPartner: "",
};

const drawerWidth = 256;

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

  const handleUpdatePartners = (partners: Profile[]) =>
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
      <Box sx={{ display: "flex" }}>
        <StyledNavigationWrapper component="nav">
          <MessagesNavigation
            partners={state.partners}
            onClick={handleChangePartner}
          />
        </StyledNavigationWrapper>
        <StyledContent component="main">
          <Chats messages={currentMessages} />
          <Form
            message={message}
            onChange={handleChangeMessage}
            onClickEnter={handleClickEnter}
            onSubmit={handleSendMessage}
          />
        </StyledContent>
      </Box>
    </>
  );
};

const StyledNavigationWrapper = styled(Box)`
  width: ${drawerWidth}px;
  flex-shrink: 0;

  @media (max-width: 600px) {
    display: none;
  }
`;

const StyledContent = styled(Box)`
  flex-grow: 1;
  padding: 3px;
  width: calc(100% - ${drawerWidth}px);

  @media (max-width: 600px) {
    width: 100%;
  }
`;
