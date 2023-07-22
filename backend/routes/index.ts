import express from "express";

import likeRoutes from "./likes";
import messageRoutes from "./messages";

const router = express.Router();

router.use("/likes", likeRoutes);
router.use("/messages", messageRoutes);

export default router;
