import dotenv from "dotenv";
dotenv.config(); // ✅ ALWAYS FIRST

import path from "path";
import { fileURLToPath } from "url";


import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import "./config/cloudinary.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";

// DB Connection
connectDB();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Serve frontend
app.use(express.static(path.join(__dirname, "../skill-swap/build")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/requests", requestRoutes);

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../skill-swap/build/index.html"));
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
