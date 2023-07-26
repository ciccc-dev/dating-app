import { PrismaClient } from "@prisma/client";
import express from "express";
import { convertAgetoDate } from "../utils/caluculateAge";

const router = express.Router();

router.post("/", async (req, res) => {
  const client = new PrismaClient();
  const filter = await client.filter.findUnique({
    where: {
      profileId: "c7d9879a-0c49-41e8-9e86-373d7232a2b9",
    },
    include: { interests: { select: { name: true } } },
  });

  if (filter) {
    const profiles = await client.profile.findMany({
      where: {
        birthday: filter.isAgeFiltered
          ? {
              gte: convertAgetoDate(filter.maxAge),
              lte: convertAgetoDate(filter.minAge),
            }
          : undefined,
        sexualOrientation: filter.isSexualOrientationFiltered
          ? { in: filter.sexualOrientations }
          : undefined,
        interests: filter.isInterestFiltered
          ? { some: { OR: filter.interests } }
          : undefined,
        purposes: filter.isPurposeFiltered
          ? {
              some: {
                OR: filter.purposes.map((purpose) => ({ name: purpose })),
              },
            }
          : undefined,
      },
      include: {
        interests: { select: { name: true } },
        purposes: { select: { name: true } },
      },
    });
    console.log(filter.minAge);
    console.log(filter.maxAge);
    console.log(convertAgetoDate(filter.minAge));
    console.log(convertAgetoDate(filter.maxAge));
    return res.json(profiles);
  }
});

export default router;
