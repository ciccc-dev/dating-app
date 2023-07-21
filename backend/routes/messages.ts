import express from "express";

import { MessageRepository } from "../lib/messages/repository";

const router = express.Router();

router.get("/:userId", async (req, res) => {
  const messages = await MessageRepository.fetchMessagesByUserId(
    req.params.userId as string
  );
  const partners = await MessageRepository.fetchPartnersByUserId(
    req.params.userId as string
  );

  res.json({ partners, messages });
});

export default router;
