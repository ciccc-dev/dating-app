import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:8000");

socket.on("connect", () => {
  console.log(socket.connected);
});

socket.on("hello", (message) => {
  console.log(message);
});

socket.emit("message", "hello world");
socket.emit("joined-user", { name: "hoge", room: "room" });
