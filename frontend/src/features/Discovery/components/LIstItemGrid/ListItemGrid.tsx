import Grid from "@mui/material/Grid";
import { ReactNode } from "react";

interface ListItemProps {
  title: ReactNode;
  switches: ReactNode;
}

export const ListItemGrid = ({ title, switches }: ListItemProps) => {
  return (
    <Grid container alignItems="center">
      <Grid item xs={9}>
        {title}
      </Grid>
      <Grid item xs={3}>
        {switches}
      </Grid>
    </Grid>
  );
};
