import { useEffect, useRef } from 'react'
import { profile } from '../data/content'
import { Download, Mail } from './Icons'

/* Reads the CV inside the page. Escape closes it, focus is trapped while it
   is open, and the page behind it cannot scroll. */
export default function ResumeModal({ open, onClose }) {
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
        'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])',
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
      aria-labelledby="resume-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="modal-panel" ref={panelRef}>
        <header className="modal-head">
          <div>
            <p className="modal-eyebrow">Resume</p>
            <h2 id="resume-modal-title">{profile.name}</h2>
            <p className="modal-sub">{profile.subtitle}</p>
          </div>

          <div className="modal-actions">
            <a
              className="btn btn-sm btn-primary magnetic"
              href={profile.resumeUrl}
              download={profile.resumeFileName}
            >
              Download
              <Download />
            </a>
            <a className="btn btn-sm" href={`mailto:${profile.email}`}>
              <Mail />
              Email me
            </a>
            <button
              className="modal-close"
              type="button"
              onClick={onClose}
              ref={closeRef}
              aria-label="Close resume preview"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </header>

        <div className="modal-body">
          <iframe
            src={`${profile.resumeUrl}#view=FitH`}
            title={`${profile.name} resume`}
            loading="lazy"
          />
          {/* Some mobile browsers refuse to render a PDF in an iframe */}
          <p className="modal-fallback">
            Cannot see the document?{' '}
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
              Open it in a new tab
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
