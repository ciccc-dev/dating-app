import express from "express";
import {
  putGeolocation,
  updateGeolocationByProfileId,
} from "../lib/geolocations";

const router = express.Router();

router.put("", putGeolocation);
router.patch("/update", updateGeolocationByProfileId);
export default router;
