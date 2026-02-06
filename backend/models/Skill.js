import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: String,
      default: "",
    },

    time: {
      type: String,
      default: "",
    },

    date: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "General",
    },

    // ✅ CLOUDINARY IMAGE OBJECT
    image: {
      url: {
        type: String,
        default: "",
      },
      public_id: {
        type: String,
        default: "",
      },
    },

    // ✅ SKILL OWNER
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Skill", skillSchema);
