import { useRef, useState } from "react";

import useParticleMotion from "../hooks/useParticleMotion.js";

const presets = {
  bloom: { count: 90, spread: 75, hue: 85, angle: 137.5 },
  spiral: { count: 65, spread: 85, hue: 265, angle: 145 },
  orbit: { count: 110, spread: 65, hue: 195, angle: 121 },
};

export default function OrbitStudy({ t }) {
  const [preset, setPreset] = useState("bloom");
  const [settings, setSettings] = useState(presets.bloom);
  const artwork = useRef(null);
  const [interactive, setInteractive] = useState(false);
  const [animated, setAnimated] = useState(false);
  useParticleMotion(artwork, interactive, animated, settings);

  function choosePreset(value) {
    setPreset(value);
    setSettings({ ...presets[value] });
  }

  function download() {
    // Export the designed composition, without temporary animation or cursor displacement.
    const copy = artwork.current.cloneNode(true);
    copy.querySelectorAll("circle").forEach((circle) => circle.removeAttribute("transform"));
    const svg = new XMLSerializer().serializeToString(copy);
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `orbit-study-${preset}.svg`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <div className="lab-workspace">
        <div className="lab-stage">
          <div className="lab-stage-label"><span>EXPERIMENT / 001</span><span>REACT + SVG</span></div>
          <svg ref={artwork} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" role="img" aria-label={t.labPreview}>
            <rect width="500" height="500" rx="16" fill="#111314" />
            {Array.from({ length: settings.count }, (_, i) => {
              const angle = i * settings.angle * Math.PI / 180;
              const radius = Math.sqrt(i / settings.count) * settings.spread * 2.3;
              const x = 250 + Math.cos(angle) * radius;
              const y = 250 + Math.sin(angle) * radius;
              return <circle key={i} cx={x} cy={y}
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
          <div className="lab-interaction">
            <button type="button" role="switch" aria-checked={interactive}
              aria-describedby="lab-pointer-help" className="lab-switch"
              onClick={() => setInteractive((value) => !value)}>
              <span>{t.labPointer}</span><span className="lab-switch-track" aria-hidden="true" />
            </button>
            <p id="lab-pointer-help">{t.labPointerHelp}</p>
          </div>
          <div className="lab-interaction">
            <button type="button" role="switch" aria-checked={animated}
              aria-describedby="lab-animation-help" className="lab-switch"
              onClick={() => setAnimated((value) => !value)}>
              <span>{t.labAnimate}</span><span className="lab-switch-track" aria-hidden="true" />
            </button>
            <p id="lab-animation-help">{t.labAnimateHelp}</p>
          </div>
          <div className="lab-actions">
            <button type="button" className="button primary" onClick={download}>{t.labDownload} ↗</button>
            <button type="button" className="lab-reset" onClick={() => choosePreset(preset)}>{t.labReset} ↺</button>
          </div>
          <details><summary>{t.labHow}<b aria-hidden="true">+</b></summary><p>{t.labExplanation}</p></details>
        </div>
    </div>
  );
}
