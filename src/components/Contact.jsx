import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { profile, socials } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const root = useRef(null)
  const [sent, setSent] = useState(false)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-big', {
        yPercent: 110,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '.contact-heading', start: 'top 85%' },
      })
      gsap.from('.contact-form > *', {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.08,
        scrollTrigger: { trigger: '.contact-form', start: 'top 85%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Placeholder: wire this to a real service (Formspree, EmailJS, backend).
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contact" ref={root} className="section py-32 md:py-48">
      <div className="container-x">
        <p className="eyebrow mb-8">( Contact )</p>

        <div className="contact-heading">
          {['Let’s build', 'something great.'].map((line, i) => (
            <span key={i} className="reveal-line">
              <span
                className={`contact-big display block text-5xl md:text-8xl lg:text-9xl ${
                  i === 1 ? 'neon' : ''
                }`}
              >
                {line}
              </span>
            </span>
          ))}
        </div>

        <div className="mt-20 grid gap-16 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="contact-form space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <input
                required
                placeholder="Your name"
                className="w-full border-b border-white/15 bg-transparent py-3 text-lg outline-none placeholder:text-white/30 focus:border-white"
              />
              <input
                required
                type="email"
                placeholder="Your email"
                className="w-full border-b border-white/15 bg-transparent py-3 text-lg outline-none placeholder:text-white/30 focus:border-white"
              />
            </div>
            <textarea
              required
              rows={4}
              placeholder="Tell me about your project"
              className="w-full resize-none border-b border-white/15 bg-transparent py-3 text-lg outline-none placeholder:text-white/30 focus:border-white"
            />
            <button type="submit" className="btn btn-solid magnetic">
              {sent ? 'Thanks! ✦' : 'Send message'}
            </button>
          </form>

          <div className="flex flex-col justify-between gap-10">
            <div>
              <p className="text-sm uppercase tracking-widest text-white/40">Email</p>
              <a
                href={`mailto:${profile.email}`}
                className="magnetic mt-2 inline-block font-display text-2xl hover:text-accent md:text-3xl"
              >
                {profile.email}
              </a>
              <p className="mt-3 text-sm text-white/40">{profile.location}</p>
            </div>

            <div>
              <p className="mb-4 text-sm uppercase tracking-widest text-white/40">
                Resume
              </p>
              <a
                href={profile.resumeUrl}
                download={profile.resumeFileName}
                className="magnetic group inline-flex items-center gap-3 rounded-full border border-accent/40 px-6 py-3 text-sm uppercase tracking-widest text-accent transition-colors hover:bg-accent hover:text-ink"
              >
                <svg
                  width="16"
                  height="16"
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
            </div>

            <div>
              <p className="mb-4 text-sm uppercase tracking-widest text-white/40">
                Elsewhere
              </p>
              <div className="flex flex-wrap gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="magnetic rounded-full border border-white/15 px-5 py-2 text-sm transition-colors hover:border-white/50 hover:bg-white/5"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-32 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/40 md:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name}. Crafted with passion.
          </p>
          <p>Built with React · Three.js · GSAP</p>
        </footer>
      </div>
    </section>
  )
}
