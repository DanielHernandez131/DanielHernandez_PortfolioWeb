/** Small code-native illustrations share a silhouette and express each cat state. */
export default function CatAvatar({ cat }) {
  return (
    <svg className={`cat-avatar cat-${cat}`} viewBox="0 0 80 80" fill="none" aria-hidden="true">
      {cat === "quantum" && <ellipse cx="40" cy="42" rx="36" ry="20" stroke="currentColor" strokeDasharray="3 4" transform="rotate(-30 40 42)" />}
      <path d="M15 33 12 9 32 22Q40 19 48 22L68 9 65 33Q75 66 40 71Q5 66 15 33Z" fill="currentColor" fillOpacity=".16" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      {cat === "dead"
        ? <path d="m24 36 10 10m0-10L24 46m22-10 10 10m0-10L46 46" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        : <><ellipse cx="29" cy="40" rx="6" ry="8" fill="currentColor" /><ellipse cx="51" cy="40" rx="6" ry="8" fill="currentColor" /><path d="M29 35v9m22-9v9" stroke="#111314" strokeWidth="2.5" /></>}
      <path d="m36 51 4 4 4-4m-4 4v5m0-1q-6 6-10 0m10 0q6 6 10 0M9 46l12 3M8 55l13-1m38-5 12-3m-12 8 13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
