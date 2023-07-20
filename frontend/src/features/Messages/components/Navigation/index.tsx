import { Divider } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { Navigation } from "../../../../components/Navigation";
import { Profile } from "../../types";

interface Props {
  partners: Profile[];
  onClick: (e: any) => void;
}

export const MessagesNavigation = ({ partners, onClick }: Props) => {
  const PartnerList = () => (
    <>
      {partners.map((partner) => (
        <List key={partner.userId}>
          <ListItem disablePadding onClick={onClick} data-id={partner.userId}>
            <ListItemButton>
              <ListItemText primary={partner.userName} />
            </ListItemButton>
          </ListItem>
          <Divider />
        </List>
      ))}
    </>
  );
  return <Navigation Outlet={<PartnerList />} />;
};
