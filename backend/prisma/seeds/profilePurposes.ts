import { PrismaClient } from "@prisma/client";

export const seedProfilePurposes = async (prisma: PrismaClient) => {
  const resultProfiles = await prisma.profile.findMany({
    select: { id: true },
  });

  const query = resultProfiles.map((profile) =>
    prisma.purpose.upsert({
      where: { profileId_name: { profileId: profile.id, name: "Partner" } },
      update: {},
      create: { profileId: profile.id, name: "Partner" },
    })
  );

  const result = await prisma.$transaction([...query]);
  console.log(`Created ProfilePurposes: ${result.length}`);
};
