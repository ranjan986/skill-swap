import express from "express";
import { updateProfile, deleteAvatar, updateSkills} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";


const router = express.Router();

router.put("/profile", protect, upload.single("avatar"), updateProfile);
router.delete("/profile/avatar", protect, deleteAvatar);
router.put("/skills", protect, updateSkills);

export default router;
