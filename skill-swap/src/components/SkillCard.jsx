import { useState } from "react";
import { FiClock, FiSend, FiCheck } from "react-icons/fi";
import { AiOutlineCalendar } from "react-icons/ai";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import axios from "../api/axios";

/* ---------- FORMAT HELPERS ---------- */

// DATE → "12 May, 2026"
function formatDate(value) {
  if (!value) return "Upcoming";

  const date = new Date(value);
  if (isNaN(date.getTime())) return "Upcoming";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// TIME → "02h 30m"
function formatTime(value) {
  if (!value) return "00h 00m";

  const nums = value.toString().match(/\d+/g);
  if (!nums) return "00h 00m";

  const hours = nums[0] || 0;
  const minutes = nums[1] || 0;

  return `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(
    2,
    "0"
  )}m`;
}

/* ---------- COMPONENT ---------- */

export default function SkillCard({ skill }) {
  const { user } = useAuth();
  const { title, price, time, image, date, category, user: owner } = skill;

  const [requestStatus, setRequestStatus] = useState("idle"); // idle | loading | success | error

  const handleRequestSwap = async () => {
    if (!user) {
      alert("Please login to request a swap!");
      return;
    }

    try {
      setRequestStatus("loading");
      const token = localStorage.getItem("token");

      await axios.post("/api/requests",
        { skillId: skill._id, message: "Hi, I'd like to swap skills!" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setRequestStatus("success");
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to send request");
      setRequestStatus("idle");
    }
  };

  const isOwner = user && owner && user._id === owner._id;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass overflow-hidden rounded-2xl group flex flex-col h-full border border-[var(--color-border)] shadow-md hover:shadow-xl transition-all duration-300"
    >

      {/* IMAGE (FULL WIDTH) */}
      <div className="w-full h-56 bg-[var(--color-bg-secondary)] overflow-hidden relative">
        <img
          src={image?.url || image || "/placeholder-skill.jpg"} // Handle object or string
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />
        {/* CATEGORY BADGE */}
        {category && (
          <div className="absolute top-4 left-4">
            <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full bg-[rgba(255,255,255,0.9)] dark:bg-[rgba(0,0,0,0.6)] text-[var(--color-accent)] backdrop-blur-md shadow-sm">
              {category}
            </span>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col flex-1">

        {/* OWNER INFO (Tiny) */}
        {owner && (
          <div className="flex items-center gap-2 mb-3">
            {owner.avatar?.url ? (
              <img src={owner.avatar.url} className="w-6 h-6 rounded-full object-cover" />
            ) : (
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-[10px] text-white font-bold">
                {owner.name?.charAt(0)}
              </div>
            )}
            <span className="text-xs text-[var(--color-text-secondary)]">by {owner.name}</span>
          </div>
        )}

        {/* DATE & TIME */}
        <div className="flex items-center gap-4 text-sm text-[var(--color-text-secondary)] mb-3">
          <span className="flex items-center gap-1.5 bg-[var(--color-bg-secondary)] px-2 py-1 rounded-md">
            <AiOutlineCalendar className="text-[var(--color-accent)]" />
            {formatDate(date)}
          </span>

          <span className="flex items-center gap-1.5 bg-[var(--color-bg-secondary)] px-2 py-1 rounded-md">
            <FiClock className="text-[var(--color-accent)]" />
            {formatTime(time)}
          </span>
        </div>

        {/* TITLE */}
        <h3 className="font-bold text-lg leading-tight line-clamp-2 text-[var(--color-text-primary)] mb-auto group-hover:text-[var(--color-accent)] transition-colors">
          {title}
        </h3>

        {/* PRICE & ACTION */}
        <div className="mt-5 pt-4 border-t border-[var(--color-border)] flex justify-between items-center bg-transparent">
          {price ? (
            <span className="text-lg font-bold text-[var(--color-text-primary)]">
              {price.startsWith("₹") ? price : `₹${price}`}
            </span>
          ) : (
            <span className="text-sm font-semibold text-green-500 bg-green-500/10 px-2 py-1 rounded">Free</span>
          )}

          {/* ACTION BUTTON */}
          {!isOwner && user ? (
            <button
              onClick={handleRequestSwap}
              disabled={requestStatus !== "idle"}
              className={`text-sm font-bold px-4 py-2 rounded-lg transition-all flex items-center gap-2
                ${requestStatus === "success"
                  ? "bg-green-500 text-white"
                  : "bg-[var(--color-accent)] text-white hover:shadow-lg hover:shadow-blue-500/30"
                }
                disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              {requestStatus === "loading" && "Sending..."}
              {requestStatus === "success" && <><FiCheck /> Sent</>}
              {requestStatus === "idle" && <><FiSend /> Request Swap</>}
            </button>
          ) : (
            <button className="text-sm font-semibold text-[var(--color-accent)] hover:underline">
              View Details
            </button>
          )}

        </div>
      </div>
    </motion.div>
  );
}

// DATE → "12 May, 2026"

