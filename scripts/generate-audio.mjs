import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.resolve(__dirname, '../public/audio/soundtrack.wav');

const SAMPLE_RATE = 44100;
const DURATION_SEC = 30.0;
const TOTAL_SAMPLES = Math.floor(SAMPLE_RATE * DURATION_SEC);
const left = new Float32Array(TOTAL_SAMPLES);
const right = new Float32Array(TOTAL_SAMPLES);

function clamp(v, lo = -1, hi = 1) {
  return Math.max(lo, Math.min(hi, v));
}

function addSample(idx, l, r = l) {
  if (idx >= 0 && idx < TOTAL_SAMPLES) {
    left[idx] += l;
    right[idx] += r;
  }
}

function midiToFreq(m) {
  return 440 * Math.pow(2, (m - 69) / 12);
}

// Soft triangle/sine marimba-like note
function addPluck(startSec, durSec, freq, amp, pan = 0) {
  const start = Math.floor(startSec * SAMPLE_RATE);
  const len = Math.floor(durSec * SAMPLE_RATE);
  const gL = Math.cos(((pan + 1) * Math.PI) / 4);
  const gR = Math.sin(((pan + 1) * Math.PI) / 4);
  for (let i = 0; i < len; i++) {
    const t = i / SAMPLE_RATE;
    const attack = Math.min(1, t / 0.008);
    const decay = Math.exp(-t * (6.5 / Math.max(0.15, durSec)));
    const env = attack * decay;
    const s =
      (Math.sin(2 * Math.PI * freq * t) * 0.72 +
        Math.sin(2 * Math.PI * freq * 2 * t) * 0.2 +
        Math.sin(2 * Math.PI * freq * 3 * t) * 0.08) *
      env *
      amp;
    addSample(start + i, s * gL, s * gR);
  }
}

// Kick drum
function addKick(startSec, amp = 0.26) {
  const start = Math.floor(startSec * SAMPLE_RATE);
  const len = Math.floor(0.16 * SAMPLE_RATE);
  let phase = 0;
  for (let i = 0; i < len; i++) {
    const t = i / SAMPLE_RATE;
    const freq = 140 * Math.exp(-t * 28) + 46;
    phase += (2 * Math.PI * freq) / SAMPLE_RATE;
    const env = Math.exp(-t * 22);
    const s = Math.sin(phase) * env * amp;
    addSample(start + i, s, s);
  }
}

// Crisp hi-hat / shaker
function addHat(startSec, amp = 0.07, dur = 0.045) {
  const start = Math.floor(startSec * SAMPLE_RATE);
  const len = Math.floor(dur * SAMPLE_RATE);
  let prev = 0;
  for (let i = 0; i < len; i++) {
    const t = i / SAMPLE_RATE;
    const noise = Math.random() * 2 - 1;
    const hp = noise - prev * 0.85;
    prev = noise;
    const env = Math.exp(-t * (45 / Math.max(0.03, dur)));
    const s = hp * env * amp;
    addSample(start + i, s * 0.9, s * 1.1);
  }
}

// Snare / finger snap
function addSnap(startSec, amp = 0.14) {
  const start = Math.floor(startSec * SAMPLE_RATE);
  const len = Math.floor(0.11 * SAMPLE_RATE);
  for (let i = 0; i < len; i++) {
    const t = i / SAMPLE_RATE;
    const noise = (Math.random() * 2 - 1) * Math.exp(-t * 36);
    const body = Math.sin(2 * Math.PI * 220 * t) * Math.exp(-t * 40);
    const s = (noise * 0.7 + body * 0.5) * amp;
    addSample(start + i, s, s);
  }
}

// Rising/falling UI whoosh or pop
function addChirp(startSec, durSec, f0, f1, amp = 0.16) {
  const start = Math.floor(startSec * SAMPLE_RATE);
  const len = Math.floor(durSec * SAMPLE_RATE);
  let phase = 0;
  for (let i = 0; i < len; i++) {
    const u = i / len;
    const freq = f0 + (f1 - f0) * u;
    phase += (2 * Math.PI * freq) / SAMPLE_RATE;
    const env = Math.sin(Math.PI * u);
    const s = Math.sin(phase) * env * amp;
    addSample(start + i, s, s);
  }
}

