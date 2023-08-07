import { PrismaClient } from "@prisma/client";
import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  const client = new PrismaClient();
  const { profileId } = req.body;
  const result = await client.filter.findUnique({
    where: {
      profileId: profileId,
    },
    include: { interests: { select: { name: true } } },
  });
  return res.json(result);
});

router.post("/update", async (req, res) => {
  const client = new PrismaClient();
  const { filter } = req.body;
  console.log(filter);
  const result = await client.filter.update({
    where: {
      id: filter.id,
    },
    data: {
      showMe: filter.showMe,
      minAge: filter.minAge,
      maxAge: filter.maxAge,
      isAgeFiltered: filter.isAgeFiltered,
      distance: filter.distance,
      isDistanceFiltered: filter.isDistanceFiltered,
      sexualOrientations: filter.sexualOrientations,
      isSexualOrientationFiltered: filter.isSexualOrientationFiltered,
      purposes: filter.purposes,
      isPurposeFiltered: filter.isPurposeFiltered,
      interests: { set: filter.interests },
      isInterestFiltered: filter.isInterestFiltered,
    },
  });
  return res.json(result);
});

export default router;
