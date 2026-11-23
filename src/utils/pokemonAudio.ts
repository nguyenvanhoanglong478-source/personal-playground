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

const ALL_SFX_KEYS = Object.keys(SFX_URLS) as SfxKey[];

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
      decodedBufferCache.set(key, await ctx.decodeAudioData(bytes.slice(0)));
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
  src.connect(gain);
  gain.connect(ctx.destination);
  src.start(now);

  if (maxDurationSec && maxDurationSec < buffer.duration / playbackRate) {
    const endAt = now + maxDurationSec;
    gain.gain.setValueAtTime(volume, Math.max(now, endAt - 0.03));
    gain.gain.exponentialRampToValueAtTime(0.001, endAt);
    src.stop(endAt + 0.005);
  }

  return true;
}

function createNoiseBuffer(
  ctx: AudioContext,
  durationSec: number,
  crackleFactor: number
): AudioBuffer {
  const length = Math.max(1, Math.floor(ctx.sampleRate * durationSec));
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  let prev = 0;
  for (let i = 0; i < length; i++) {
    const smooth = prev * 0.35 + (Math.random() * 2 - 1) * 0.65;
    prev = smooth;
    data[i] =
      crackleFactor > 0
        ? smooth * (0.45 + 0.55 * Math.pow(Math.random(), crackleFactor))
        : smooth;
  }
  return buffer;
}

interface FilteredNoiseOptions {
  duration: number;
  crackle: number;
  q: number;
  freqStart: number;
  freqEnd?: number;
  freqEndRatio?: number;
  peak: number;
  attack: number;
}

function playFilteredNoise(opts: FilteredNoiseOptions): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const noise = ctx.createBufferSource();
  noise.buffer = createNoiseBuffer(ctx, opts.duration, opts.crackle);

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.Q.setValueAtTime(opts.q, now);
  filter.frequency.setValueAtTime(opts.freqStart, now);
  if (opts.freqEnd !== undefined) {
    filter.frequency.exponentialRampToValueAtTime(
      opts.freqEnd,
      now + opts.duration * (opts.freqEndRatio ?? 1)
    );
  }

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(opts.peak, now + opts.attack);
  gain.gain.exponentialRampToValueAtTime(0.001, now + opts.duration);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  noise.start(now);
  noise.stop(now + opts.duration);
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
  if (!playSample('pack-crinkle', 0.32, 0.94 + clamped * 0.26, 0, 0.14)) {
    playFilteredNoise({
      duration: 0.045,
      crackle: 2.2,
      q: 2.4,
      freqStart: 1800 + clamped * 1600,
      peak: 0.085,
      attack: 0.008,
    });
  }
}

export function playPackRipSound(): void {
  if (!playSample('pack-rip', 0.85, 0.98 + Math.random() * 0.05)) {
    playFilteredNoise({
      duration: 0.42,
      crackle: 1.9,
      q: 1.5,
      freqStart: 1300,
      freqEnd: 4600,
      freqEndRatio: 0.85,
      peak: 0.24,
      attack: 0.03,
    });
  }
}

export function playCardSlideSound(): void {
  if (!playSample('card-takeout', 0.72, 0.97 + Math.random() * 0.06)) {
    playFilteredNoise({
      duration: 0.22,
      crackle: 0,
      q: 1.1,
      freqStart: 720,
      freqEnd: 2200,
      peak: 0.16,
      attack: 0.04,
    });
  }
}

export function playCardFlipSound(): void {
  flipToggle = !flipToggle;
  const key: SfxKey = flipToggle ? 'card-flip-1' : 'card-flip-2';
  if (!playSample(key, 0.68, 0.96 + Math.random() * 0.08)) {
    playFilteredNoise({
      duration: 0.09,
      crackle: 0.4,
      q: 1.4,
      freqStart: 1950,
      peak: 0.15,
      attack: 0.012,
    });
  }
}

export function playCardFanSound(): void {
  if (!playSample('card-fan', 0.74, 1)) {
    playFilteredNoise({
      duration: 0.22,
      crackle: 0,
      q: 1.1,
      freqStart: 720,
      freqEnd: 2200,
      peak: 0.16,
      attack: 0.04,
    });
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
