import { PrismaClient } from "@prisma/client";
import express from "express";
import { calculateAge, convertAgetoDate } from "../utils/caluculateAge";

import { getProfilesByUserId, old_getProfilesByUserId } from "../lib/profiles";

const router = express.Router();

router.get("", getProfilesByUserId);
router.get("/:userId", old_getProfilesByUserId);

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

export default router;
