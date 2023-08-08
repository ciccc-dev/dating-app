import express from "express";
import { getProfilesByUserId, getProfileIdByUserId } from "../lib/profiles";
import { PrismaClient } from "@prisma/client";

const router = express.Router();

router.get("", getProfilesByUserId);
router.get("/:userId", getProfileIdByUserId);

router.get("/:userId", async (req, res) => {
  const client = new PrismaClient();
  const { userId } = req.params;
  const result = await client.profile.findUnique({
    where: {
      userId: userId,
    },
    include: {
      interests: { select: { name: true } },
      purposes: { select: { name: true } },
    },
  });
  return res.json(result);
});

router.patch("/update", async (req, res) => {
  const client = new PrismaClient();
  const { data, profile } = req.body;
  const deletepurposes = client.purpose.deleteMany({
    where: {
      profileId: profile.id,
    },
  });

  const createPurposes = client.purpose.createMany({
    data: profile.purposes.map(({ name }: any) => ({
      profileId: profile.id,
      name: name,
    })),
  });

  const updateProfile = client.profile.update({
    where: {
      userId: profile.userId,
    },
    data: {
      userName: data.userName,
      birthday: data.birthday,
      gender: profile.gender,
      sexualOrientation: profile.sexualOrientation,
      aboutMe: data.aboutMe,
      updatedAt: new Date(),
      interests: { set: profile.interests },
    },
  });
  const transaction = await client.$transaction([
    deletepurposes,
    createPurposes,
    updateProfile,
  ]);
  return res.json(transaction);
});

export default router;
