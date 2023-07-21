import crypto from "crypto";

import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";

export const seedLikes = async (prisma: PrismaClient) => {
  const likes: Prisma.LikeCreateManyArgs = {
    data: [
      {
        id: crypto.randomUUID(),
        sentBy: "auth0|6493c3668860a0c976f765af",
        receivedBy: "auth0|64af99336e86aeb92a526d0e",
        likedAt: new Date(),
      },

      {
        id: crypto.randomUUID(),
        sentBy: "auth0|64af99336e86aeb92a526d0e",
        receivedBy: "auth0|64b485fd37c9277946e4b7b9",
        likedAt: new Date(),
      },

      {
        id: crypto.randomUUID(),
        sentBy: "auth0|64b485fd37c9277946e4b7b9",
        receivedBy: "auth0|6493c3668860a0c976f765af",
        likedAt: new Date(),
      },
    ],
  };
  await prisma.like.createMany(likes);
};
