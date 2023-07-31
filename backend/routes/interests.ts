import { PrismaClient } from "@prisma/client";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  const client = new PrismaClient();
  const result = await client.interest.findMany({
    orderBy: {
      sortOrder: "asc",
    },
    select: { id: true, name: true },
  });
  return res.json(result);
});

export default router;
