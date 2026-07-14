# Saqib Khan — 3D Animated Portfolio

A high-end, award-winning-style portfolio inspired by [thewatch.60fps.fr](https://thewatch.60fps.fr/) —
WebGL 3D shader background, buttery smooth scroll, and cinematic GSAP animations.

## ✦ Features

- **3D shader blob** — animated liquid/gradient orb (custom GLSL) that reacts to mouse + scroll, with bloom glow
- **Smooth scroll** — momentum-based scrolling via [Lenis](https://github.com/darkroomengineering/lenis), synced to GSAP ScrollTrigger
- **Cinematic reveals** — split-text headlines, staggered fades, parallax, animated skill bars & stat count-ups
- **Custom cursor** — magnetic ring + dot that grows on interactive elements (desktop)
- **Preloader** — percentage counter with reveal wipe
- **Sections** — Hero, About, Skills (with **Download CV** button), Projects, Contact (form + socials)
- **Responsive** + honours `prefers-reduced-motion`

## 🛠 Tech Stack

React 18 · Vite · React Three Fiber (Three.js) · @react-three/postprocessing · GSAP + ScrollTrigger · Lenis · Tailwind CSS · custom GLSL shaders

## 🚀 Getting Started

```bash
npm install       # install dependencies
npm run dev       # start dev server → http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the production build
```

## ✏️ Customising (make it yours)

| What | Where |
|------|-------|
| Name, role, bio, email, socials | `src/data/content.js` |
| Skills & levels | `skills` array in `src/data/content.js` |
| Projects | `projects` array in `src/data/content.js` |
| **Resume / CV file** | replace `public/Saqib_Khan_CV.pdf` (update `resumeUrl` + `resumeFileName` in `content.js` if renamed) |
| Blob colors | `uColorA/B/C` in `src/scene/Blob.jsx` |
| Theme colors | `tailwind.config.js` → `colors` |
| Shader look | `src/scene/shaders/vertex.glsl` & `fragment.glsl` |

> The contact form is a front-end placeholder. Wire `handleSubmit` in
> `src/components/Contact.jsx` to a service like Formspree or EmailJS to receive messages.

## 🌐 Deploy

Push to GitHub, then import on **Vercel** or **Netlify** (framework: Vite, output dir: `dist`).

---

Built with passion by Saqib Khan · [github.com/SAQIBKHAN1020](https://github.com/SAQIBKHAN1020)
