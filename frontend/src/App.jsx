import React, { useEffect, useMemo, useState } from "react";
import OverallStats from "./components/OverallStats.jsx";
import DailyProgress from "./components/DailyProgress.jsx";
import HabitList from "./components/HabitList.jsx";
import AnalysisTable from "./components/AnalysisTable.jsx";
import {
  getHabits,
  createHabit,
  toggleDay,
  updateGoal,
  deleteHabit,
} from "./api/habits.js";

function todayIndex() {
  // JS getDay(): 0=Sun..6=Sat -> map to Mon=0..Sun=6
  const d = new Date().getDay();
  return d === 0 ? 6 : d - 1;
}

export default function App() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [apiOnline, setApiOnline] = useState(false);
  const today = todayIndex();

  const loadHabits = async () => {
    try {
      const data = await getHabits();
      setHabits(data);
      setApiOnline(true);
      setError("");
    } catch (err) {
      setApiOnline(false);
      setError(
        "Can't reach the API. Make sure the backend server is running on port 5000."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHabits();
  }, []);

  const handleAdd = async (name, goal) => {
    try {
      const created = await createHabit(name, goal);
      setHabits((hs) => [...hs, created]);
    } catch (err) {
      setError("Couldn't add habit. Please try again.");
    }
  };

  const handleToggleDay = async (id, dayIndex) => {
    // Optimistic update
    setHabits((hs) =>
      hs.map((h) =>
        h._id === id
          ? { ...h, days: h.days.map((v, i) => (i === dayIndex ? !v : v)) }
          : h
      )
    );
    try {
      await toggleDay(id, dayIndex);
    } catch (err) {
      setError("Couldn't save that change. Reloading habits.");
      loadHabits();
    }
  };

  const handleUpdateGoal = async (id, goal) => {
    const num = Math.max(1, Math.min(7, Number(goal) || 1));
    setHabits((hs) => hs.map((h) => (h._id === id ? { ...h, goal: num } : h)));
    try {
      await updateGoal(id, num);
    } catch (err) {
      setError("Couldn't update goal. Reloading habits.");
      loadHabits();
    }
  };

  const handleRemove = async (id) => {
    const prev = habits;
    setHabits((hs) => hs.filter((h) => h._id !== id));
    try {
      await deleteHabit(id);
    } catch (err) {
      setError("Couldn't delete habit. Restoring list.");
      setHabits(prev);
    }
  };

  const analysis = useMemo(
    () =>
      habits.map((h) => {
        const actual = h.days.filter(Boolean).length;
        const pct = h.goal > 0 ? Math.round((actual / h.goal) * 100) : 0;
        return { ...h, actual, pct };
      }),
    [habits]
  );

  return (
    <div className="wrap">
      <div className="header">
        <div>
          <p className="brand-eyebrow">Personal Operating System</p>
          <h1 className="brand-title">Discipline</h1>
          <p className="brand-sub">
            Weekly habit console — track it, or it didn't happen.
          </p>
          <div className="api-status">
            <span className={"api-dot" + (apiOnline ? " ok" : "")}></span>
            {apiOnline ? "Connected to MongoDB via API" : "API offline"}
          </div>
        </div>
        <div className="date-chip">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
          })}
        </div>
      </div>

      {error && <div className="error-banner">{error}</div>}

      {loading ? (
        <div className="empty">Loading habits…</div>
      ) : (
        <>
          <OverallStats analysis={analysis} habits={habits} today={today} />
          <DailyProgress habits={habits} today={today} />
          <HabitList
            habits={habits}
            onToggleDay={handleToggleDay}
            onUpdateGoal={handleUpdateGoal}
            onRemove={handleRemove}
            onAdd={handleAdd}
          />
          <AnalysisTable analysis={analysis} />
        </>
      )}

      <div className="footer-note">
        DISCIPLINE — DATA PERSISTS IN MONGODB · BUILT FOR CONSISTENCY, NOT PERFECTION
      </div>
    </div>
  );
}
