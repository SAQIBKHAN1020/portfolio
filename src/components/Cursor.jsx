import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    // Skip on touch / coarse pointers
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { ...pos }

    const xTo = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' })
    const yTo = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' })

    const onMove = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
      xTo(e.clientX)
      yTo(e.clientY)
    }

    const tick = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.15
      ringPos.y += (pos.y - ringPos.y) * 0.15
      gsap.set(ring, { x: ringPos.x, y: ringPos.y })
    }
    gsap.ticker.add(tick)

    const grow = () => gsap.to(ring, { scale: 2.2, opacity: 0.6, duration: 0.3, ease: 'power3' })
    const shrink = () => gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3, ease: 'power3' })

    const bindHover = () => {
      document.querySelectorAll('a, button, .magnetic').forEach((el) => {
        el.addEventListener('mouseenter', grow)
        el.addEventListener('mouseleave', shrink)
      })
    }
    bindHover()

    window.addEventListener('mousemove', onMove)

    return () => {
      window.removeEventListener('mousemove', onMove)
      gsap.ticker.remove(tick)
    }
  }, [])

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/60 md:block"
        style={{ mixBlendMode: 'difference' }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[91] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white md:block"
        style={{ mixBlendMode: 'difference' }}
      />
    </>
  )
}
