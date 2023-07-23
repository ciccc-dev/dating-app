import { PrismaClient } from "@prisma/client";
import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  const client = new PrismaClient();
  const result = await client.profile.findMany();
  console.log(result);
  return res.json(result);
});

export default router;
