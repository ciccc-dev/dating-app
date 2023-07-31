import crypto from "crypto";

import { PrismaClient, Profile } from "@prisma/client";

export const seedProfiles = async (prisma: PrismaClient) => {
  const profiles: Profile[] = [
    {
      id: crypto.randomUUID(),
      userId: "auth0|6493c3668860a0c976f765af",
      userName: "test1",
      birthday: new Date(1993, 5, 2),
      gender: "Man",
      sexualOrientation: "Straight",
      aboutMe: "Hi! I'm test1! Nice to meet you",
      registeredAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: crypto.randomUUID(),
      userId: "auth0|64af99336e86aeb92a526d0e",
      userName: "test2",
      birthday: new Date(1990, 7, 2),
      gender: "Woman",
      sexualOrientation: "Lesbian",
      aboutMe: "Hi! I'm test2! Nice to meet you",
      registeredAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: crypto.randomUUID(),
      userId: "auth0|64b485fd37c9277946e4b7b9",
      userName: "test3",
      birthday: new Date(1960, 12, 2),
      gender: "Man",
      sexualOrientation: "Gay",
      aboutMe: "Hi! I'm test3! Nice to meet you",
      registeredAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: crypto.randomUUID(),
      userId: "auth0|64c7fdada9c248f78242677e",
      userName: "test4",
      birthday: new Date(2000, 3, 2),
      gender: "Woman",
      sexualOrientation: "Straight",
      aboutMe: "Hi! I'm test4! Nice to meet you",
      registeredAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: crypto.randomUUID(),
      userId: "auth0|11c7fdada9c248f782426711",
      userName: "no-auth1",
      birthday: new Date(1981, 2, 1),
      gender: "Man",
      sexualOrientation: "Straight",
      aboutMe: "Hi! I'm no-auth1! Nice to meet you",
      registeredAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: crypto.randomUUID(),
      userId: "auth0|12c7fdada9c248f782426712",
      userName: "no-auth2",
      birthday: new Date(1978, 11, 12),
      gender: "Woman",
      sexualOrientation: "Lesbian",
      aboutMe: "Hi! I'm no-auth2! Nice to meet you",
      registeredAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: crypto.randomUUID(),
      userId: "auth0|13c7fdada9c248f782426713",
      userName: "no-auth3",
      birthday: new Date(1956, 4, 27),
      gender: "Woman",
      sexualOrientation: "Straight",
      aboutMe: "Hi! I'm no-auth3! Nice to meet you",
      registeredAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: crypto.randomUUID(),
      userId: "auth0|14c7fdada9c248f782426714",
      userName: "no-auth4",
      birthday: new Date(1968, 12, 24),
      gender: "Man",
      sexualOrientation: "Straight",
      aboutMe: "Hi! I'm no-auth4! Nice to meet you",
      registeredAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: crypto.randomUUID(),
      userId: "auth0|15c7fdada9c248f782426715",
      userName: "no-auth5",
      birthday: new Date(2002, 9, 16),
      gender: "Man",
      sexualOrientation: "Straight",
      aboutMe: "Hi! I'm no-auth5! Nice to meet you",
      registeredAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: crypto.randomUUID(),
      userId: "auth0|16c7fdada9c248f782426716",
      userName: "no-auth6",
      birthday: new Date(1995, 6, 30),
      gender: "Woman",
      sexualOrientation: "Lesbian",
      aboutMe: "Hi! I'm no-auth6! Nice to meet you",
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