// Metallic ding / bell
function addBell(startSec, freq = 1046.5, amp = 0.24, dur = 0.9) {
  const start = Math.floor(startSec * SAMPLE_RATE);
  const len = Math.floor(dur * SAMPLE_RATE);
  for (let i = 0; i < len; i++) {
    const t = i / SAMPLE_RATE;
    const env = Math.exp(-t * 4.5);
    const s =
      (Math.sin(2 * Math.PI * freq * t) * 0.6 +
        Math.sin(2 * Math.PI * freq * 2.01 * t) * 0.25 +
        Math.sin(2 * Math.PI * freq * 3.0 * t) * 0.15) *
      env *
      amp;
    addSample(start + i, s, s);
  }
}

// Clean 120 BPM lo-fi pop BGM bed only (real CC0 Freesound SFX are mounted frame-accurately in Remotion <SoundTrack />)
const BPM = 120;
const BEAT = 60 / BPM; // 0.5s
const chords = [
  [60, 64, 67, 71], // Cmaj7
  [57, 60, 64, 67], // Am7
  [53, 57, 60, 64], // Fmaj7
  [55, 59, 62, 67], // G6
];
const bassNotes = [48, 45, 41, 43];
const melodyPattern = [72, 74, 76, 79, 76, 74, 72, 71, 69, 72, 74, 76, 79, 81, 79, 76];

for (let step = 0; step < 114; step++) {
  const t = 1.45 + step * (BEAT / 2); // eighth notes (0.25s)
  if (t >= 29.6) break;
  // Duck during the 99.99% comedic freeze (24.9s - 25.95s)
  const inStall = t >= 24.9 && t < 25.95;
  const inFried = t >= 17.0 && t < 18.0;
  const fadeOut = t > 28.5 ? Math.max(0, (29.6 - t) / 1.1) : 1;
  const masterGain = (inStall ? 0.16 : 1.0) * fadeOut;

  const bar = Math.floor(step / 8) % 4;
  const sub = step % 8;

  if (!inStall) {
    if (sub === 0 || sub === 4) addKick(t, 0.2 * masterGain);
    if (sub === 2 || sub === 6) addSnap(t, 0.095 * masterGain);
    addHat(t, (sub % 2 === 0 ? 0.048 : 0.03) * masterGain);
  }
  if (sub === 0 || sub === 3 || sub === 6) {
    addPluck(t, 0.28, midiToFreq(bassNotes[bar]), 0.15 * masterGain, -0.15);
  }
  if (sub === 0 || sub === 4) {
    for (const n of chords[bar]) {
      const detune = inFried ? 1.04 : 1.0;
      addPluck(t, 0.35, midiToFreq(n) * detune, 0.044 * masterGain, 0.15);
    }
  }
  if (!inStall && (sub === 0 || sub === 2 || sub === 3 || sub === 5 || sub === 6)) {
    const mNote = melodyPattern[step % melodyPattern.length];
    const detune = inFried ? 1.06 : 1.0;
    addPluck(t, 0.22, midiToFreq(mNote) * detune, 0.068 * masterGain, Math.sin(step) * 0.35);
  }
}

// Write 16-bit Stereo PCM WAV
const numChannels = 2;
const bitsPerSample = 16;
const byteRate = (SAMPLE_RATE * numChannels * bitsPerSample) / 8;
const blockAlign = (numChannels * bitsPerSample) / 8;
const dataSize = TOTAL_SAMPLES * blockAlign;
const buffer = Buffer.alloc(44 + dataSize);

buffer.write('RIFF', 0);
buffer.writeUInt32LE(36 + dataSize, 4);
buffer.write('WAVE', 8);
buffer.write('fmt ', 12);
buffer.writeUInt32LE(16, 16);
buffer.writeUInt16LE(1, 20);
buffer.writeUInt16LE(numChannels, 22);
buffer.writeUInt32LE(SAMPLE_RATE, 24);
buffer.writeUInt32LE(byteRate, 28);
buffer.writeUInt16LE(blockAlign, 32);
buffer.writeUInt16LE(bitsPerSample, 34);
buffer.write('data', 36);
buffer.writeUInt32LE(dataSize, 40);

let offset = 44;
for (let i = 0; i < TOTAL_SAMPLES; i++) {
  const l = Math.round(Math.tanh(left[i] * 2.4) * 0.92 * 32767);
  const r = Math.round(Math.tanh(right[i] * 2.4) * 0.92 * 32767);
  buffer.writeInt16LE(l, offset);
  buffer.writeInt16LE(r, offset + 2);
  offset += 4;
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, buffer);
console.log(`Generated ${outPath} (${(buffer.length / 1024 / 1024).toFixed(2)} MB)`);
