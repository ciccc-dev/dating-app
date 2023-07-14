import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { fetchMessagesByRoomId, fetchMessagesByRoomIds } from "./repository";
import { fetchChatroomsByUserId } from "../Chatrooms";

export const webscoketConnect = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>
) => {
  io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("initial_load", (data: { userId: string }) => {
      const chatrooms = fetchChatroomsByUserId(data.userId);
      const roomdIds = chatrooms.map((chatroom) => chatroom.id);
      const messages = fetchMessagesByRoomIds(roomdIds);
      socket.emit("fetchChatrooms", chatrooms);
      socket.emit("messages", messages);
    });

    socket.on("joined-user", (data) => {
      //Storing users connected in a room in memory
      console.log(data);
      // var user = {};
      // user[socket.id] = data.username;
      // if (users[data.roomname]) {
      //   users[data.roomname].push(user);
      // } else {
      //   users[data.roomname] = [user];
      // }
      // socket.emit("messages", messages);

      //Joining the Socket Room
      socket.join(data.roomname);

      //Emitting New Username to Clients
      io.to(data.roomname).emit("joined-user", {
        username: data.username,
      });

      //Send online users array
      // io.to(data.roomname).emit("online-users", getUsers(users[data.roomname]));
    });

    socket.emit("hello", "from server");

    socket.on("message", (message) => {
      console.log(`from client: ${message}`);
      socket.broadcast.emit("message", message);
    });

    socket.on("disconnect", (reason) => {
      console.log(`user disconnected. reason is ${reason}.`);
    });
  });
};
