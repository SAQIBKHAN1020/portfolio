import { useEffect, useRef, useState } from 'react'
import { journey, progress } from '../data/content'
import { Check } from './Icons'

const TABS = [
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education & Certifications' },
]

const RADIUS = 62
const CIRCUM = 2 * Math.PI * RADIUS

/* Ring draws itself and the number counts up, once, on first view. */
function ProgressRing() {
  const ref = useRef(null)
  const [shown, setShown] = useState(0)
  const [drawn, setDrawn] = useState(false)
  const target = progress.ring.value

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(target)
      setDrawn(true)
      return
    }

    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        setDrawn(true)
        const start = performance.now()
        const tick = (now) => {
          const p = Math.min((now - start) / 1600, 1)
          const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
          setShown(Math.round(eased * target))
          if (p < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [target])

  return (
    <div className="ring-wrap" ref={ref}>
      <svg viewBox="0 0 150 150" className="ring" aria-hidden="true">
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--brand)" />
            <stop offset="1" stopColor="var(--violet)" />
          </linearGradient>
        </defs>
        <circle className="ring-track" cx="75" cy="75" r={RADIUS} />
        <circle
          className="ring-fill"
          cx="75"
          cy="75"
          r={RADIUS}
          strokeDasharray={CIRCUM}
          strokeDashoffset={drawn ? CIRCUM * 0.12 : CIRCUM}
        />
      </svg>
      <div className="ring-value">
        <b>{shown}</b>
        <span>{progress.ring.unit}</span>
      </div>
    </div>
  )
}

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

        <div className="journey-grid">
          <div className="journey-main">
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
                  /* Keying on the tab forces a fresh reveal when panels swap */
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

          {/* Progress panel: a summary of the same journey, not a repeat of it */}
          <aside className="journey-side" data-reveal>
            <div className="progress-card">
              <ProgressRing />
              <p className="progress-caption">{progress.ring.caption}</p>

              <ul className="track-list">
                {progress.tracks.map((track) => (
                  <li key={track.label} className={track.done ? 'is-done' : 'is-live'}>
                    <span className="track-mark">
                      {track.done ? <Check /> : <i />}
                    </span>
                    <span className="track-body">
                      <b>{track.label}</b>
                      <span>{track.state}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="progress-notes">
                {progress.notes.map((note) => (
                  <div key={note.label}>
                    <b>{note.value}</b>
                    <span>{note.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
