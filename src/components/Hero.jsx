import { profile } from '../data/content'

export default function Hero() {
  return (
    <section className="hero section-shell" id="top">
      <div className="hero-copy hero-enter">
        <div className="availability">
          <span className="status-dot" /> Available for opportunities
        </div>
        <p className="hero-kicker">AI ENGINEER · PYTHON DEVELOPER</p>
        <h1>
          <span className="hero-line">Building</span>
          <span className="hero-line">intelligence</span>
          <span className="hero-line accent-line">that feels <i>useful.</i></span>
        </h1>
        <p className="hero-intro">
          I’m Saqib, an AI engineer from Karachi. I turn machine-learning ideas into
          clear, usable products—from NLP tools to predictive dashboards.
        </p>

        <div className="hero-actions">
          <a className="button button-primary" href="#work">Explore my work <span aria-hidden="true">↗</span></a>
          <a className="button button-quiet" href={profile.resumeUrl} download={profile.resumeFileName}>
            Download résumé <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="hero-meta" aria-label="Profile facts">
          <div><strong>04</strong><span>Product builds</span></div>
          <div><strong>AI</strong><span>Applied focus</span></div>
          <div><strong>PK</strong><span>Karachi · Remote</span></div>
        </div>
      </div>

      <div className="hero-visual hero-enter" style={{ '--delay': '120ms' }}>
        <div className="portrait-frame">
          <img src="/images/hero-portrait-demo.jpg" alt="Temporary AI-generated portfolio portrait" fetchPriority="high" />
          <span className="image-label">TEMPORARY AI PORTRAIT</span>
          <div className="portrait-note">
            <span>Currently focused on</span>
            <strong>Applied AI products</strong>
          </div>
        </div>
        <div className="hero-monogram" aria-hidden="true">SK</div>
      </div>
    </section>
  )
}
