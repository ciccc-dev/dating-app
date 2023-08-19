import express from "express";
import multer from "multer";
import { fetchPhotoUrls, postPhotoUrls } from "../lib/photoUrls";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

router.post("", upload.array("photos", 5), postPhotoUrls);
router.get("/:profileId", fetchPhotoUrls);

export default router;
