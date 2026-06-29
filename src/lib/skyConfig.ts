// Sky color keyframes — each entry corresponds to a scroll progress value (0-1)
// Colors are normalized RGB [0-1]

export interface SkyConfig {
  zenith:  [number, number, number]
  horizon: [number, number, number]
  nadir:   [number, number, number]
  sunColor:[number, number, number]
  sunPos:  [number, number]
  sunSize: number
  sunIntensity: number
  horizonHeight: number
  horizonBlur:   number
  // Particle tints
  particleA: [number, number, number]
  particleB: [number, number, number]
  particleOpacity: number
  particleScale:   number
  twinkle: number
  // Cloud layer
  cloudIntensity: number   // 0 = clear sky, 1 = heavy overcast
  cloudSize:      number   // FBM scale — smaller = bigger clouds
  cloudColor: [number, number, number]
}

export const SKY_KEYFRAMES: Array<{ at: number; sky: SkyConfig }> = [
  {
    at: 0.0,
    sky: {
      // Deep night at the terminal — indigo-black
      zenith:  [0.01, 0.01, 0.05], horizon: [0.04, 0.03, 0.09], nadir: [0.03, 0.02, 0.06],
      sunColor:[0.05, 0.08, 0.25], sunPos: [0.5, 0.25], sunSize: 0.50, sunIntensity: 0.4,
      horizonHeight: 0.30, horizonBlur: 0.18,
      particleA: [0.78, 0.82, 0.95], particleB: [0.55, 0.65, 0.90],
      particleOpacity: 0.75, particleScale: 1.0, twinkle: 0.85,
      cloudIntensity: 0.0, cloudSize: 5.0, cloudColor: [0.5, 0.5, 0.6],
    },
  },
  {
    at: 0.08,
    sky: {
      // Boarding — pre-dawn, deep indigo, first warmth on horizon
      zenith:  [0.02, 0.02, 0.12], horizon: [0.10, 0.05, 0.16], nadir: [0.04, 0.02, 0.08],
      sunColor:[0.22, 0.08, 0.02], sunPos: [0.28, 0.14], sunSize: 0.38, sunIntensity: 0.7,
      horizonHeight: 0.28, horizonBlur: 0.14,
      particleA: [0.88, 0.80, 0.95], particleB: [0.60, 0.55, 0.90],
      particleOpacity: 0.70, particleScale: 1.0, twinkle: 0.6,
      cloudIntensity: 0.0, cloudSize: 5.0, cloudColor: [0.5, 0.5, 0.6],
    },
  },
  {
    at: 0.17,
    sky: {
      // TakeOff — sunrise eruption, amber-orange horizon
      zenith:  [0.03, 0.04, 0.20], horizon: [0.75, 0.28, 0.02], nadir: [0.48, 0.18, 0.01],
      sunColor:[1.0, 0.52, 0.05], sunPos: [0.42, 0.16], sunSize: 0.55, sunIntensity: 2.8,
      horizonHeight: 0.22, horizonBlur: 0.20,
      particleA: [1.0, 0.60, 0.12], particleB: [0.95, 0.38, 0.04],
      particleOpacity: 0.90, particleScale: 1.1, twinkle: 0.05,
      cloudIntensity: 0.05, cloudSize: 5.0, cloudColor: [1.0, 0.55, 0.15],
    },
  },
  {
    at: 0.30,
    sky: {
      // Ascend — climbing through clouds, bright peach-white
      zenith:  [0.52, 0.68, 0.88], horizon: [0.90, 0.86, 0.80], nadir: [0.95, 0.90, 0.84],
      sunColor:[1.0, 0.96, 0.88], sunPos: [0.68, 0.78], sunSize: 0.65, sunIntensity: 0.9,
      horizonHeight: 0.55, horizonBlur: 0.28,
      particleA: [1.0, 0.98, 0.95], particleB: [0.84, 0.88, 0.92],
      particleOpacity: 1.0, particleScale: 1.8, twinkle: 0.0,
      cloudIntensity: 0.50, cloudSize: 3.5, cloudColor: [1.0, 0.97, 0.93],
    },
  },
  {
    at: 0.52,
    sky: {
      // Cruise — high altitude, clear deep azure
      zenith:  [0.04, 0.12, 0.44], horizon: [0.16, 0.48, 0.76], nadir: [0.28, 0.62, 0.88],
      sunColor:[0.88, 0.94, 1.0], sunPos: [0.78, 0.88], sunSize: 0.60, sunIntensity: 0.55,
      horizonHeight: 0.42, horizonBlur: 0.22,
      particleA: [0.82, 0.92, 1.0], particleB: [0.55, 0.76, 0.96],
      particleOpacity: 0.55, particleScale: 0.8, twinkle: 0.0,
      cloudIntensity: 0.0, cloudSize: 5.0, cloudColor: [0.9, 0.93, 1.0],
    },
  },
  {
    at: 0.66,
    sky: {
      // Experience — golden hour, warm purples and amber
      zenith:  [0.07, 0.03, 0.20], horizon: [0.58, 0.20, 0.04], nadir: [0.40, 0.14, 0.02],
      sunColor:[1.0, 0.62, 0.08], sunPos: [0.62, 0.24], sunSize: 0.58, sunIntensity: 2.2,
      horizonHeight: 0.26, horizonBlur: 0.22,
      particleA: [1.0, 0.82, 0.35], particleB: [0.95, 0.60, 0.12],
      particleOpacity: 0.78, particleScale: 1.0, twinkle: 0.0,
      cloudIntensity: 0.08, cloudSize: 5.0, cloudColor: [1.0, 0.7, 0.25],
    },
  },
  {
    at: 0.77,
    sky: {
      // Turbulence — dramatic warm dusk, NOT dark/cold. Deep orange-purple.
      // Feels like turbulence at sunset — stays warm but becomes intense.
      zenith:  [0.06, 0.02, 0.16], horizon: [0.52, 0.16, 0.02], nadir: [0.35, 0.10, 0.01],
      sunColor:[1.0, 0.48, 0.06], sunPos: [0.48, 0.18], sunSize: 0.70, sunIntensity: 1.9,
      horizonHeight: 0.24, horizonBlur: 0.28,
      particleA: [1.0, 0.65, 0.18], particleB: [0.90, 0.42, 0.06],
      particleOpacity: 0.82, particleScale: 1.15, twinkle: 0.0,
      cloudIntensity: 0.30, cloudSize: 3.8, cloudColor: [1.0, 0.60, 0.20],
    },
  },
  {
    at: 0.88,
    sky: {
      // Destination — descent entering cloud layer.
      // Warm pink-peach, thick clouds all around, immersive.
      zenith:  [0.42, 0.22, 0.28], horizon: [0.82, 0.62, 0.52], nadir: [0.88, 0.72, 0.58],
      sunColor:[1.0, 0.78, 0.55], sunPos: [0.55, 0.62], sunSize: 0.75, sunIntensity: 0.9,
      horizonHeight: 0.52, horizonBlur: 0.35,
      particleA: [1.0, 0.90, 0.80], particleB: [0.92, 0.78, 0.68],
      particleOpacity: 0.95, particleScale: 1.6, twinkle: 0.0,
      cloudIntensity: 0.72, cloudSize: 3.2, cloudColor: [1.0, 0.88, 0.78],
    },
  },
  {
    at: 0.95,
    sky: {
      // Mission Control — below the cloud layer, city warmth below.
      // Amber-warm underside of clouds, orange glow from city/ground.
      zenith:  [0.30, 0.18, 0.10], horizon: [0.70, 0.42, 0.15], nadir: [0.55, 0.30, 0.08],
      sunColor:[1.0, 0.65, 0.20], sunPos: [0.50, 0.30], sunSize: 0.65, sunIntensity: 1.1,
      horizonHeight: 0.38, horizonBlur: 0.30,
      particleA: [1.0, 0.75, 0.35], particleB: [0.88, 0.55, 0.18],
      particleOpacity: 0.70, particleScale: 0.9, twinkle: 0.0,
      cloudIntensity: 0.28, cloudSize: 3.5, cloudColor: [1.0, 0.75, 0.45],
    },
  },
  {
    at: 1.0,
    sky: {
      // Closing — warm landing, golden-amber dusk. Arrived.
      zenith:  [0.18, 0.08, 0.04], horizon: [0.60, 0.30, 0.08], nadir: [0.45, 0.20, 0.04],
      sunColor:[1.0, 0.70, 0.25], sunPos: [0.50, 0.22], sunSize: 0.60, sunIntensity: 1.4,
      horizonHeight: 0.28, horizonBlur: 0.24,
      particleA: [1.0, 0.80, 0.40], particleB: [0.88, 0.60, 0.20],
      particleOpacity: 0.65, particleScale: 0.88, twinkle: 0.1,
      cloudIntensity: 0.14, cloudSize: 4.0, cloudColor: [1.0, 0.80, 0.50],
    },
  },
]

