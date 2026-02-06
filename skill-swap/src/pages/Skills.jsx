import { useEffect, useState } from "react";
import SkillCard from "../components/SkillCard";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { FiSearch, FiFilter } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const API_URL = "http://localhost:5000/api/skills";

const categories = [
  "All",
  "Technology",
  "Design",
  "Lifestyle",
  "Business",
  "Language",
];

export default function Skills() {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);

  const ITEMS_PER_PAGE = 6; // Increased to 6 for better grid

  // 🔄 FETCH SKILLS FROM BACKEND
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_URL);
        const data = await res.json();
        if (!res.ok) throw new Error();
        setSkills(data);
      } catch (err) {
        setError("Failed to load skills. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // 🔍 FILTER + SEARCH
  const filteredSkills = skills.filter((skill) => {
    const matchCategory =
      activeCategory === "All" ||
      skill.category?.toLowerCase() === activeCategory.toLowerCase();

    const matchSearch = skill.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  // 🔢 PAGINATION LOGIC
  const totalPages = Math.ceil(filteredSkills.length / ITEMS_PER_PAGE);

  const visibleSkills = filteredSkills.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  // 🔁 reset page when filter/search changes
  useEffect(() => {
    setPage(0);
  }, [activeCategory, search]);

  return (
    <section className="relative min-h-screen py-24 px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto text-center">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-[var(--color-text-primary)]">
            Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">Skills</span>
          </h2>

          <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto mb-10">
            Explore a diverse range of skills contributed by passionate learners
            and experts from around the world.
          </p>
        </motion.div>

        {/* SEARCH */}
        <div className="max-w-lg mx-auto mb-12 relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400 text-xl group-focus-within:text-[var(--color-accent)] transition-colors" />
          </div>

          <input
            type="text"
            placeholder="Search skills (e.g. React, Cooking)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-6 py-4 rounded-full bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] shadow-lg focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
          />
        </div>


        {/* CATEGORY FILTER */}
        <div className="flex justify-center gap-3 mb-14 flex-wrap">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setActiveCategory(item)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm
                ${activeCategory === item
                  ? "bg-[var(--color-accent)] text-white shadow-lg shadow-blue-500/30 scale-105"
                  : "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        {loading && <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div></div>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            {/* GRID */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            >
              {visibleSkills.length > 0 ? (
                visibleSkills.map((skill) => (
                  <SkillCard key={skill._id} skill={skill} />
                ))
              ) : (
                <p className="col-span-full text-[var(--color-text-secondary)] text-lg py-10">
                  No skills found matching your criteria.
                </p>
              )}
            </motion.div>

            {/* PREV / NEXT ARROWS */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-6">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 0))}
                  disabled={page === 0}
                  className="w-14 h-14 rounded-full flex items-center justify-center bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] hover:bg-[var(--color-accent)] hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-[var(--color-bg-secondary)] disabled:hover:text-[var(--color-text-primary)] shadow-md"
                >
                  <IoArrowBack size={24} />
                </button>

                <button
                  onClick={() =>
                    setPage((p) => Math.min(p + 1, totalPages - 1))
                  }
                  disabled={page === totalPages - 1}
                  className="w-14 h-14 rounded-full flex items-center justify-center bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] hover:bg-[var(--color-accent)] hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-[var(--color-bg-secondary)] disabled:hover:text-[var(--color-text-primary)] shadow-md"
                >
                  <IoArrowForward size={24} />
                </button>
              </div>
            )}
          </>
        )}

        {/* CTA */}
        <div className="glass border border-[var(--color-border)] rounded-3xl p-10 mt-20 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-left shadow-xl">
          <div>
            <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Ready to specific your skill?</h3>
            <p className="text-[var(--color-text-secondary)]">Join our community and start sharing your knowledge today.</p>
          </div>
          <button className="bg-[var(--color-accent)] px-8 py-3.5 rounded-xl font-bold text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all hover:-translate-y-1" onClick={() => navigate("/get-started")}>
            Get Started
          </button>
        </div>

      </div>
    </section>
  );
}


