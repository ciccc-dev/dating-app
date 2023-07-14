import { allMessages } from "./testdata";

export const fetchMessagesByRoomId = (roomId: string) => {
  return allMessages.filter((message) => message.roomId === roomId);
};

export const fetchMessagesByRoomIds = (roomdIds: string[]) => {
  const messages = allMessages
    .map((message) => {
      if (roomdIds.includes(message.roomId)) return message;
    })
    .filter((v) => v);
  return messages;
};

export const fetchAllMessages = () => {
  return allMessages;
};
