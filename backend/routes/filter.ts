import { PrismaClient } from "@prisma/client";
import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  const client = new PrismaClient();
  const { id } = req.body;
  const result = await client.filter.findUnique({
    where: {
      profileId: id,
    },
  });
  console.log(result);
  return res.json(result);
});

export default router;
