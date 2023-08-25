import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import styled from "@emotion/styled";

import { TableComponent } from "../../../../components/Table";
import { Profile } from "../../../../types";

interface SentLikesTableProps {
  profiles: Profile[];
  // photos: ProfilePhotos[];
}

export const SentLikesTable = ({ profiles }: SentLikesTableProps) => {
  const header = (
    <TableRow>
      <TableCell sx={{ width: "20%" }}>Name</TableCell>
      <TableCell sx={{ width: "10%" }}>Age</TableCell>
      <TableCell sx={{ width: "10%" }}>Gender</TableCell>
      <TableCell sx={{ width: "40%" }}>About Me</TableCell>
      <TableCell sx={{ width: "20%" }}></TableCell>
    </TableRow>
  );

  const body = profiles.map((profile) => (
    <StyledTableRow key={profile.id}>
      <TableCell>{profile.userName}</TableCell>
      <TableCell>{profile.age}</TableCell>
      <TableCell>{profile.gender}</TableCell>
      <TableCell>{profile.aboutMe}</TableCell>
      <TableCell></TableCell>
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
