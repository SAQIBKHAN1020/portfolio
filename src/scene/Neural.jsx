import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Floating neural-network constellation — glowing nodes joined by faint
 * lines. Kept deliberately sparse and low-opacity so foreground text
 * always stays readable, and cheap enough to hold 60fps.
 */
export default function Neural({ scrollRef, reducedMotion }) {
  const groupRef = useRef()

  const { nodeGeo, lineGeo } = useMemo(() => {
    const NODES = 48
    const LINK_DIST = 2.6
    const pts = []
    for (let i = 0; i < NODES; i++) {
      pts.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6 - 3,
        ),
      )
    }

    const nodeGeo = new THREE.BufferGeometry().setFromPoints(pts)

    // Connect close pairs into constellation lines
    const linePos = []
    for (let i = 0; i < NODES; i++) {
      for (let j = i + 1; j < NODES; j++) {
        if (pts[i].distanceTo(pts[j]) < LINK_DIST) {
          linePos.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z)
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePos, 3),
    )
    return { nodeGeo, lineGeo }
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current || reducedMotion) return
    const scroll = scrollRef?.current ?? 0
    const t = state.clock.elapsedTime

    groupRef.current.rotation.y += delta * 0.03
    groupRef.current.rotation.z = Math.sin(t * 0.15) * 0.04
    // Gentle sway with the pointer + parallax with scroll
    groupRef.current.rotation.x = state.pointer.y * 0.08
    groupRef.current.position.x = state.pointer.x * 0.4
    groupRef.current.position.y = scroll * 3 + Math.sin(t * 0.4) * 0.15
  })

  return (
    <group ref={groupRef}>
      <points geometry={nodeGeo}>
        <pointsMaterial
          color="#00d68f"
          size={0.06}
          sizeAttenuation
          transparent
          opacity={0.55}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial
          color="#00d68f"
          transparent
          opacity={0.1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  )
}
