import SectionHeading from "./SectionHeading.jsx";

export default function Technologies({ t }) {
  return (
    <section className="wrap section" id="tecnologias">
      <SectionHeading
        eyebrow={t.techEyebrow}
        title={t.techTitle}
        lead={t.techLead}
      />
      <div className="tech-grid grid grid-cols-1 gap-5 min-[721px]:grid-cols-3">
        <article data-reveal>
          <span className="tech-icon">&lt;/&gt;</span>
          <h3>Frontend</h3>
          <p>{t.frontendText}</p>
          <div className="tech-list flex flex-wrap gap-2">
            <span>React</span>
            <span>JavaScript</span>
            <span>TypeScript</span>
            <span>HTML5</span>
            <span>CSS3</span>
            <span>Bootstrap</span>
            <span>Tailwind</span>
            <span>Vite</span>
            <span>Webpack</span>
            <span>Angular</span>
          </div>
        </article>
        <article data-reveal>
          <span className="tech-icon">{"{ }"}</span>
          <h3>Backend</h3>
          <p>{t.backendText}</p>
          <div className="tech-list flex flex-wrap gap-2">
            <span>Python</span>
            <span>Flask</span>
            <span>MongoDB</span>
            <span>SQL</span>
            <span>APIs REST</span>
            <span>JWT</span>
          </div>
        </article>
        <article data-reveal>
          <span className="tech-icon">⌘</span>
          <h3>Game Development</h3>
          <p>{t.gameDevText}</p>
          <div className="tech-list flex flex-wrap gap-2">
            <span>Unity</span>
            <span>C#</span>
            <span>Java</span>
            <span>C++</span>
            <span>Game Design</span>
            <span>{t.mechanicsDesign}</span>
          </div>
        </article>
        <article data-reveal className="workflow-card min-[721px]:col-span-3">
          <div>
            <span className="tech-icon" aria-hidden="true">↳</span>
            <h3>{t.workflowTitle}</h3>
            <p>{t.workflowText}</p>
          </div>
          <div className="tech-list flex flex-wrap gap-2">
            <span>Git</span>
            <span>GitHub</span>
            <span>Azure DevOps</span>
            <span>{t.metodology}</span>
          </div>
        </article>
      </div>
    </section>
  );
}
