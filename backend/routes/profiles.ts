import express from "express";

import { getProfilesByUserId, getProfileIdByUserId } from "../lib/profiles";

const router = express.Router();

router.get("", getProfilesByUserId);
router.get("/:userId", getProfileIdByUserId);

export default router;
