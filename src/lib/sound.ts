class SoundSystem {
  private ctx: AudioContext | null = null
  private masterGain: GainNode | null = null
  private initialized = false
  private muted = true

  async init() {
    if (this.initialized) return
    this.initialized = true

    this.ctx = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)()

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume()
    }

    this.masterGain = this.ctx.createGain()
    this.masterGain.gain.value = 0
    this.masterGain.connect(this.ctx.destination)

    this.createAmbientDrone()
  }

  private createAmbientDrone() {
    if (!this.ctx || !this.masterGain) return

    // Filtered noise — airplane pressurization ambiance
    const sampleRate = this.ctx.sampleRate
    const bufferSize = sampleRate * 4
    const buffer = this.ctx.createBuffer(1, bufferSize, sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3
    }

    const noise = this.ctx.createBufferSource()
    noise.buffer = buffer
    noise.loop = true

    const hp = this.ctx.createBiquadFilter()
    hp.type = 'highpass'
    hp.frequency.value = 60

    const lp = this.ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 380

    const noiseGain = this.ctx.createGain()
    noiseGain.gain.value = 0.12

    noise.connect(hp)
    hp.connect(lp)
    lp.connect(noiseGain)
    noiseGain.connect(this.masterGain)
    noise.start()

    // Sub-oscillator hum
    const osc1 = this.ctx.createOscillator()
    osc1.type = 'sine'
    osc1.frequency.value = 48
    const osc1Gain = this.ctx.createGain()
    osc1Gain.gain.value = 0.04
    osc1.connect(osc1Gain)
    osc1Gain.connect(this.masterGain)
    osc1.start()

    // Harmonic
    const osc2 = this.ctx.createOscillator()
    osc2.type = 'sine'
    osc2.frequency.value = 96
    const osc2Gain = this.ctx.createGain()
    osc2Gain.gain.value = 0.02
    osc2.connect(osc2Gain)
    osc2Gain.connect(this.masterGain)
    osc2.start()
  }

  unmute() {
    this.muted = false
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(0.25, this.ctx.currentTime, 1.5)
    }
  }

  mute() {
    this.muted = true
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.5)
    }
  }

  toggle() {
    if (this.muted) this.unmute()
    else this.mute()
    return !this.muted
  }

  destroy() {
    this.ctx?.close()
  }
}

export const soundSystem = new SoundSystem()
