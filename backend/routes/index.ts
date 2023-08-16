import express from "express";

import likeRoutes from "./likes";
import messageRoutes from "./messages";
import profilesRoutes from "./profiles";
import filterRoutes from "./filter";
import interestsRoutes from "./interests";
import profileUnselectedRoutes from "./profileUnselected";
import geolocationRoutes from "./geolocation";

const router = express.Router();

router.use("/likes", likeRoutes);
router.use("/messages", messageRoutes);
router.use("/profiles", profilesRoutes);
router.use("/filter", filterRoutes);
router.use("/interests", interestsRoutes);
router.use("/profileUnselected", profileUnselectedRoutes);
router.use("/geolocation", geolocationRoutes);

export default router;
