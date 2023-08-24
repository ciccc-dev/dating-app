import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

import { MessageRepository } from "./repository";

export const webscoketConnect = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>
) => {
  io.on("connection", (socket) => {
    socket.on("initial_load", async (data: { userId: string }) => {
      try {
        const messages = await MessageRepository.fetchMessagesByUserId(
          data.userId
        );
        socket.emit("messages", messages);

        const partners = await MessageRepository.fetchPartnersByUserId(
          data.userId
        );
        socket.emit("partners", partners);
      } catch (err) {
        console.error(err);
      }
    });

    socket.on(
      "send",
      async (data: { message: string; sentBy: string; receivedBy: string }) => {
        try {
          await MessageRepository.createMessage(data);
          const messages = await MessageRepository.fetchMessagesByUserId(
            data.sentBy
          );
          socket.emit("messages", messages);
          socket.broadcast.emit("messages", messages);
        } catch (err) {
          console.error(err);
        }
      }
    );
  });
};
