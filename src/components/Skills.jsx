import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skills, profile } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Skills() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skill-row', {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.08,
        scrollTrigger: { trigger: '.skill-list', start: 'top 80%' },
      })
      gsap.utils.toArray('.skill-bar').forEach((bar) => {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: bar.dataset.level / 100,
            duration: 1.3,
            ease: 'power3.out',
            scrollTrigger: { trigger: bar, start: 'top 90%' },
          },
        )
      })
      gsap.from('.skills-cta', {
        opacity: 0,
        y: 30,
        duration: 0.9,
        scrollTrigger: { trigger: '.skills-cta', start: 'top 88%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" ref={root} className="section py-32 md:py-48">
      <div className="container-x">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-6">( Capabilities )</p>
            <h2 className="display text-4xl md:text-6xl">
              Skills &amp; <span className="neon">tech stack</span>
            </h2>
          </div>

          <div className="skills-cta flex flex-wrap items-center gap-3">
            <a
              href={profile.resumeUrl}
              download={profile.resumeFileName}
              className="magnetic group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-accent to-accent2 px-7 py-4 text-sm font-medium uppercase tracking-widest text-ink transition-transform hover:scale-[1.03]"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="transition-transform group-hover:translate-y-0.5"
              >
                <path d="M12 3v13m0 0l-5-5m5 5l5-5M5 21h14" />
              </svg>
              Download CV
            </a>

            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="magnetic group inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-4 text-sm font-medium uppercase tracking-widest transition-colors hover:border-accent/60 hover:text-accent"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="transition-transform group-hover:translate-x-0.5"
              >
                <path d="M7 17L17 7M17 7H8M17 7v9" />
              </svg>
              View CV
            </a>
          </div>
        </div>

        <div className="skill-list grid gap-x-16 gap-y-8 md:grid-cols-2">
          {skills.map((s) => (
            <div key={s.name} className="skill-row">
              <div className="mb-3 flex items-baseline justify-between">
                <span className="text-lg">{s.name}</span>
                <span className="text-sm text-white/40">{s.level}%</span>
              </div>
              <div className="h-px w-full overflow-hidden bg-white/10">
                <div
                  className="skill-bar h-full w-full origin-left bg-gradient-to-r from-accent to-accent2"
                  data-level={s.level}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
