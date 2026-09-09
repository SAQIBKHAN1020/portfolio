import { useEffect, useRef } from 'react'
import { projects, moreProjects, profile } from '../data/content'
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

/* Shared pointer tilt. Pointer-fine devices only, never under reduced motion. */
function useTilt(ref, strength = 4.5, lift = 6) {
  useEffect(() => {
    const card = ref.current
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
        card.style.setProperty('--mx', `${(event.clientX - rect.left) / rect.width * 100}%`)
        card.style.setProperty('--my', `${(event.clientY - rect.top) / rect.height * 100}%`)
        card.style.transform = `perspective(1100px) rotateY(${x * strength}deg) rotateX(${-y * strength}deg) translateY(-${lift}px)`
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
  }, [ref, strength, lift])
}

function FeaturedCard({ project }) {
  const cardRef = useRef(null)
  useTilt(cardRef)
  const isPrivate = project.access === 'private'

  return (
    <article
      ref={cardRef}
      className={`project is-wide ${project.reverse ? 'is-reverse' : ''}`}
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
          height="933"
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

function MiniCard({ project, index }) {
  const cardRef = useRef(null)
  useTilt(cardRef, 3, 5)
  const isPrivate = project.access === 'private'

  return (
    <article
      ref={cardRef}
      className="mini"
      style={{ '--accent': project.accent, '--delay': `${(index % 4) * 70}ms` }}
      data-reveal
    >
      <div className="mini-media">
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          decoding="async"
          width="1400"
          height="933"
        />
        <span className="mini-badge">
          {isPrivate ? <Lock /> : <GithubMark style={{ width: 11, height: 11 }} />}
          {isPrivate ? 'Private' : 'Open source'}
        </span>
      </div>

      <div className="mini-body">
        <p className="mini-eyebrow">{project.eyebrow}</p>
        <h3>{project.title}</h3>
        <p>{project.description}</p>

        <div className="tag-row">
          {project.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>

        <div className="mini-actions">
          {project.live && (
            <a className="mini-link is-primary" href={project.live} target="_blank" rel="noreferrer">
              Live site
              <ArrowUpRight />
            </a>
          )}
          {project.github ? (
            <a className="mini-link" href={project.github} target="_blank" rel="noreferrer">
              <GithubMark style={{ width: 14, height: 14 }} />
              Code
            </a>
          ) : (
            <a className="mini-link" href={requestLink(project)}>
              <Mail />
              Request a demo
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
            Three flagship builds, <span className="accent-text">and more shipped</span>.
          </h2>
          <p className="lede">
            Each of these went from a dataset or a blank repo to something a real person can
            open and use. Client and institutional builds stay closed, but I am happy to walk
            you through any of them.
          </p>
        </div>

        <div className="work-grid">
          {projects.map((project) => (
            <FeaturedCard key={project.id} project={project} />
          ))}
        </div>

        <div className="more-head" data-reveal>
          <h3>More things I have built</h3>
          <span>{String(moreProjects.length).padStart(2, '0')} projects</span>
        </div>

        <div className="mini-grid">
          {moreProjects.map((project, i) => (
            <MiniCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
