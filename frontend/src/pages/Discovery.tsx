import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

export const Discovery = () => {
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
            width: 384,
            height: 384,
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
