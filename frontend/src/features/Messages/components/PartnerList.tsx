import { Divider } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

interface Profile {
  userId: string;
  userName: string;
}

interface Props {
  partners: Profile[];
  onClick: (e: any) => void;
}

export const PartnerList = ({ partners, onClick }: Props) => (
  <List>
    {partners.map((partner) => (
      <>
        <ListItem
          key={partner.userId}
          disablePadding
          onClick={onClick}
          data-id={partner.userId}
        >
          <ListItemButton>
            <ListItemText primary={partner.userName} />
          </ListItemButton>
        </ListItem>
        <Divider />
      </>
    ))}
  </List>
);
