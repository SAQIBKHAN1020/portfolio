import { profile } from '../data/content'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <a className="brand" href="#top" aria-label="Back to top">
          <span className="brand-mark">{profile.shortName}</span>
          <span className="brand-copy">
            <strong>{profile.name}</strong>
            <span>{profile.subtitle}</span>
          </span>
        </a>

        <p>
          © {new Date().getFullYear()} {profile.name}. Built and designed in {profile.location}.
        </p>

        <div className="footer-links">
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
            Resume
          </a>
        </div>
      </div>
    </footer>
  )
}
