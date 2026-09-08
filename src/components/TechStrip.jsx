import { techStrip } from '../data/content'
import { brandMarks } from '../data/brandMarks'
import { BrandMark } from './Icons'

export default function TechStrip() {
  // The track is duplicated so the -50% keyframe loops seamlessly.
  const loop = [...techStrip, ...techStrip]

  return (
    <div className="marquee" aria-label="Tools and technologies I work with">
      <div className="marquee-track">
        {loop.map((name, index) => (
          <div
            className="marquee-item"
            key={`${name}-${index}`}
            style={{ '--mark-color': brandMarks[name]?.color }}
            aria-hidden={index >= techStrip.length}
          >
            <BrandMark name={name} />
            {brandMarks[name]?.label}
          </div>
        ))}
      </div>
    </div>
  )
}
