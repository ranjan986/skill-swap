import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";

// ============================
// UPDATE PROFILE (NAME + AVATAR)
// ============================
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // update name
    if (req.body.name) {
      user.name = req.body.name;
    }

    // update avatar (Cloudinary)
    if (req.file) {
      // 🔥 delete old avatar from cloudinary
      if (user.avatar?.public_id) {
        await cloudinary.uploader.destroy(user.avatar.public_id);
      }

      // ✅ save new avatar as OBJECT
      user.avatar = {
        url: req.file.path,       // secure_url
        public_id: req.file.filename,
      };
    }

    await user.save();

    res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Profile update failed" });
  }
};

// ============================
// DELETE AVATAR
// ============================
export const deleteAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // delete from cloudinary
    if (user.avatar?.public_id) {
      await cloudinary.uploader.destroy(user.avatar.public_id);
    }

    // reset avatar object
    user.avatar = {
      url: "",
      public_id: "",
    };

    await user.save();

    res.json({
      message: "Avatar deleted successfully",
      avatar: user.avatar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Avatar delete failed" });
  }
};

// ============================
// UPDATE SKILLS
// ============================
export const updateSkills = async (req, res) => {
  try {
    const { skillsToTeach, skillsToLearn } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (skillsToTeach) user.skillsToTeach = skillsToTeach;
    if (skillsToLearn) user.skillsToLearn = skillsToLearn;

    await user.save();

    res.json({
      skillsToTeach: user.skillsToTeach,
      skillsToLearn: user.skillsToLearn,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Skill update failed" });
  }
};
