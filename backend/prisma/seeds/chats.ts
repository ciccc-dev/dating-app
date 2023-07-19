import crypto from "crypto";

import { PrismaClient } from "@prisma/client";

interface Chat {
  id: string;
  sentBy: string;
  receivedBy: string;
  message: string;
  hasRead: boolean;
  timestamp: Date;
}

export const seedChats = async (prisma: PrismaClient) => {
  const chats: Chat[] = [
    {
      id: crypto.randomUUID(),
      sentBy: "auth0|6493c3668860a0c976f765af",
      message: "Hello",
      receivedBy: "auth0|64af99336e86aeb92a526d0e",
      hasRead: false,
      timestamp: new Date(),
    },
    {
      id: crypto.randomUUID(),
      sentBy: "auth0|64af99336e86aeb92a526d0e",
      message: "Hey",
      receivedBy: "auth0|6493c3668860a0c976f765af",
      hasRead: false,
      timestamp: new Date(),
    },
    {
      id: crypto.randomUUID(),
      sentBy: "auth0|64af99336e86aeb92a526d0e",
      message: "test",
      receivedBy: "auth0|64b485fd37c9277946e4b7b9",
      hasRead: false,
      timestamp: new Date(),
    },
  ];
  await prisma.chat.createMany({ data: chats });
};
