import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Initialises Lenis smooth scroll and bridges it to GSAP ScrollTrigger.
 * Returns a ref holding scroll progress (0..1) for the 3D scene.
 * Skips smooth scroll when the user prefers reduced motion.
 */
export default function useLenis(reducedMotion) {
  const scrollProgress = useRef(0)

  useEffect(() => {
    if (reducedMotion) {
      // Still track progress for any listeners, but use native scroll.
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        scrollProgress.current = max > 0 ? window.scrollY / max : 0
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      onScroll()
      return () => window.removeEventListener('scroll', onScroll)
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    lenis.on('scroll', (e) => {
      ScrollTrigger.update()
      const max = e.limit || 1
      scrollProgress.current = max > 0 ? e.scroll / max : 0
    })

    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // Anchor links → Lenis smooth scroll
    const handleAnchor = (e) => {
      const link = e.target.closest('a[href^="#"]')
      if (!link) return
      const id = link.getAttribute('href')
      if (id && id.length > 1) {
        const el = document.querySelector(id)
        if (el) {
          e.preventDefault()
          lenis.scrollTo(el, { offset: 0, duration: 1.4 })
        }
      }
    }
    document.addEventListener('click', handleAnchor)

    // Refresh once layout is ready
    ScrollTrigger.refresh()

    return () => {
      document.removeEventListener('click', handleAnchor)
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [reducedMotion])

  return scrollProgress
}
