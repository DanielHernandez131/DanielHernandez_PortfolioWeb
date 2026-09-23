import { useRef, useState } from "react";
import SectionHeading from "./SectionHeading.jsx";

const presets = {
  bloom: { count: 90, spread: 75, hue: 85, angle: 137.5 },
  spiral: { count: 65, spread: 85, hue: 265, angle: 145 },
  orbit: { count: 110, spread: 65, hue: 195, angle: 121 },
};

export default function Laboratory({ t }) {
  const [preset, setPreset] = useState("bloom");
  const [settings, setSettings] = useState(presets.bloom);
  const artwork = useRef(null);

  function choosePreset(value) {
    setPreset(value);
    setSettings({ ...presets[value] });
  }

  function download() {
    const svg = new XMLSerializer().serializeToString(artwork.current);
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `orbit-study-${preset}.svg`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <section className="wrap section laboratory" id="laboratorio">
      <SectionHeading eyebrow={t.labEyebrow} title={t.labTitle} lead={t.labLead} />
      <div data-reveal className="lab-workspace">
        <div className="lab-stage">
          <div className="lab-stage-label"><span>EXPERIMENT / 001</span><span>REACT + SVG</span></div>
          <svg ref={artwork} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" role="img" aria-label={t.labPreview}>
            <title>{t.labPreview}</title>
            <rect width="500" height="500" rx="16" fill="#111314" />
            {Array.from({ length: settings.count }, (_, i) => {
              const angle = i * settings.angle * Math.PI / 180;
              const radius = Math.sqrt(i / settings.count) * settings.spread * 2.3;
              return <circle key={i} cx={250 + Math.cos(angle) * radius} cy={250 + Math.sin(angle) * radius}
                r={5 + (i / settings.count) * 8} fill={`hsl(${(settings.hue + i * 0.7) % 360} 70% 65%)`}
                fillOpacity="0.18" stroke={`hsl(${(settings.hue + i * 0.7) % 360} 70% 65%)`} strokeWidth="1.2" />;
            })}
          </svg>
          <p className="lab-stage-label">{String(settings.count).padStart(3, "0")} / {t.labCount.toUpperCase()}<span>θ {settings.angle}°</span></p>
        </div>
        <div className="lab-controls">
          <span className="eyebrow">GENERATIVE DESIGN</span>
          <h3>{t.labName}</h3>
          <p>{t.labDescription}</p>
          <div className="lab-presets" role="group" aria-label={t.labPreset}>
            {Object.keys(presets).map((value) => <button key={value} type="button" aria-pressed={preset === value} onClick={() => choosePreset(value)}>
              {t[{ bloom: "labBloom", spiral: "labSpiral", orbit: "labOrbit" }[value]]}
            </button>)}
          </div>
          {[["count", "labCount", 20, 140], ["spread", "labSpread", 30, 90], ["hue", "labHue", 0, 360]].map(([key, label, min, max]) => (
            <div className="lab-slider" key={key}>
              <label htmlFor={`lab-${key}`}>{t[label]}<output htmlFor={`lab-${key}`}>{settings[key]}{key === "hue" ? "°" : ""}</output></label>
              <input id={`lab-${key}`} type="range" min={min} max={max} value={settings[key]}
                onChange={(event) => setSettings({ ...settings, [key]: Number(event.target.value) })} />
            </div>
          ))}
          <div className="lab-actions">
            <button type="button" className="button primary" onClick={download}>{t.labDownload} ↗</button>
            <button type="button" className="lab-reset" onClick={() => choosePreset(preset)}>{t.labReset} ↺</button>
          </div>
          <details><summary>{t.labHow}<b aria-hidden="true">+</b></summary><p>{t.labExplanation}</p></details>
        </div>
      </div>
    </section>
  );
}
