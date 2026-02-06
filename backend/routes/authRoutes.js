import express from "express";
import {
  forgotPassword,
  login,
  register,
  resetPassword,
  getMe,
  googleLogin,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/google", googleLogin);

router.get("/me", protect, getMe);

export default router;
