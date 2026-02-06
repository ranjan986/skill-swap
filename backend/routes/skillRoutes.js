import express from "express";
import { addSkill, getSkills, updateSkill, deleteSkill } from "../controllers/skillController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload  from "../middleware/upload.js";

const router = express.Router();

router.get("/", getSkills);
router.post("/", protect, upload.single("image"), addSkill);
router.put("/:id", protect, upload.single("image"), updateSkill);
router.delete("/:id", protect, deleteSkill);

export default router;
