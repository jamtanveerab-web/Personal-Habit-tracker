import React from "react";

export default function Ring({ pct }) {
  const r = 36;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(pct, 100) / 100) * c;

  return (
    <div className="ring">
      <svg viewBox="0 0 88 88">
        <circle className="ring-bg" cx="44" cy="44" r={r}></circle>
        <circle
          className="ring-fg"
          cx="44"
          cy="44"
          r={r}
          strokeDasharray={c}
          strokeDashoffset={offset}
        ></circle>
      </svg>
      <div className="ring-num">{pct}%</div>
    </div>
  );
}
