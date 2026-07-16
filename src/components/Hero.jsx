import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { profile } from '../data/content'
import ScrambleText from './ScrambleText'

gsap.registerPlugin(ScrollTrigger)

export default function Hero({ ready }) {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (!ready) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })
      tl.from('.hero-word', {
        yPercent: 120,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.09,
      })
        .from('.hero-eyebrow', { opacity: 0, y: 20, duration: 0.8 }, '-=0.8')
        .from('.hero-role', { opacity: 0, y: 20, duration: 0.8 }, '-=0.6')
        .from('.hero-sub', { opacity: 0, y: 20, duration: 0.8 }, '-=0.6')
        .from('.hero-cta', { opacity: 0, y: 20, duration: 0.8, stagger: 0.1 }, '-=0.5')
        .from(
          '.hero-photo',
          { opacity: 0, scale: 0.85, rotateY: 18, duration: 1.2, ease: 'power3.out' },
          '-=1',
        )
        .from('.hero-scroll', { opacity: 0, duration: 0.8 }, '-=0.3')

      // Mouse tilt on the photo frame
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const frame = root.current.querySelector('.photo-frame')
        if (frame) {
          const onMove = (e) => {
            const r = frame.getBoundingClientRect()
            const px = (e.clientX - r.left) / r.width
            const py = (e.clientY - r.top) / r.height
            gsap.to(frame, {
              rotateY: (px - 0.5) * 16,
              rotateX: -(py - 0.5) * 16,
              duration: 0.5,
              ease: 'power3.out',
              transformPerspective: 800,
            })
          }
          const onLeave = () =>
            gsap.to(frame, { rotateX: 0, rotateY: 0, duration: 1, ease: 'elastic.out(1, 0.4)' })
          frame.addEventListener('mousemove', onMove)
          frame.addEventListener('mouseleave', onLeave)
        }
      }

      // Subtle parallax on the hero copy as you scroll away
      gsap.to('.hero-inner', {
        yPercent: -12,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, root)
    return () => ctx.revert()
  }, [ready])

  const nameWords = [profile.firstName, profile.lastName]

  return (
    <section id="hero" ref={root} className="section flex min-h-[100svh] items-center pt-24">
      <div className="container-x hero-inner grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
        <p className="hero-eyebrow eyebrow mb-6">
          {profile.location} — Portfolio ’{new Date().getFullYear().toString().slice(2)}
        </p>

        <h1 className="display text-[17vw] leading-[0.85] md:text-[12vw] lg:text-[7.5vw]">
          {nameWords.map((w, i) => (
            <span key={i} className="reveal-line">
              <span className="hero-word inline-block">
                {i === 0 ? <span className="grad-text">{w}</span> : w}
              </span>
            </span>
          ))}
        </h1>

        {/* Rotating, scrambling role */}
        <div className="hero-role mt-8 flex items-center gap-4">
          <span className="h-px w-12 bg-accent" />
          <ScrambleText
            words={profile.roleWords}
            className="neon font-display text-xl tracking-tight md:text-3xl"
          />
        </div>

        <div className="mt-10 flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <p className="hero-sub max-w-lg text-lg leading-relaxed text-white/55">
            {profile.tagline}
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="hero-cta btn btn-solid magnetic">
              View Work
            </a>
            <a href="#contact" className="hero-cta btn magnetic">
              Get in touch
            </a>
          </div>
        </div>
        </div>

        {/* Profile photo — floating glass frame (public/profile.jpg) */}
        <div className="hero-photo order-first flex justify-center lg:order-none">
          <div className="photo-orbit">
            <div className="photo-frame w-56 sm:w-64 lg:w-full lg:max-w-sm">
              <img src="/profile.jpg" alt={`${profile.name} — portrait`} />
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/40">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-accent to-transparent" />
      </div>
    </section>
  )
}
