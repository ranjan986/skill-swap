import { communityMembers } from "../data/community";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Community() {
  const navigate = useNavigate();
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-[var(--color-text-primary)]">
            Join Our Growing <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Community</span>
          </h2>

          <p className="mt-6 text-[var(--color-text-secondary)] text-lg max-w-lg leading-relaxed">
            Connect with passionate learners and teachers from around the world.
            Exchange knowledge, grow together, and build meaningful connections.
          </p>

          <button
            className="mt-10 bg-[var(--color-accent)] px-8 py-3.5 rounded-xl font-bold text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all hover:-translate-y-1"
            onClick={() => navigate("/get-started")}
          >
            Join Community
          </button>
        </motion.div>

        {/* RIGHT GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {communityMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="glass p-5 rounded-2xl border border-[var(--color-border)] text-center shadow-sm hover:shadow-xl transition-all"
            >
              {/* Avatar */}
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-slate-700 dark:to-slate-600 mb-4 overflow-hidden shadow-inner">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} alt={member.name} className="w-full h-full object-cover" />
              </div>

              <h3 className="font-bold text-sm text-[var(--color-text-primary)]">{member.name}</h3>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-medium">{member.role}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
