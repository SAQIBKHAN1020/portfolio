import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GLSL shaders are imported via Vite's native `?raw` suffix (see src/scene/Blob.jsx),
// so no extra shader plugin is required.
export default defineConfig({
  plugins: [react()],
  build: {
    // Split the heavy 3D/animation libs out of the main bundle. Keeps chunks
    // under the size warning and lowers peak memory while bundling.
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          r3f: ['@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],
          gsap: ['gsap'],
        },
      },
    },
  },
})
