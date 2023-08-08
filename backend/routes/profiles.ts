import express from "express";
import { body } from "express-validator";
import {
  getProfilesByUserId,
  getProfileByUserId,
  updateProfileByUserId,
  postProfile,
} from "../lib/profiles";

const router = express.Router();

const validateCreateProfileRequest = [
  body("username").notEmpty(),
  body("gender").optional(),
  body("birthday").notEmpty().isDate(),
  body("sexual_orientation").optional(),
  body("about_me").optional(),
];

router.get("", getProfilesByUserId);
router.post("", validateCreateProfileRequest, postProfile);
router.get("/:userId", getProfileByUserId);
router.patch("/update", updateProfileByUserId);

export default router;
