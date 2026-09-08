import { useState } from 'react'
import { contact, profile } from '../data/content'
import { ArrowUpRight, GithubMark, LinkedinMark, Mail, Pin } from './Icons'

export default function Contact() {
  const [status, setStatus] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = data.get('name')?.toString().trim()
    const email = data.get('email')?.toString().trim()
    const message = data.get('message')?.toString().trim()

    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`)
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setStatus('Your email app is opening with the message ready to send.')
  }

  return (
    <section className="section" id="contact">
      <div className="shell">
        <div className="section-head" data-reveal>
          <span className="eyebrow">
            <i />
            Contact
          </span>
        </div>

        <div className="contact-panel" data-reveal>
          <div className="contact-info">
            <h2>
              {contact.headline.replace('?', '')}
              <span className="accent-text">?</span>
            </h2>
            <p>{contact.text}</p>

            <div className="contact-links">
              <a className="contact-link" href={`mailto:${profile.email}`}>
                <Mail />
                <div>
                  <span>Email</span>
                  <strong>{profile.email}</strong>
                </div>
              </a>
              <a
                className="contact-link"
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <LinkedinMark />
                <div>
                  <span>LinkedIn</span>
                  <strong>dev-saqib1-khan</strong>
                </div>
              </a>
              <a
                className="contact-link"
                href={profile.github}
                target="_blank"
                rel="noreferrer"
              >
                <GithubMark />
                <div>
                  <span>GitHub</span>
                  <strong>SAQIBKHAN1020</strong>
                </div>
              </a>
              <div className="contact-link" role="group" aria-label="Location">
                <Pin />
                <div>
                  <span>Based in</span>
                  <strong>{profile.location}</strong>
                </div>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
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
                rows="5"
                placeholder="A short note about the role, project, or idea."
                required
              />
            </div>
            <button className="btn btn-primary magnetic" type="submit">
              Send message
              <ArrowUpRight />
            </button>
            <p className={`form-note ${status ? 'is-ok' : ''}`} aria-live="polite">
              {status || 'This opens your own email app, so nothing is stored on this site.'}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
