import { useState } from "react";
import SectionHeading from "./SectionHeading.jsx";
import OrbitStudy from "./OrbitStudy.jsx";
import MemoryGame from "./MemoryGame.jsx";

export default function Laboratory({ t, active = true }) {
  const [experiment, setExperiment] = useState("orbits");

  return (
    <section className="wrap section laboratory" id="laboratorio">
      <SectionHeading eyebrow={t.labEyebrow} title={t.labTitle} lead={t.labLead} />
      <div className="experiment-picker" role="group" aria-label={t.labExperiments}>
        <button type="button" aria-pressed={experiment === "orbits"} aria-controls="experiment-orbits"
          onClick={() => setExperiment("orbits")}><span>01 /</span>{t.labName}</button>
        <button type="button" aria-pressed={experiment === "memory"} aria-controls="experiment-memory"
          onClick={() => setExperiment("memory")}><span>02 /</span>{t.gameTitle}</button>
      </div>
      <div data-reveal>
        <div id="experiment-orbits" hidden={experiment !== "orbits"}><OrbitStudy t={t} /></div>
        <div id="experiment-memory" hidden={experiment !== "memory"}><MemoryGame t={t} active={active && experiment === "memory"} /></div>
      </div>
    </section>
  );
}
