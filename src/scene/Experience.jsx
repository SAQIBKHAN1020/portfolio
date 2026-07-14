import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Suspense } from 'react'
import Blob from './Blob'
import Particles from './Particles'

export default function Experience({ scrollRef, reducedMotion }) {
  return (
    <div className="scene-canvas" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 3, 5]} intensity={1.2} />
          <Particles scrollRef={scrollRef} reducedMotion={reducedMotion} />
          <Blob scrollRef={scrollRef} reducedMotion={reducedMotion} />
          {!reducedMotion && (
            <EffectComposer>
              <Bloom
                intensity={0.22}
                luminanceThreshold={0.72}
                luminanceSmoothing={0.6}
                mipmapBlur
              />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}
