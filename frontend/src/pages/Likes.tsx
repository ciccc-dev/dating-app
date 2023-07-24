import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styled from "@emotion/styled";

import { navigationWidth } from "../constants/navigation";
import { LikesNavigation } from "../features/Likes/components/Navigation";
import {
  UseFetchLinkedProfilesResponse,
  useFetchLikedProfiles,
} from "../hooks/useFetchLikedProfiles";

export const Likes = () => {
  const { sentTo, receivedFrom, matched }: UseFetchLinkedProfilesResponse =
    useFetchLikedProfiles();

  return (
    <StyledWrapper>
      <StyledNavigationWrapper>
        <LikesNavigation />
      </StyledNavigationWrapper>
      <StyledContent>
        <TableContainer component={Paper}>
          <StyledTable sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>About Me</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <>
                {sentTo.length !== 0
                  ? sentTo.map((profile: any) => {
                      return (
                        <TableRow
                          key={profile.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {profile.userId}
                          </TableCell>
                          <TableCell>{profile.userName}</TableCell>
                          <TableCell>{profile.birthday}</TableCell>
                          <TableCell>{profile.gender}</TableCell>
                          <TableCell>{profile.aboutMe}</TableCell>
                        </TableRow>
                      );
                    })
                  : null}
              </>
            </TableBody>
          </StyledTable>
        </TableContainer>
      </StyledContent>
    </StyledWrapper>
  );
};

const StyledWrapper = styled(Box)`
  display: flex;
`;

const StyledNavigationWrapper = styled(Box)`
  width: ${navigationWidth}px;
  flex-shrink: 0;

  @media (max-width: 600px) {
    display: none;
  }
`;

const StyledContent = styled(Box)`
  flex-grow: 1;
  padding: 3px;
  width: calc(100% - ${navigationWidth}px);

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const StyledTable = styled(Table)`
  padding: 5;
  margin: 10px;
  width: 1000px;
`;
