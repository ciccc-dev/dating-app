import { PrismaClient } from "@prisma/client";
import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  const client = new PrismaClient();
  const { id } = req.body;
  const result = await client.filter.findUnique({
    where: {
      profileId: "c7d9879a-0c49-41e8-9e86-373d7232a2b9",
    },
    include: { interests: { select: { name: true } } },
  });
  console.log(result);
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
  } = req.body;
  const result = await client.filter.update({
    where: {
      profileId: "c7d9879a-0c49-41e8-9e86-373d7232a2b9",
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
      interests: { set: [{ name: "Yoga" }, { name: "Reading" }] },
    },
  });
  console.log(result);
  return res.json(result);
});

export default router;
