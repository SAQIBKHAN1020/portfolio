import { useRef } from 'react'
import { credentials } from '../data/content'
import { ArrowUpRight, Badge, Check } from './Icons'

function CredentialCard({ item, index }) {
  const cardRef = useRef(null)

  // Pointer-tracked sheen, matching the project cards
  const trackGlow = (event) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width) * 100}%`)
    card.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height) * 100}%`)
  }

  return (
    <article
      ref={cardRef}
      className="cert"
      onPointerMove={trackGlow}
      style={{ '--accent': item.accent, '--delay': `${index * 80}ms` }}
      data-reveal
    >
      <div className="cert-top">
        <span className="cert-seal">
          <Badge />
        </span>
        <span className="cert-kind">{item.kind}</span>
      </div>

      <h3>{item.title}</h3>
      <p className="cert-issuer">{item.issuer}</p>

      <div className="cert-meta">
        <span>{item.period}</span>
        <i />
        <span>{item.length}</span>
      </div>

      <ul className="cert-points">
        {item.points.map((point) => (
          <li key={point}>
            <Check />
            {point}
          </li>
        ))}
      </ul>

      <div className="cert-foot">
        <div className="tag-row">
          {item.skills.map((skill) => (
            <span className="tag" key={skill}>
              {skill}
            </span>
          ))}
        </div>

        {item.verifyUrl && (
          <a className="mini-link" href={item.verifyUrl} target="_blank" rel="noreferrer">
            Verify
            <ArrowUpRight />
          </a>
        )}
      </div>
    </article>
  )
}

export default function Certificates() {
  return (
    <section className="section" id="certificates" aria-labelledby="certificates-heading">
      <div className="shell">
        <div className="section-head" data-reveal>
          <span className="eyebrow">
            <i />
            Credentials
          </span>
          <h2 id="certificates-heading">
            Trained, certified, <span className="accent-text">and still learning</span>.
          </h2>
          <p className="lede">
            Everything here is a program I finished or am part way through, with the work that
            came out of it.
          </p>
        </div>

        <div className="cert-grid">
          {credentials.map((item, i) => (
            <CredentialCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
