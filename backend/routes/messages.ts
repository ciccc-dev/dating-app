import express from "express";
import { body } from "express-validator";

import { getMessages, getSpecificMessages, postMessage } from "../lib/messages";

const router = express.Router();

router.get("/", getMessages);
router.get("/:userId", getSpecificMessages);
router.post("/:userId", body("message").notEmpty(), postMessage);

export default router;
