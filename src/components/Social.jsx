import SectionHeading from "./SectionHeading.jsx";

export default function Social({ t }) {
  return (
    <section className="wrap section online" id="online">
      <SectionHeading
        eyebrow={t.onlineEyebrow}
        title={t.onlineTitle}
        lead={t.onlineLead}
      />
      <div className="online-grid grid grid-cols-1 gap-5 min-[721px]:grid-cols-2">
        <a
          data-reveal
          href="https://www.linkedin.com/in/daniel-hernandez-tamayo/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="online-icon">in</span>
          <div>
            <strong>LinkedIn</strong>
            <small>{t.linkedinText}</small>
          </div>
          <b>↗</b>
        </a>
        <a
          data-reveal
          href="https://github.com/DanielHernandez131"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="online-icon">&lt;/&gt;</span>
          <div>
            <strong>GitHub</strong>
            <small>{t.githubText}</small>
          </div>
          <b>↗</b>
        </a>
      </div>
    </section>
  );
}
