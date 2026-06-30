// Scroll-progress range where the cabin interior is on screen.
// Lines up with the start/end of the CabinServices section (see page.tsx).
export const FADE_IN_START = 0.60
export const FULL_START    = 0.6552
export const FULL_END      = 0.80
export const FADE_OUT_END  = 0.8276

export function cabinOpacity(p: number) {
  if (p <= FADE_IN_START || p >= FADE_OUT_END) return 0
  if (p < FULL_START) return (p - FADE_IN_START) / (FULL_START - FADE_IN_START)
  if (p > FULL_END) return 1 - (p - FULL_END) / (FADE_OUT_END - FULL_END)
  return 1
}

// A brief whiteout right as we punch through the cloud layer into the cabin.
export function veilOpacity(p: number) {
  const width = 0.03
  const d = Math.abs(p - FULL_START)
  if (d > width) return 0
  return (1 - d / width) * 0.6
}
