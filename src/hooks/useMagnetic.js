import { useEffect } from 'react'
import gsap from 'gsap'

/**
 * Magnetic hover: elements with the `.magnetic` class get pulled toward the
 * cursor while it is near them, then spring back on leave.
 * Bound globally so any element can opt in just by adding the class.
 */
export default function useMagnetic(enabled = true) {
  useEffect(() => {
    if (!enabled) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const cleanups = []

    const bind = () => {
      document.querySelectorAll('.magnetic').forEach((el) => {
        if (el.dataset.magneticBound) return
        el.dataset.magneticBound = 'true'

        const strength = parseFloat(el.dataset.strength || '0.35')

        const onMove = (e) => {
          const rect = el.getBoundingClientRect()
          const x = e.clientX - (rect.left + rect.width / 2)
          const y = e.clientY - (rect.top + rect.height / 2)
          gsap.to(el, {
            x: x * strength,
            y: y * strength,
            duration: 0.6,
            ease: 'power3.out',
          })
        }
        const onLeave = () => {
          gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.35)' })
        }

        el.addEventListener('mousemove', onMove)
        el.addEventListener('mouseleave', onLeave)
        cleanups.push(() => {
          el.removeEventListener('mousemove', onMove)
          el.removeEventListener('mouseleave', onLeave)
          delete el.dataset.magneticBound
        })
      })
    }

    // Bind after the DOM has settled (sections mount post-loader)
    const t = setTimeout(bind, 300)
    const t2 = setTimeout(bind, 1500)

    return () => {
      clearTimeout(t)
      clearTimeout(t2)
      cleanups.forEach((fn) => fn())
    }
  }, [enabled])
}
