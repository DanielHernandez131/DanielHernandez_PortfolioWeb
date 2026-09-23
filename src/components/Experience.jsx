export default function Experience({ t }) {
  return (
    <section
      className="wrap section experience grid grid-cols-1 gap-7 min-[721px]:grid-cols-2 min-[721px]:gap-[45px] min-[1001px]:gap-[90px]"
      id="experiencia"
    >
      <div data-reveal>
        <div className="eyebrow">{t.experienceEyebrow}</div>
        <h2>
          <span>{t.experienceTitle1}</span>
          <br />
          <span>{t.experienceTitle2}</span>
          <span>.</span>
        </h2>
        <p className="about">{t.about1}</p>
        <p className="about">{t.about2}</p>
      </div>
      <div className="timeline">
        <article data-reveal>
          <span className="timeline-label">{t.teamDev}</span>
          <h3>{t.teamTitle}</h3>
          <div className="timeline-org">Place Between</div>
          <p>{t.teamText}</p>
        </article>
        <article data-reveal>
          <span className="timeline-label">{t.education}</span>
          <h3>{t.degree}</h3>
          <div className="timeline-org">Universidad Rey Juan Carlos</div>
          <p>{t.degreeText}</p>
        </article>
        <article data-reveal>
          <span className="timeline-label">{t.creativeInterest}</span>
          <h3>{t.systemsTitle}</h3>
          <div className="timeline-org">{t.gamesBoardgames}</div>
          <p>{t.systemsText}</p>
        </article>
      </div>
    </section>
  );
}
