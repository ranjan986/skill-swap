import { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiCamera, FiTrash2, FiSave } from "react-icons/fi";
import { motion } from "framer-motion";

const API_URL = "http://localhost:5000/api/user";

export default function EditProfile() {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const { user, login } = useAuth();
  const [name, setName] = useState(user.fullName || "");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(user.avatar?.url || "");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  /* -------------------------
     FILE SELECT HANDLER
  -------------------------- */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatar(file);
    setPreview(URL.createObjectURL(file)); // instant preview
  };

  /* -------------------------
     SUBMIT
  -------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    if (avatar) formData.append("avatar", avatar);

    try {
      const res = await fetch(`${API_URL}/profile`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        login({
          fullName: data.user.name,
          email: user.email,
          avatar: data.user.avatar,
        });
        navigate("/profile"); // Navigate back to profile instead of home
      }
    } catch (error) {
      console.error("Update failed", error);
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------
     DELETE AVATAR
  -------------------------- */
  const handleDeleteAvatar = async () => {
    if (!window.confirm("Remove profile picture?")) return;

    try {
      const res = await fetch(`${API_URL}/profile/avatar`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        login({
          fullName: user.fullName,
          email: user.email,
          avatar: { url: "", public_id: "" },
        });
        setPreview("");
        setAvatar(null);
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <section className="relative min-h-screen py-24 px-6 overflow-hidden flex items-center justify-center">
      {/* Background Blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] -z-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full mx-auto glass border border-[var(--color-border)] rounded-2xl p-8 md:p-12 shadow-2xl relative"
      >
        <h2 className="text-3xl font-bold mb-8 text-[var(--color-text-primary)] text-center">Edit Profile</h2>

        {/* AVATAR UPLOAD */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative group">
            <div
              className="w-32 h-32 rounded-full overflow-hidden border-4 border-[var(--color-bg-secondary)] shadow-lg cursor-pointer transition-transform hover:scale-105"
              onClick={() => fileRef.current.click()}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white uppercase">
                  {user.fullName?.charAt(0)}
                </div>
              )}
            </div>

            <button
              onClick={() => fileRef.current.click()}
              className="absolute bottom-0 right-0 p-2 bg-[var(--color-accent)] text-white rounded-full shadow-lg hover:bg-[var(--color-accent-hover)] transition-colors"
              title="Change Photo"
            >
              <FiCamera />
            </button>
          </div>

          <div className="mt-4 flex gap-4">
            {/* HIDDEN FILE INPUT */}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {user.avatar?.url && (
              <button
                type="button"
                onClick={handleDeleteAvatar}
                className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 px-3 py-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <FiTrash2 /> Remove Photo
              </button>
            )}
          </div>
        </div>


        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-5 py-3 rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium"
              placeholder="Full Name"
            />
          </div>

          <div className="pt-4 flex gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-1/3 py-3 rounded-lg font-medium text-[var(--color-text-secondary)] bg-[var(--color-bg-secondary)] hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-lg font-bold text-white shadow-lg shadow-blue-500/40 transition-all
                bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-blue-500/50 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? "Saving..." : <><FiSave /> Save Changes</>}
            </button>
          </div>
        </form>

      </motion.div>
    </section>
  );
}


