import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { profile } from '../data/content'
import { Check, Mail } from './Icons'

const WHATSAPP_NUMBER = '923432048645'

/* Private builds have no public repo, so this modal composes a demo request
   instead of pointing at a dead link. The visitor edits one form, and Send
   hands the finished message to their own mail app — nothing is stored. */
export default function DemoModal({ project, onClose }) {
  const open = Boolean(project)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [copied, setCopied] = useState(false)

  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const lastFocused = useRef(null)

  // Fresh form every time the modal opens, prefilled for the project
  useEffect(() => {
    if (!project) return
    setName('')
    setEmail('')
    setCopied(false)
    setMessage(
      `Hi Saqib,\n\nI came across ${project.title} on your portfolio and would like to see a walkthrough or demo.\n\nThanks,`,
    )
  }, [project])

  useEffect(() => {
    if (!open) return

    lastFocused.current = document.activeElement
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
    const previousOverflow = document.body.style.overflow
    const previousPadding = document.body.style.paddingRight
    document.body.style.overflow = 'hidden'
    if (scrollBarWidth > 0) document.body.style.paddingRight = `${scrollBarWidth}px`

    closeRef.current?.focus()

    const onKey = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const focusable = panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])',
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

  const subject = `Demo request: ${project.title}`
  const signature = name.trim() ? `\n${name.trim()}` : ''
  const replyLine = email.trim() ? `Reply to me at ${email.trim()}.` : ''

  const mailtoHref = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    `${message}${signature}${replyLine ? `\n\n${replyLine}` : ''}`,
  )}`

  const whatsappText = encodeURIComponent(`*${subject}*\n\n${message}${signature}`)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked: the email is visible in the row anyway
    }
  }

  // Portalled to <body> so the fixed site header can never paint over it
  return createPortal(
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="modal-panel modal-panel-demo" ref={panelRef}>
        <header className="modal-head">
          <div>
            <p className="modal-eyebrow">Request a demo</p>
            <h2 id="demo-modal-title">{project.title}</h2>
            <p className="modal-sub">Tell me what you would like to see.</p>
          </div>
          <div className="modal-actions">
            <button
              className="modal-close"
              type="button"
              onClick={onClose}
              ref={closeRef}
              aria-label="Close demo request"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </header>

        <form
          className="modal-body demo-body"
          onSubmit={(event) => {
            event.preventDefault()
            window.location.href = mailtoHref
          }}
        >
          <div className="field">
            <label htmlFor="demo-name">Your name</label>
            <input
              id="demo-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Ali Raza"
              autoComplete="name"
            />
          </div>

          <div className="field">
            <label htmlFor="demo-email">
              Your email <span className="optional">(optional)</span>
            </label>
            <input
              id="demo-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="So I can reply to you"
              autoComplete="email"
            />
          </div>

          <div className="field">
            <label htmlFor="demo-message">Message</label>
            <textarea
              id="demo-message"
              rows={5}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </div>

          <div className="demo-cta-row">
            <button className="btn btn-primary demo-send" type="submit">
              <Mail />
              Send request
            </button>
            <a
              className="btn demo-alt"
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </div>

          <div className="demo-direct">
            <span>Or email me directly:</span>
            <b>{profile.email}</b>
            <button className="demo-copy" type="button" onClick={copyEmail}>
              {copied ? (
                <>
                  Copied <Check />
                </>
              ) : (
                'Copy'
              )}
            </button>
          </div>

          <p className="form-note">Opens your own mail app with everything filled in. Nothing is stored on this site.</p>
        </form>
      </div>
    </div>,
    document.body,
  )
}
