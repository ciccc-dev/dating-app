import crypto from "crypto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
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
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
