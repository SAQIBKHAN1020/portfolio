import { useEffect, useRef } from 'react'

/** Soft emerald radial glow that trails the cursor across the whole page. */
export default function Spotlight() {
  const ref = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const el = ref.current
    let raf = null
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const target = { ...pos }

    const onMove = (e) => {
      target.x = e.clientX
      target.y = e.clientY
      if (!raf) raf = requestAnimationFrame(loop)
    }

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.08
      pos.y += (target.y - pos.y) * 0.08
      el.style.setProperty('--mx', `${pos.x}px`)
      el.style.setProperty('--my', `${pos.y}px`)
      raf =
        Math.abs(target.x - pos.x) > 0.5 || Math.abs(target.y - pos.y) > 0.5
          ? requestAnimationFrame(loop)
          : null
    }

    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={ref} className="spotlight" aria-hidden="true" />
}
