import express from "express";

import messageRoutes from "./messages";

const router = express.Router();

router.use("/messages", messageRoutes);

export default router;
