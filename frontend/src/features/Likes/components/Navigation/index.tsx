import { Divider } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import styled from "@emotion/styled";

import { Navigation } from "../../../../components/Navigation";

const NavigationItems = () => {
  const items = ["SENT", "RECEIVED", "MATCHED"];
  return (
    <>
      {items.map((item, idx) => (
        <List key={idx}>
          <ListItem disablePadding onClick={() => console.log("aaaaaaaaa")}>
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

export const LikesNavigation = () => {
  return <Navigation Outlet={<NavigationItems />} />;
};

const StyledListItemText = styled(ListItemText)`
  text-align: center;
`;
