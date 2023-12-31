import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";

import { navigationWidth } from "../constants/navigation";
import { WebsocketClient } from "../features/Messages/api/websocketClient";
import { Chats } from "../features/Messages/components/Chats";
import { MessagesNavigation } from "../features/Messages/components/Navigation";
import { Form } from "../features/Messages/components/Form";
import { Message, Profile } from "../features/Messages/types";
import {
  UseFetchLinkedProfilesResponse,
  useFetchLikedProfiles,
} from "../hooks/useFetchLikedProfiles";

interface State {
  messages: Message[];
  currentChatroom: string;
  partners: Profile[];
  selectedPartnerId: string;
  ongoingMessage: string;
}

const initialState = {
  chatrooms: [],
  messages: [],
  currentChatroom: "",
  partners: [],
  selectedPartnerId: "",
  ongoingMessage: "",
};

export const Messages = () => {
  const [state, update] = useState<State>(initialState);
  const { matched }: UseFetchLinkedProfilesResponse = useFetchLikedProfiles();

  const { isLoading, user } = useAuth0();
  const queryParms = new URLSearchParams(useLocation().search);

  useEffect(() => {
    if (!isLoading && user) WebsocketClient.initialLoad(user);
    if (queryParms) {
      update((prev) => ({
        ...prev,
        selectedPartnerId: queryParms.get("userId") ?? "",
      }));
    }
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
      selectedPartnerId: e.currentTarget.dataset.id as string,
    }));

  const handleChangeMessage = (event: ChangeEvent<HTMLInputElement>) =>
    update((prev) => ({ ...prev, ongoingMessage: event.target.value }));

  const onSubmit = () => {
    WebsocketClient.emitSendMessage({
      message: state.ongoingMessage,
      sentBy: user?.sub ?? "",
      receivedBy: state.selectedPartnerId,
    });
    update((prev) => ({ ...prev, ongoingMessage: "" }));
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

  const selectedPartner = useMemo(() => {
    return state.partners.find(
      (partner) => partner.userId === state.selectedPartnerId
    );
  }, [state.partners, state.selectedPartnerId]);

  const currentMessages = useMemo(
    () =>
      state.messages.filter(
        (message) =>
          message.sentBy === state.selectedPartnerId ||
          message.receivedBy === state.selectedPartnerId
      ),
    [state.messages, state.selectedPartnerId]
  );

  return (
    <>
      <StyledWrapper>
        <StyledNavigationWrapper component='nav'>
          <MessagesNavigation
            partners={state.partners}
            onClick={handleChangePartner}
          />
        </StyledNavigationWrapper>
        <StyledContent component='main'>
          {state.selectedPartnerId.length ? (
            <>
              <StyledPartnerName variant='h5'>
                {selectedPartner?.userName ?? ""}

                <a href={`/ai-avator/${state.selectedPartnerId}`}>
                  （ You can ask AI about this user information ）
                </a>
              </StyledPartnerName>
              <Chats messages={currentMessages} />
              <Form
                message={state.ongoingMessage}
                onChange={handleChangeMessage}
                onClickEnter={handleClickEnter}
                onSubmit={handleSendMessage}
                disabled={
                  !matched
                    .map((x) => x.userId)
                    .includes(state.selectedPartnerId)
                }
              />
            </>
          ) : (
            <StyledText variant='h4'>Please choose a partner!</StyledText>
          )}
        </StyledContent>
      </StyledWrapper>
    </>
  );
};

const StyledWrapper = styled(Box)`
  display: flex;
  height: 100vh;
  background-color: #f5f5f5;
`;

const StyledNavigationWrapper = styled(Box)`
  width: ${navigationWidth}px;
  flex-shrink: 0;

  @media (max-width: 600px) {
    display: none;
  }
`;

const StyledPartnerName = styled(Typography)`
  margin-top: 10px;
  margin-left: 30px;
`;

const StyledContent = styled(Box)`
  flex-grow: 1;
  padding: 3px;
  width: calc(100% - ${navigationWidth}px);

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const StyledText = styled(Typography)`
  height: 10rem;
  text-align: center;
  margin-top: 10rem;
`;
