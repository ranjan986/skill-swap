import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SkillEditor from "../components/SkillEditor";
import AddSkillForm from "../components/AddSkillForm";
import { motion } from "framer-motion";
import { FiLogOut, FiEdit2, FiSearch, FiCheck, FiX } from "react-icons/fi";
import axios from "../api/axios";

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  const saveSkills = async (type, skills) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put("/api/user/skills", { [type]: skills }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile((prev) => ({
        ...prev,
        [type]: skills,
      }));
    } catch (err) {
      console.error("Failed to save skills:", err);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen pt-16"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  }

  return (
    <section className="relative min-h-screen pt-24 px-6 pb-20">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6"
        >
          <div>
            <h2 className="text-4xl font-bold text-[var(--color-text-primary)]">
              Welcome back, <span className="text-[var(--color-accent)]">{profile.name}</span> 👋
            </h2>
            <p className="text-[var(--color-text-secondary)] mt-1 text-lg">
              Here’s what’s happening with your account
            </p>
          </div>

          <button
            onClick={() => {
              logout();
              navigate("/sign-in");
            }}
            className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 px-5 py-2.5 rounded-lg text-sm font-bold transition-colors w-fit border border-red-500/20"
          >
            <FiLogOut /> Logout
          </button>
        </motion.div>

        {/* PROFILE + STATS */}
        <div className="grid md:grid-cols-3 gap-8 mb-10">

          {/* PROFILE CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="glass border border-[var(--color-border)] rounded-2xl p-6 flex items-center gap-5 shadow-sm"
          >
            {profile.avatar?.url ? (
              <img
                src={profile.avatar.url}
                className="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-slate-700 shadow-md"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-3xl font-bold text-white uppercase shadow-md">
                {profile.name.charAt(0)}
              </div>
            )}

            <div>
              <h3 className="font-bold text-xl text-[var(--color-text-primary)]">{profile.name}</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">{profile.email}</p>
              <button onClick={() => navigate("/profile")} className="text-xs font-semibold text-[var(--color-accent)] hover:underline mt-1">
                View Profile
              </button>
            </div>
          </motion.div>

          {/* STATS */}
          <StatCard
            title="Skills Teaching"
            value={profile.skillsToTeach?.length || 0}
            delay={0.2}
          />
          <StatCard
            title="Skills Learning"
            value={profile.skillsToLearn?.length || 0}
            delay={0.3}
          />
        </div>

        {/* SWAP REQUESTS INBOX */}
        <SwapRequestsSection />

        {/* TEACH / LEARN SKILLS */}
        <div className="grid md:grid-cols-2 gap-8 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass border border-[var(--color-border)] rounded-2xl p-6 shadow-sm"
          >
            <h3 className="font-bold text-lg mb-4 text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-2 flex items-center gap-2">
              Skills I Teach
            </h3>
            <SkillEditor
              skills={profile.skillsToTeach || []}
              onSave={(skills) => saveSkills("skillsToTeach", skills)}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass border border-[var(--color-border)] rounded-2xl p-6 shadow-sm"
          >
            <h3 className="font-bold text-lg mb-4 text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-2 flex items-center gap-2">
              Skills I Want to Learn
            </h3>
            <SkillEditor
              skills={profile.skillsToLearn || []}
              onSave={(skills) => saveSkills("skillsToLearn", skills)}
            />
          </motion.div>
        </div>

        {/* ADD SKILL SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass border border-[var(--color-border)] rounded-2xl p-8 mb-10 shadow-md"
        >
          <h3 className="text-2xl font-bold mb-6 text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-4 flex items-center gap-2">
            🚀 Add New Skill to Marketplace
          </h3>
          <AddSkillForm />
        </motion.div>

        {/* ACTIONS */}
        <div className="glass border border-[var(--color-border)] rounded-2xl p-8">
          <h3 className="font-bold text-lg mb-4 text-[var(--color-text-primary)]">Quick Actions</h3>

          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => navigate("/edit-profile")}
              className="px-6 py-3 rounded-lg font-medium text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20"
            >
              <FiEdit2 /> Edit Profile
            </button>

            <button
              onClick={() => navigate("/skills")}
              className="px-6 py-3 rounded-lg font-medium bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] border border-[var(--color-border)] hover:bg-gray-200 dark:hover:bg-slate-700 transition flex items-center gap-2"
            >
              <FiSearch /> Explore Skills
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}


