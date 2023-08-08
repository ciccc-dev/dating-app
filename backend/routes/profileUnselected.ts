import express from "express";
import { postProfileUnselected } from "../lib/profileUnselected";

const router = express.Router();

router.post("", postProfileUnselected);

export default router;
