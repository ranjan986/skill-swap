import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { FcGoogle } from "react-icons/fc";

const API_URL = "http://localhost:5000/api/auth/login";
const GOOGLE_API_URL = "http://localhost:5000/api/auth/google";

export default function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save token
      localStorage.setItem("token", data.token);

      // Save user in AuthContext
      login({
        fullName: data.user.name,
        email: data.user.email,
        avatar: data.user.avatar || "",
      });

      // Redirect after login
      navigate("/");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
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

      if (!res.ok) throw new Error(data.message || "Google Login failed");

      localStorage.setItem("token", data.token);
      login({
        fullName: data.user.name,
        email: data.user.email,
        avatar: data.user.avatar || "",
      });

      navigate("/dashboard");
    } catch (err) {
      console.error("Google Login Error:", err);
      setError(err.message);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 px-6 overflow-hidden">
      {/* Background Gradient Blurs */}
      <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-bl from-blue-500/10 to-transparent blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-gradient-to-tr from-purple-500/10 to-transparent blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full">

        {/* LEFT INFO */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:block"
        >
          <h2 className="text-5xl font-extrabold leading-tight text-[var(--color-text-primary)]">
            Welcome Back to
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">SkillSwap</span>
          </h2>

          <p className="mt-6 text-[var(--color-text-secondary)] text-lg max-w-md leading-relaxed">
            Sign in to continue exchanging skills, connecting with learners,
            and growing together in the SkillSwap community.
          </p>
        </motion.div>

        {/* RIGHT SIGN IN CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md mx-auto"
        >
          <h3 className="text-3xl font-bold mb-2 text-[var(--color-text-primary)]">Sign In</h3>
          <p className="text-[var(--color-text-secondary)] mb-8">Please enter your details</p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-lg border border-red-200 dark:border-red-800">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-gray-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* OPTIONS */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] font-medium"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-lg font-bold text-white shadow-lg shadow-blue-500/40 transition-all
              bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-blue-500/50 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? "Signing In..." : "Sign In"}
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
            onClick={handleGoogleLogin}
            className="w-full py-3.5 rounded-lg font-bold text-[var(--color-text-primary)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:bg-gray-100 dark:hover:bg-gray-800 transition-all flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
          >
            <FcGoogle className="text-2xl" />
            Sign in with Google
          </button>


          <p className="text-sm text-[var(--color-text-secondary)] mt-8 text-center">
            Don’t have an account?{" "}
            <Link
              to="/get-started"
              className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] font-bold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </motion.div>

      </div>
    </section>
  );
}
