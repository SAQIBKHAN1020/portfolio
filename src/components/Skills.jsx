import { skillGroups } from '../data/content'
import { brandMarks } from '../data/brandMarks'
import { BrandMark } from './Icons'

export default function Skills() {
  // Tracks the pointer inside a card so the glow follows it.
  const trackGlow = (event) => {
    const card = event.currentTarget
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    card.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  return (
    <section className="section" id="skills">
      <div className="shell">
        <div className="section-head" data-reveal>
          <span className="eyebrow">
            <i />
            Capabilities
          </span>
          <h2>
            The stack I <span className="accent-text">actually ship with</span>.
          </h2>
          <p className="lede">
            Python sits at the centre. Everything else is chosen because a project needed it,
            not because it looked good on a list.
          </p>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group, index) => (
            <article
              className="skill-card"
              key={group.title}
              onPointerMove={trackGlow}
              data-reveal
              style={{ '--delay': `${index * 70}ms` }}
            >
              <div className="skill-marks">
                {group.marks.map((mark) => (
                  <span key={mark} style={{ '--mark-color': brandMarks[mark]?.color }}>
                    <BrandMark name={mark} />
                  </span>
                ))}
              </div>
              <h3>{group.title}</h3>
              <ul className="skill-list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
