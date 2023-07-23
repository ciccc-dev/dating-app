import express from "express";

import messageRoutes from "./messages";
import profilesRoutes from "./profiles";
import filterRoutes from "./filter";

const router = express.Router();

router.use("/profiles", profilesRoutes);
router.use("/filter", filterRoutes);
// router.use("/messages", messageRoutes);

export default router;
