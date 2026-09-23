import { projects } from "../data/projects.js";
import ProjectVisual from "./ProjectVisual.jsx";
import SectionHeading from "./SectionHeading.jsx";

function ProjectCard({ project, t }) {
  return (
    <article data-reveal className="project min-w-0">
      <ProjectVisual variant={project.visual} t={t} />
      <div className="project-info">
        <div className="project-title">
          <h3>{project.name}</h3>
          <span>{t[project.role]}</span>
        </div>
        <p>{t[project.summary]}</p>
        <div className="tags flex flex-wrap gap-[7px]">
          {project.tags.map((tag) => (
            <span key={tag.label ?? tag.translation}>
              {tag.label ?? t[tag.translation]}
            </span>
          ))}
        </div>
        {/* Native disclosures support keyboard use and open independently. */}
        <details>
          <summary>
            <span>{t.exploreProject}</span>
            <b aria-hidden="true">+</b>
          </summary>
          <div className="details-content">
            {project.details.map((detail) => (
              <div key={detail.title}>
                <h4>{t[detail.title]}</h4>
                <p>{t[detail.text]}</p>
              </div>
            ))}
          </div>
        </details>
      </div>
    </article>
  );
}

export default function Projects({ t }) {
  return (
    <section className="wrap section" id="proyectos">
      <SectionHeading
        eyebrow={t.projectsEyebrow}
        title={t.projectsTitle}
        lead={t.projectsLead}
      />
      <div className="grid grid-cols-1 items-start gap-7 min-[721px]:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} t={t} />
        ))}
      </div>
    </section>
  );
}
