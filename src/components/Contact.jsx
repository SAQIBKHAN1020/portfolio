import { useEffect, useRef, useState } from 'react'
import { contact, profile } from '../data/content'
import {
  ArrowRight,
  ArrowUpRight,
  Bolt,
  Check,
  GithubMark,
  LinkedinMark,
  Mail,
  Pin,
  Stack,
  Target,
} from './Icons'

const ICONS = { bolt: Bolt, stack: Stack, target: Target }

const CHANNELS = [
  {
    id: 'email',
    icon: Mail,
    label: 'Email me',
    value: profile.email,
    href: `mailto:${profile.email}`,
    external: false,
  },
  {
    id: 'linkedin',
    icon: LinkedinMark,
    label: 'LinkedIn',
    value: 'Connect with me',
    href: profile.linkedin,
    external: true,
  },
  {
    id: 'github',
    icon: GithubMark,
    label: 'GitHub',
    value: 'Check out my work',
    href: profile.github,
    external: true,
  },
  {
    id: 'location',
    icon: Pin,
    label: 'Based in',
    value: profile.location,
    href: null,
    external: false,
  },
]

export default function Contact() {
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)
  const [copied, setCopied] = useState(false)
  const panelRef = useRef(null)

  // Not everyone has a mail client wired up, so the address can be copied too.
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      setStatus(`Copy did not work here. My address is ${profile.email}`)
    }
  }

  // Pointer-tracked glow across the panel. Desktop only, reduced motion aware.
  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const onMove = (event) => {
      const rect = panel.getBoundingClientRect()
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        panel.style.setProperty('--gx', `${((event.clientX - rect.left) / rect.width) * 100}%`)
        panel.style.setProperty('--gy', `${((event.clientY - rect.top) / rect.height) * 100}%`)
      })
    }
    panel.addEventListener('pointermove', onMove)
    return () => {
      panel.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = data.get('name')?.toString().trim()
    const email = data.get('email')?.toString().trim()
    const message = data.get('message')?.toString().trim()

    // Bots fill hidden fields; people do not
    if (data.get('company')) return

    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`)
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`)
    setSending(true)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setStatus('Your email app is opening with the message ready to send.')
    setTimeout(() => setSending(false), 1600)
  }

  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-heading">
      {/* Slow drifting mesh, sits behind everything in this section */}
      <div className="contact-aura" aria-hidden="true">
        <span />
        <span />
      </div>

      <div className="shell">
        <div className="contact-panel" ref={panelRef} data-reveal>
          <div className="contact-lead">
            <span className="eyebrow">
              <i />
              {contact.eyebrow}
            </span>

            <h2 id="contact-heading">
              <span>{contact.headlineTop}</span>
              <span>{contact.headlineMid}</span>
              <span className="accent-text underline-sweep">{contact.headlineAccent}</span>
            </h2>

            <p className="contact-text">{contact.text}</p>

            <div className="channel-grid">
              {CHANNELS.map((channel, i) => {
                const Icon = channel.icon
                const inner = (
                  <>
                    <span className="channel-icon">
                      <Icon />
                    </span>
                    <span className="channel-copy">
                      <b>{channel.label}</b>
                      <span>{channel.value}</span>
                    </span>
                    {channel.href && <ArrowRight className="channel-go" />}
                  </>
                )
                const style = { '--delay': `${i * 80}ms` }
                return channel.href ? (
                  <a
                    key={channel.id}
                    className="channel"
                    href={channel.href}
                    style={style}
                    {...(channel.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={channel.id} className="channel is-static" style={style}>
                    {inner}
                  </div>
                )
              })}
            </div>

            <ul className="promise-row">
              {contact.promises.map((promise, i) => {
                const Icon = ICONS[promise.icon]
                return (
                  <li key={promise.title} style={{ '--delay': `${i * 90}ms` }}>
                    <span className="promise-icon">
                      <Icon />
                    </span>
                    <span>
                      <b>{promise.title}</b>
                      <span>{promise.text}</span>
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="contact-side">
            <div className="signal" aria-hidden="true">
              <span className="signal-ring" />
              <span className="signal-ring" />
              <span className="signal-ring" />
              <span className="signal-core">{profile.shortName}</span>
              <span className="signal-node signal-node-a">
                <Mail />
              </span>
              <span className="signal-node signal-node-b">
                <LinkedinMark />
              </span>
              <span className="signal-node signal-node-c">
                <GithubMark />
              </span>
            </div>
            <p className="signal-caption">
              <span className="pulse-dot" />
              {profile.availability}
            </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <p className="form-title">Send a message</p>

            <div className="field">
              <label htmlFor="name">Your name</label>
              <input id="name" name="name" type="text" placeholder="Jane Doe" required />
            </div>
            <div className="field">
              <label htmlFor="email">Your email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="jane@company.com"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="A short note about the role, project, or idea."
                required
              />
            </div>

            {/* Off-screen honeypot, never shown or announced */}
            <input
              className="hp-field"
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"

            />

            <div className="form-actions">
              <button
                className={`btn btn-primary send-btn magnetic ${sending ? 'is-sending' : ''}`}
                type="submit"
              >
                Send a message
                <ArrowUpRight />
              </button>
              <button
                className={`btn btn-sm copy-btn ${copied ? 'is-copied' : ''}`}
                type="button"
                onClick={copyEmail}
              >
                {copied ? <Check /> : <Mail />}
                {copied ? 'Copied' : 'Copy email'}
              </button>
            </div>

            <p className={`form-note ${status ? 'is-ok' : ''}`} aria-live="polite">
              {status || 'This opens your own email app, so nothing is stored on this site.'}
            </p>
          </form>
          </div>
        </div>
      </div>
    </section>
  )
}
