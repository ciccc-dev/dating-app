import express from "express";
import {
  fetchGeolocationfromExterenal,
  postGeolocation,
  updateGeolocationByProfileId,
} from "../lib/geolocations";

const router = express.Router();

router.post("", postGeolocation);
router.patch("/update", updateGeolocationByProfileId);
router.get("", fetchGeolocationfromExterenal);
export default router;
