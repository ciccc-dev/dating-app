import crypto from "crypto";

import { PrismaClient } from "@prisma/client";

export const seedFilters = async (prisma: PrismaClient) => {
  const resultProfiles = await prisma.profile.findMany({
    select: { id: true },
  });

  const query = resultProfiles.map((profile) =>
    prisma.filter.upsert({
      where: { profileId: profile.id },
      update: {},
      create: {
        id: crypto.randomUUID(),
        profileId: profile.id,
        showMe: "All",
      },
    })
  );

  const result = await prisma.$transaction([...query]);
  console.log(`Created Filters: ${result.length}`);
};
