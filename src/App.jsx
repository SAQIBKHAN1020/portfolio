import { useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Experience from './scene/Experience'
import useLenis from './hooks/useLenis'
import useMagnetic from './hooks/useMagnetic'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Spotlight from './components/Spotlight'
import ScrollProgress from './components/ScrollProgress'
import FloatingLogos from './components/FloatingLogos'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Skills from './components/Skills'
import Timeline from './components/Timeline'
import Projects from './components/Projects'
import Contact from './components/Contact'

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = () => setReduced(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}

export default function App() {
  const reducedMotion = usePrefersReducedMotion()
  const [loaded, setLoaded] = useState(false)
  const scrollRef = useLenis(reducedMotion)

  useMagnetic(!reducedMotion && loaded)

  // Lock scroll while the loader is on screen
  useEffect(() => {
    document.body.style.overflow = loaded ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [loaded])

  // Sections mount behind a scroll-locked loader, so trigger positions are
  // stale by the time the page is revealed — recalculate them once it is.
  useEffect(() => {
    if (!loaded) return
    const t = setTimeout(() => ScrollTrigger.refresh(), 100)
    return () => clearTimeout(t)
  }, [loaded])

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

      <Experience scrollRef={scrollRef} reducedMotion={reducedMotion} />
      {!reducedMotion && <FloatingLogos />}
      {!reducedMotion && <Spotlight />}
      <Cursor />
      <ScrollProgress scrollRef={scrollRef} />
      <Navbar />

      <main className="content-layer">
        <Hero ready={loaded} />
        <Marquee />
        <About />
        <Skills />
        <Timeline />
        <Projects />
        <Contact />
      </main>

      <div className="grain" aria-hidden="true" />
    </>
  )
}
