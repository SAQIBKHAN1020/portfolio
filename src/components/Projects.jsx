import { useEffect, useRef } from 'react'
import { projects, profile } from '../data/content'
import { ArrowUpRight, GithubMark, Lock, Mail } from './Icons'

/* Private builds have no public repo, so their button opens a prefilled
   email asking for a walkthrough rather than pointing at a dead link. */
function requestLink(project) {
  const subject = encodeURIComponent(`Demo request: ${project.title}`)
  const body = encodeURIComponent(
    `Hi Saqib,\n\nI came across ${project.title} on your portfolio and would like to see a walkthrough or demo.\n\nThanks,\n`,
  )
  return `mailto:${profile.email}?subject=${subject}&body=${body}`
}

function ProjectCard({ project }) {
  const cardRef = useRef(null)

  // Subtle pointer tilt. Pointer-fine devices only, and never under
  // prefers-reduced-motion.
  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const onMove = (event) => {
      const rect = card.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        card.style.transform = `perspective(1100px) rotateY(${x * 4.5}deg) rotateX(${-y * 4.5}deg) translateY(-6px)`
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(frame)
      card.style.transform = ''
    }

    card.addEventListener('pointermove', onMove)
    card.addEventListener('pointerleave', onLeave)
    return () => {
      card.removeEventListener('pointermove', onMove)
      card.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(frame)
    }
  }, [])

  const isPrivate = project.access === 'private'

  return (
    <article
      ref={cardRef}
      className={`project ${project.featured ? 'is-wide' : ''} ${project.reverse ? 'is-reverse' : ''}`}
      style={{ '--accent': project.accent }}
      data-reveal
    >
      <div className="project-media">
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          decoding="async"
          width="1400"
          height="875"
        />
        <span className="project-index">{project.number}</span>
        <span className="project-badge">
          {isPrivate ? (
            <>
              <Lock />
              Private build
            </>
          ) : (
            <>
              <GithubMark style={{ width: 12, height: 12 }} />
              Open source
            </>
          )}
        </span>
      </div>

      <div className="project-body">
        <p className="project-eyebrow">{project.eyebrow}</p>
        <h3>{project.title}</h3>
        <p className="project-summary">{project.summary}</p>
        <p className="project-desc">{project.description}</p>

        <ul className="project-features">
          {project.features.map((feature) => (
            <li key={feature}>
              <i />
              {feature}
            </li>
          ))}
        </ul>

        <div className="tag-row">
          {project.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>

        <div className="project-actions">
          {isPrivate ? (
            <a className="btn btn-sm btn-primary magnetic" href={requestLink(project)}>
              Request a demo
              <Mail />
            </a>
          ) : (
            <a
              className="btn btn-sm btn-primary magnetic"
              href={project.github}
              target="_blank"
              rel="noreferrer"
            >
              View on GitHub
              <ArrowUpRight />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <section className="section" id="work">
      <div className="shell">
        <div className="section-head" data-reveal>
          <span className="eyebrow">
            <i />
            Selected work
          </span>
          <h2>
            Four products, built <span className="accent-text">end to end</span>.
          </h2>
          <p className="lede">
            Each of these went from a dataset or a blank repo to something a real person can
            open and use. Three are private client and institutional builds, so their code
            stays closed, but I am happy to walk you through any of them.
          </p>
        </div>

        <div className="work-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
