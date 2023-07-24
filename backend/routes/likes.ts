import express from "express";

import { getLikedProfiles } from "../lib/likes";

const router = express.Router();
router.get("", getLikedProfiles);

export default router;
