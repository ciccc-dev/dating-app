import express, { Request, Response } from "express";

import { getMessages, getSpecificMessages } from "../lib/messages";

const router = express.Router();

router.get("/", getMessages);
router.get("/:userId", getSpecificMessages);

export default router;
