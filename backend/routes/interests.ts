import express from "express";

import { getInterests } from "../lib/interests";

const router = express.Router();

router.get("/", getInterests);

export default router;
