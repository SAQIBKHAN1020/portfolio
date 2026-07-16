import { useEffect, useRef } from 'react'

/**
 * Field-related tech logos drifting gently in the background.
 * SVGs are used as CSS masks so they can be tinted emerald/gold.
 * Deliberately faint — atmosphere, never competing with the text.
 */
const LOGOS = [
  { icon: 'python', x: '6%', y: '14%', size: 84, dur: 14, delay: 0, tint: 'emerald' },
  { icon: 'tensorflow', x: '88%', y: '10%', size: 64, dur: 17, delay: 2, tint: 'gold' },
  { icon: 'pandas', x: '80%', y: '46%', size: 70, dur: 15, delay: 1, tint: 'emerald' },
  { icon: 'numpy', x: '10%', y: '58%', size: 60, dur: 18, delay: 3, tint: 'emerald' },
  { icon: 'scikitlearn', x: '90%', y: '76%', size: 78, dur: 16, delay: 0.5, tint: 'gold' },
  { icon: 'fastapi', x: '18%', y: '86%', size: 56, dur: 13, delay: 2.5, tint: 'emerald' },
  { icon: 'jupyter', x: '68%', y: '90%', size: 62, dur: 19, delay: 1.5, tint: 'gold' },
  { icon: 'streamlit', x: '45%', y: '6%', size: 52, dur: 15, delay: 3.5, tint: 'emerald' },
]

export default function FloatingLogos() {
  const root = useRef(null)

  // Slow mouse parallax on the whole layer
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const el = root.current
    let raf = 0
    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0
    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 24
      ty = (e.clientY / window.innerHeight - 0.5) * 24
    }
    const loop = () => {
      cx += (tx - cx) * 0.04
      cy += (ty - cy) * 0.04
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={root} className="floating-logos" aria-hidden="true">
      {LOGOS.map((l) => (
        <span
          key={l.icon}
          className={`tech-logo tech-logo--${l.tint}`}
          style={{
            left: l.x,
            top: l.y,
            width: l.size,
            height: l.size,
            animationDuration: `${l.dur}s`,
            animationDelay: `${l.delay}s`,
            WebkitMaskImage: `url(/logos/${l.icon}.svg)`,
            maskImage: `url(/logos/${l.icon}.svg)`,
          }}
        />
      ))}
    </div>
  )
}
