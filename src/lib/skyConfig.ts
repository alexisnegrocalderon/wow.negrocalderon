// Sky color keyframes — each entry corresponds to a scroll progress value (0-1)
// Colors are normalized RGB [0-1]

export interface SkyConfig {
  zenith: [number, number, number]      // top of sky
  horizon: [number, number, number]     // horizon / atmosphere
  nadir: [number, number, number]       // below horizon (ground, clouds base)
  sunColor: [number, number, number]
  sunPos: [number, number]              // UV position (x, y — y=0 is bottom)
  sunSize: number
  sunIntensity: number
  horizonHeight: number                 // 0-1 in screen UV
  horizonBlur: number
  // Particle tints for this stage
  particleA: [number, number, number]
  particleB: [number, number, number]
  particleOpacity: number
  particleScale: number                 // size multiplier
  twinkle: number                       // 0-1 star twinkle amount
}

export const SKY_KEYFRAMES: Array<{ at: number; sky: SkyConfig }> = [
  {
    at: 0.0,
    sky: {
      // Pre-boarding — deep night at the terminal. Indigo-black.
      zenith:      [0.01, 0.01, 0.05],
      horizon:     [0.04, 0.03, 0.09],
      nadir:       [0.03, 0.02, 0.06],
      sunColor:    [0.05, 0.08, 0.25],
      sunPos:      [0.5, 0.25],
      sunSize:     0.5,
      sunIntensity:0.4,
      horizonHeight:0.30,
      horizonBlur: 0.18,
      particleA:   [0.78, 0.82, 0.95],
      particleB:   [0.55, 0.65, 0.90],
      particleOpacity: 0.75,
      particleScale: 1.0,
      twinkle:     0.8,
    },
  },
  {
    at: 0.08,
    sky: {
      // Boarding — pre-dawn, deep indigo-violet, first warmth on horizon
      zenith:      [0.02, 0.02, 0.12],
      horizon:     [0.10, 0.05, 0.16],
      nadir:       [0.04, 0.02, 0.08],
      sunColor:    [0.22, 0.08, 0.02],
      sunPos:      [0.28, 0.14],
      sunSize:     0.38,
      sunIntensity:0.7,
      horizonHeight:0.28,
      horizonBlur: 0.14,
      particleA:   [0.88, 0.80, 0.95],
      particleB:   [0.60, 0.55, 0.90],
      particleOpacity: 0.70,
      particleScale: 1.0,
      twinkle:     0.6,
    },
  },
  {
    at: 0.17,
    sky: {
      // TakeOff — sunrise eruption, deep cobalt top, amber-orange horizon
      zenith:      [0.03, 0.04, 0.20],
      horizon:     [0.75, 0.28, 0.02],
      nadir:       [0.48, 0.18, 0.01],
      sunColor:    [1.0, 0.52, 0.05],
      sunPos:      [0.42, 0.16],
      sunSize:     0.55,
      sunIntensity:2.8,
      horizonHeight:0.22,
      horizonBlur: 0.20,
      particleA:   [1.0, 0.60, 0.12],
      particleB:   [0.95, 0.38, 0.04],
      particleOpacity: 0.90,
      particleScale: 1.1,
      twinkle:     0.1,
    },
  },
  {
    at: 0.30,
    sky: {
      // Ascend — through clouds, bright peach-white, ethereal
      zenith:      [0.52, 0.68, 0.88],
      horizon:     [0.90, 0.86, 0.80],
      nadir:       [0.95, 0.90, 0.84],
      sunColor:    [1.0, 0.96, 0.88],
      sunPos:      [0.68, 0.78],
      sunSize:     0.65,
      sunIntensity:0.9,
      horizonHeight:0.55,
      horizonBlur: 0.28,
      particleA:   [1.0, 0.98, 0.95],
      particleB:   [0.84, 0.88, 0.92],
      particleOpacity: 1.0,
      particleScale: 1.8,  // big cloud-like particles
      twinkle:     0.0,
    },
  },
  {
    at: 0.52,
    sky: {
      // Cruise — high altitude day flight, deep azure
      zenith:      [0.04, 0.12, 0.44],
      horizon:     [0.16, 0.48, 0.76],
      nadir:       [0.28, 0.62, 0.88],
      sunColor:    [0.88, 0.94, 1.0],
      sunPos:      [0.78, 0.88],
      sunSize:     0.60,
      sunIntensity:0.55,
      horizonHeight:0.42,
      horizonBlur: 0.22,
      particleA:   [0.82, 0.92, 1.0],
      particleB:   [0.55, 0.76, 0.96],
      particleOpacity: 0.55,
      particleScale: 0.8,  // tiny high-altitude dust
      twinkle:     0.0,
    },
  },
  {
    at: 0.66,
    sky: {
      // Experience — golden hour, warm purples and amber
      zenith:      [0.07, 0.03, 0.20],
      horizon:     [0.58, 0.20, 0.04],
      nadir:       [0.40, 0.14, 0.02],
      sunColor:    [1.0, 0.62, 0.08],
      sunPos:      [0.62, 0.24],
      sunSize:     0.58,
      sunIntensity:2.2,
      horizonHeight:0.26,
      horizonBlur: 0.22,
      particleA:   [1.0, 0.82, 0.35],
      particleB:   [0.95, 0.60, 0.12],
      particleOpacity: 0.78,
      particleScale: 1.0,
      twinkle:     0.0,
    },
  },
  {
    at: 0.77,
    sky: {
      // Turbulence — storm, heavy dark blues and grays
      zenith:      [0.04, 0.06, 0.11],
      horizon:     [0.10, 0.14, 0.20],
      nadir:       [0.06, 0.09, 0.14],
      sunColor:    [0.40, 0.52, 0.72],
      sunPos:      [0.5, 0.5],
      sunSize:     0.85,
      sunIntensity:0.38,
      horizonHeight:0.50,
      horizonBlur: 0.35,
      particleA:   [0.65, 0.76, 0.92],
      particleB:   [0.40, 0.55, 0.80],
      particleOpacity: 0.82,
      particleScale: 1.2,
      twinkle:     0.0,
    },
  },
  {
    at: 0.88,
    sky: {
      // Destination — final sunset, descending, warm burning sky
      zenith:      [0.05, 0.02, 0.12],
      horizon:     [0.42, 0.14, 0.02],
      nadir:       [0.14, 0.05, 0.02],
      sunColor:    [1.0, 0.42, 0.04],
      sunPos:      [0.52, 0.18],
      sunSize:     0.62,
      sunIntensity:2.5,
      horizonHeight:0.22,
      horizonBlur: 0.20,
      particleA:   [1.0, 0.55, 0.15],
      particleB:   [0.88, 0.32, 0.06],
      particleOpacity: 0.82,
      particleScale: 1.0,
      twinkle:     0.1,
    },
  },
  {
    at: 0.95,
    sky: {
      // Mission Control — night city arrival, deep navy with city warmth below
      zenith:      [0.01, 0.02, 0.07],
      horizon:     [0.04, 0.06, 0.13],
      nadir:       [0.06, 0.07, 0.12],
      sunColor:    [0.14, 0.28, 0.62],
      sunPos:      [0.5, 0.22],
      sunSize:     0.42,
      sunIntensity:0.65,
      horizonHeight:0.28,
      horizonBlur: 0.22,
      particleA:   [0.55, 0.72, 1.0],
      particleB:   [0.30, 0.52, 0.90],
      particleOpacity: 0.68,
      particleScale: 0.9,
      twinkle:     0.5,
    },
  },
  {
    at: 1.0,
    sky: {
      // Closing — deep starry night, calm
      zenith:      [0.01, 0.01, 0.04],
      horizon:     [0.02, 0.03, 0.08],
      nadir:       [0.03, 0.04, 0.07],
      sunColor:    [0.10, 0.18, 0.50],
      sunPos:      [0.5, 0.38],
      sunSize:     0.52,
      sunIntensity:0.35,
      horizonHeight:0.35,
      horizonBlur: 0.22,
      particleA:   [0.88, 0.90, 0.96],
      particleB:   [0.62, 0.72, 0.92],
      particleOpacity: 0.70,
      particleScale: 0.95,
      twinkle:     1.0,
    },
  },
]

