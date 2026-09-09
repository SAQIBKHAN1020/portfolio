import { brandMarks } from '../data/brandMarks'

/* Stroke icons share one set of props so they stay visually consistent. */
const stroke = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const ArrowUpRight = (p) => (
  <svg {...stroke} {...p}>
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
)

export const ArrowRight = (p) => (
  <svg {...stroke} {...p}>
    <path d="M4 12h15m0 0-6-6m6 6-6 6" />
  </svg>
)

export const Download = (p) => (
  <svg {...stroke} {...p}>
    <path d="M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5M4 19h16" />
  </svg>
)

export const Mail = (p) => (
  <svg {...stroke} {...p}>
    <rect x="2.5" y="4.5" width="19" height="15" rx="3" />
    <path d="m3.5 7 7.3 5.2a2 2 0 0 0 2.4 0L20.5 7" />
  </svg>
)

export const Pin = (p) => (
  <svg {...stroke} {...p}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
)

export const Lock = (p) => (
  <svg {...stroke} {...p}>
    <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
    <path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7" />
  </svg>
)

export const Sun = (p) => (
  <svg {...stroke} {...p}>
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
  </svg>
)

export const Moon = (p) => (
  <svg {...stroke} {...p}>
    <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2Z" />
  </svg>
)

export const Sparkle = (p) => (
  <svg {...stroke} {...p}>
    <path d="M12 3.5 13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9 12 3.5Z" />
  </svg>
)

export const Bolt = (p) => (
  <svg {...stroke} {...p}>
    <path d="M13.2 2.5 5 13.4h5.6L10 21.5l8.2-10.9h-5.6l.6-8.1Z" />
  </svg>
)

export const Check = (p) => (
  <svg {...stroke} {...p}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </svg>
)

export const Play = (p) => (
  <svg {...stroke} {...p}>
    <path d="M9 6.8v10.4a.7.7 0 0 0 1.07.6l8.3-5.2a.7.7 0 0 0 0-1.2l-8.3-5.2A.7.7 0 0 0 9 6.8Z" />
  </svg>
)

export const Calendar = (p) => (
  <svg {...stroke} {...p}>
    <rect x="3.5" y="5.5" width="17" height="15" rx="3" />
    <path d="M3.5 10h17M8 3.5v4M16 3.5v4" />
  </svg>
)

export const Brain = (p) => (
  <svg {...stroke} {...p}>
    <path d="M12 5.2a2.7 2.7 0 0 0-5 1.4c-1.4.3-2.4 1.5-2.4 3 0 .8.3 1.5.8 2a2.9 2.9 0 0 0 2 4.9c.4 1.2 1.5 2 2.8 2 1.5 0 2.8-1.1 2.8-2.7" />
    <path d="M12 5.2a2.7 2.7 0 0 1 5 1.4c1.4.3 2.4 1.5 2.4 3 0 .8-.3 1.5-.8 2a2.9 2.9 0 0 1-2 4.9c-.4 1.2-1.5 2-2.8 2" />
    <path d="M12 5.2v13.6" />
  </svg>
)

export const Code = (p) => (
  <svg {...stroke} {...p}>
    <path d="m8.6 8.5-4 3.5 4 3.5M15.4 8.5l4 3.5-4 3.5M13.4 5.5l-2.8 13" />
  </svg>
)

export const Chart = (p) => (
  <svg {...stroke} {...p}>
    <path d="M4 20h16" />
    <rect x="5.5" y="12" width="3.4" height="5.6" rx="1.2" />
    <rect x="10.3" y="7.6" width="3.4" height="10" rx="1.2" />
    <rect x="15.1" y="10" width="3.4" height="7.6" rx="1.2" />
  </svg>
)

export const Stack = (p) => (
  <svg {...stroke} {...p}>
    <path d="m12 3.6 8.2 4.2L12 12 3.8 7.8 12 3.6Z" />
    <path d="m4.4 12 7.6 3.9 7.6-3.9M4.4 16.1 12 20l7.6-3.9" />
  </svg>
)

export const Target = (p) => (
  <svg {...stroke} {...p}>
    <circle cx="12" cy="12" r="8.2" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="12" cy="12" r="0.9" fill="currentColor" />
  </svg>
)

export const Clock = (p) => (
  <svg {...stroke} {...p}>
    <circle cx="12" cy="12" r="8.4" />
    <path d="M12 7.4V12l3.1 2" />
  </svg>
)

export const Badge = (p) => (
  <svg {...stroke} {...p}>
    <path d="M12 3.4 14 6l3.4.3-1 3.3 1 3.3-3.4.3-2 2.6-2-2.6-3.4-.3 1-3.3-1-3.3L10 6l2-2.6Z" />
    <path d="M9.4 15.2 8 21l4-1.9L16 21l-1.4-5.8" />
  </svg>
)

export const Eye = (p) => (
  <svg {...stroke} {...p}>
    <path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="3.1" />
  </svg>
)

/* Brand logos are filled single-path marks, so they need their own shape. */
export const GithubMark = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d={brandMarks.github.path} />
  </svg>
)

export const LinkedinMark = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
  </svg>
)

/* Renders any simple-icons mark by key, tinted with its own brand colour. */
export function BrandMark({ name, className, style }) {
  const mark = brandMarks[name]
  if (!mark) return null
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label={mark.label}
      className={className}
      style={{ '--mark-color': mark.color, '--mark-color-dark': mark.dark || mark.color, ...style }}
    >
      <path d={mark.path} />
    </svg>
  )
}
