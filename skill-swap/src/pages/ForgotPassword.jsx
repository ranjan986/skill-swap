import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

const API_URL = "http://localhost:5000/api/auth/forgot-password";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setMessage("Reset link has been sent to your email 📩");
      setEmail("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-blue-500/5 to-purple-500/5 -z-10" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center w-full">

        {/* LEFT INFO */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-extrabold leading-tight text-[var(--color-text-primary)]">
            Forgot Your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">Password?</span>
          </h2>

          <p className="mt-6 text-[var(--color-text-secondary)] text-lg max-w-md">
            No worries! Enter your email address and we’ll send you a link to
            reset your password and regain access to your account.
          </p>
        </motion.div>

        {/* RIGHT CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md mx-auto"
        >
          <h3 className="text-2xl font-bold mb-6 text-[var(--color-text-primary)]">
            Reset Password
          </h3>

          <form className="space-y-5" onSubmit={handleSubmit}>

            {error && (
              <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-lg border border-red-200 dark:border-red-800">
                {error}
              </div>
            )}

            {message && (
              <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm rounded-lg border border-green-200 dark:border-green-800">
                {message}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">Email Address</label>
              <input
                type="email"
                placeholder="Enter your registered email"
                className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-lg font-bold text-white shadow-lg shadow-teal-500/40 transition-all
              bg-gradient-to-r from-teal-500 to-blue-500 hover:shadow-teal-500/50 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <p className="text-sm text-[var(--color-text-secondary)] mt-8 text-center">
            Remember your password?{" "}
            <Link
              to="/sign-in"
              className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] font-bold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </motion.div>

      </div>
    </section>
  );
}


