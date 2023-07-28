import { MouseEventHandler } from "react";
import { isAfter, parseISO } from "date-fns";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import styled from "@emotion/styled";

import { TableComponent } from "../../../../components/Table";
import { useNavigate } from "react-router-dom";
import { useFetchMessages } from "../../../../hooks/useFetchMessages";
import { Message } from "../../../Messages/types";

interface Profile {
  id: string;
  userId: string;
  userName: string;
  birthday: string;
  gender: string;
  aboutMe: string;
}

export const ReceivedLikesTable = ({ profiles }: { profiles: Profile[] }) => {
  const navigate = useNavigate();
  const messages = useFetchMessages();
  const initialMessages = createInitialMessages(
    profiles.map((p) => p.userId),
    messages.messages
  );

  const handleClickMessageButton: MouseEventHandler<HTMLButtonElement> = (
    event
  ) => navigate(`/messages?userId=${event.currentTarget.id}`);

  const header = (
    <TableRow>
      <TableCell sx={{ width: "20%" }}>Name</TableCell>
      <TableCell sx={{ width: "40%" }}>About Me</TableCell>
      <TableCell sx={{ width: "30%" }}>Received Mesage</TableCell>
      <TableCell sx={{ width: "10%" }}></TableCell>
    </TableRow>
  );

  const body = profiles.map((profile) => (
    <StyledTableRow key={profile.id}>
      <TableCell>{profile.userName}</TableCell>
      <TableCell>{profile.aboutMe}</TableCell>
      <TableCell>
        {profile.userId in initialMessages
          ? initialMessages[profile.userId].message
          : null}
      </TableCell>
      <TableCell>
        <Button
          id={profile.userId}
          variant='contained'
          onClick={handleClickMessageButton}
        >
          Approve
        </Button>
      </TableCell>
    </StyledTableRow>
  ));

  return <TableComponent header={header} body={body} />;
};

const createInitialMessages = (partnerIds: string[], messages: Message[]) => {
  if (messages.length === 0) return {};

  const result: { [key: string]: any } = {};
  let filteredMessages = messages.filter((message) =>
    partnerIds.includes(message.sentBy)
  );
  filteredMessages.sort((x, y) =>
    isAfter(parseISO(x.timestamp), parseISO(y.timestamp)) ? 1 : -1
  );
  filteredMessages.forEach((message) => {
    if (!result[message.sentBy]) result[message.sentBy] = message;
  });
  return result;
};

const StyledTableRow = styled(TableRow)`
  &:last-child td,
  &:last-child th {
    border: 0;
  }
`;
