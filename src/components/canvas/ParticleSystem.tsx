'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useSceneStore } from '@/store/sceneStore'
import { interpolateSky } from '@/lib/skyConfig'

const VERTEX_SHADER = `
  uniform float uTime;
  uniform float uTurbulence;
  uniform float uParticleScale;

  attribute float aSize;
  attribute float aRandom;
  attribute float aDepth;

  varying float vAlpha;
  varying float vRadius;
  varying float vTwinkle;

  void main() {
    vec3 pos = position;

    // Organic drift — scaled down during cloud stage (large particles move less)
    float driftScale = 1.0 / max(uParticleScale, 0.5);
    float t = uTime * 0.22;
    pos.x += sin(t + aRandom * 6.283) * 0.055 * driftScale;
    pos.y += cos(t * 0.71 + aRandom * 3.14) * 0.055 * driftScale;
    pos.z += sin(t * 0.48 + aRandom * 1.57) * 0.035;

    // Turbulence burst
    if (uTurbulence > 0.0) {
      float b = uTurbulence;
      pos.x += sin(aRandom * 127.1 + uTime * 8.5) * b * 2.8;
      pos.y += cos(aRandom * 311.7 + uTime * 7.2) * b * 2.8;
      pos.z += sin(aRandom * 74.3  + uTime * 5.1) * b * 1.8;
    }

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);

    float sizeAttenuation = 185.0 / max(-mvPos.z, 0.1);
    gl_PointSize = clamp(aSize * uParticleScale * sizeAttenuation, 0.5, 10.0);
    gl_Position = projectionMatrix * mvPos;

    // Alpha: fade near/far
    float nFade = smoothstep(-2.0, 0.0, pos.z);
    float fFade = smoothstep(32.0, 20.0, pos.z);
    vAlpha = nFade * fFade;
    vRadius = length(pos.xy) / 14.0;
    // Twinkling phase per particle
    vTwinkle = sin(uTime * (2.0 + aRandom * 3.0) + aRandom * 6.28) * 0.5 + 0.5;
  }
`

const FRAGMENT_SHADER = `
  varying float vAlpha;
  varying float vRadius;
  varying float vTwinkle;

  uniform vec3 uColorA;        // inner / warm
  uniform vec3 uColorB;        // outer / cool
  uniform float uOpacity;
  uniform float uTwinkleAmt;   // 0 = no twinkle, 1 = full twinkle

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float d = length(uv) * 2.0;
    if (d > 1.0) discard;

    // Soft circular falloff
    float alpha = pow(1.0 - d, 2.5) * vAlpha;

    // Twinkle effect (only for star-like stages)
    float twinkle = mix(1.0, vTwinkle * 0.6 + 0.4, uTwinkleAmt);
    alpha *= twinkle;

    vec3 col = mix(uColorA, uColorB, clamp(vRadius, 0.0, 1.0));

    gl_FragColor = vec4(col, alpha * uOpacity * 0.88);
  }
`

export function ParticleSystem() {
  const pointsRef = useRef<THREE.Points>(null)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const COUNT = isMobile ? 3500 : 7000

  const { positions, sizes, randoms, depths } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const sizes     = new Float32Array(COUNT)
    const randoms   = new Float32Array(COUNT)
    const depths    = new Float32Array(COUNT)

    for (let i = 0; i < COUNT; i++) {
      const angle = Math.random() * Math.PI * 2
      const r = Math.pow(Math.random(), 0.65) * 14
      const z = (Math.random() - 0.5) * 50

      positions[i * 3]     = Math.cos(angle) * r
      positions[i * 3 + 1] = Math.sin(angle) * r
      positions[i * 3 + 2] = z

      sizes[i]   = Math.random() * 2.2 + 0.45
      randoms[i] = Math.random()
      depths[i]  = 1 - r / 14
    }
    return { positions, sizes, randoms, depths }
  }, [COUNT])

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime:          { value: 0 },
          uTurbulence:    { value: 0 },
          uParticleScale: { value: 1.0 },
          uColorA:        { value: new THREE.Color(0.78, 0.82, 0.95) },
          uColorB:        { value: new THREE.Color(0.55, 0.65, 0.90) },
          uOpacity:       { value: 0.75 },
          uTwinkleAmt:    { value: 0.8 },
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

  // Smoothed particle color state
  const cur = useRef({
    colA:    [0.78, 0.82, 0.95] as [number, number, number],
    colB:    [0.55, 0.65, 0.90] as [number, number, number],
    opacity: 0.75,
    scale:   1.0,
    twinkle: 0.8,
  })

  useFrame(({ clock, camera }) => {
    const state    = useSceneStore.getState()
    const sky      = interpolateSky(state.scrollProgress)
    const c        = cur.current
    const smooth   = 0.03

    function sl(a: number, b: number) { return a + (b - a) * smooth }
    function sl3(
      a: [number, number, number],
      b: [number, number, number]
    ): [number, number, number] {
      return [sl(a[0], b[0]), sl(a[1], b[1]), sl(a[2], b[2])]
    }

    c.colA    = sl3(c.colA,   sky.particleA)
    c.colB    = sl3(c.colB,   sky.particleB)
    c.opacity = sl(c.opacity, sky.particleOpacity)
    c.scale   = sl(c.scale,   sky.particleScale)
    c.twinkle = sl(c.twinkle, sky.twinkle)

    const u = material.uniforms
    u.uTime.value          = clock.elapsedTime
    u.uTurbulence.value    = state.turbulence
    u.uParticleScale.value = c.scale
    ;(u.uColorA.value as THREE.Color).setRGB(...c.colA)
    ;(u.uColorB.value as THREE.Color).setRGB(...c.colB)
    u.uOpacity.value    = c.opacity
    u.uTwinkleAmt.value = c.twinkle

    // Camera: scroll-driven flight
    const targetZ = 5 - state.scrollProgress * 28
    camera.position.z += (targetZ - camera.position.z) * 0.045

    // Mouse parallax — very gentle
    camera.rotation.x += (-state.mouse.y * 0.055 - camera.rotation.x) * 0.035
    camera.rotation.y += (-state.mouse.x * 0.055 - camera.rotation.y) * 0.035

    // Turbulence shake
    if (state.turbulence > 0.01) {
      const t = clock.elapsedTime
      camera.rotation.z    = Math.sin(t * 9.3) * state.turbulence * 0.045
      camera.position.x   += Math.sin(t * 7.1) * state.turbulence * 0.28
      camera.position.y   += Math.cos(t * 6.4) * state.turbulence * 0.18
    } else {
      camera.rotation.z   *= 0.92
      camera.position.x   *= 0.94
      camera.position.y   *= 0.94
    }

    // Slow rotation of the whole particle field
    if (pointsRef.current) {
      pointsRef.current.rotation.z = clock.elapsedTime * 0.012 + state.mouse.x * 0.025
    }
  })

  return (
    <points ref={pointsRef} material={material} renderOrder={0}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={COUNT} itemSize={3} />
        <bufferAttribute attach="attributes-aSize"    array={sizes}     count={COUNT} itemSize={1} />
        <bufferAttribute attach="attributes-aRandom"  array={randoms}   count={COUNT} itemSize={1} />
        <bufferAttribute attach="attributes-aDepth"   array={depths}    count={COUNT} itemSize={1} />
      </bufferGeometry>
    </points>
  )
}
