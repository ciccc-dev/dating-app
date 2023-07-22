import express from "express";

import { getMatchedLikes, getReceivedLikes, getSentLikes } from "../lib/likes";

const router = express.Router();
router.get("/:userId/sent", getSentLikes);
router.get("/:userId/received", getReceivedLikes);
router.get("/:userId/matched", getMatchedLikes);

export default router;
