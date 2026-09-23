import RichText from "./RichText.jsx";
import ProfileWindow from "./ProfileWindow.jsx";

export default function Hero({ t, profile, onProfileChange }) {
  return (
    <section
      className="hero wrap grid grid-cols-1 gap-3 min-[721px]:grid-cols-[1.15fr_1fr] min-[721px]:gap-[25px] min-[1001px]:gap-[55px]"
      id="inicio"
    >
      <div className="hero-backdrop" aria-hidden="true">
        <div className="hero-glow" />
        <div className="hero-grid" />
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
