import { PrismaClient } from "@prisma/client";
import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  const client = new PrismaClient();
  const { id } = req.body;
  const result = await client.filter.findUnique({
    where: {
      profileId: id,
    },
  });
  console.log(result);
  return res.json(result);
});

router.post("/update", async (req, res) => {
  const client = new PrismaClient();
  const {
    profileId,
    showMe,
    ageRange,
    distance,
    sexualOrientations,
    purposes,
  } = req.body;
  const result = await client.filter.update({
    where: {
      profileId: profileId,
    },
    data: {
      showMe: showMe,
      minAge: ageRange[0],
      maxAge: ageRange[1],
      distance: distance,
      sexualOrientations: sexualOrientations,
      purposes: purposes,
    },
  });
  console.log(result);
  return res.json(result);
});

export default router;
