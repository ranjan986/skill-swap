import Skill from "../models/Skill.js";
import cloudinary from "../config/cloudinary.js";

// ➕ ADD SKILL
export const addSkill = async (req, res) => {
  const { title, price, time, image, date, category } = req.body;

  const skill = await Skill.create({
    title,
    price,
    time,
    image: req.file ? req.file.path : "",
    date,
    category,
    user: req.user._id,
  });

  res.status(201).json(skill);
};

// 📥 GET ALL SKILLS
export const getSkills = async (req, res) => {
  const skills = await Skill.find().populate("user", "name avatar");
  res.json(skills);
};

// UPDATE SKILL
export const updateSkill = async (req, res) => {
  const skill = await Skill.findById(req.params.id);
  if (!skill) return res.status(404).json({ message: "Skill not found" });

  // owner check
  if (skill.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  const { title, price, time, date, category } = req.body;

  // replace image if new file
  if (req.file) {
    if (skill.image?.public_id) {
      await cloudinary.uploader.destroy(skill.image.public_id);
    }
    skill.image = {
      url: req.file.path,
      public_id: req.file.filename,
    };
  }

  skill.title = title ?? skill.title;
  skill.price = price ?? skill.price;
  skill.time = time ?? skill.time;
  skill.date = date ?? skill.date;
  skill.category = category ?? skill.category;

  await skill.save();
  res.json(skill);
};

// 🗑 DELETE SKILL (and image)
export const deleteSkill = async (req, res) => {
  const skill = await Skill.findById(req.params.id);
  if (!skill) return res.status(404).json({ message: "Skill not found" });

  if (skill.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  if (skill.image?.public_id) {
    await cloudinary.uploader.destroy(skill.image.public_id);
  }

  await skill.deleteOne();
  res.json({ message: "Skill deleted" });
};