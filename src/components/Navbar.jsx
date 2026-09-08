import { useEffect, useState } from 'react'
import { nav, profile } from '../data/content'
import { ArrowUpRight, Sun, Moon } from './Icons'

export default function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false)
  const [stuck, setStuck] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the nav item for whichever section owns the viewport middle.
  useEffect(() => {
    const sections = nav
      .map((item) => document.querySelector(item.target))
      .filter(Boolean)
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  // Close the mobile sheet on Escape so keyboard users are never trapped.
  useEffect(() => {
    if (!open) return
    const onKey = (event) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`site-header ${stuck ? 'is-stuck' : ''}`}>
      <div className="header-inner">
        <a className="brand" href="#top" aria-label={`${profile.name}, back to top`}>
          <span className="brand-mark">{profile.shortName}</span>
          <span className="brand-copy">
            <strong>{profile.name}</strong>
            <span>{profile.title}</span>
          </span>
        </a>

        <nav
          className={`nav ${open ? 'is-open' : ''}`}
          aria-label="Sections"
          onClick={() => setOpen(false)}
        >
          {nav.map((item) => (
            <a
              key={item.target}
              href={item.target}
              className={active === item.target ? 'is-active' : ''}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? <Sun /> : <Moon />}
          </button>

          <a className="btn btn-primary btn-sm header-cta magnetic" href="#contact">
            Let&apos;s connect
            <ArrowUpRight />
          </a>

          <button
            type="button"
            className={`menu-btn ${open ? 'is-open' : ''}`}
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
