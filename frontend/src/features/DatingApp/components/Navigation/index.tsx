import { SyntheticEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Tab, Tabs } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";

const tabValues = ["discovery", "likes", "messages"];

export const DatingAppNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname.replace("/app/", "");
  const tabIndex = tabValues.indexOf(currentPath);

  const handleChange = (e: SyntheticEvent) =>
    e.currentTarget.textContent && navigate(e.currentTarget.textContent);

  const navigate = useNavigate();

  return (
    <div>
      <Toolbar />
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="discovery" />
          <Tab label="likes" />
          <Tab label="messages" />
        </Tabs>
      </Box>

      <Divider />
      <List>
        <ListItem key="email" disablePadding>
          <ListItemButton>
            <ListItemText primary="email" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </div>
  );
};
