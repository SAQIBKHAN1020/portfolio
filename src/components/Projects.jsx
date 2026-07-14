import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.project-card', {
        opacity: 0,
        y: 70,
        rotateX: -8,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '.project-grid', start: 'top 78%' },
      })
      gsap.from('.projects-title', {
        yPercent: 110,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.projects-title-wrap', start: 'top 82%' },
      })

      // ── 3D tilt on hover ──
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        gsap.utils.toArray('.project-card').forEach((card) => {
          const glow = card.querySelector('.card-glow')

          const onMove = (e) => {
            const r = card.getBoundingClientRect()
            const px = (e.clientX - r.left) / r.width // 0..1
            const py = (e.clientY - r.top) / r.height
            gsap.to(card, {
              rotateY: (px - 0.5) * 14,
              rotateX: -(py - 0.5) * 14,
              duration: 0.5,
              ease: 'power3.out',
              transformPerspective: 900,
            })
            if (glow) {
              gsap.to(glow, {
                x: (px - 0.5) * 120,
                y: (py - 0.5) * 120,
                duration: 0.6,
                ease: 'power3.out',
              })
            }
          }
          const onLeave = () => {
            gsap.to(card, {
              rotateX: 0,
              rotateY: 0,
              duration: 0.9,
              ease: 'elastic.out(1, 0.4)',
            })
            if (glow) gsap.to(glow, { x: 0, y: 0, duration: 0.8 })
          }

          card.addEventListener('mousemove', onMove)
          card.addEventListener('mouseleave', onLeave)
        })
      }
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={root} className="section py-32 md:py-48">
      <div className="container-x">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <p className="eyebrow mb-6">( Selected Work )</p>
            <div className="projects-title-wrap reveal-line">
              <h2 className="projects-title display text-4xl md:text-6xl">
                Featured <span className="neon">projects</span>
              </h2>
            </div>
          </div>
          <span className="hidden text-sm text-white/40 md:block">
            {String(projects.length).padStart(2, '0')} — Projects
          </span>
        </div>

        <div className="project-grid grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <a
              key={i}
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className="project-card tilt group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-8 transition-colors hover:border-accent/40 md:p-10"
            >
              {/* Emerald glow that follows the pointer inside the card */}
              <div className="card-glow pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/25 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              {/* Gold counter-glow */}
              <div className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-accent2/15 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />

              <div className="tilt-inner relative">
                <div className="flex items-start justify-between">
                  <span className="text-xs uppercase tracking-widest text-accent/80">
                    {p.category}
                  </span>
                  <span className="text-xs text-white/40">{p.year}</span>
                </div>

                <h3 className="mt-24 font-display text-3xl font-semibold transition-colors group-hover:text-accent md:mt-32 md:text-4xl">
                  {p.title}
                </h3>
                <p className="mt-4 max-w-md text-white/55">{p.description}</p>

                <div className="mt-8 flex flex-wrap items-center gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/60"
                    >
                      {t}
                    </span>
                  ))}
                  <span className="ml-auto inline-flex items-center gap-1 text-sm text-white/70 transition-transform group-hover:translate-x-1">
                    View
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H8M17 7v9" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
