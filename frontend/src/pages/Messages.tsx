import { Button } from "@mui/material";
import { useEffect } from "react";
import io from "socket.io-client";

export const Messages = () => {
  const socket = io("http://localhost:8000");

  useEffect(() => {
    socket.on("hello", (message) => {
      console.log(message);
    });
  });

  const handleSendMessage = () => {
    socket.emit("message", "hello world");
  };

  return (
    <>
      <Button onClick={handleSendMessage}>aa</Button>
      <div>aaaaaaaaaaaaaaaaaaa</div>
    </>
  );
};
