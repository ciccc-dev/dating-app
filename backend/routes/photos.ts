import express from "express";
import multer from "multer";
import {
  deletePhotoUrl,
  fetchPhotoUrls,
  fetchPhotoUrlsLikedList,
  postPhotoUrl,
  postPhotoUrls,
} from "../lib/photoUrls";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

router.post("/:profileId", upload.array("photos", 5), postPhotoUrls);
router.post("/single/:profileId", upload.single("photo"), postPhotoUrl);
router.get("/:profileId", fetchPhotoUrls);
router.get("/likedlist/:profileId", fetchPhotoUrlsLikedList);
router.delete("/:photoUrlId", deletePhotoUrl);

export default router;
