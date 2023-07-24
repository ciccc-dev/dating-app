import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styled from "@emotion/styled";

import { Profile } from "../../../Messages/types";

export const LikePartnersTable = ({ profiles }: { profiles: Profile[] }) => {
  return (
    <TableContainer component={Paper}>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>About Me</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <>
            {profiles.length !== 0 &&
              profiles.map((profile: any) => (
                <StyledTableRow key={profile.id}>
                  <TableCell>{profile.userName}</TableCell>
                  <TableCell>{profile.birthday}</TableCell>
                  <TableCell>{profile.gender}</TableCell>
                  <TableCell>{profile.aboutMe}</TableCell>
                </StyledTableRow>
              ))}
          </>
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
};

const StyledTable = styled(Table)`
  padding: 5;
  margin: 10px;
  width: 1000px;
  min-width: 650;
`;

const StyledTableRow = styled(TableRow)`
  &:last-child td,
  &:last-child th {
    border: 0;
  }
`;
