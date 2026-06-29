'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useSceneStore } from '@/store/sceneStore'

const VERTEX_SHADER = `
  uniform float uTime;
  uniform float uTurbulence;
  uniform float uScrollProgress;

  attribute float aSize;
  attribute float aRandom;
  attribute float aDepth;

  varying float vAlpha;
  varying float vRadius;

  void main() {
    vec3 pos = position;

    // Organic drift
    float t = uTime * 0.25;
    pos.x += sin(t + aRandom * 6.283) * 0.06 * aDepth;
    pos.y += cos(t * 0.73 + aRandom * 3.141) * 0.06 * aDepth;
    pos.z += sin(t * 0.5 + aRandom * 1.570) * 0.04;

    // Turbulence burst
    if (uTurbulence > 0.0) {
      float b = uTurbulence;
      pos.x += sin(aRandom * 127.1 + uTime * 8.0) * b * 2.5;
      pos.y += cos(aRandom * 311.7 + uTime * 7.0) * b * 2.5;
      pos.z += sin(aRandom * 74.3 + uTime * 5.0) * b * 1.5;
    }

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);

    // Size with perspective
    float sizeAttenuation = 180.0 / max(-mvPos.z, 0.1);
    gl_PointSize = clamp(aSize * sizeAttenuation, 0.5, 6.0);
    gl_Position = projectionMatrix * mvPos;

    // Alpha: fade near/far planes
    float nFade = smoothstep(-3.0, -0.5, pos.z);
    float fFade = smoothstep(30.0, 20.0, pos.z);
    vAlpha = nFade * fFade;
    vRadius = length(pos.xy) / 14.0;
  }
`

const FRAGMENT_SHADER = `
  varying float vAlpha;
  varying float vRadius;

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float d = length(uv) * 2.0;
    if (d > 1.0) discard;

    float alpha = pow(1.0 - d, 2.5) * vAlpha;

    // Slightly warmer particles near center, cooler in periphery
    vec3 col = mix(vec3(0.95, 0.92, 0.88), vec3(0.75, 0.82, 1.0), vRadius);

    gl_FragColor = vec4(col, alpha * 0.88);
  }
`

export function ParticleSystem() {
  const pointsRef = useRef<THREE.Points>(null)

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const COUNT = isMobile ? 3500 : 7000

  const { positions, sizes, randoms, depths } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const sizes = new Float32Array(COUNT)
    const randoms = new Float32Array(COUNT)
    const depths = new Float32Array(COUNT)

    for (let i = 0; i < COUNT; i++) {
      const angle = Math.random() * Math.PI * 2
      // Bias toward smaller radii for denser center corridor
      const r = Math.pow(Math.random(), 0.65) * 14
      const z = (Math.random() - 0.5) * 48

      positions[i * 3] = Math.cos(angle) * r
      positions[i * 3 + 1] = Math.sin(angle) * r
      positions[i * 3 + 2] = z

      sizes[i] = Math.random() * 2.2 + 0.4
      randoms[i] = Math.random()
      depths[i] = 1 - r / 14 // depth factor for drift intensity
    }

    return { positions, sizes, randoms, depths }
  }, [COUNT])

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uTurbulence: { value: 0 },
          uScrollProgress: { value: 0 },
        },
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: false,
      }),
    []
  )

  useFrame(({ clock, camera }) => {
    const state = useSceneStore.getState()

    material.uniforms.uTime.value = clock.elapsedTime
    material.uniforms.uTurbulence.value = state.turbulence
    material.uniforms.uScrollProgress.value = state.scrollProgress

    // Camera flight — moves through the particle corridor
    const targetZ = 5 - state.scrollProgress * 28
    camera.position.z += (targetZ - camera.position.z) * 0.05

    // Mouse parallax — subtle rotation
    camera.rotation.x += (-state.mouse.y * 0.06 - camera.rotation.x) * 0.04
    camera.rotation.y += (-state.mouse.x * 0.06 - camera.rotation.y) * 0.04

    // Turbulence shake
    if (state.turbulence > 0.01) {
      const t = clock.elapsedTime
      camera.rotation.z =
        Math.sin(t * 9.3) * state.turbulence * 0.04
      camera.position.x = Math.sin(t * 7.1) * state.turbulence * 0.3
      camera.position.y = Math.cos(t * 6.4) * state.turbulence * 0.2
    } else {
      camera.rotation.z *= 0.93
      camera.position.x *= 0.95
      camera.position.y *= 0.95
    }

    // Slight overall rotation of the particle field
    if (pointsRef.current) {
      pointsRef.current.rotation.z =
        clock.elapsedTime * 0.015 + state.mouse.x * 0.03
    }
  })

  return (
    <points ref={pointsRef} material={material}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={COUNT}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aSize"
          array={sizes}
          count={COUNT}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          array={randoms}
          count={COUNT}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aDepth"
          array={depths}
          count={COUNT}
          itemSize={1}
        />
      </bufferGeometry>
    </points>
  )
}
