import { Box, Paper, Typography } from "@mui/material";

interface Props {
  text: string;
  sender: "user" | "ai";
}

export const Message = ({ text, sender }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: sender === "ai" ? "flex-start" : "flex-end",
        mb: 2,
      }}
    >
      <Paper
        variant='outlined'
        sx={{
          p: 1,
          backgroundColor:
            sender === "ai" ? "primary.light" : "secondary.light",
        }}
      >
        <Typography variant='body1' color='white'>
          {text}
        </Typography>
      </Paper>
    </Box>
  );
};
