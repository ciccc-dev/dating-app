import express from "express";

import likeRoutes from "./likes";
import messageRoutes from "./messages";
import profilesRoutes from "./profiles";
import filterRoutes from "./filter";

const router = express.Router();

router.use("/likes", likeRoutes);
router.use("/messages", messageRoutes);
router.use("/profiles", profilesRoutes);
router.use("/filter", filterRoutes);

export default router;
