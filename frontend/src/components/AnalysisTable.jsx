import React from "react";

export default function AnalysisTable({ analysis }) {
  return (
    <>
      <div className="section-title">
        <span className="idx">03</span>
        <h2>Analysis</h2>
        <div className="line"></div>
      </div>
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Habit Name</th>
              <th className="num">Goal</th>
              <th className="num">Actual</th>
              <th className="num">Progress %</th>
            </tr>
          </thead>
          <tbody>
            {analysis.length === 0 && (
              <tr>
                <td colSpan="4" className="empty">
                  No data to analyze yet.
                </td>
              </tr>
            )}
            {analysis.map((h) => {
              const capped = Math.min(h.pct, 100);
              const cls = h.pct >= 100 ? "good" : h.pct < 50 ? "bad" : "";
              return (
                <tr key={h._id}>
                  <td>{h.name}</td>
                  <td className="num">{h.goal}</td>
                  <td className="num">{h.actual}</td>
                  <td className="num">
                    <div className="pct-cell">
                      <div className="pct-track">
                        <div
                          className={"pct-fill " + cls}
                          style={{ width: capped + "%" }}
                        ></div>
                      </div>
                      <div className="pct-num">{h.pct}%</div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
