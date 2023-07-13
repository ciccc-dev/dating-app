import { Button } from "@mui/material";
import { useEffect } from "react";
import io from "socket.io-client";

export const Messages = () => {
  const socket = io("http://localhost:8000");

  useEffect(() => {
    socket.on("hello", (message) => {
      console.log(message);
    });
    socket.on("messages", (message) => {
      console.log(message);
    });
  });

  const handleSendMessage = () => {
    socket.emit("message", "hello world");
    socket.emit("joined-user", { name: "hoge", room: "room" });
  };

  return (
    <>
      <Button onClick={handleSendMessage}>aa</Button>
      <div>aaaaaaaaaaaaaaaaaaa</div>
    </>
  );
};
