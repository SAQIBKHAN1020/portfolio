import { useEffect, useState } from 'react'
import { profile } from '../data/content'

const SEEN_KEY = 'sk-intro-seen'

/* A short monogram intro. Deliberately brief and only on the first visit of a
   session, so it never gets in the way of the hero or of LCP. */
export default function Preloader() {
  const [state, setState] = useState(() => {
    if (typeof window === 'undefined') return 'done'
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'done'
    try {
      if (sessionStorage.getItem(SEEN_KEY)) return 'done'
    } catch {
      // Blocked storage just means the intro plays again, which is harmless
    }
    return 'playing'
  })

  useEffect(() => {
    if (state !== 'playing') return undefined
    try {
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      // Nothing to do; the intro simply is not remembered
    }
    const fade = setTimeout(() => setState('leaving'), 620)
    const gone = setTimeout(() => setState('done'), 1180)
    return () => {
      clearTimeout(fade)
      clearTimeout(gone)
    }
    // Deliberately runs once. Depending on state would tear the timers down
    // the moment the first one fires, so the overlay would never unmount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (state === 'done') return null

  return (
    <div className={`intro ${state === 'leaving' ? 'is-leaving' : ''}`} aria-hidden="true">
      <span className="intro-mark">{profile.shortName}</span>
      <span className="intro-line" />
    </div>
  )
}
