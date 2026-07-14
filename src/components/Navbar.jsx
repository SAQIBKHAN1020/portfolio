import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { nav, profile } from '../data/content'

export default function Navbar() {
  const barRef = useRef(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    gsap.fromTo(
      barRef.current,
      { yPercent: -120, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 3.2 },
    )
  }, [])

  return (
    <header
      ref={barRef}
      className="fixed inset-x-0 top-0 z-[80] px-6 py-5 md:px-12 lg:px-20"
    >
      <div className="container-x flex items-center justify-between">
        <a
          href="#hero"
          className="magnetic font-display text-lg font-bold tracking-tight"
        >
          {profile.firstName}
          <span className="text-accent">.</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.target}
              href={item.target}
              className="group relative text-sm text-white/70 transition-colors hover:text-white"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <a
          href={profile.resumeUrl}
          download={profile.resumeFileName}
          className="magnetic hidden items-center gap-2 rounded-full border border-accent/40 px-5 py-2 text-sm text-accent transition-colors hover:bg-accent hover:text-ink md:inline-flex"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3v13m0 0l-5-5m5 5l5-5M5 21h14" />
          </svg>
          CV
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`h-px w-7 bg-white transition-transform ${open ? 'translate-y-[7px] rotate-45' : ''}`}
          />
          <span className={`h-px w-7 bg-white transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span
            className={`h-px w-7 bg-white transition-transform ${open ? '-translate-y-[7px] -rotate-45' : ''}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="mt-6 flex flex-col gap-4 rounded-2xl border border-white/10 bg-ink/90 p-6 backdrop-blur md:hidden">
          {nav.map((item) => (
            <a
              key={item.target}
              href={item.target}
              onClick={() => setOpen(false)}
              className="font-display text-2xl font-medium"
            >
              {item.label}
            </a>
          ))}
          <a
            href={profile.resumeUrl}
            download={profile.resumeFileName}
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent2 px-5 py-3 text-sm font-medium uppercase tracking-widest text-ink"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3v13m0 0l-5-5m5 5l5-5M5 21h14" />
            </svg>
            Download CV
          </a>
        </nav>
      )}
    </header>
  )
}
