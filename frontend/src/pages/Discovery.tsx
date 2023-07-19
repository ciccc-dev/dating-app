import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";

export const Discovery = () => {
  const getProfiles = async () => {
    const filters = {
      age: 20,
      gender: "Male",
    };
    try {
      const response = await fetch("http://localhost:8000/api/profiles", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters),
      });

      if (response.ok) {
        const chatRoomsData = await response.json();
        console.log(chatRoomsData);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    getProfiles();
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