export function interpolateSky(progress: number): SkyConfig {
  const frames = SKY_KEYFRAMES
  if (progress <= frames[0].at) return frames[0].sky
  if (progress >= frames[frames.length - 1].at) return frames[frames.length - 1].sky

  const hi = frames.findIndex((f) => f.at >= progress)
  const lo = hi - 1
  const a  = frames[lo]
  const b  = frames[hi]
  const t  = (progress - a.at) / (b.at - a.at)

  const l1 = (x: number, y: number) => x + (y - x) * t
  const l3 = (
    x: [number, number, number],
    y: [number, number, number]
  ): [number, number, number] => [l1(x[0], y[0]), l1(x[1], y[1]), l1(x[2], y[2])]
  const l2 = (
    x: [number, number],
    y: [number, number]
  ): [number, number] => [l1(x[0], y[0]), l1(x[1], y[1])]

  return {
    zenith:          l3(a.sky.zenith,  b.sky.zenith),
    horizon:         l3(a.sky.horizon, b.sky.horizon),
    nadir:           l3(a.sky.nadir,   b.sky.nadir),
    sunColor:        l3(a.sky.sunColor, b.sky.sunColor),
    sunPos:          l2(a.sky.sunPos, b.sky.sunPos),
    sunSize:         l1(a.sky.sunSize, b.sky.sunSize),
    sunIntensity:    l1(a.sky.sunIntensity, b.sky.sunIntensity),
    horizonHeight:   l1(a.sky.horizonHeight, b.sky.horizonHeight),
    horizonBlur:     l1(a.sky.horizonBlur, b.sky.horizonBlur),
    particleA:       l3(a.sky.particleA, b.sky.particleA),
    particleB:       l3(a.sky.particleB, b.sky.particleB),
    particleOpacity: l1(a.sky.particleOpacity, b.sky.particleOpacity),
    particleScale:   l1(a.sky.particleScale, b.sky.particleScale),
    twinkle:         l1(a.sky.twinkle, b.sky.twinkle),
    cloudIntensity:  l1(a.sky.cloudIntensity, b.sky.cloudIntensity),
    cloudSize:       l1(a.sky.cloudSize, b.sky.cloudSize),
    cloudColor:      l3(a.sky.cloudColor, b.sky.cloudColor),
  }
}
