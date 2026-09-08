import { about } from '../data/content'

export default function About() {
  return (
    <section className="section" id="about">
      <div className="shell">
        <div className="section-head" data-reveal>
          <span className="eyebrow">
            <i />
            About
          </span>
        </div>

        <div className="about-grid">
          <div className="about-copy" data-reveal>
            <p className="lead">{about.headline}</p>
            {about.paragraphs.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>

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
    </section>
  )
}
