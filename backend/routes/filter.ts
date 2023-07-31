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
  const {
    profileId,
    showMe,
    distance,
    distanceChecked,
    ageRange,
    ageRangeChecked,
    sexualOrientations,
    sexualOrientationChecked,
    purposeChecked,
    purposes,
    interests,
    interestChecked,
  } = req.body;
  const result = await client.filter.update({
    where: {
      profileId: profileId,
    },
    data: {
      showMe: showMe,
      minAge: ageRange[0],
      maxAge: ageRange[1],
      isAgeFiltered: ageRangeChecked,
      distance: distance,
      isDistanceFiltered: distanceChecked,
      sexualOrientations: sexualOrientations,
      isSexualOrientationFiltered: sexualOrientationChecked,
      purposes: purposes,
      isPurposeFiltered: purposeChecked,
      interests: { set: interests },
      isInterestFiltered: interestChecked,
    },
  });
  return res.json(result);
});

export default router;
