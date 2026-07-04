import React from "react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function DailyProgress({ habits, today }) {
  const dailyPct = DAYS.map((_, dayIdx) => {
    if (habits.length === 0) return 0;
    const done = habits.filter((h) => h.days[dayIdx]).length;
    return Math.round((done / habits.length) * 100);
  });

  return (
    <>
      <div className="section-title">
        <span className="idx">01</span>
        <h2>Daily Progress</h2>
        <div className="line"></div>
      </div>
      <div className="progress-card">
        <div className="bars">
          {DAYS.map((d, i) => (
            <div className="bar-col" key={d}>
              <div className="bar-track">
                <div
                  className={"bar-fill" + (i === today ? " today" : "")}
                  style={{ height: dailyPct[i] + "%" }}
                ></div>
              </div>
              <div className="bar-pct">{dailyPct[i]}%</div>
              <div className={"bar-day" + (i === today ? " today" : "")}>{d}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
