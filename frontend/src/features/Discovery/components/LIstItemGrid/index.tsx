import Grid from "@mui/material/Grid";
import { ReactNode } from "react";

interface ListItemProps {
  titleComponent: ReactNode;
  switchComponent: ReactNode;
}

export const ListItemGrid = ({
  titleComponent,
  switchComponent,
}: ListItemProps) => {
  return (
    <Grid container alignItems="center">
      <Grid item xs={9}>
        {titleComponent}
      </Grid>
      <Grid item xs={3}>
        {switchComponent}
      </Grid>
    </Grid>
  );
};
