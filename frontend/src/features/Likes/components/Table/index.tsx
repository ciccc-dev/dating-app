import { parseISO } from "date-fns";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import styled from "@emotion/styled";

import { TableComponent } from "../../../../components/Table";
import { calculateAge } from "../../../../utils/calculateAge";

interface Profile {
  id: string;
  userName: string;
  birthday: string;
  gender: string;
  aboutMe: string;
}

export const LikePartnersTable = ({ profiles }: { profiles: Profile[] }) => {
  const header = (
    <TableRow>
      <TableCell sx={{ width: "20%" }}>Name</TableCell>
      <TableCell sx={{ width: "10%" }}>Age</TableCell>
      <TableCell sx={{ width: "10%" }}>Gender</TableCell>
      <TableCell sx={{ width: "40%" }}>About Me</TableCell>
      <TableCell sx={{ width: "10%" }}></TableCell>
      <TableCell sx={{ width: "10%" }}></TableCell>
    </TableRow>
  );

  const body = profiles.map((profile) => (
    <StyledTableRow key={profile.id}>
      <TableCell>{profile.userName}</TableCell>
      {/* TODO: Move parseISO to hooks */}
      <TableCell>{calculateAge(parseISO(profile.birthday))}</TableCell>
      <TableCell>{profile.gender}</TableCell>
      <TableCell>{profile.aboutMe}</TableCell>
      <TableCell>
        <Button variant="contained">Message</Button>
      </TableCell>
      <TableCell>
        <IconButton>
          <MenuIcon />
        </IconButton>
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
