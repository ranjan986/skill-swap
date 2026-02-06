import { FaSearch, FaExchangeAlt, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Discover Skills",
      desc: "Browse skills you want to learn and list the skills you can teach.",
      icon: <FaSearch />,
    },
    {
      id: 2,
      title: "Connect With People",
      desc: "Find people with matching interests and start a conversation.",
      icon: <FaUsers />,
    },
    {
      id: 3,
      title: "Exchange Skills",
      desc: "Teach what you know and learn something new — no money involved.",
      icon: <FaExchangeAlt />,
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -z-10 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-[var(--color-text-primary)]">
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">Works</span>
          </h2>

          <p className="mt-6 text-[var(--color-text-secondary)] text-lg max-w-md leading-relaxed">
            SkillSwap makes learning simple and human. Follow these easy steps
            to start exchanging skills with people around the world.
          </p>
        </motion.div>

        {/* RIGHT STEPS */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ x: 10, backgroundColor: "var(--color-bg-secondary)" }}
              className="flex gap-6 p-6 rounded-2xl border border-[var(--color-border)] shadow-sm bg-[var(--color-bg-primary)]/50 backdrop-blur-sm transition-all"
            >
              <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-teal-400 text-white font-bold text-xl shadow-lg shadow-blue-500/30">
                {step.id}
              </div>

              <div>
                <h3 className="font-bold text-xl flex items-center gap-3 text-[var(--color-text-primary)] mb-2">
                  <span className="text-[var(--color-accent)]">{step.icon}</span>
                  {step.title}
                </h3>
                <p className="text-[var(--color-text-secondary)]">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
