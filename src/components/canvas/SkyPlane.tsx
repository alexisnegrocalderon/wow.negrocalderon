'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useSceneStore } from '@/store/sceneStore'
import { interpolateSky } from '@/lib/skyConfig'

const SKY_VERT = `
  varying vec2 vUv;
  void main() {
    vUv = vec2(position.x * 0.5 + 0.5, position.y * 0.5 + 0.5);
    // Bypass camera — always full-screen in NDC space
    gl_Position = vec4(position.xy, 0.9999, 1.0);
  }
`

const SKY_FRAG = `
  varying vec2 vUv;

  uniform vec3  uZenith;
  uniform vec3  uHorizon;
  uniform vec3  uNadir;
  uniform vec3  uSunColor;
  uniform vec2  uSunPos;
  uniform float uSunSize;
  uniform float uSunIntensity;
  uniform float uHorizonHeight;
  uniform float uHorizonBlur;
  uniform float uTime;
  uniform float uCloudIntensity;
  uniform float uCloudSize;
  uniform vec3  uCloudColor;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1,0)), f.x),
      mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    v += 0.500 * noise(p);
    v += 0.250 * noise(p * 2.1 + vec2(1.7, 9.2));
    v += 0.125 * noise(p * 4.3 + vec2(8.3, 2.8));
    return v;
  }

  void main() {
    float y = vUv.y;
    float x = vUv.x;

    // ── Gradient (nadir → horizon → zenith) ──────────────────────────────────
    float horizonEdge = uHorizonHeight;
    float blurH = max(uHorizonBlur, 0.001);

    float skyT = smoothstep(horizonEdge, horizonEdge + blurH * 2.0, y);
    vec3 skyGrad = mix(uHorizon, uZenith, skyT * skyT);

    float groundT = 1.0 - smoothstep(horizonEdge - blurH * 2.0, horizonEdge, y);
    vec3 groundGrad = mix(uHorizon, uNadir, groundT * groundT);

    float isAbove = smoothstep(horizonEdge - blurH * 0.5, horizonEdge + blurH * 0.5, y);
    vec3 color = mix(groundGrad, skyGrad, isAbove);

    // ── Atmospheric horizon glow ──────────────────────────────────────────────
    float horizonDist = abs(y - horizonEdge);
    float atmGlow = exp(-horizonDist / (blurH * 1.2));
    atmGlow = pow(atmGlow, 1.5);
    color += uSunColor * atmGlow * uSunIntensity * 0.35;

    // ── Sun / glow ───────────────────────────────────────────────────────────
    vec2 sunUV = vec2(uSunPos.x, uSunPos.y);
    float sunDist = distance(vUv, sunUV);
    float glow = exp(-sunDist / max(uSunSize * 0.6, 0.01));
    glow = pow(glow, 2.0);
    color += uSunColor * glow * uSunIntensity * 0.5;

    if (uSunIntensity > 1.2) {
      float disc = smoothstep(0.022, 0.010, sunDist);
      color += uSunColor * disc * min(uSunIntensity * 0.4, 0.8);
    }

    // ── Cloud layer driven by uniforms ────────────────────────────────────────
    if (uCloudIntensity > 0.01) {
      float cloudT = fbm(vUv * uCloudSize + vec2(uTime * 0.003, 0.0));
      cloudT = smoothstep(0.38, 0.70, cloudT) * uCloudIntensity;
      color = mix(color, color + uCloudColor * cloudT, cloudT * 0.85);
    }

    // ── Subtle vignette ───────────────────────────────────────────────────────
    float vig = length(vUv - 0.5) * 1.0;
    color *= 1.0 - vig * 0.35;

    gl_FragColor = vec4(color, 1.0);
  }
`

