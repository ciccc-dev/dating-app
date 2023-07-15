import { User } from "@auth0/auth0-react";
import { Socket } from "socket.io-client";
import io from "socket.io-client";

class _websocketClient {
  private socket: Socket;

  constructor() {
    this.socket = io(process.env.REACT_APP_SERVER_URL ?? "");
  }

  initialLoad = (user: User) => {
    this.socket.emit("initial_load", { userId: user.sub });
    console.log(user);
  };

  onChatrooms = (update: (chatrooms: any) => void) => {
    this.socket.on("fetchChatrooms", (chatrooms) => {
      update(chatrooms);
    });
  };

  onMessages = (update: (messages: any) => void) => {
    this.socket.on("messages", (messages) => {
      update(messages);
    });
  };

  emitSendMessage = ({
    message,
    userId,
  }: {
    message: string;
    userId: string;
  }) => {
    this.socket.emit("send", { message, userId });
  };
}

export const WebsocketClient = new _websocketClient();
