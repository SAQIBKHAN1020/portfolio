import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Floating dust field behind the blob — adds depth and parallax.
 * Drifts slowly, rotates with scroll, and sways with the pointer.
 */
export default function Particles({ count = 900, scrollRef, reducedMotion }) {
  const pointsRef = useRef()

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const emerald = new THREE.Color('#00d68f')
    const gold = new THREE.Color('#ffc93c')
    const c = new THREE.Color()

    for (let i = 0; i < count; i++) {
      // Spread across a wide, deep slab
      positions[i * 3] = (Math.random() - 0.5) * 16
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2

      c.copy(Math.random() > 0.35 ? emerald : gold)
      c.multiplyScalar(0.4 + Math.random() * 0.6)
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    return { positions, colors }
  }, [count])

  useFrame((state, delta) => {
    if (!pointsRef.current || reducedMotion) return
    const scroll = scrollRef?.current ?? 0

    pointsRef.current.rotation.y += delta * 0.02
    pointsRef.current.rotation.x = state.pointer.y * 0.06
    // Parallax drift as the page scrolls
    pointsRef.current.position.y = scroll * 2.5
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