export function SkyPlane() {
  const matRef = useRef<THREE.ShaderMaterial>(null)

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uZenith:         { value: new THREE.Color(0.01, 0.01, 0.05) },
          uHorizon:        { value: new THREE.Color(0.04, 0.03, 0.09) },
          uNadir:          { value: new THREE.Color(0.03, 0.02, 0.06) },
          uSunColor:       { value: new THREE.Color(0.05, 0.08, 0.25) },
          uSunPos:         { value: new THREE.Vector2(0.5, 0.25) },
          uSunSize:        { value: 0.5 },
          uSunIntensity:   { value: 0.4 },
          uHorizonHeight:  { value: 0.3 },
          uHorizonBlur:    { value: 0.18 },
          uTime:           { value: 0 },
          uCloudIntensity: { value: 0.0 },
          uCloudSize:      { value: 5.0 },
          uCloudColor:     { value: new THREE.Color(0.5, 0.5, 0.6) },
        },
        vertexShader: SKY_VERT,
        fragmentShader: SKY_FRAG,
        depthTest: false,
        depthWrite: false,
        side: THREE.FrontSide,
      }),
    []
  )

  const current = useRef({
    zenith:        [0.01, 0.01, 0.05] as [number, number, number],
    horizon:       [0.04, 0.03, 0.09] as [number, number, number],
    nadir:         [0.03, 0.02, 0.06] as [number, number, number],
    sun:           [0.05, 0.08, 0.25] as [number, number, number],
    cloudColor:    [0.5,  0.5,  0.6 ] as [number, number, number],
    sunPosX:       0.5,
    sunPosY:       0.25,
    sunSize:       0.5,
    sunI:          0.4,
    hH:            0.3,
    hB:            0.18,
    cloudIntensity:0.0,
    cloudSize:     5.0,
  })

  useFrame(({ clock }) => {
    const { scrollProgress } = useSceneStore.getState()
    const sky = interpolateSky(scrollProgress)

    const c = current.current
    const s = 0.025

    function sl(a: number, b: number) { return a + (b - a) * s }
    function sl3(
      a: [number, number, number],
      b: [number, number, number]
    ): [number, number, number] {
      return [sl(a[0], b[0]), sl(a[1], b[1]), sl(a[2], b[2])]
    }

    c.zenith        = sl3(c.zenith,     sky.zenith)
    c.horizon       = sl3(c.horizon,    sky.horizon)
    c.nadir         = sl3(c.nadir,      sky.nadir)
    c.sun           = sl3(c.sun,        sky.sunColor)
    c.cloudColor    = sl3(c.cloudColor, sky.cloudColor)
    c.sunPosX       = sl(c.sunPosX,       sky.sunPos[0])
    c.sunPosY       = sl(c.sunPosY,       sky.sunPos[1])
    c.sunSize       = sl(c.sunSize,       sky.sunSize)
    c.sunI          = sl(c.sunI,          sky.sunIntensity)
    c.hH            = sl(c.hH,            sky.horizonHeight)
    c.hB            = sl(c.hB,            sky.horizonBlur)
    c.cloudIntensity= sl(c.cloudIntensity, sky.cloudIntensity)
    c.cloudSize     = sl(c.cloudSize,      sky.cloudSize)

    const u = material.uniforms
    ;(u.uZenith.value  as THREE.Color).setRGB(...c.zenith)
    ;(u.uHorizon.value as THREE.Color).setRGB(...c.horizon)
    ;(u.uNadir.value   as THREE.Color).setRGB(...c.nadir)
    ;(u.uSunColor.value as THREE.Color).setRGB(...c.sun)
    ;(u.uCloudColor.value as THREE.Color).setRGB(...c.cloudColor)
    ;(u.uSunPos.value  as THREE.Vector2).set(c.sunPosX, c.sunPosY)
    u.uSunSize.value       = c.sunSize
    u.uSunIntensity.value  = c.sunI
    u.uHorizonHeight.value = c.hH
    u.uHorizonBlur.value   = c.hB
    u.uCloudIntensity.value= c.cloudIntensity
    u.uCloudSize.value     = c.cloudSize
    u.uTime.value          = clock.elapsedTime
  })

  return (
    <mesh renderOrder={-100} material={material}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  )
}
