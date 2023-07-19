import { PrismaClient } from "@prisma/client";
import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  const client = new PrismaClient();
  const userWithPosts = await client.profile.findMany();
  console.log(userWithPosts);
  return res.json(userWithPosts);
});

export default router;
