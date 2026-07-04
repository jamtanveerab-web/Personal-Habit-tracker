import React, { useState } from "react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function HabitList({
  habits,
  onToggleDay,
  onUpdateGoal,
  onRemove,
  onAdd,
}) {
  const [newName, setNewName] = useState("");
  const [newGoal, setNewGoal] = useState(7);

  const handleAdd = () => {
    const name = newName.trim();
    if (!name) return;
    onAdd(name, Math.max(1, Math.min(7, Number(newGoal) || 7)));
    setNewName("");
    setNewGoal(7);
  };

  return (
    <>
      <div className="section-title">
        <span className="idx">02</span>
        <h2>Habit Management</h2>
        <div className="line"></div>
      </div>
      <div className="habit-card">
        <div className="habit-head">
          <span className="first">Habit</span>
          {DAYS.map((d) => (
            <span key={d}>{d}</span>
          ))}
          <span></span>
        </div>

        {habits.length === 0 && (
          <div className="empty">No habits yet. Add your first one below.</div>
        )}

        {habits.map((h) => (
          <div className="habit-row" key={h._id}>
            <div className="habit-name-wrap">
              <div className="habit-name">{h.name}</div>
              <div className="habit-goal-edit">
                <label>Goal /wk</label>
                <input
                  type="number"
                  min="1"
                  max="7"
                  value={h.goal}
                  onChange={(e) => onUpdateGoal(h._id, e.target.value)}
                />
              </div>
            </div>
            {h.days.map((checked, i) => (
              <div
                key={i}
                className={"led" + (checked ? " on" : "")}
                onClick={() => onToggleDay(h._id, i)}
                title={DAYS[i]}
              ></div>
            ))}
            <button
              className="remove-btn"
              onClick={() => onRemove(h._id)}
              title="Remove habit"
            >
              ×
            </button>
          </div>
        ))}

        <div className="add-row">
          <input
            type="text"
            placeholder="New habit, e.g. 'No sugar'"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAdd();
            }}
          />
          <div className="goal-input">
            <input
              type="number"
              min="1"
              max="7"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              title="Weekly goal (days)"
            />
          </div>
          <button className="add-btn" onClick={handleAdd}>
            + Add Habit
          </button>
        </div>
      </div>
    </>
  );
}
