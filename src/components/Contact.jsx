import { useState } from 'react'
import { profile } from '../data/content'

export default function Contact() {
  const [status, setStatus] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = data.get('name')?.toString().trim()
    const email = data.get('email')?.toString().trim()
    const message = data.get('message')?.toString().trim()
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`)
    const body = encodeURIComponent(`Hi Saqib,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`)
    setStatus('Opening your email app…')
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return (
    <section className="contact" id="contact">
      <div className="section-shell section-pad">
        <div className="section-label light" data-reveal><span>04</span><p>Contact</p></div>
        <div className="contact-grid">
          <div className="contact-copy" data-reveal>
            <p className="eyebrow">HAVE AN IDEA?</p>
            <h2>Let’s make it useful.</h2>
            <p>I’m open to internships, junior AI roles, collaborative builds, and conversations around thoughtful data products.</p>
            <a href={`mailto:${profile.email}`}>{profile.email} <span aria-hidden="true">↗</span></a>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} data-reveal>
            <label>Your name<input name="name" type="text" placeholder="What should I call you?" required /></label>
            <label>Your email<input name="email" type="email" placeholder="you@company.com" required /></label>
            <label>Tell me about it<textarea name="message" rows="4" placeholder="A quick overview of your idea or opportunity…" required /></label>
            <button className="button button-primary" type="submit">Compose email <span aria-hidden="true">↗</span></button>
            <p className="form-note" aria-live="polite">{status || 'This opens your default email app with the message ready to send.'}</p>
          </form>
        </div>

        <footer>
          <a className="footer-brand" href="#top">SK<span>.</span></a>
          <p>© {new Date().getFullYear()} Saqib Khan</p>
          <div>
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer">Résumé ↗</a>
          </div>
        </footer>
      </div>
    </section>
  )
}
