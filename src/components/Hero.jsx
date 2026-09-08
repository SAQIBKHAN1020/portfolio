import { useEffect, useRef, useState } from 'react'
import { hero, profile, techStrip } from '../data/content'
import { brandMarks } from '../data/brandMarks'
import {
  ArrowUpRight,
  Badge,
  Brain,
  BrandMark,
  Calendar,
  Chart,
  Clock,
  Code,
  Download,
  Pin,
  Play,
  Stack,
  Target,
} from './Icons'

const ICONS = { brain: Brain, code: Code, chart: Chart, stack: Stack, target: Target, clock: Clock, badge: Badge, pin: Pin, calendar: Calendar }

const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* Counts up once, the first time the stats panel scrolls into view. */
function Stat({ value, suffix, label, hint, icon, index }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(0)
  const Icon = ICONS[icon] ?? Target

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (reduced()) {
      setShown(value)
      return
    }

    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now) => {
          const progress = Math.min((now - start) / 1500, 1)
          // easeOutExpo, so the number lands softly instead of stopping dead
          const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
          setShown(Math.round(eased * value))
          if (progress < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.35 },
    )
    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value])

  return (
    <div className="stat" ref={ref} style={{ '--delay': `${index * 70}ms` }}>
      <span className="stat-icon">
        <Icon />
      </span>
      <div className="stat-body">
        <b>
          {shown}
          {suffix}
        </b>
        <p>{label}</p>
        <span>{hint}</span>
      </div>
    </div>
  )
}

export default function Hero() {
  const visualRef = useRef(null)
  const portraitRef = useRef(null)

  // Very light parallax on the portrait. Pointer-fine devices only, and
  // never when the visitor has asked for reduced motion.
  useEffect(() => {
    const wrap = visualRef.current
    const art = portraitRef.current
    if (!wrap || !art) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (reduced()) return

    let frame = 0
    const onMove = (event) => {
      const rect = wrap.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        art.style.transform = `translate3d(${x * -14}px, ${y * -10}px, 0) scale(1.02)`
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(frame)
      art.style.transform = ''
    }

    wrap.addEventListener('pointermove', onMove)
    wrap.addEventListener('pointerleave', onLeave)
    return () => {
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(frame)
    }
  }, [])

  const chips = [...techStrip, ...techStrip]

  return (
    <section className="hero" id="top">
      {/* Ambient glow lives behind the portrait, never over the face */}
      <div className="hero-glow" aria-hidden="true" />

      <div className="shell hero-shell">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="availability hero-in">
              <span className="pulse-dot" />
              {profile.availability}
            </div>

            <p className="hero-kicker hero-in" style={{ '--delay': '70ms' }}>
              {hero.kicker}
            </p>

            <h1>
              {hero.headlineLines.map((line, i) => (
                <span key={line} className="hero-in" style={{ '--delay': `${140 + i * 80}ms` }}>
                  {line}
                </span>
              ))}
              <span
                className="accent-text hero-in"
                style={{ '--delay': `${140 + hero.headlineLines.length * 80}ms` }}
              >
                {hero.headlineAccent}.
              </span>
            </h1>

            <p className="hero-intro hero-in" style={{ '--delay': '330ms' }}>
              {hero.intro}
            </p>

            <div className="hero-actions hero-in" style={{ '--delay': '420ms' }}>
              <a className="btn btn-primary magnetic" href="#work">
                View my work
                <ArrowUpRight />
              </a>
              <a
                className="btn magnetic"
                href={profile.resumeUrl}
                download={profile.resumeFileName}
              >
                Download resume
                <Download />
              </a>

              {/* Until an intro video exists this scrolls to the About story */}
              <a
                className="watch"
                href={hero.introUrl || '#about'}
                {...(hero.introUrl ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                <span className="watch-btn">
                  <Play />
                </span>
                <span className="watch-copy">
                  <b>Watch intro</b>
                  <span>{hero.introUrl ? '1 min' : 'Read my story'}</span>
                </span>
              </a>
            </div>
          </div>

          <div className="hero-visual" ref={visualRef}>
            {/* Handwritten cue, sits in the empty space left of the head */}
            <p className="hero-script" aria-hidden="true">
              {hero.script.map((word, i) => (
                <span key={word} style={{ '--delay': `${600 + i * 110}ms` }}>
                  {word}
                </span>
              ))}
            </p>

            <div className="portrait" ref={portraitRef}>
              <img
                src="/images/profile.webp"
                alt={`${profile.name}, ${profile.title}, working at a desk`}
                width="900"
                height="900"
                fetchPriority="high"
                decoding="async"
              />
            </div>

            <ul className="focus-rail" aria-label="Areas I work in">
              {hero.focus.map((item, i) => {
                const Icon = ICONS[item.icon]
                return (
                  <li
                    key={item.label}
                    className="focus-card"
                    style={{ '--delay': `${700 + i * 90}ms`, '--float': `${i * -1.4}s` }}
                  >
                    <span className="focus-icon">
                      {item.brand ? <BrandMark name={item.icon} /> : <Icon />}
                    </span>
                    {item.label}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* One panel: four counters plus two plain facts */}
        <div className="hero-stats" data-reveal>
          {hero.stats.map((stat, i) => (
            <Stat key={stat.label} {...stat} index={i} />
          ))}

          <div className="stat-facts">
            {hero.facts.map((fact) => {
              const Icon = ICONS[fact.icon]
              return (
                <div className="fact" key={fact.title}>
                  <span className="stat-icon">
                    <Icon />
                  </span>
                  <div>
                    <b>{fact.title}</b>
                    <span>{fact.text}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Tech chips, slow marquee, pauses on hover */}
        <div className="chip-strip" data-reveal aria-label="Technologies I work with">
          <div className="chip-track">
            {chips.map((name, i) => (
              <span
                className="tech-chip"
                key={`${name}-${i}`}
                style={{ '--mark-color': brandMarks[name]?.color }}
                aria-hidden={i >= techStrip.length}
              >
                <BrandMark name={name} />
                {brandMarks[name]?.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Lightweight animated mesh that closes the section */}
      <svg className="hero-wave" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 78c180-46 360-46 540 0s360 46 540 0 360-46 360 0v42H0Z" />
        <path d="M0 92c180-38 360-38 540 0s360 38 540 0 360-38 360 0v28H0Z" />
      </svg>
    </section>
  )
}
