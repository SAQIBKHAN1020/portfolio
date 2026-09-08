import { useEffect, useState } from 'react'
import { nav, profile } from '../data/content'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-shell">
        <a className="brand" href="#top" aria-label="Saqib Khan, home">
          <span className="brand-mark">{profile.shortName}</span>
          <span className="brand-copy">
            <strong>{profile.name}</strong>
            <small>AI Engineer</small>
          </span>
        </a>

        <nav className={`nav-links ${open ? 'is-open' : ''}`} aria-label="Main navigation">
          {nav.map((item) => (
            <a key={item.target} href={item.target} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a className="nav-resume mobile-only" href={profile.resumeUrl} target="_blank" rel="noreferrer">
            View résumé ↗
          </a>
        </nav>

        <a className="nav-cta" href="#contact">
          Let’s talk <span aria-hidden="true">↗</span>
        </a>

        <button
          className={`menu-button ${open ? 'is-open' : ''}`}
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
