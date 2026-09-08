import { useState } from 'react'
import { journey } from '../data/content'
import { Check } from './Icons'

const TABS = [
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education & Certifications' },
]

export default function Journey() {
  const [tab, setTab] = useState('experience')
  const items = journey[tab]

  return (
    <section className="section" id="journey">
      <div className="shell">
        <div className="section-head" data-reveal>
          <span className="eyebrow">
            <i />
            Journey
          </span>
          <h2>
            Where I have <span className="accent-text">trained and worked</span>.
          </h2>
        </div>

        <div className="tabs" role="tablist" aria-label="Journey sections" data-reveal>
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`tab-${item.id}`}
              aria-selected={tab === item.id}
              aria-controls={`panel-${item.id}`}
              className={`tab ${tab === item.id ? 'is-active' : ''}`}
              onClick={() => setTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div
          className="timeline"
          role="tabpanel"
          id={`panel-${tab}`}
          aria-labelledby={`tab-${tab}`}
        >
          {items.map((item, index) => (
            <article
              className={`tl-item ${item.current ? 'is-current' : ''}`}
              /* Keying on the tab forces a fresh reveal when panels swap. */
              key={`${tab}-${item.role}`}
              data-reveal
              style={{ '--delay': `${index * 90}ms` }}
            >
              <span className="tl-dot" />
              <div className="tl-card">
                <div className="tl-top">
                  <span className="tl-period">{item.period}</span>
                  {item.current && <span className="chip-live">Current</span>}
                  {item.credential && (
                    <span className="chip-live">
                      <Check style={{ width: 12, height: 12 }} />
                      Certified
                    </span>
                  )}
                </div>
                <h3>{item.role}</h3>
                <p className="tl-org">{item.org}</p>
                <ul className="tl-points">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
