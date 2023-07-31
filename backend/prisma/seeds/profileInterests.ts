import { PrismaClient } from "@prisma/client";

export interface Item {
  name: string;
}

export const seedProfileInterests = async (prisma: PrismaClient) => {
  const resultsInterests: Item[][] = [];

  const resultProfiles = await prisma.profile.findMany({
    select: { id: true },
  });

  await Promise.all(
    resultProfiles.map(async () => {
      const itemCount = await prisma.interest.count();
      const takeCount = Math.floor(Math.random() * itemCount) + 1;
      const skip = Math.max(0, Math.floor(Math.random() * itemCount));
      const result = await prisma.interest.findMany({
        select: { name: true },
        take: takeCount,
        skip: skip,
      });
      resultsInterests.push(result);
    })
  );

  const query = resultProfiles.map((profile, index) =>
    prisma.profile.update({
      where: { id: profile.id },
      data: { interests: { set: resultsInterests[index] } },
    })
  );

  const result = await prisma.$transaction([...query]);
  console.log(`Created ProfileInterests: ${result.length}`);
};
