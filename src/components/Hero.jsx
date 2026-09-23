import RichText from "./RichText.jsx";
import ProfileWindow from "./ProfileWindow.jsx";

export default function Hero({ t, profile, onProfileChange }) {
  return (
    <section
      className="hero wrap grid grid-cols-1 gap-3 min-[721px]:grid-cols-[1.15fr_1fr] min-[721px]:gap-[25px] min-[1001px]:gap-[55px]"
      id="inicio"
      data-profile={profile}
    >
      <div className="hero-backdrop" aria-hidden="true">
        <div className="hero-glow" />
        <div className="hero-grid" />
        <svg className="hero-constellation" viewBox="0 0 800 650" fill="none">
          <path d="M80 190 220 90 390 170 540 70 700 180 610 330 720 490 480 560 340 420 180 520 90 350 220 90M90 350 390 170 610 330 340 420 80 190M180 520 480 560 610 330M390 170 340 420" />
          {[[80,190],[220,90],[390,170],[540,70],[700,180],[610,330],[720,490],[480,560],[340,420],[180,520],[90,350]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 4 : 2.5} />
          ))}
        </svg>
        <div className="hero-orbit hero-orbit-outer"><span /></div>
        <div className="hero-orbit hero-orbit-inner"><span /></div>
      </div>
      <div className="hero-copy">
        <div className="eyebrow">
          <span className="small-line"></span>
          <span>{t.heroEyebrow}</span>
        </div>
        <h1>
          <span>{t.heroLine1}</span>
          <br />
          <span>{t.heroLine2}</span>
          <br />
          <em>{t.heroLine3}</em>
        </h1>
        <p className="intro">
          <RichText text={t.heroIntro} />
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#proyectos">
            <span>{t.heroExplore}</span> ↘
          </a>
          <a className="text-link" href="#experiencia">
            <span>{t.heroAbout}</span> →
          </a>
        </div>
        <div className="location">
          <span>⌖</span> {t.city} <i></i>
          <span>{t.locationWork}</span>
        </div>
      </div>
      <ProfileWindow
        t={t}
        profile={profile}
        onProfileChange={onProfileChange}
      />
      <div className="hero-bottom">
        <span>{t.heroMotto}</span>
        <a href="#proyectos">{t.scroll}</a>
      </div>
    </section>
  );
}
