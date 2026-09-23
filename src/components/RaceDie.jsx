import { useEffect, useState } from "react";

const pips = {
  1: [4], 2: [0, 8], 3: [0, 4, 8], 4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8], 6: [0, 2, 3, 5, 6, 8],
};

export default function RaceDie({ value, rolling, label, t }) {
  const [preview, setPreview] = useState(1);
  useEffect(() => {
    if (!rolling || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setPreview((face) => face % 6 + 1), 85);
    return () => clearInterval(timer);
  }, [rolling]);
  const face = rolling ? preview : value;
  return (
    <div className="race-die-group">
      <span>{label}</span>
      <div className="race-die" data-rolling={rolling} role="img" aria-label={`${label}: ${rolling ? t.raceRolling : value ?? "—"}`}>
        {face ? Array.from({ length: 9 }, (_, index) => <i key={index} data-pip={pips[face].includes(index)} />) : <b aria-hidden="true">?</b>}
      </div>
      <span className="race-die-value" aria-hidden="true">{rolling ? "…" : value ?? "—"}</span>
    </div>
  );
}
