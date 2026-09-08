import { projects } from '../data/content'

export default function Projects() {
  return (
    <section className="work section-pad" id="work">
      <div className="section-shell">
        <div className="section-label light" data-reveal><span>02</span><p>Selected work</p></div>
        <div className="section-heading" data-reveal>
          <h2>Four products. One clear focus.</h2>
          <p>Selected private and in-progress builds. Visuals are temporary concept art; public case studies and project links are coming soon.</p>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <article key={project.title} className={`project-card ${project.featured ? 'project-featured' : ''}`} data-reveal>
              <div className="project-image">
                <img src={project.image} alt={project.imageAlt} loading="lazy" />
                <span className="project-number">{project.number}</span>
                <span className="project-status"><i /> Case study soon</span>
              </div>
              <div className="project-body">
                <p className="project-eyebrow">{project.eyebrow}</p>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <p className="project-outcome">{project.outcome}</p>
                <div className="project-footer">
                  <ul aria-label="Technologies">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                  <span className="coming-link">Upcoming <span aria-hidden="true">↗</span></span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
