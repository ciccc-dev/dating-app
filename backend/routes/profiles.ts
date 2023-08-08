import express from "express";
import {
  getProfilesByUserId,
  getProfileByUserId,
  updateProfileByUserId,
} from "../lib/profiles";

const router = express.Router();

router.get("", getProfilesByUserId);
router.get("/:userId", getProfileByUserId);
router.patch("/update", updateProfileByUserId);

export default router;