export function interpolateSky(progress: number): SkyConfig {
  const frames = SKY_KEYFRAMES
  if (progress <= frames[0].at) return frames[0].sky
  if (progress >= frames[frames.length - 1].at) return frames[frames.length - 1].sky

  const hi = frames.findIndex((f) => f.at >= progress)
  const lo = hi - 1

  const a = frames[lo]
  const b = frames[hi]
  const t = (progress - a.at) / (b.at - a.at)

  function lerp3(
    x: [number, number, number],
    y: [number, number, number],
    k: number
  ): [number, number, number] {
    return [
      x[0] + (y[0] - x[0]) * k,
      x[1] + (y[1] - x[1]) * k,
      x[2] + (y[2] - x[2]) * k,
    ]
  }

  function lerp2(
    x: [number, number],
    y: [number, number],
    k: number
  ): [number, number] {
    return [x[0] + (y[0] - x[0]) * k, x[1] + (y[1] - x[1]) * k]
  }

  function lerp1(x: number, y: number, k: number) {
    return x + (y - x) * k
  }

  return {
    zenith:          lerp3(a.sky.zenith, b.sky.zenith, t),
    horizon:         lerp3(a.sky.horizon, b.sky.horizon, t),
    nadir:           lerp3(a.sky.nadir, b.sky.nadir, t),
    sunColor:        lerp3(a.sky.sunColor, b.sky.sunColor, t),
    sunPos:          lerp2(a.sky.sunPos, b.sky.sunPos, t),
    sunSize:         lerp1(a.sky.sunSize, b.sky.sunSize, t),
    sunIntensity:    lerp1(a.sky.sunIntensity, b.sky.sunIntensity, t),
    horizonHeight:   lerp1(a.sky.horizonHeight, b.sky.horizonHeight, t),
    horizonBlur:     lerp1(a.sky.horizonBlur, b.sky.horizonBlur, t),
    particleA:       lerp3(a.sky.particleA, b.sky.particleA, t),
    particleB:       lerp3(a.sky.particleB, b.sky.particleB, t),
    particleOpacity: lerp1(a.sky.particleOpacity, b.sky.particleOpacity, t),
    particleScale:   lerp1(a.sky.particleScale, b.sky.particleScale, t),
    twinkle:         lerp1(a.sky.twinkle, b.sky.twinkle, t),
  }
}
