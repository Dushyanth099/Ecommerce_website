import express from "express";
import {
  getBanners,
  addBanner,
  deleteBanner,
} from "../controlers/bannerController.js";
import { uploadSingleImage } from "../multer/multer.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Banner Routes
// router.route("/banner").post(protect, admin, addBanner);
router.route("/banner").post(protect, admin, uploadSingleImage, addBanner);
router.route("/banners/:id").delete(protect, admin, deleteBanner);
router.route("/banners").get(getBanners);
export default router;
