import express from "express";
import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:8000");

const router = express.Router();

router.get("/", async (req, res) => {
  res.json({ message: "Fetch all users." });
});

export default router;
