import express from "express";
import { body } from "express-validator";

import { getLikedProfiles, postLike } from "../lib/likes";

const router = express.Router();

router.get("", getLikedProfiles);
router.post("", body("like_to").notEmpty(), postLike);

export default router;
