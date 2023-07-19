import crypto from "crypto";

import { PrismaClient } from "@prisma/client";

interface Profile {
  id: string;
  userId: string;
  userName: string;
  birthday: Date;
  gender: string;
  sexualOrientation: string;
  aboutMe: string;
  registeredAt: Date;
  updatedAt: Date;
}

export const seedProfiles = async (prisma: PrismaClient) => {
  const profiles: Profile[] = [
    {
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
    {
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
    {
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
  ];
  const query = profiles.map((profile) =>
    prisma.profile.upsert({
      where: { userId: profile.userId },
      update: {},
      create: profile,
    })
  );
  const result = await prisma.$transaction([...query]);
  console.log(`Created Profiles: ${result.length}`);
};
