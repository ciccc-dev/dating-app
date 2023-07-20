import crypto from "crypto";
import { PrismaClient } from "@prisma/client";

import { allMessages } from "./testdata";

const prisma = new PrismaClient();

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

export const fetchMessagesByUserId = async (userId: string) => {
  const messages = await prisma.chat.findMany({
    include: { sender: true, receiver: true },
    where: { OR: [{ sentBy: userId }, { receivedBy: userId }] },
    orderBy: { timestamp: "asc" },
  });

  const rawPartners = messages.map((message) =>
    message.sentBy === userId ? message.receiver : message.sender
  );
  const partners = rawPartners.filter((partner, index, self) => {
    return index === self.findIndex((p) => p.id === partner.id);
  });
  return { partners, messages };
};

export const createMessage = async ({
  message,
  sentBy,
  receivedBy,
}: {
  message: string;
  sentBy: string;
  receivedBy: string;
}) => {
  await prisma.chat.create({
    data: {
      id: crypto.randomUUID(),
      sentBy,
      message,
      receivedBy,
      hasRead: false,
      timestamp: new Date(),
    },
  });
};
