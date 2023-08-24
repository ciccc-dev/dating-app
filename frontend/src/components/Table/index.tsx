import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import styled from "@emotion/styled";

interface Props {
  header: any;
  body: any;
}

export const TableComponent = ({ header, body }: Props) => {
  return (
    <TableContainer component={Paper} sx={{ margin: "20px", width: "95%" }}>
      <StyledTable>
        <TableHead>
          <>{header}</>
        </TableHead>
        <TableBody>{body}</TableBody>
      </StyledTable>
    </TableContainer>
  );
};

const StyledTable = styled(Table)`
  margin: 10px;
  width: 98%;
`;
