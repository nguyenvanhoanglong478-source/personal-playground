import { PokemonCardTier } from '../data/pokemonPack';

let sharedAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const Ctor =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!Ctor) return null;
  if (!sharedAudioCtx) {
    sharedAudioCtx = new Ctor();
  }
  if (sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(() => undefined);
  }
  return sharedAudioCtx;
}

function createNoiseBuffer(
  ctx: AudioContext,
  durationSec: number,
  crackleFactor: number
): AudioBuffer {
  const sampleRate = ctx.sampleRate;
  const length = Math.max(1, Math.floor(sampleRate * durationSec));
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);

  let prev = 0;
  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1;
    const smooth = prev * 0.35 + white * 0.65;
    prev = smooth;
    const envelopeMod =
      crackleFactor > 0
        ? 0.45 + 0.55 * Math.pow(Math.random(), crackleFactor)
        : 1;
    data[i] = smooth * envelopeMod;
  }
  return buffer;
}

export function playPackCrinkleTick(progress: number): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const duration = 0.045;
  const clamped = Math.min(1, Math.max(0, progress));

  const noise = ctx.createBufferSource();
  noise.buffer = createNoiseBuffer(ctx, duration, 2.2);

  const bandpass = ctx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.Q.setValueAtTime(2.4, now);
  bandpass.frequency.setValueAtTime(1800 + clamped * 1600, now);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.085, now + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  noise.connect(bandpass);
  bandpass.connect(gain);
  gain.connect(ctx.destination);

  noise.start(now);
  noise.stop(now + duration);
}

export function playPackRipSound(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const duration = 0.46;

  const noise = ctx.createBufferSource();
  noise.buffer = createNoiseBuffer(ctx, duration, 1.9);

  const bandpass = ctx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.Q.setValueAtTime(1.5, now);
  bandpass.frequency.setValueAtTime(1300, now);
  bandpass.frequency.exponentialRampToValueAtTime(4600, now + duration * 0.85);

  const highpass = ctx.createBiquadFilter();
  highpass.type = 'highpass';
  highpass.frequency.setValueAtTime(880, now);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.24, now + 0.03);
  gain.gain.setValueAtTime(0.21, now + 0.16);
  gain.gain.linearRampToValueAtTime(0.27, now + 0.3);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  noise.connect(bandpass);
  bandpass.connect(highpass);
  highpass.connect(gain);
  gain.connect(ctx.destination);

  noise.start(now);
  noise.stop(now + duration);

  const zipOsc = ctx.createOscillator();
  const zipGain = ctx.createGain();
  zipOsc.type = 'sawtooth';
  zipOsc.frequency.setValueAtTime(2400, now + 0.04);
  zipOsc.frequency.exponentialRampToValueAtTime(5600, now + 0.3);
  zipGain.gain.setValueAtTime(0.001, now + 0.04);
  zipGain.gain.linearRampToValueAtTime(0.035, now + 0.08);
  zipGain.gain.exponentialRampToValueAtTime(0.0008, now + 0.32);
  zipOsc.connect(zipGain);
  zipGain.connect(ctx.destination);
  zipOsc.start(now + 0.04);
  zipOsc.stop(now + 0.33);

  const thudOsc = ctx.createOscillator();
  const thudGain = ctx.createGain();
  thudOsc.type = 'triangle';
  thudOsc.frequency.setValueAtTime(190, now + 0.32);
  thudOsc.frequency.exponentialRampToValueAtTime(82, now + 0.42);
  thudGain.gain.setValueAtTime(0.001, now + 0.32);
  thudGain.gain.linearRampToValueAtTime(0.16, now + 0.335);
  thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.44);
  thudOsc.connect(thudGain);
  thudGain.connect(ctx.destination);
  thudOsc.start(now + 0.32);
  thudOsc.stop(now + 0.45);
}

export function playCardSlideSound(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const duration = 0.22;

  const noise = ctx.createBufferSource();
  noise.buffer = createNoiseBuffer(ctx, duration, 0);

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.Q.setValueAtTime(1.1, now);
  filter.frequency.setValueAtTime(720, now);
  filter.frequency.exponentialRampToValueAtTime(2200, now + duration);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.16, now + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(now);
  noise.stop(now + duration);
}

export function playCardFlipSound(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  const noise = ctx.createBufferSource();
  noise.buffer = createNoiseBuffer(ctx, 0.09, 0.4);
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(1950, now);
  filter.Q.setValueAtTime(1.4, now);

  const nGain = ctx.createGain();
  nGain.gain.setValueAtTime(0.001, now);
  nGain.gain.linearRampToValueAtTime(0.15, now + 0.012);
  nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.085);

  noise.connect(filter);
  filter.connect(nGain);
  nGain.connect(ctx.destination);
  noise.start(now);
  noise.stop(now + 0.09);

  const osc = ctx.createOscillator();
  const oGain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(240, now);
  osc.frequency.exponentialRampToValueAtTime(105, now + 0.075);
  oGain.gain.setValueAtTime(0.001, now);
  oGain.gain.linearRampToValueAtTime(0.11, now + 0.01);
  oGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
  osc.connect(oGain);
  oGain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.085);
}

export function playRarityPullSound(tier: PokemonCardTier): void {
  if (tier === 'common' || tier === 'uncommon') return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime + 0.06;
  const notes =
    tier === 'secret'
      ? [523.25, 659.25, 783.99, 987.77, 1174.66]
      : tier === 'ultra'
        ? [659.25, 987.77, 1318.51]
        : [880.0, 1318.51];

  const step = tier === 'secret' ? 0.062 : 0.055;
  const noteGainPeak = tier === 'secret' ? 0.11 : 0.085;

  notes.forEach((freq, idx) => {
    const start = now + idx * step;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, start);
    gain.gain.setValueAtTime(0.001, start);
    gain.gain.linearRampToValueAtTime(noteGainPeak, start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0008, start + 0.36);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + 0.38);
  });
}
