import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Suspense, useRef } from 'react'
import Particles from './Particles'
import Neural from './Neural'

/* Glowing spheres orbiting a slow-breathing energy ring — kept far
   behind the content plane so text always reads clearly */
function Orbits({ reducedMotion }) {
  const groupRef = useRef()
  const ringRef = useRef()

  useFrame((state, delta) => {
    if (reducedMotion) return
    const t = state.clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25
      groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.15
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.08
      const s = 1 + Math.sin(t * 0.7) * 0.04 // breathing
      ringRef.current.scale.setScalar(s)
    }
  })

  const spheres = [
    { r: 2.6, speed: 0, color: '#00d68f', size: 0.09 },
    { r: 3.4, speed: 2.1, color: '#ffc93c', size: 0.07 },
    { r: 4.2, speed: 4.2, color: '#00d68f', size: 0.11 },
  ]

  return (
    <group position={[0, 0, -7]}>
      <mesh ref={ringRef} rotation={[1.2, 0, 0]}>
        <torusGeometry args={[3.4, 0.012, 8, 96]} />
        <meshBasicMaterial color="#00d68f" transparent opacity={0.22} />
      </mesh>
      <group ref={groupRef}>
        {spheres.map((s, i) => (
          <mesh
            key={i}
            position={[
              Math.cos(s.speed) * s.r,
              Math.sin(s.speed * 1.7) * 0.6,
              Math.sin(s.speed) * s.r,
            ]}
          >
            <sphereGeometry args={[s.size, 16, 16]} />
            <meshBasicMaterial color={s.color} toneMapped={false} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

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
          <Orbits reducedMotion={reducedMotion} />
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
