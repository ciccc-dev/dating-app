import crypto from "crypto";

import { PrismaClient } from "@prisma/client";

export const seedProfiles = async (prisma: PrismaClient) => {
  await prisma.profile.upsert({
    where: { userId: "auth0|6493c3668860a0c976f765af" },
    update: {},
    create: {
      id: crypto.randomUUID(),
      userId: "auth0|6493c3668860a0c976f765af",
      userName: "test1",
      birthday: new Date(),
      gender: "man",
      sexualOrientation: "straight",
      aboutMe: "",
      registeredAt: new Date(),
      updatedAt: new Date(),
    },
  });
  await prisma.profile.upsert({
    where: { userId: "auth0|64af99336e86aeb92a526d0e" },
    update: {},
    create: {
      id: crypto.randomUUID(),
      userId: "auth0|64af99336e86aeb92a526d0e",
      userName: "test2",
      birthday: new Date(),
      gender: "woman",
      sexualOrientation: "straight",
      aboutMe: "",
      registeredAt: new Date(),
      updatedAt: new Date(),
    },
  });
  await prisma.profile.upsert({
    where: { userId: "auth0|64b485fd37c9277946e4b7b9" },
    update: {},
    create: {
      id: crypto.randomUUID(),
      userId: "auth0|64b485fd37c9277946e4b7b9",
      userName: "test3",
      birthday: new Date(),
      gender: "man",
      sexualOrientation: "straight",
      aboutMe: "",
      registeredAt: new Date(),
      updatedAt: new Date(),
    },
  });
};
