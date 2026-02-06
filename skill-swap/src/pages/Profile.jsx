import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "../api/axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-screen pt-16"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  if (error) return <div className="flex justify-center items-center min-h-screen pt-16 text-red-500">{error}</div>;

  return (
    <section className="relative min-h-screen pt-24 px-6 overflow-hidden">
      {/* Background Blob */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto glass rounded-2xl p-8 md:p-12 shadow-xl border border-[var(--color-border)]"
      >
        <div className="flex justify-between items-start mb-8">
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">My Profile</h2>
          <Link
            to="/edit-profile"
            className="px-5 py-2 rounded-lg bg-[var(--color-accent)] text-white font-medium hover:bg-[var(--color-accent-hover)] transition shadow-lg shadow-blue-500/30"
          >
            Edit Profile
          </Link>
        </div>

        {/* AVATAR + INFO */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
          <div className="relative group">
            {user.avatar?.url ? (
              <img
                src={user.avatar.url}
                alt={user.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-[var(--color-bg-primary)] shadow-md group-hover:scale-105 transition-transform"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-4xl font-bold text-white uppercase shadow-md group-hover:scale-105 transition-transform">
                {user.name.charAt(0)}
              </div>
            )}
            <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-3xl font-bold text-[var(--color-text-primary)] mb-1">{user.name}</h3>
            <p className="text-[var(--color-text-secondary)] text-lg mb-4">{user.email}</p>
            <div className="flex gap-3 justify-center md:justify-start">
              <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
                Student
              </span>
              <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-semibold uppercase tracking-wider">
                Pro Member
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--color-border)] my-8"></div>

        {/* DETAILS GRID */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
            <p className="text-sm text-[var(--color-text-secondary)] uppercase font-semibold mb-1">User ID</p>
            <p className="text-[var(--color-text-primary)] font-mono text-sm truncate" title={user._id}>{user._id}</p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
            <p className="text-sm text-[var(--color-text-secondary)] uppercase font-semibold mb-1">Joined Date</p>
            <p className="text-[var(--color-text-primary)] font-medium">{new Date(user.createdAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
          </div>
        </div>

      </motion.div>
    </section>
  );
}

