import { journey } from '../data/content'

export default function About() {
  return (
    <section className="about section-shell section-pad" id="about">
      <div className="section-label" data-reveal><span>01</span><p>About</p></div>
      <div className="about-grid">
        <h2 data-reveal>Curious by nature.<span>Practical by choice.</span></h2>
        <div className="about-copy" data-reveal>
          <p>I enjoy the part after the model works: shaping it into something another person can understand, trust, and actually use.</p>
          <p>My work sits where machine learning, clean interfaces, and product thinking meet. I’m currently building my depth in AI engineering while shipping focused tools.</p>
          <a className="text-link" href="mailto:iamsaqibkhan.edu@gmail.com">Start a conversation <span aria-hidden="true">↗</span></a>
        </div>
      </div>

      <div className="journey-list" data-reveal>
        {journey.map((item) => (
          <article key={item.period} className="journey-row">
            <p className="journey-period">{item.period}</p>
            <div><h3>{item.role}</h3><p>{item.org}</p></div>
            <p className="journey-text">{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
