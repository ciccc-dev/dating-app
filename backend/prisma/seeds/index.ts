import { PrismaClient } from "@prisma/client";

import { seedInterests } from "./interests";
import { seedChats } from "./chats";
import { seedLikes } from "./likes";
import { seedProfiles } from "./profiles";
import { seedProfileInterests } from "./profileInterests";
import { seedFilters } from "./filter";
import { seedProfilePurposes } from "./profilePurposes";

const prisma = new PrismaClient();

async function main() {
  await seedInterests(prisma);
  await seedProfiles(prisma);
  await seedProfileInterests(prisma);
  await seedFilters(prisma);
  await seedProfilePurposes(prisma);
  await seedChats(prisma);
  await seedLikes(prisma);
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
