import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

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
