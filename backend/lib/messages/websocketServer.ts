import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export const webscoketConnect = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>
) => {
  io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("joined-user", (data) => {
      //Storing users connected in a room in memory
      console.log(data.name);
      // var user = {};
      // user[socket.id] = data.username;
      // if (users[data.roomname]) {
      //   users[data.roomname].push(user);
      // } else {
      //   users[data.roomname] = [user];
      // }

      //Joining the Socket Room
      socket.join(data.roomname);

      //Emitting New Username to Clients
      io.to(data.roomname).emit("joined-user", {
        username: data.username,
      });

      //Send online users array
      // io.to(data.roomname).emit("online-users", getUsers(users[data.roomname]));
    });

    // イベント発行
    socket.emit("hello", "from server");

    // イベント受信
    socket.on("message", (message) => {
      console.log(`from client: ${message}`);
      socket.broadcast.emit("message", message);
    });

    // 切断イベント受信
    socket.on("disconnect", (reason) => {
      console.log(`user disconnected. reason is ${reason}.`);
    });
  });
};
