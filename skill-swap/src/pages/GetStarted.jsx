import { useState } from "react";
import { FaUserPlus, FaChalkboardTeacher, FaRocket } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { FcGoogle } from "react-icons/fc";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const GOOGLE_API_URL = "http://localhost:5000/api/auth/google";

export default function GetStarted() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Needed for Google Login

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      alert("Registration Successful!");
      navigate("/sign-in");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const res = await fetch(GOOGLE_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Google Signup failed");

      localStorage.setItem("token", data.token);
      login({
        fullName: data.user.name,
        email: data.user.email,
        avatar: data.user.avatar || "",
      });

      navigate("/dashboard");
    } catch (err) {
      console.error("Google Signup Error:", err);
      setError(err.message);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 px-6 overflow-hidden">
      {/* Background Gradient Blurs */}
      <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-teal-500/10 to-transparent blur-3xl -z-10" />
      <div className="absolute top-0 left-0 w-2/3 h-2/3 bg-gradient-to-br from-indigo-500/10 to-transparent blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center w-full">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-[var(--color-text-primary)]">
            Get Started With <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">SkillSwap</span>
          </h2>

          <p className="mt-6 text-[var(--color-text-secondary)] text-lg max-w-md leading-relaxed">
            Create your profile and start exchanging skills instantly. Join a community of lifelong learners.
          </p>

          <div className="mt-10 space-y-6">
            {[FaUserPlus, FaChalkboardTeacher, FaRocket].map((Icon, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex gap-4 items-center"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-secondary)] flex items-center justify-center text-[var(--color-accent)] text-xl border border-[var(--color-border)] shadow-sm">
                  <Icon />
                </div>
                <div>
                  <p className="text-[var(--color-text-primary)] font-bold">Step {i + 1}</p>
                  <p className="text-[var(--color-text-secondary)] text-sm">
                    {i === 0 ? "Create your free account" : i === 1 ? "Find a skill to learn or teach" : "Grow and launch your potential"}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT REGISTER CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md mx-auto"
        >
          <h3 className="text-3xl font-bold mb-2 text-[var(--color-text-primary)]">Join Today</h3>
          <p className="text-[var(--color-text-secondary)] mb-8">Start your learning journey now</p>

          {error && (
            <div className="p-3 mb-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-lg border border-red-200 dark:border-red-800">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-gray-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-lg font-bold text-white shadow-lg shadow-green-500/40 transition-all
              bg-gradient-to-r from-green-600 to-teal-600 hover:shadow-green-500/50 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? "Creating Account..." : "Get Started"}
            </button>
          </form>

          {/* DIVIDER */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--color-border)]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] rounded full">Or continue with</span>
            </div>
          </div>

          {/* GOOGLE LOGIN */}
          <button
            onClick={handleGoogleSignup}
            className="w-full py-3.5 rounded-lg font-bold text-[var(--color-text-primary)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:bg-gray-100 dark:hover:bg-gray-800 transition-all flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
          >
            <FcGoogle className="text-2xl" />
            Sign up with Google
          </button>


          <p className="text-sm text-[var(--color-text-secondary)] mt-8 text-center">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>

      </div>
    </section>
  );
}

