import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { Filter } from "../features/DatingApp/api/filter";
import { Profiles } from "../features/DatingApp/api/profile";

export const Discovery = () => {
  useEffect(() => {
    Filter.getFilters();
    Profiles.getProfiles();
  }, []);

  return (
    <>
      <Toolbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 3,
            width: 256,
            height: 256,
          },
        }}
      >
        <Paper elevation={3} sx={{ margin: 10 }} />
        <Paper elevation={3} />
        <Paper elevation={3} />
      </Box>
    </>
  );
};
