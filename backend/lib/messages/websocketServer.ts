import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { fetchMessagesByRoomIds, fetchMessagesByUserId } from "./repository";
import { fetchChatroomsByUserId } from "../Chatrooms";

export const webscoketConnect = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>
) => {
  io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("initial_load", async (data: { userId: string }) => {
      const chatrooms = fetchChatroomsByUserId(data.userId);
      const roomdIds = chatrooms.map((chatroom) => chatroom.id);
      const messages = fetchMessagesByRoomIds(roomdIds);
      const { partners } = await fetchMessagesByUserId(data.userId);
      socket.emit("fetchChatrooms", chatrooms);
      socket.emit("messages", messages);
      socket.emit("partners", partners);
    });

    socket.on("joined-user", (data) => {
      //Storing users connected in a room in memory
      console.log(data);

      //Joining the Socket Room
      socket.join(data.roomname);

      //Emitting New Username to Clients
      io.to(data.roomname).emit("joined-user", {
        username: data.username,
      });

      //Send online users array
      // io.to(data.roomname).emit("online-users", getUsers(users[data.roomname]));
    });

    socket.on("send", (data: { message: string; userId: string }) => {
      console.log(`from client: ${data.message}`);
      socket.broadcast.emit("message", data.message);
    });

    socket.on("disconnect", (reason) => {
      console.log(`user disconnected. reason is ${reason}.`);
    });
  });
};
