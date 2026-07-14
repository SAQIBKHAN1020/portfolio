import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import vertexShader from './shaders/vertex.glsl?raw'
import fragmentShader from './shaders/fragment.glsl?raw'

const clamp01 = (v) => Math.min(1, Math.max(0, v))

export default function Blob({ scrollRef, reducedMotion }) {
  const meshRef = useRef()
  const matRef = useRef()
  const mouse = useRef(new THREE.Vector2(0, 0))

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmplitude: { value: 0.26 },
      uFrequency: { value: 1.1 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
      uOpacity: { value: 1 },
      uColorA: { value: new THREE.Color('#00d68f') }, // emerald
      uColorB: { value: new THREE.Color('#ffc93c') }, // gold
      uColorC: { value: new THREE.Color('#0b7a5c') }, // deep emerald
    }),
    [],
  )

  useFrame((state, delta) => {
    if (!matRef.current || !meshRef.current) return
    const u = matRef.current.uniforms

    if (!reducedMotion) u.uTime.value += delta

    // Smooth pointer follow (state.pointer is -1..1)
    mouse.current.x += (state.pointer.x - mouse.current.x) * 0.05
    mouse.current.y += (state.pointer.y - mouse.current.y) * 0.05
    u.uMouse.value.copy(mouse.current)

    // Eased scroll progress (0..1)
    const target = scrollRef?.current ?? 0
    u.uScroll.value += (target - u.uScroll.value) * 0.08
    const s = u.uScroll.value

    // ── Side-to-side choreography ──
    // cos(s * 4π) sweeps the blob right → left → right → left → right
    // across the page, so it swaps sides with each section.
    const sway = Math.cos(s * Math.PI * 4)
    const x = sway * 1.5

    // ── Vanish near the end of the page ──
    const fade = 1 - clamp01((s - 0.78) / 0.18)
    u.uOpacity.value = fade

    meshRef.current.position.x += (x - meshRef.current.position.x) * 0.06
    meshRef.current.position.y = -s * 0.6
    meshRef.current.rotation.y += delta * 0.08
    meshRef.current.rotation.x = mouse.current.y * 0.25
    // Shrink slightly on the way down, then collapse as it fades out
    meshRef.current.scale.setScalar((1 - s * 0.15) * (0.35 + fade * 0.65))
    meshRef.current.visible = fade > 0.01
  })

  return (
    <mesh ref={meshRef} position={[1.5, 0, 0]}>
      <icosahedronGeometry args={[1.35, 48]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  )
}
