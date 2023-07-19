import { useAuth0 } from "@auth0/auth0-react";
import { Grid, Typography } from "@mui/material";
import SnackbarContent from "@mui/material/SnackbarContent";
import { styled } from "@mui/system";

interface Message {
  id: string;
  sentBy: string;
  receivedBy: string;
  message: string;
  hasRead: boolean;
  timestamp: string;
  sender: { userName: string };
  receiver: { userName: string };
}

const OwnChat = ({
  message,
  timestamp,
}: {
  message: string;
  timestamp: string;
}) => (
  <StyledGrid item xs={10} justifyContent="flex-end">
    <StyledChat message={message} />
    <StyledOwnTimestamp>{timestamp}</StyledOwnTimestamp>
  </StyledGrid>
);

const PartnerChat = ({
  message,
  timestamp,
}: {
  message: string;
  timestamp: string;
}) => (
  <StyledGrid item xs={10}>
    <StyledChat message={message} />
    <StyledPartnerTimestamp>{timestamp}</StyledPartnerTimestamp>
  </StyledGrid>
);

export const Chats = ({ messages }: { messages: Message[] }) => {
  const { user } = useAuth0();

  return (
    <>
      {messages.map((message) => (
        <>
          <Grid item xs={2}></Grid>
          <StyledGrid item xs={10} justifyContent="flex-end">
            {user?.sub === message.sentBy ? (
              <OwnChat
                message={message.message}
                timestamp={message.timestamp}
              />
            ) : (
              <PartnerChat
                message={message.message}
                timestamp={message.timestamp}
              />
            )}
          </StyledGrid>
        </>
      ))}
    </>
  );
};

const StyledGrid = styled(Grid)`
  display: flex;
  flex-wrap: wrap;
`;

const StyledChat = styled(SnackbarContent)`
  margin-top: 10px;
  width: 40%;
`;

const StyledOwnTimestamp = styled(Typography)`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const StyledPartnerTimestamp = styled(Typography)`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;
