import express from "express";
import {
  postGeolocation,
  updateGeolocationByProfileId,
} from "../lib/geolocations";

const router = express.Router();

router.post("", postGeolocation);
router.patch("/update", updateGeolocationByProfileId);
export default router;
