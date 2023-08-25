import { MouseEventHandler } from "react";
import { isAfter, parseISO } from "date-fns";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import styled from "@emotion/styled";

import { TableComponent } from "../../../../components/Table";
import { NotificationBar } from "../../../../components/NotificationBar";
import { useFetchMessages } from "../../../../hooks/useFetchMessages";
import { useDialogState } from "../../../../hooks/useDialogState";
import { Message } from "../../../Messages/types";
import { useCreateLike } from "../../../../hooks/useCreateLike";
import { Profile } from "../../../../types";

export const ReceivedLikesTable = ({ profiles }: { profiles: Profile[] }) => {
  const messages = useFetchMessages();
  const [isOpen, { open, close }] = useDialogState();
  const [{ result, message }, CreateLike] = useCreateLike();

  const initialMessages = createInitialMessages(
    profiles.map((p) => p.userId),
    messages.messages
  );

  const handleClickApproveButton: MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    await CreateLike(event.currentTarget.id);
    open();
  };

  const header = (
    <TableRow>
      <TableCell sx={{ width: "20%" }}>Name</TableCell>
      <TableCell sx={{ width: "10%" }}>Age</TableCell>
      <TableCell sx={{ width: "10%" }}>Gender</TableCell>
      <TableCell sx={{ width: "40%" }}>Recieved First Message</TableCell>
      <TableCell sx={{ width: "20%" }}></TableCell>
    </TableRow>
  );

  const body = profiles.map((profile) => (
    <>
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
            variant="contained"
            onClick={handleClickApproveButton}
          >
            Approve
          </Button>
        </TableCell>
      </StyledTableRow>
    </>
  ));

  return (
    <>
      <TableComponent header={header} body={body} />
      <NotificationBar
        isOpen={isOpen}
        onClose={close}
        isSuccess={result}
        message={message}
      />
    </>
  );
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
