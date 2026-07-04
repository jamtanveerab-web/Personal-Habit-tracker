import React from "react";
import Ring from "./Ring.jsx";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function OverallStats({ analysis, habits, today }) {
  const overallPct = analysis.length
    ? Math.round(
        analysis.reduce((sum, h) => sum + Math.min(h.pct, 100), 0) / analysis.length
      )
    : 0;

  const totalGoal = analysis.reduce((s, h) => s + h.goal, 0);
  const totalActual = analysis.reduce((s, h) => s + h.actual, 0);

  const bestHabit = analysis.length
    ? analysis.reduce((best, h) => (h.pct > best.pct ? h : best), analysis[0])
    : null;

  const todayPct = analysis.length
    ? Math.round(
        (analysis.filter((h) => h.days[today]).length / analysis.length) * 100
      )
    : 0;

  return (
    <div className="stats-row">
      <div className="card hero-stat">
        <Ring pct={overallPct} />
        <div>
          <div className="stat-label">Overall Completion</div>
          <div className="stat-value">
            Avg across {habits.length} habit{habits.length !== 1 ? "s" : ""}
          </div>
          <div className="stat-foot">
            {totalActual} of {totalGoal} target days hit this week
          </div>
        </div>
      </div>
      <div className="card">
        <div className="stat-label">Today's Consistency</div>
        <div className="stat-value mono">{todayPct}%</div>
        <div className="stat-foot">{DAYS[today]} — habits checked so far</div>
      </div>
      <div className="card">
        <div className="stat-label">Strongest Habit</div>
        <div className="stat-value" style={{ fontSize: "20px" }}>
          {bestHabit ? bestHabit.name : "—"}
        </div>
        <div className="stat-foot up">
          {bestHabit ? bestHabit.pct + "% of goal" : "Add a habit to begin"}
        </div>
      </div>
      <div className="card">
        <div className="stat-label">Habits Tracked</div>
        <div className="stat-value mono">{habits.length}</div>
        <div className="stat-foot">{totalGoal} target-days this week</div>
      </div>
    </div>
  );
}
