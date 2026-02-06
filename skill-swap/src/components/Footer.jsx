import {
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

export default function Footer({
  brand = {
    name: "Skill",
    highlight: "Swap",
    description:
      "SkillSwap helps people exchange skills instead of money. Learn, teach, and grow together in a global community.",
  },

  sections = [
    {
      title: "Company",
      links: ["About Us", "How It Works", "Community", "Careers"],
    },
    {
      title: "Support",
      links: ["Help Center", "FAQs", "Privacy Policy", "Terms & Conditions"],
    },
  ],

  newsletter = {
    title: "Join Our Newsletter",
    description: "Get updates about new skills and community events.",
    placeholder: "Enter your email",
    buttonText: "Join",
  },

  socials = [
    { icon: <FaInstagram />, href: "https://www.instagram.com/an_atheist_ranjan_kushwaha" },
    { icon: <FaTwitter />, href: "#" },
    { icon: <FaLinkedinIn />, href: "https://www.linkedin.com/in/ranjan-kushwaha-374b00253" },
  ],
}) {
  return (
    <footer className="bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* TOP */}
        <div className="grid md:grid-cols-4 gap-12 pb-14 border-b border-[var(--color-border)]">

          {/* BRAND */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-extrabold mb-5 text-[var(--color-text-primary)]">
              {brand.name}
              <span className="text-[var(--color-accent)]">{brand.highlight}</span>
            </h3>

            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
              {brand.description}
            </p>
          </div>

          {/* LINK SECTIONS */}
          {sections.map((section, idx) => (
            <div key={idx}>
              <h4 className="font-bold mb-5 text-[var(--color-text-primary)]">{section.title}</h4>
              <ul className="space-y-3 text-sm text-[var(--color-text-secondary)]">
                {section.links.map((link, i) => (
                  <li
                    key={i}
                    className="hover:text-[var(--color-accent)] cursor-pointer transition-colors"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* NEWSLETTER */}
          <div>
            <h4 className="font-bold mb-5 text-[var(--color-text-primary)]">
              {newsletter.title}
            </h4>

            <p className="text-sm text-[var(--color-text-secondary)] mb-5">
              {newsletter.description}
            </p>

            <div className="flex items-center bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/50 transition-all">
              <input
                type="email"
                placeholder={newsletter.placeholder}
                className="px-4 py-3 text-sm w-full outline-none bg-transparent text-[var(--color-text-primary)] placeholder:text-gray-400"
              />
              <button className="bg-[var(--color-accent)] px-5 py-3 font-semibold text-white hover:bg-[var(--color-accent-hover)] transition-colors">
                {newsletter.buttonText}
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-6">

          <p className="text-sm text-[var(--color-text-secondary)] text-center md:text-left">
            © {new Date().getFullYear()} {brand.name}
            <span className="text-[var(--color-accent)]">{brand.highlight}</span>. All rights reserved.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-5 text-[var(--color-text-secondary)] text-xl">
            {socials.map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-accent)] hover:-translate-y-1 transition-all"
              >
                {social.icon}
              </a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}
