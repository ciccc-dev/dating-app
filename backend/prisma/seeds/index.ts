import { PrismaClient } from "@prisma/client";

import { seedChats } from "./chats";
import { seedProfiles } from "./profiles";

const prisma = new PrismaClient();

async function main() {
  await seedProfiles(prisma);
  await seedChats(prisma);
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
