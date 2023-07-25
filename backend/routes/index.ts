import express from "express";

import messageRoutes from "./messages";
import profilesRoutes from "./profiles";
import filterRoutes from "./filter";
import interestsRoutes from "./interests";

const router = express.Router();

router.use("/messages", messageRoutes);
router.use("/profiles", profilesRoutes);
router.use("/filter", filterRoutes);
router.use("/interests", interestsRoutes);

export default router;
