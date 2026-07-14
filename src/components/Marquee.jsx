import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { marquee } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

/**
 * Infinite scrolling text strip. Base speed runs constantly; scrolling
 * the page adds velocity and flips direction — the classic award-site touch.
 */
export default function Marquee() {
  const trackRef = useRef(null)

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return

    // The track holds two identical halves, so -50% is a seamless loop.
    const tween = gsap.to(track, {
      xPercent: -50,
      duration: 24,
      ease: 'none',
      repeat: -1,
    })

    const st = ScrollTrigger.create({
      trigger: track,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        // Scroll velocity speeds up the marquee and sets its direction
        const v = gsap.utils.clamp(-6, 6, self.getVelocity() / 260)
        tween.timeScale(1 + Math.abs(v))
        gsap.to(tween, {
          timeScale: 1,
          duration: 0.7,
          overwrite: true,
        })
        if (v !== 0) tween.reversed(v < 0)
      },
    })

    return () => {
      st.kill()
      tween.kill()
    }
  }, [])

  const items = [...marquee, ...marquee] // duplicated for the seamless loop

  return (
    <section
      className="relative overflow-hidden border-y border-white/10 py-6"
      aria-hidden="true"
    >
      <div ref={trackRef} className="marquee">
        {items.map((word, i) => (
          <span key={i} className="marquee-item font-display text-3xl md:text-5xl">
            <span className={i % 2 ? 'text-white/25' : 'grad-text'}>{word}</span>
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </section>
  )
}
