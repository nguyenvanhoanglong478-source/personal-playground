import { PokemonCardTier } from '../data/pokemonPack';

type SfxKey =
  | 'pack-rip'
  | 'pack-crinkle'
  | 'card-takeout'
  | 'card-flip-1'
  | 'card-flip-2'
  | 'card-fan'
  | 'rare-chime'
  | 'ultra-chime'
  | 'secret-chime';

const SFX_URLS: Record<SfxKey, string> = {
  'pack-rip': './pokemon/sfx/pack-rip.mp3',
  'pack-crinkle': './pokemon/sfx/pack-crinkle.mp3',
  'card-takeout': './pokemon/sfx/card-takeout.mp3',
  'card-flip-1': './pokemon/sfx/card-flip-1.mp3',
  'card-flip-2': './pokemon/sfx/card-flip-2.mp3',
  'card-fan': './pokemon/sfx/card-fan.mp3',
  'rare-chime': './pokemon/sfx/rare-chime.mp3',
  'ultra-chime': './pokemon/sfx/ultra-chime.mp3',
  'secret-chime': './pokemon/sfx/secret-chime.mp3',
};

const ALL_SFX_KEYS: SfxKey[] = [
  'pack-rip',
  'pack-crinkle',
  'card-takeout',
  'card-flip-1',
  'card-flip-2',
  'card-fan',
  'rare-chime',
  'ultra-chime',
  'secret-chime',
];

let sharedAudioCtx: AudioContext | null = null;
const rawBufferCache = new Map<SfxKey, ArrayBuffer>();
const decodedBufferCache = new Map<SfxKey, AudioBuffer>();
const inflightFetches = new Map<SfxKey, Promise<void>>();
let flipToggle = false;

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

async function fetchAndDecodeKey(key: SfxKey): Promise<void> {
  if (decodedBufferCache.has(key)) return;
  const existing = inflightFetches.get(key);
  if (existing) return existing;

  const task = (async () => {
    try {
      let bytes = rawBufferCache.get(key);
      if (!bytes) {
        const res = await fetch(SFX_URLS[key]);
        if (!res.ok) return;
        bytes = await res.arrayBuffer();
        rawBufferCache.set(key, bytes);
      }
      const ctx = getAudioContext();
      if (!ctx) return;
      const decoded = await ctx.decodeAudioData(bytes.slice(0));
      decodedBufferCache.set(key, decoded);
    } catch {
      return;
    } finally {
      inflightFetches.delete(key);
    }
  })();

  inflightFetches.set(key, task);
  return task;
}

export function preloadPokemonSfx(): void {
  if (typeof window === 'undefined') return;
  for (const key of ALL_SFX_KEYS) {
    if (!decodedBufferCache.has(key)) {
      void fetchAndDecodeKey(key);
    }
  }
}

function playSample(
  key: SfxKey,
  volume: number,
  playbackRate = 1,
  delaySec = 0,
  maxDurationSec?: number
): boolean {
  const ctx = getAudioContext();
  if (!ctx) return false;

  const buffer = decodedBufferCache.get(key);
  if (!buffer) {
    void fetchAndDecodeKey(key);
    return false;
  }

  const now = ctx.currentTime + delaySec;
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  src.playbackRate.setValueAtTime(playbackRate, now);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(volume, now);
  if (maxDurationSec && maxDurationSec < buffer.duration / playbackRate) {
    const endAt = now + maxDurationSec;
    gain.gain.setValueAtTime(volume, Math.max(now, endAt - 0.03));
    gain.gain.exponentialRampToValueAtTime(0.001, endAt);
    src.connect(gain);
    gain.connect(ctx.destination);
    src.start(now);
    src.stop(endAt + 0.005);
  } else {
    src.connect(gain);
    gain.connect(ctx.destination);
    src.start(now);
  }

  return true;
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

function playSynthCrinkle(progress: number): void {
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

function playSynthRip(): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const duration = 0.42;
  const noise = ctx.createBufferSource();
  noise.buffer = createNoiseBuffer(ctx, duration, 1.9);
  const bandpass = ctx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.Q.setValueAtTime(1.5, now);
  bandpass.frequency.setValueAtTime(1300, now);
  bandpass.frequency.exponentialRampToValueAtTime(4600, now + duration * 0.85);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.24, now + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  noise.connect(bandpass);
  bandpass.connect(gain);
  gain.connect(ctx.destination);
  noise.start(now);
  noise.stop(now + duration);
}

function playSynthSlide(): void {
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

function playSynthFlip(): void {
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
}

function playSynthRarity(tier: PokemonCardTier): void {
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
  const peak = tier === 'secret' ? 0.11 : 0.085;
  notes.forEach((freq, idx) => {
    const start = now + idx * step;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, start);
    gain.gain.setValueAtTime(0.001, start);
    gain.gain.linearRampToValueAtTime(peak, start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0008, start + 0.36);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + 0.38);
  });
}

export function playPackCrinkleTick(progress: number): void {
  const clamped = Math.min(1, Math.max(0, progress));
  const rate = 0.94 + clamped * 0.26;
  if (!playSample('pack-crinkle', 0.32, rate, 0, 0.14)) {
    playSynthCrinkle(clamped);
  }
}

export function playPackRipSound(): void {
  const rate = 0.98 + Math.random() * 0.05;
  if (!playSample('pack-rip', 0.85, rate)) {
    playSynthRip();
  }
}

export function playCardSlideSound(): void {
  const rate = 0.97 + Math.random() * 0.06;
  if (!playSample('card-takeout', 0.72, rate)) {
    playSynthSlide();
  }
}

export function playCardFlipSound(): void {
  flipToggle = !flipToggle;
  const key: SfxKey = flipToggle ? 'card-flip-1' : 'card-flip-2';
  const rate = 0.96 + Math.random() * 0.08;
  if (!playSample(key, 0.68, rate)) {
    playSynthFlip();
  }
}

export function playCardFanSound(): void {
  if (!playSample('card-fan', 0.74, 1)) {
    playSynthSlide();
  }
}

export function playRarityPullSound(tier: PokemonCardTier): void {
  if (tier === 'common' || tier === 'uncommon') return;
  const key: SfxKey =
    tier === 'secret'
      ? 'secret-chime'
      : tier === 'ultra'
        ? 'ultra-chime'
        : 'rare-chime';
  const vol = tier === 'secret' ? 0.64 : tier === 'ultra' ? 0.58 : 0.56;
  const delay = tier === 'rare' ? 0.06 : 0.05;
  if (!playSample(key, vol, 1, delay)) {
    playSynthRarity(tier);
  }
}
