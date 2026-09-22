/** Keeps project-specific artwork separate from the shared card structure. */
export default function ProjectVisual({ variant, t }) {
  if (variant === "pb")
    return (
      <div className="project-visual pb">
        <div className="visual-top">
          <span>PLACE BETWEEN</span>
          <span>WEB APPLICATION / 01</span>
        </div>
        <div className="pb-title">
          <span>{t.pbVisual1}</span>
          <br />
          <span>{t.pbVisual2}</span> <em>{t.pbVisual3}</em>
        </div>
        <div className="phases">
          <span>
            ☀<b>{t.day}</b>
          </span>
          <span>
            ☾<b>{t.night}</b>
          </span>
          <span>
            ◉<b>{t.mirror}</b>
          </span>
        </div>
        <span className="visual-caption">{t.pbCaption}</span>
      </div>
    );
  if (variant === "oniria")
    return (
      <div className="project-visual oniria">
        <div className="visual-top">
          <span>ONIRIA</span>
          <span>GAME CONCEPT / 02</span>
        </div>
        <div className="oniria-title">
          ONIRIA<span>{t.oniriaClaim}</span>
        </div>
        <div className="emotion-strip">
          <span>{t.joy}</span>
          <span>{t.trust}</span>
          <span>{t.fear}</span>
          <span>{t.surprise}</span>
        </div>
        <span className="visual-caption">{t.oniriaCaption}</span>
      </div>
    );
  // Artwork is optional; projects without a variant render as text-only cards.
  return null;
}
