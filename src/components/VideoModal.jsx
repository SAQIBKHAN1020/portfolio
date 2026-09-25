import { useEffect, useRef } from 'react'
import { profile } from '../data/content'

/* Plays the intro video inside the page. Escape closes it, focus is trapped
   while it is open, and the page behind it cannot scroll. Unmounting the
   <video> on close stops playback automatically. */
export default function VideoModal({ open, onClose }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const lastFocused = useRef(null)

  useEffect(() => {
    if (!open) return

    lastFocused.current = document.activeElement
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
    const previousOverflow = document.body.style.overflow
    const previousPadding = document.body.style.paddingRight
    document.body.style.overflow = 'hidden'
    // Compensate so the page does not jump when the scrollbar disappears
    if (scrollBarWidth > 0) document.body.style.paddingRight = `${scrollBarWidth}px`

    closeRef.current?.focus()

    const onKey = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const focusable = panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      document.body.style.paddingRight = previousPadding
      lastFocused.current?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="modal-panel modal-panel-video" ref={panelRef}>
        <header className="modal-head">
          <div>
            <p className="modal-eyebrow">Intro</p>
            <h2 id="video-modal-title">{profile.name}</h2>
            <p className="modal-sub">{profile.subtitle}</p>
          </div>

          <div className="modal-actions">
            <button
              className="modal-close"
              type="button"
              onClick={onClose}
              ref={closeRef}
              aria-label="Close video player"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </header>

        <div className="modal-body">
          {/* No width/height caps: the file plays at its own full quality */}
          <video
            className="intro-video"
            src="/WhatsApp Video 2026-09-25 at 12.43.21 PM.mp4"
            controls
            autoPlay
            playsInline
            preload="metadata"
          />
        </div>
      </div>
    </div>
  )
}
