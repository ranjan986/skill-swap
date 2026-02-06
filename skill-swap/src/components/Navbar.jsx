import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const springSoft = { type: "spring", stiffness: 260, damping: 20 };

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/sign-in");
  };

  useEffect(() => {
    const close = (e) =>
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target) &&
      setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <motion.nav
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 glass border-b border-[var(--color-border)]"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.06, rotate: -10 }}
            transition={springSoft}
            className="w-9 h-9 rounded-xl
            bg-gradient-to-br from-blue-600 to-indigo-600
            flex items-center justify-center
            text-white font-bold text-lg shadow-lg shadow-blue-500/30"
          >
            S
          </motion.div>
          <span className="font-bold text-[var(--color-text-primary)] tracking-tight text-lg group-hover:text-blue-500 transition-colors">
            SkillSwap
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <ul className="hidden md:flex items-center gap-8 text-[14px] font-medium text-[var(--color-text-secondary)]">
          {["Home", "How It Works", "Skills", "Community", "FAQ"].map((item) => {
            const to =
              item === "Home"
                ? "/"
                : `/${item.toLowerCase().replace(/ /g, "-")}`;

            return (
              <li key={item} className="relative">
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `relative px-1 transition-colors duration-200
                     ${isActive ? "text-[var(--color-accent)] font-semibold" : "hover:text-[var(--color-text-primary)]"}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item}
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute left-0 -bottom-1 h-[2px] w-full rounded-full bg-[var(--color-accent)]"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-4">

          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] transition-colors"
          >
            {theme === "dark" ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
          </button>

          {!user ? (
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="hidden md:block">
              <Link
                to="/get-started"
                className="px-5 py-2 rounded-lg text-sm font-semibold
                bg-gradient-to-r from-blue-600 to-indigo-600
                text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition"
              >
                Get Started
              </Link>
            </motion.div>
          ) : (
            <div className="relative hidden md:block" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-[var(--color-bg-secondary)] transition-colors"
              >
                {user.avatar?.url ? (
                  <img
                    src={user.avatar.url}
                    alt={user.fullName}
                    className="w-8 h-8 rounded-full object-cover border border-[var(--color-border)]"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full
                  bg-gradient-to-br from-blue-600 to-indigo-600
                  flex items-center justify-center
                  text-white font-semibold text-sm">
                    {user.fullName?.charAt(0)}
                  </div>
                )}
                <span className="text-sm font-medium text-[var(--color-text-primary)] max-w-[120px] truncate">
                  {user.fullName}
                </span>
                <FiChevronDown className={`text-[var(--color-text-secondary)] transition-transform ${open ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={springSoft}
                    className="absolute right-0 mt-2 w-48
                    bg-[var(--color-bg-primary)] border border-[var(--color-border)]
                    rounded-xl shadow-xl overflow-hidden glass"
                  >
                    {["Profile", "Dashboard"].map((item) => (
                      <Link
                        key={item}
                        to={`/${item.toLowerCase()}`}
                        onClick={() => setOpen(false)}
                        className="block px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-accent)] transition-colors"
                      >
                        {item}
                      </Link>
                    ))}
                    <div className="border-t border-[var(--color-border)] my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* MOBILE MENU TOGGLE */}
          <button
            className="md:hidden p-2 text-[var(--color-text-primary)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-[var(--color-border)] overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              {["Home", "How It Works", "Skills", "Community", "FAQ"].map((item) => (
                <NavLink
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase().replace(/ /g, "-")}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors ${isActive ? "text-[var(--color-accent)]" : "text-[var(--color-text-secondary)]"}`
                  }
                >
                  {item}
                </NavLink>
              ))}
              <div className="border-t border-[var(--color-border)] pt-4">
                {!user ? (
                  <Link
                    to="/get-started"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center py-2 rounded-lg text-sm font-semibold
                   bg-[var(--color-accent)] text-white shadow-md"
                  >
                    Get Started
                  </Link>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                        {user.fullName?.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[var(--color-text-primary)]">{user.fullName}</p>
                        <p className="text-xs text-[var(--color-text-secondary)]">{user.email}</p>
                      </div>
                    </div>
                    <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-[var(--color-text-secondary)]">Profile</Link>
                    <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-[var(--color-text-secondary)]">Dashboard</Link>
                    <button onClick={handleLogout} className="block w-full text-left py-2 text-sm text-red-500">Logout</button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
