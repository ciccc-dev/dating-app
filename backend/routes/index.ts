import express from "express";

import messageRoutes from "./messages";
import profilesRoutes from "./profiles";

const router = express.Router();

router.use("/profiles", profilesRoutes);
router.use("/messages", messageRoutes);

export default router;
