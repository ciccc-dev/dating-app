import { PrismaClient } from "@prisma/client";
import express from "express";
import { calculateAge, convertAgetoDate } from "../utils/caluculateAge";
import { profileEnd } from "console";

const router = express.Router();

// router.get("/:userId", getProfileByUserId);

const convertLookingForToGender = (lookingFor: string) => {
  switch (lookingFor) {
    case "Men":
      return "Man";
    case "Women":
      return "Woman";
    default:
      return undefined;
  }
};

// @deprecated
router.post("/profileId", async (req, res) => {
  const client = new PrismaClient();
  const { userId } = req.body;
  const result = await client.profile.findUnique({
    where: {
      userId: userId,
    },
    select: {
      id: true,
    },
  });
  return res.json(result);
});

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

// @deprecated TODO: Move to GET /
router.post("/", async (req, res) => {
  const client = new PrismaClient();
  const { profileId } = req.body;
  const filter = await client.filter.findUnique({
    where: {
      profileId: profileId,
    },
    include: { interests: { select: { name: true } } },
  });

  if (filter) {
    // const orderBy = randomPick(['id', 'field1', 'field2']);
    // const orderDir = randomPick([`asc`, `desc`]);
    const profiles = await client.profile.findMany({
      where: {
        id: { not: profileId },
        gender: convertLookingForToGender(filter.showMe),
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
      take: 3,
    });

    const convertedProfiles = profiles.map(({ birthday, ...rest }) => ({
      ...rest,
      age: calculateAge(birthday),
    }));
    return res.json(convertedProfiles);
  }
});

export default router;
