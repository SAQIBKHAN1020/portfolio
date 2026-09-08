import { useEffect, useRef, useState } from 'react'
import { hero, profile } from '../data/content'
import { ArrowUpRight, Download, GithubMark, LinkedinMark, Mail, Sparkle, Bolt } from './Icons'

/* Counts up once, when the stat row first scrolls into view. */
function Stat({ value, suffix, label, hint }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(0)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(value)
      return
    }

    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const duration = 1400
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1)
          // easeOutExpo, so the number lands softly instead of stopping dead
          const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
          setShown(Math.round(eased * value))
          if (progress < 1) frame = requestAnimationFrame(tick)
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
  }, [value])

  return (
    <div className="stat" ref={ref}>
      <b>
        {shown}
        {suffix}
      </b>
      <p>{label}</p>
      <span>{hint}</span>
    </div>
  )
}

export default function Hero() {
  const visualRef = useRef(null)
  const portraitRef = useRef(null)

  // Pointer-driven tilt on the portrait. Desktop only, and skipped entirely
  // when the visitor asks for reduced motion.
  useEffect(() => {
    const wrap = visualRef.current
    const card = portraitRef.current
    if (!wrap || !card) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const onMove = (event) => {
      const rect = wrap.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        card.style.transform = `rotateY(${x * 11}deg) rotateX(${-y * 11}deg) translateZ(0)`
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(frame)
      card.style.transform = ''
    }

    wrap.addEventListener('pointermove', onMove)
    wrap.addEventListener('pointerleave', onLeave)
    return () => {
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section className="hero" id="top">
      <div className="shell">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="availability hero-in">
              <span className="pulse-dot" />
              {profile.availability}
            </div>

            <p className="hero-kicker hero-in" style={{ '--delay': '80ms' }}>
              {hero.kicker}
            </p>

            <h1>
              <span className="hero-in" style={{ '--delay': '150ms' }}>
                {hero.headlineTop}
              </span>
              <span className="accent-text hero-in" style={{ '--delay': '250ms' }}>
                {hero.headlineAccent}
              </span>
            </h1>

            <p className="hero-intro hero-in" style={{ '--delay': '350ms' }}>
              {hero.intro}
            </p>

            <div className="hero-actions hero-in" style={{ '--delay': '440ms' }}>
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
            </div>

            <div className="hero-socials hero-in" style={{ '--delay': '520ms' }}>
              <a
                className="icon-btn"
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
              >
                <GithubMark />
              </a>
              <a
                className="icon-btn"
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
              >
                <LinkedinMark />
              </a>
              <a
                className="icon-btn"
                href={`mailto:${profile.email}`}
                aria-label="Send an email"
              >
                <Mail />
              </a>
            </div>
          </div>

          <div className="hero-visual hero-in" style={{ '--delay': '260ms' }} ref={visualRef}>
            <div className="portrait" ref={portraitRef}>
              <img
                src="/images/profile.webp"
                alt={`${profile.name}, ${profile.title}, at a desk`}
                width="900"
                height="900"
                fetchPriority="high"
                decoding="async"
              />
              <div className="portrait-caption">
                <div>
                  <strong>{profile.name}</strong>
                  <span>{profile.subtitle}</span>
                </div>
                <span aria-hidden="true">{profile.location}</span>
              </div>
            </div>

            <div className="float-card float-a">
              <Sparkle style={{ color: 'var(--brand)' }} />
              <div>
                <b>4 products</b>
                <span>AI and full stack</span>
              </div>
            </div>

            <div className="float-card float-b">
              <Bolt style={{ color: 'var(--mint)' }} />
              <div>
                <b>90%+ accuracy</b>
                <span>Fake news model</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-stats" data-reveal>
          {hero.stats.map((stat) => (
            <Stat key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}
