import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { createMessage, fetchMessagesByUserId } from "./repository";

export const webscoketConnect = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>
) => {
  io.on("connection", (socket) => {
    socket.on("initial_load", async (data: { userId: string }) => {
      const { partners, messages } = await fetchMessagesByUserId(data.userId);
      socket.emit("messages", messages);
      socket.emit("partners", partners);
    });

    socket.on(
      "send",
      async (data: { message: string; sentBy: string; receivedBy: string }) => {
        await createMessage(data);
        const { messages } = await fetchMessagesByUserId(data.sentBy);
        socket.emit("messages", messages);
        socket.broadcast.emit("messages", messages);
      }
    );

    socket.on("disconnect", (reason) => {
      console.log(`user disconnected. reason is ${reason}.`);
    });
  });
};
