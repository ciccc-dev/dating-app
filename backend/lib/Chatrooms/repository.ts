import { allChatrooms } from "./testdata";

export const fetchChatroomsByUserId = (userId: string) => {
  // TODO: implements select
  // const chatrooms =
  const chatrooms = allChatrooms.filter((chatroom) =>
    chatroom.users.includes(userId)
  );
  return chatrooms;
};
