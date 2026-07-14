import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Loader({ onComplete }) {
  const rootRef = useRef(null)
  const barRef = useRef(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const state = { v: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        // Reveal wipe out
        gsap.to(rootRef.current, {
          yPercent: -100,
          duration: 1,
          ease: 'power4.inOut',
          delay: 0.15,
          onComplete,
        })
      },
    })

    tl.to(state, {
      v: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate: () => setCount(Math.round(state.v)),
    })
    if (barRef.current) {
      tl.to(barRef.current, { scaleX: 1, duration: 2.2, ease: 'power2.inOut' }, 0)
    }

    return () => tl.kill()
  }, [onComplete])

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
    >
      <div className="flex items-end gap-4 font-display">
        <span className="text-[18vw] font-bold leading-none tabular-nums md:text-[12vw]">
          {String(count).padStart(3, '0')}
        </span>
        <span className="mb-4 text-lg text-white/40">%</span>
      </div>
      <div className="mt-6 h-px w-56 overflow-hidden bg-white/10 md:w-80">
        <div
          ref={barRef}
          className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-accent to-accent2"
        />
      </div>
      <p className="mt-8 text-xs uppercase tracking-[0.4em] text-white/40">
        Loading experience
      </p>
    </div>
  )
}
