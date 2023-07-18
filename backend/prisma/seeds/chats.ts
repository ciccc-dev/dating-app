import crypto from "crypto";

import { PrismaClient } from "@prisma/client";

export const seedChats = async (prisma: PrismaClient) => {
  await prisma.chat.create({
    data: {
      id: crypto.randomUUID(),
      sentBy: "auth0|6493c3668860a0c976f765af",
      message: "Hello",
      receivedBy: "auth0|64af99336e86aeb92a526d0e",
      hasRead: false,
      timestamp: new Date(),
    },
  });

  await prisma.chat.create({
    data: {
      id: crypto.randomUUID(),
      sentBy: "auth0|64af99336e86aeb92a526d0e",
      message: "Hey",
      receivedBy: "auth0|6493c3668860a0c976f765af",
      hasRead: false,
      timestamp: new Date(),
    },
  });

  await prisma.chat.create({
    data: {
      id: crypto.randomUUID(),
      sentBy: "auth0|64af99336e86aeb92a526d0e",
      message: "test",
      receivedBy: "test",
      hasRead: false,
      timestamp: new Date(),
    },
  });
};
