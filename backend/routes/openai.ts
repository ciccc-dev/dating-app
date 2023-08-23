import express from "express";

import { getAnswersGeneratedByAi } from "../lib/openai";
import { query } from "express-validator";

const router = express.Router();

const validateAskReqquest = [query("question").notEmpty()];

router.get("/ask/:userId", validateAskReqquest, getAnswersGeneratedByAi);

export default router;
