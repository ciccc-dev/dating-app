import { forwardRef, MouseEventHandler, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { isAfter, parseISO } from "date-fns";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import styled from "@emotion/styled";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { TableComponent } from "../../../../components/Table";
import { useFetchMessages } from "../../../../hooks/useFetchMessages";
import { Message } from "../../../Messages/types";
import { _LikesAPI } from "../../api";

interface Profile {
  id: string;
  userId: string;
  userName: string;
  birthday: string;
  gender: string;
  aboutMe: string;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export const ReceivedLikesTable = ({ profiles }: { profiles: Profile[] }) => {
  const { getAccessTokenSilently } = useAuth0();
  const messages = useFetchMessages();
  const initialMessages = createInitialMessages(
    profiles.map((p) => p.userId),
    messages.messages
  );
  const [token, setToken] = useState("");
  const LikeAPI = new _LikesAPI(process.env.REACT_APP_SERVER_URL ?? "", token);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    (async () => {
      setToken(await getAccessTokenSilently());
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickApproveButton: MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    setOpen(true);
    await LikeAPI.CreateLike(event.currentTarget.id);
  };

  const header = (
    <TableRow>
      <TableCell sx={{ width: "20%" }}>Name</TableCell>
      <TableCell sx={{ width: "40%" }}>About Me</TableCell>
      <TableCell sx={{ width: "30%" }}>Received Mesage</TableCell>
      <TableCell sx={{ width: "10%" }}></TableCell>
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
            variant='contained'
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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: "100%" }}>
          This is a success message!
        </Alert>
      </Snackbar>
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