function StatCard({ title, value, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className="glass border border-[var(--color-border)] rounded-2xl p-6 text-center shadow-sm flex flex-col justify-center items-center backdrop-blur-sm"
    >
      <h4 className="text-[var(--color-text-secondary)] font-medium text-sm uppercase tracking-wide">{title}</h4>
      <p className="text-4xl font-extrabold mt-3 text-[var(--color-text-primary)]">{value}</p>
    </motion.div>
  );
}

function SwapRequestsSection() {
  const [requests, setRequests] = useState({ incoming: [], outgoing: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("/api/requests/my-requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(data);
    } catch (err) {
      console.error("Failed to load requests", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`/api/requests/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchRequests(); // Reload list
    } catch (err) {
      console.error("Action failed", err);
    }
  };

  if (loading) return <div className="mb-10 text-center text-sm text-[var(--color-text-secondary)]">Loading requests...</div>;
  if (!requests.incoming.length && !requests.outgoing.length) return null;

  return (
    <div className="grid md:grid-cols-2 gap-8 mb-14">
      {/* INCOMING */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass border border-[var(--color-border)] rounded-2xl p-6 shadow-sm"
      >
        <h3 className="font-bold text-lg mb-4 text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-2 flex items-center gap-2">
          📥 Inbox (Requests to You)
        </h3>
        <div className="space-y-4">
          {requests.incoming.length === 0 && <p className="text-sm text-[var(--color-text-secondary)]">No incoming requests.</p>}
          {requests.incoming.map((req) => (
            <div key={req._id} className="p-3 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center gap-3">
              <img src={req.requester.avatar?.url || "https://via.placeholder.com/40"} className="w-10 h-10 rounded-full object-cover" />
              <div className="flex-1">
                <p className="text-sm font-bold text-[var(--color-text-primary)]">{req.requester.name}</p>
                <p className="text-xs text-[var(--color-text-secondary)]">Wants: <span className="text-[var(--color-accent)]">{req.skill.title}</span></p>
              </div>
              {req.status === "pending" ? (
                <div className="flex gap-2">
                  <button onClick={() => handleAction(req._id, "accepted")} className="p-2 bg-green-500/10 text-green-600 rounded-lg hover:bg-green-500/20"><FiCheck /></button>
                  <button onClick={() => handleAction(req._id, "rejected")} className="p-2 bg-red-500/10 text-red-600 rounded-lg hover:bg-red-500/20"><FiX /></button>
                </div>
              ) : (
                <div className="text-right">
                  <span className={`text-xs font-bold px-2 py-1 rounded capitalize ${req.status === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{req.status}</span>
                  {req.status === 'accepted' && (
                    <p className="text-xs text-[var(--color-text-primary)] mt-1 font-semibold">📧 {req.requester.email}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* OUTGOING */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass border border-[var(--color-border)] rounded-2xl p-6 shadow-sm"
      >
        <h3 className="font-bold text-lg mb-4 text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-2 flex items-center gap-2">
          📤 Sent Requests
        </h3>
        <div className="space-y-4">
          {requests.outgoing.length === 0 && <p className="text-sm text-[var(--color-text-secondary)]">No sent requests.</p>}
          {requests.outgoing.map((req) => (
            <div key={req._id} className="p-3 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center gap-3">
              <img src={req.skill.image?.url || "https://via.placeholder.com/40"} className="w-10 h-10 rounded-md object-cover" />
              <div className="flex-1">
                <p className="text-sm font-bold text-[var(--color-text-primary)]">{req.skill.title}</p>
                <p className="text-xs text-[var(--color-text-secondary)]">To: {req.recipient.name}</p>
              </div>
              <div className="text-right">
                <span className={`text-xs font-bold px-2 py-1 rounded capitalize 
                   ${req.status === 'accepted' ? 'bg-green-100 text-green-700' :
                    req.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {req.status}
                </span>
                {req.status === 'accepted' && (
                  <p className="text-xs text-[var(--color-text-primary)] mt-1 font-semibold">📧 {req.recipient.email}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}


