import { useState } from "react";

export default function SkillEditor({ title, skills, onSave }) {
  const [input, setInput] = useState("");
  const [list, setList] = useState(skills || []);

  const addSkill = () => {
    if (!input.trim()) return;
    setList([...list, input.trim()]);
    setInput("");
  };

  const removeSkill = (skill) => {
    setList(list.filter((s) => s !== skill));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  }

  return (
    <div className="bg-transparent">
      <h3 className="font-semibold mb-4 text-[var(--color-text-primary)] text-lg">{title}</h3>

      <div className="flex gap-2 mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a skill & press Enter"
          className="flex-1 px-4 py-2.5 rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all placeholder:text-gray-400"
        />
        <button
          onClick={addSkill}
          className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white px-5 rounded-lg font-medium transition-colors"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2 min-h-[50px]">
        {list.length === 0 && (
          <p className="text-sm text-[var(--color-text-secondary)] italic">No skills added yet.</p>
        )}
        {list.map((skill, i) => (
          <span
            key={i}
            className="group bg-[var(--color-bg-secondary)] px-3 py-1.5 rounded-full text-sm font-medium text-[var(--color-text-primary)] flex items-center gap-2 border border-[var(--color-border)]"
          >
            {skill}
            <button
              onClick={() => removeSkill(skill)}
              className="text-red-400 hover:text-red-500 w-4 h-4 flex items-center justify-center rounded-full hover:bg-red-50 dark:hover:bg-red-900/40 transition-colors"
            >
              ✕
            </button>
          </span>
        ))}
      </div>

      {list.length > 0 && (
        <button
          onClick={() => onSave(list)}
          className="mt-6 text-sm text-[var(--color-accent)] font-semibold hover:underline flex items-center gap-1"
        >
          Save Changes
        </button>
      )}
    </div>
  );
}

