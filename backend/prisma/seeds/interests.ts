import type { Interest } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

export const seedInterests = async (prisma: PrismaClient) => {
  const interests: Interest[] = [
    { id: 1, name: "Hiking", sortOrder: 1 },
    { id: 2, name: "Cooking", sortOrder: 2 },
    { id: 3, name: "Dancing", sortOrder: 3 },
    { id: 4, name: "Photography", sortOrder: 4 },
    { id: 5, name: "Painting", sortOrder: 5 },
    { id: 6, name: "Reading", sortOrder: 6 },
    { id: 7, name: "Swimming", sortOrder: 7 },
    { id: 8, name: "Traveling", sortOrder: 8 },
    { id: 9, name: "Yoga", sortOrder: 9 },
    { id: 10, name: "Gardening", sortOrder: 10 },
    { id: 11, name: "Cycling", sortOrder: 11 },
    { id: 12, name: "Running", sortOrder: 12 },
    { id: 13, name: "Fishing", sortOrder: 13 },
    { id: 14, name: "Gaming", sortOrder: 14 },
    { id: 15, name: "Meditation", sortOrder: 15 },
    { id: 16, name: "Singing", sortOrder: 16 },
    { id: 17, name: "Volunteering", sortOrder: 17 },
    { id: 18, name: "DIY Projects", sortOrder: 18 },
    { id: 19, name: "Chess", sortOrder: 19 },
  ];
  const result = await prisma.interest.createMany({ data: interests });
  console.log(`Created Interests: ${result}`);
};
