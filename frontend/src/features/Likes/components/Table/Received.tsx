import { MouseEventHandler } from "react";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import styled from "@emotion/styled";

import { TableComponent } from "../../../../components/Table";
import { useNavigate } from "react-router-dom";

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
      <TableCell>{profile.aboutMe}</TableCell>
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

const StyledTableRow = styled(TableRow)`
  &:last-child td,
  &:last-child th {
    border: 0;
  }
`;
