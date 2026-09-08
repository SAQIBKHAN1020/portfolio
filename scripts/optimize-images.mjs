// Converts the source PNGs in public/images to web-sized WebP.
// Run with: node scripts/optimize-images.mjs
import sharp from 'sharp'
import { readdir, mkdir } from 'node:fs/promises'
import path from 'node:path'

const SRC = 'public/images'
const OUT = 'public/images/opt'

// Project banners are wide; the portrait is square and shown smaller.
const widths = { profile: 900, default: 1400 }

await mkdir(OUT, { recursive: true })

for (const file of await readdir(SRC)) {
  if (!file.endsWith('.png')) continue
  const name = path.basename(file, '.png')
  const width = widths[name] ?? widths.default
  const out = path.join(OUT, `${name}.webp`)
  await sharp(path.join(SRC, file))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(out)
  console.log(`${file} -> ${out}`)
}
