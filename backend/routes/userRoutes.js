import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserByID,
  updateUser,
  toggleFavorite,
  getFavorites,
} from "../controlers/userControler.js";
import { uploadProfileImage } from "../multer/multer.js";
import { admin, protect } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(protect, admin, getUsers);

router.post("/login", authUser);
router.route("/favorites/:id").post(protect, toggleFavorite);
router.route("/getfavorites").get(protect, getFavorites);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, uploadProfileImage, updateUserProfile);

router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserByID)
  .put(protect, admin, updateUser);

export default router;
