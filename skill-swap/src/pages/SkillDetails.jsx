import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";

export default function SkillDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [skill, setSkill] = useState(null);
    const [loading, setLoading] = useState(true);

    // Placeholder fetch
    useEffect(() => {
        // Simulate fetch or use real API if available
        // For now showing a placeholder state as backend might not be fully ready for this specific view
        // or reusing the Skills list data if passed via state
        const fetchSkill = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/skills/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setSkill(data);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchSkill();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center text-[var(--color-text-primary)]">Loading...</div>;

    if (!skill) return <div className="min-h-screen flex items-center justify-center text-[var(--color-text-primary)]">Skill not found</div>;

    return (
        <section className="min-h-screen py-24 px-6 relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -z-10" />

            <div className="max-w-4xl mx-auto glass border border-[var(--color-border)] rounded-3xl p-8 md:p-12 shadow-2xl">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] mb-8 transition-colors font-semibold"
                >
                    <IoArrowBack /> Back to Skills
                </button>

                <div className="grid md:grid-cols-2 gap-10">
                    <div className="rounded-2xl overflow-hidden h-80 bg-gray-100 dark:bg-gray-800">
                        <img src={skill.image || "/placeholder-skill.jpg"} alt={skill.title} className="w-full h-full object-cover" />
                    </div>

                    <div>
                        <span className="inline-block px-3 py-1 bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-bold rounded-full text-sm mb-4">
                            {skill.category || "General"}
                        </span>

                        <h1 className="text-4xl font-extrabold text-[var(--color-text-primary)] mb-4 leading-tight">{skill.title}</h1>

                        <p className="text-[var(--color-text-secondary)] mb-6 text-lg leading-relaxed">
                            Detailed description of the skill would go here. For now, this is a placeholder view using the new design system.
                        </p>

                        <div className="flex flex-col gap-3 mb-8">
                            <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
                                <span className="text-[var(--color-text-secondary)]">Price</span>
                                <span className="font-bold text-[var(--color-text-primary)]">{skill.price || "Free"}</span>
                            </div>
                            <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
                                <span className="text-[var(--color-text-secondary)]">Duration</span>
                                <span className="font-bold text-[var(--color-text-primary)]">{skill.time || "N/A"}</span>
                            </div>
                        </div>

                        <button className="w-full bg-[var(--color-accent)] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:-translate-y-1">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
