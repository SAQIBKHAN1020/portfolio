import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/** Thin emerald→gold bar at the very top showing page scroll progress. */
export default function ScrollProgress({ scrollRef }) {
  const barRef = useRef(null)

  useEffect(() => {
    const tick = () => {
      const p = scrollRef?.current ?? 0
      gsap.set(barRef.current, { scaleX: p })
    }
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [scrollRef])

  return <div ref={barRef} className="scroll-progress" aria-hidden="true" />
}
