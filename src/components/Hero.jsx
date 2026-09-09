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
  Eye,
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

export default function Hero({ onOpenResume }) {
  const artRef = useRef(null)
  const copyRef = useRef(null)

  // Very light parallax on the photo layer. Pointer-fine devices only, and
  // never when the visitor has asked for reduced motion.
  useEffect(() => {
    const art = artRef.current
    if (!art) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (reduced()) return

    let frame = 0
    const onMove = (event) => {
      const x = event.clientX / window.innerWidth - 0.5
      const y = event.clientY / window.innerHeight - 0.5
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        art.style.setProperty('--px', `${x * -12}px`)
        art.style.setProperty('--py', `${y * -8}px`)
      })
    }
    window.addEventListener('pointermove', onMove)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  // Scroll parallax. The photo eases back while the copy lifts away.
  useEffect(() => {
    const art = artRef.current
    const copy = copyRef.current
    if (!art || !copy) return
    if (reduced()) return

    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const y = window.scrollY
        const limit = window.innerHeight
        if (y > limit) return
        const p = Math.min(y / limit, 1)
        art.style.setProperty('--sy', `${p * 42}px`)
        art.style.setProperty('--sc', `${1 + p * 0.06}`)
        copy.style.transform = `translate3d(0, ${p * -46}px, 0)`
        copy.style.opacity = `${1 - p * 0.85}`
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  const chips = [...techStrip, ...techStrip]

  return (
    <section className="hero" id="top" aria-label="Introduction">
      {/* The photo is a background layer of the hero, not a component in it.
          No frame, no card, no radius: only masks and a scrim blend it in. */}
      <div className="hero-art">
        <img
          ref={artRef}
          src="/images/saqib-khan-ai-engineer-karachi.webp"
          alt={`${profile.name}, ${profile.title} and full stack developer based in ${profile.location}, working at his desk`}
          width="1672"
          height="941"
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

      <div className="shell hero-top">
        <div className="hero-copy" ref={copyRef}>
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
            <button className="btn magnetic" type="button" onClick={onOpenResume}>
              View resume
              <Eye />
            </button>
            <a
              className="btn-quiet magnetic"
              href={profile.resumeUrl}
              download={profile.resumeFileName}
              aria-label="Download resume as PDF"
            >
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
      </div>

      <div className="shell hero-bottom">
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
