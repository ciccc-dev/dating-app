import express from "express";
import {
  getGeolocationDistance,
  postGeolocation,
  updateGeolocationByProfileId,
} from "../lib/geolocations";

const router = express.Router();

router.get("", getGeolocationDistance);
router.post("", postGeolocation);
router.patch("/update", updateGeolocationByProfileId);
export default router;
