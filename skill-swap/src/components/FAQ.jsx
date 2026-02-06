import { useState } from "react";
import { faqs } from "../data/faqs";
import { IoAdd, IoRemove } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const [active, setActive] = useState(0);

  const toggleFAQ = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section className="relative py-24">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">

        {/* LEFT TEXT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-[var(--color-text-primary)]">
            Got Question? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">We've Got Answers</span>
          </h2>

          <p className="mt-6 text-[var(--color-text-secondary)] text-lg max-w-md leading-relaxed">
            Everything you need to know about SkillSwap. Can’t find the answer
            you’re looking for? Reach out to our support team.
          </p>
        </motion.div>

        {/* RIGHT ACCORDION */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${active === index ? 'border-[var(--color-accent)] bg-[var(--color-bg-primary)] shadow-lg' : 'border-[var(--color-border)] glass'}`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-5 font-bold text-left text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors"
              >
                {faq.question}
                <div className={`p-1 rounded-full ${active === index ? 'bg-[var(--color-accent)] text-white' : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]'} transition-colors`}>
                  {active === index ? <IoRemove className="text-lg" /> : <IoAdd className="text-lg" />}
                </div>
              </button>

              <AnimatePresence>
                {active === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-[var(--color-text-secondary)] text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
