import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Skills from './components/Skills'
import Journey from './components/Journey'
import Certificates from './components/Certificates'
import Preloader from './components/Preloader'
import ResumeModal from './components/ResumeModal'
import Contact from './components/Contact'
import Footer from './components/Footer'

const STORAGE_KEY = 'sk-theme'

function initialTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // Private mode or blocked storage: fall through to the system preference.
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function App() {
  const [theme, setTheme] = useState(initialTheme)
  const [resumeOpen, setResumeOpen] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Not being able to remember the choice is not worth breaking the page over.
    }
  }, [theme])

  // Reveal-on-scroll. Re-runs when the journey tabs swap their panel in.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' },
    )

    const observe = () =>
      document
        .querySelectorAll('[data-reveal]:not(.is-visible)')
        .forEach((node) => observer.observe(node))

    observe()
    const mutation = new MutationObserver(observe)
    mutation.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutation.disconnect()
    }
  }, [])

  // Magnetic pull on primary buttons. Pointer-fine devices only.
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const cleanups = []
    const attach = () => {
      document.querySelectorAll('.magnetic:not([data-magnetic])').forEach((el) => {
        el.dataset.magnetic = 'on'
        let frame = 0
        const onMove = (event) => {
          const rect = el.getBoundingClientRect()
          const x = event.clientX - rect.left - rect.width / 2
          const y = event.clientY - rect.top - rect.height / 2
          cancelAnimationFrame(frame)
          frame = requestAnimationFrame(() => {
            el.style.transform = `translate(${x * 0.22}px, ${y * 0.3}px)`
          })
        }
        const onLeave = () => {
          cancelAnimationFrame(frame)
          el.style.transform = ''
        }
        el.addEventListener('pointermove', onMove)
        el.addEventListener('pointerleave', onLeave)
        cleanups.push(() => {
          el.removeEventListener('pointermove', onMove)
          el.removeEventListener('pointerleave', onLeave)
          cancelAnimationFrame(frame)
          delete el.dataset.magnetic
        })
      })
    }

    attach()
    const mutation = new MutationObserver(attach)
    mutation.observe(document.body, { childList: true, subtree: true })

    return () => {
      mutation.disconnect()
      cleanups.forEach((fn) => fn())
    }
  }, [])

  return (
    <>
      <Preloader />

      <a className="skip-link" href="#work">
        Skip to work
      </a>

      <div className="ambient" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="grid-overlay" aria-hidden="true" />

      <Navbar theme={theme} onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} />

      <main>
        <Hero onOpenResume={() => setResumeOpen(true)} />
        <Projects />
        <About />
        <Skills />
        <Journey />
        <Certificates />
        <Contact />
      </main>

      <Footer />

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  )
}
