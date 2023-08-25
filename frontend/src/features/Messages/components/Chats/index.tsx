import { useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Grid, List, Typography } from "@mui/material";
import { Paper } from "@mui/material";
import SnackbarContent from "@mui/material/SnackbarContent";
import { pink } from "@mui/material/colors";
import { styled } from "@mui/system";
import { convertToDateFormat } from "../../../../utils/calculateAge";

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

const OwnText = ({
  message,
  timestamp,
}: {
  message: string;
  timestamp: string;
}) => (
  <StyledGrid item xs={12} justifyContent="flex-end">
    <StyledSnackbarContent message={message} />
    <StyledOwnTimestamp>{timestamp}</StyledOwnTimestamp>
  </StyledGrid>
);

const PartnerText = ({
  message,
  timestamp,
}: {
  message: string;
  timestamp: string;
}) => (
  <StyledGrid item xs={12}>
    <StyledChat message={message} />
    <StyledPartnerTimestamp>{timestamp}</StyledPartnerTimestamp>
  </StyledGrid>
);

export const Chats = ({ messages }: { messages: Message[] }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth0();

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, []);

  return (
    <StyledPaper ref={contentRef}>
      {messages.map((message) => (
        <List key={message.id}>
          {user?.sub === message.sentBy ? (
            <OwnText
              message={message.message}
              timestamp={convertToDateFormat(message.timestamp)}
            />
          ) : (
            <PartnerText
              message={message.message}
              timestamp={convertToDateFormat(message.timestamp)}
            />
          )}
        </List>
      ))}
    </StyledPaper>
  );
};

const StyledPaper = styled(Paper)`
  padding: 10px;
  width: 95%;
  overflow: auto;
  margin: 20px;
  height: 85vh;
`;

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

const StyledSnackbarContent = styled(SnackbarContent)`
  margin-top: 10px;
  width: 40%;
  && {
    background-color: ${pink[400]};
  }
`;
