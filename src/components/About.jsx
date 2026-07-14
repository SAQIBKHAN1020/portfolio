import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { about } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-line', {
        yPercent: 110,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.about-heading', start: 'top 80%' },
      })
      gsap.from('.about-p', {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.15,
        scrollTrigger: { trigger: '.about-body', start: 'top 82%' },
      })
      gsap.from('.about-stat', {
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.12,
        scrollTrigger: { trigger: '.about-stats', start: 'top 85%' },
      })
      // Count-up on stats numbers
      gsap.utils.toArray('.stat-num').forEach((el) => {
        const target = parseFloat(el.dataset.value)
        const suffix = el.dataset.suffix || ''
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
          onUpdate: () => {
            el.textContent = Math.round(obj.v) + suffix
          },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={root} className="section py-32 md:py-48">
      <div className="container-x">
        <p className="eyebrow mb-10">( About )</p>

        <h2 className="about-heading display max-w-4xl text-4xl md:text-6xl lg:text-7xl">
          {about.heading.split('\n').map((line, i) => (
            <span key={i} className="reveal-line">
              <span className={`about-line inline-block ${i === 1 ? 'neon' : ''}`}>
                {line}
              </span>
            </span>
          ))}
        </h2>

        <div className="about-body mt-16 grid gap-10 md:grid-cols-2 md:gap-20">
          <div className="space-y-6">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="about-p text-lg leading-relaxed text-white/60">
                {p}
              </p>
            ))}
          </div>

          <div className="about-stats grid grid-cols-3 gap-6 self-start border-t border-white/10 pt-10">
            {about.stats.map((s, i) => {
              const num = parseFloat(s.value)
              const suffix = s.value.replace(/[\d.]/g, '')
              return (
                <div key={i} className="about-stat">
                  <p
                    className="stat-num display text-4xl md:text-5xl"
                    data-value={num}
                    data-suffix={suffix}
                  >
                    0{suffix}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-widest text-white/40">
                    {s.label}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
