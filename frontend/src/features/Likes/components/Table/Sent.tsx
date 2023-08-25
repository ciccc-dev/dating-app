import { MouseEventHandler } from "react";
import { parseISO } from "date-fns";
import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import styled from "@emotion/styled";

import { TableComponent } from "../../../../components/Table";
import { calculateAge } from "../../../../utils/calculateAge";
import { useNavigate } from "react-router-dom";

interface Profile {
  id: string;
  userId: string;
  userName: string;
  birthday: string;
  gender: string;
  aboutMe: string;
}

export const SentLikesTable = ({ profiles }: { profiles: Profile[] }) => {
  const navigate = useNavigate();
  const handleClickMessageButton: MouseEventHandler<HTMLButtonElement> = (
    event
  ) => navigate(`/messages?userId=${event.currentTarget.id}`);

  const header = (
    <TableRow>
      <TableCell sx={{ width: "20%" }}>Photo</TableCell>
      <TableCell sx={{ width: "20%" }}>Name</TableCell>
      <TableCell sx={{ width: "10%" }}>Age</TableCell>
      <TableCell sx={{ width: "10%" }}>Gender</TableCell>
      <TableCell sx={{ width: "40%" }}>About Me</TableCell>
    </TableRow>
  );

  const body = profiles.map((profile) => (
    <StyledTableRow key={profile.id}>
      <TableCell>{profile.gender}</TableCell>
      <TableCell>{profile.userName}</TableCell>
      <TableCell>{calculateAge(parseISO(profile.birthday))}</TableCell>
      <TableCell>{profile.gender}</TableCell>
      <TableCell>{profile.aboutMe}</TableCell>
      <TableCell>
        <Button
          id={profile.userId}
          variant="contained"
          onClick={handleClickMessageButton}
        >
          Message
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
