import { skillGroups } from '../data/content'

export default function Skills() {
  return (
    <section className="skills section-shell section-pad" id="skills">
      <div className="section-label" data-reveal><span>03</span><p>Capabilities</p></div>
      <div className="skills-layout">
        <div className="skills-heading" data-reveal>
          <p className="eyebrow">MY WORKING TOOLKIT</p>
          <h2>From notebook to usable product.</h2>
          <p>I choose tools around the problem, with Python at the center and a growing focus on reliable AI application engineering.</p>
        </div>
        <div className="skill-groups">
          {skillGroups.map((group, index) => (
            <div className="skill-group" key={group.title} data-reveal style={{ '--delay': `${index * 70}ms` }}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{group.title}</h3>
              <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
