import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experience } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Timeline() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.tl-title', {
        yPercent: 110,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.tl-title-wrap', start: 'top 82%' },
      })
      // The spine draws itself as you scroll through the section
      gsap.fromTo(
        '.tl-spine',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.tl-list',
            start: 'top 75%',
            end: 'bottom 55%',
            scrub: 0.6,
          },
        },
      )
      gsap.utils.toArray('.tl-item').forEach((item, i) => {
        gsap.from(item, {
          opacity: 0,
          x: i % 2 ? 60 : -60,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 85%' },
        })
        const dot = item.querySelector('.tl-dot')
        if (dot) {
          gsap.from(dot, {
            scale: 0,
            duration: 0.6,
            ease: 'back.out(2.5)',
            scrollTrigger: { trigger: item, start: 'top 85%' },
          })
        }
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="journey" ref={root} className="section py-32 md:py-48">
      <div className="container-x">
        <p className="eyebrow mb-6">( Journey )</p>
        <div className="tl-title-wrap reveal-line mb-20">
          <h2 className="tl-title display text-4xl md:text-6xl">
            Experience &amp; <span className="neon">learning path</span>
          </h2>
        </div>

        <div className="tl-list relative">
          {/* Spine */}
          <div className="absolute left-4 top-0 h-full w-px bg-white/10 md:left-1/2" />
          <div className="tl-spine absolute left-4 top-0 h-full w-px origin-top bg-gradient-to-b from-accent to-accent2 md:left-1/2" />

          <div className="space-y-16 md:space-y-24">
            {experience.map((e, i) => (
              <div
                key={i}
                className={`tl-item relative pl-12 md:w-1/2 md:pl-0 ${
                  i % 2 ? 'md:ml-auto md:pl-16' : 'md:pr-16 md:text-right'
                }`}
              >
                {/* Dot */}
                <span
                  className={`tl-dot absolute left-4 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_14px_rgba(0,214,143,0.8)] ${
                    i % 2 ? 'md:left-0' : 'md:left-auto md:right-0 md:translate-x-1/2'
                  }`}
                />

                <p className="text-xs uppercase tracking-[0.25em] text-accent2/90">
                  {e.period}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold md:text-3xl">
                  {e.role}
                </h3>
                <p className="mt-1 text-sm text-white/50">{e.org}</p>
                <ul
                  className={`mt-4 space-y-2 text-white/60 ${
                    i % 2 ? '' : 'md:ml-auto'
                  } max-w-md`}
                >
                  {e.points.map((p, j) => (
                    <li key={j} className="text-sm leading-relaxed md:text-base">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
