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

  onPartners = (update: (partners: any) => void) => {
    this.socket.on("partners", (partners) => {
      update(partners);
    });
  };

  emitSendMessage = ({
    message,
    sentBy,
    receivedBy,
  }: {
    message: string;
    sentBy: string;
    receivedBy: string;
  }) => {
    this.socket.emit("send", { message, sentBy, receivedBy });
  };
}

export const WebsocketClient = new _websocketClient();
