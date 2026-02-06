import express from "express";
import SwapRequest from "../models/SwapRequest.js";
import Skill from "../models/Skill.js"; // Import Skill model to check ownership
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 1. Create a Swap Request
router.post("/", protect, async (req, res) => {
    try {
        const { skillId, message } = req.body;

        const skill = await Skill.findById(skillId).populate("user");
        if (!skill) return res.status(404).json({ message: "Skill not found" });

        if (skill.user._id.toString() === req.user._id.toString()) {
            return res.status(400).json({ message: "You cannot request your own skill" });
        }

        const existingRequest = await SwapRequest.findOne({
            requester: req.user._id,
            skill: skillId,
            status: "pending",
        });

        if (existingRequest) {
            return res.status(400).json({ message: "Request already sent" });
        }

        const newRequest = await SwapRequest.create({
            requester: req.user._id,
            recipient: skill.user._id,
            skill: skillId,
            message,
        });

        res.status(201).json(newRequest);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// 2. Get My Requests (Incoming & Outgoing)
router.get("/my-requests", protect, async (req, res) => {
    try {
        const incoming = await SwapRequest.find({ recipient: req.user._id })
            .populate("requester", "name email avatar")
            .populate("skill", "title image");

        const outgoing = await SwapRequest.find({ requester: req.user._id })
            .populate("recipient", "name email avatar")
            .populate("skill", "title image");

        res.json({ incoming, outgoing });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// 3. Accept / Reject Request
router.put("/:id", protect, async (req, res) => {
    try {
        const { status } = req.body; // "accepted" or "rejected"
        const request = await SwapRequest.findById(req.params.id);

        if (!request) return res.status(404).json({ message: "Request not found" });

        // Ensure only the recipient can accept/reject
        if (request.recipient.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        request.status = status;
        await request.save();

        res.json(request);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
