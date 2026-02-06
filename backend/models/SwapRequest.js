import mongoose from "mongoose";

const swapRequestSchema = new mongoose.Schema(
    {
        requester: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        skill: { type: mongoose.Schema.Types.ObjectId, ref: "Skill", required: true },
        status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
        message: { type: String },
    },
    { timestamps: true }
);

export default mongoose.model("SwapRequest", swapRequestSchema);
