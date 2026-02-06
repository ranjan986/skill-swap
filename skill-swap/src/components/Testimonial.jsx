import { useState } from "react";
import { testimonials } from "../data/testimonials";
import { FaQuoteRight } from "react-icons/fa";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { motion } from "framer-motion";

export default function Testimonial() {
  const [slide, setSlide] = useState(0);

  // kitne slides banenge (2 cards per slide)
  const totalSlides = Math.ceil(testimonials.length / 2);

  const prevSlide = () => {
    setSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const nextSlide = () => {
    setSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* BG Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rotate-12 blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold leading-tight text-[var(--color-text-primary)]"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">Swapped Skills</span>, <br />
            Shared Success
          </motion.h2>

          <div className="flex gap-4">
            <button
              onClick={prevSlide}
              className="w-14 h-14 rounded-full bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] flex items-center justify-center hover:bg-[var(--color-accent)] hover:text-white transition-all shadow-md"
            >
              <IoArrowBack size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="w-14 h-14 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center hover:shadow-lg hover:shadow-blue-500/30 transition-all shadow-md"
            >
              <IoArrowForward size={24} />
            </button>
          </div>
        </div>

        {/* SLIDER WINDOW */}
        <div className="overflow-hidden py-4">
          {/* SLIDER TRACK */}
          <motion.div
            className="flex"
            animate={{ x: `-${slide * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* EACH SLIDE */}
            {Array.from({ length: totalSlides }).map((_, i) => (
              <div
                key={i}
                className="min-w-full grid md:grid-cols-2 gap-8 px-1"
              >
                {testimonials
                  .slice(i * 2, i * 2 + 2)
                  .map((item, idx) => (
                    <TestimonialCard key={idx} data={item} />
                  ))}
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}

function TestimonialCard({ data }) {
  return (
    <div className="glass p-8 rounded-3xl border border-[var(--color-border)] shadow-sm hover:shadow-xl transition-all h-full flex flex-col">
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[var(--color-bg-secondary)] text-[var(--color-accent)] text-2xl mb-6 shadow-sm">
        <FaQuoteRight />
      </div>

      <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed mb-8 flex-1 italic">
        "{data.text}"
      </p>

      <div className="flex items-center gap-4 border-t border-[var(--color-border)] pt-6">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
        <div>
          <h3 className="font-bold text-[var(--color-text-primary)]">{data.name}</h3>
          <p className="text-sm text-[var(--color-text-secondary)] font-medium">{data.role}</p>
        </div>
      </div>
    </div>
  );
}
