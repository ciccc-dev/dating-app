import { PrismaClient } from "@prisma/client";

import { seedInterests } from "./interests";
import { seedChats } from "./chats";
import { seedLikes } from "./likes";
import { seedProfiles } from "./profiles";

const prisma = new PrismaClient();

async function main() {
  await seedInterests(prisma);
  await seedChats(prisma);
  await seedLikes(prisma);
  await seedProfiles(prisma);
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
