import { about } from '../data/content'
import { Badge, Calendar, Pin } from './Icons'

const ICONS = { pin: Pin, badge: Badge, calendar: Calendar }

export default function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-heading">
      <div className="shell">
        <div className="section-head" data-reveal>
          <span className="eyebrow">
            <i />
            About
          </span>
        </div>

        <div className="about-grid">
          <div className="about-copy" data-reveal>
            <h2 className="lead" id="about-heading">{about.headline}</h2>
            {about.paragraphs.map((text, index) => (
              <p key={index}>{text}</p>
            ))}

            <ul className="about-facts">
              {about.facts.map((fact) => {
                const Icon = ICONS[fact.icon]
                return (
                  <li key={fact.label}>
                    <span className="stat-icon">
                      <Icon />
                    </span>
                    <span>
                      <small>{fact.label}</small>
                      <b>{fact.value}</b>
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="about-side">
            <figure className="quote-card" data-reveal>
              <span className="quote-mark" aria-hidden="true">
                &ldquo;
              </span>
              <blockquote>{about.quote.text}</blockquote>
              <figcaption>{about.quote.author}</figcaption>
            </figure>

            <div className="highlight-stack">
              {about.highlights.map((item, index) => (
                <article
                  className="highlight"
                  key={item.title}
                  data-reveal
                  style={{ '--delay': `${index * 90}ms` }}
                >
                  <span className="highlight-num">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
