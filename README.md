# Saqib Khan, portfolio

Personal portfolio for Saqib Khan, AI Engineer and Python Developer.
Live content is driven from a single file so it stays easy to update.

## Stack

React 18 + Vite, plain CSS with custom properties. No UI framework, no
animation library: every transition is CSS, and the few interactive
effects (tilt, magnetic buttons, count-up, scroll reveal) are small
`requestAnimationFrame` handlers that respect `prefers-reduced-motion`.

## Editing content

Everything a recruiter reads lives in `src/data/content.js`:
profile links, hero copy and stats, the four projects, skill groups,
and the experience and education timelines. No component edits needed
for routine updates.

Brand logos are inlined as SVG paths in `src/data/brandMarks.js`
(generated from simple-icons) so the logo grid costs zero extra
requests.

## Images

Source PNGs live in `assets-src/` and are not served. To regenerate the
optimised WebP files in `public/images/`:

```bash
node scripts/optimize-images.mjs
```

This resizes and converts everything to WebP (the current set went from
8.9 MB to about 570 KB).

## Commands

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run preview  # serve the production build
```

## Notes

- Theme: light by default, with a dark toggle that follows the system
  preference on first visit and then remembers the choice.
- The resume is served from `public/Saqib_Khan_CV.pdf`.
- Three projects are private builds, so their card button opens a
  prefilled demo request email instead of a dead link.
