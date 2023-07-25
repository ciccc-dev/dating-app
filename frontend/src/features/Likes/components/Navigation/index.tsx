import { Divider } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import styled from "@emotion/styled";

import { Navigation } from "../../../../components/Navigation";

const NavigationItems = ({ onClick }: { onClick: (e: any) => void }) => {
  const items = ["SENT", "RECEIVED", "MATCHED"];
  return (
    <>
      {items.map((item, idx) => (
        <List key={idx}>
          <ListItem disablePadding onClick={onClick} data-item={item}>
            <ListItemButton>
              <StyledListItemText primary={item} />
            </ListItemButton>
          </ListItem>
          <Divider />
        </List>
      ))}
    </>
  );
};

export const LikesNavigation = ({ onClick }: { onClick: (e: any) => void }) => {
  return <Navigation Outlet={<NavigationItems onClick={onClick} />} />;
};

const StyledListItemText = styled(ListItemText)`
  text-align: center;
`;
