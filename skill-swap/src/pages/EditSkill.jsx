import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiSave, FiArrowLeft } from "react-icons/fi";

const API_URL = "http://localhost:5000/api/skills";

export default function EditSkill() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "",
    price: "",
    time: "",
    date: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSkill = async () => {
      const res = await fetch(`${API_URL}/${id}`);
      const data = await res.json();
      setForm(data);
    };

    fetchSkill();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        navigate("/skills");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 min-h-screen relative flex items-center justify-center">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 to-purple-500/5 -z-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full glass p-8 md:p-10 rounded-2xl border border-[var(--color-border)] shadow-2xl"
      >
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] mb-6 transition-colors font-medium">
          <FiArrowLeft /> Back
        </button>

        <h2 className="text-3xl font-bold mb-8 text-[var(--color-text-primary)]">Edit Skill</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Skill Title"
              className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] outline-none focus:ring-2 focus:ring-blue-500/50 transition-all cursor-pointer"
              >
                <option>Technology</option>
                <option>Design</option>
                <option>Business</option>
                <option>Lifestyle</option>
                <option>Language</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Price</label>
              <input
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Duration</label>
              <input
                name="time"
                value={form.time}
                onChange={handleChange}
                placeholder="Time"
                className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Date</label>
              <input
                name="date"
                type="date"
                value={form.date ? form.date.split('T')[0] : ""}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Image URL</label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[var(--color-accent)] text-white px-6 py-3.5 rounded-lg font-bold w-full hover:shadow-lg hover:shadow-blue-500/30 transition-all mt-4 flex items-center justify-center gap-2"
          >
            {loading ? "Updating..." : <><FiSave /> Update Skill</>}
          </button>
        </form>
      </motion.div>
    </section>
  );
}


