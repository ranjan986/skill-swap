import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Hero3D from "../components/Hero3D";
import Skills from "../pages/Skills";
import Testimonial from "../components/Testimonial";
import FAQ from "../components/FAQ";
import Community from "../components/Community";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";

import { MdOutlineCategory } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <MdOutlineCategory />,
      title: "Skill Marketplace",
      desc: "Browse a diverse catalog of skills and knowledge areas, from cooking and coding to photography and languages.",
    },
    {
      icon: <BsStars />,
      title: "Trusted Community",
      desc: "Learn and teach in a safe, supportive community built around trust, reviews, and shared goals.",
    },
    {
      icon: <HiOutlineSwitchHorizontal />,
      title: "Skill Exchange",
      desc: "Exchange skills instead of money and grow together by teaching what you know and learning what you love.",
    },
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative w-full min-h-screen flex items-center overflow-hidden pt-16">
        <Hero3D />

        <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full z-10">

          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-semibold text-sm mb-6 border border-[var(--color-accent)]/20">
              🚀 The Future of Learning is Here
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] text-[var(--color-text-primary)] mb-6 tracking-tight">
              Master New Skills <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Without Limits
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] mb-8 leading-relaxed max-w-lg">
              Unlock a world of possibilities. Connect, teach, and learn from a global community of experts and enthusiasts. Join the revolution today.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/get-started")}
                className="px-8 py-4 rounded-xl text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all"
              >
                Get Started Now
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/how-it-works")}
                className="px-8 py-4 rounded-xl text-lg font-bold bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] border border-[var(--color-border)] shadow-sm hover:bg-[var(--color-bg-secondary)] transition-all"
              >
                How It Works
              </motion.button>
            </div>

            <div className="mt-12 flex items-center gap-4 text-sm text-[var(--color-text-secondary)]">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[var(--color-bg-primary)] bg-gray-300 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p>Join <span className="font-bold text-[var(--color-text-primary)]">10,000+</span> learners today.</p>
            </div>
          </motion.div>

          {/* Hero Spacer for 3D element visibility on Desktop */}
          <div className="hidden md:block h-full min-h-[500px]"></div>

        </div>

        {/* Background Gradient Blurs */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-blue-500/10 to-transparent blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-tr from-purple-500/10 to-transparent blur-3xl -z-10" />
      </section>

      {/* FEATURES */}
      <section className="bg-[var(--color-bg-secondary)] py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">

          {/* HEADING */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <h2 className="text-4xl font-extrabold leading-tight text-[var(--color-text-primary)]">
              Learn{" "}
              <span className="text-[var(--color-accent)]">Something New</span>
              <br /> For Free
            </h2>

            <p className="text-[var(--color-text-secondary)] mt-3 max-w-md mx-auto">
              Meet new people and exchange real skills to achieve your goals 🚀
            </p>
          </motion.div>

          {/* FEATURE CARDS */}
          <div className="grid md:grid-cols-3 gap-12 mt-20">
            {features.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="p-10 rounded-2xl border border-[var(--color-border)] glass-hover bg-[var(--color-card-bg)]
                hover:shadow-xl transition group"
              >
                <div className="w-14 h-14 flex items-center justify-center
                rounded-2xl bg-blue-500/10 text-[var(--color-accent)] text-2xl mb-5 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>

                <h3 className="font-bold text-xl text-[var(--color-text-primary)] mb-3">
                  {item.title}
                </h3>

                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                  {item.desc}
                </p>

                <button className="mt-6 text-[var(--color-accent)] font-medium text-sm hover:underline flex items-center gap-1 group/btn">
                  Learn More <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPLORE SKILLS */}
      <Skills />

      {/* TESTIMONIAL */}
      <Testimonial />

      {/* COMMUNITY */}
      <Community />

      {/* HOW IT WORKS */}
      <HowItWorks />

      {/* FAQ */}
      <FAQ />

      {/* FOOTER */}
      <Footer />
    </>
  );
}

