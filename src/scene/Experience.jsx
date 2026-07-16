import { Canvas } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Suspense } from 'react'
import Particles from './Particles'
import Neural from './Neural'

/* Sparse wireframe holograms drifting at the edges — subtle by design */
function Holograms() {
  return (
    <>
      <Float speed={1.2} rotationIntensity={0.8} floatIntensity={1.2}>
        <mesh position={[-4.2, 1.6, -4]}>
          <icosahedronGeometry args={[0.7, 0]} />
          <meshBasicMaterial color="#00d68f" wireframe transparent opacity={0.14} />
        </mesh>
      </Float>
      <Float speed={0.9} rotationIntensity={1.1} floatIntensity={1}>
        <mesh position={[4.6, -1.8, -5]}>
          <octahedronGeometry args={[0.85, 0]} />
          <meshBasicMaterial color="#ffc93c" wireframe transparent opacity={0.12} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.4}>
        <mesh position={[3.6, 2.4, -6]}>
          <torusGeometry args={[0.55, 0.16, 8, 24]} />
          <meshBasicMaterial color="#00d68f" wireframe transparent opacity={0.1} />
        </mesh>
      </Float>
    </>
  )
}

export default function Experience({ scrollRef, reducedMotion }) {
  return (
    <div className="scene-canvas" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 3, 5]} intensity={1.2} />
          <Particles scrollRef={scrollRef} reducedMotion={reducedMotion} />
          <Neural scrollRef={scrollRef} reducedMotion={reducedMotion} />
          <Holograms />
          {!reducedMotion && (
            <EffectComposer>
              <Bloom
                intensity={0.2}
                luminanceThreshold={0.74}
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
