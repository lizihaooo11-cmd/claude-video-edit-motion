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

// 1. Typing clicks in intro (0.0s - 1.1s)
for (let i = 0; i < 16; i++) {
  const t = 0.08 + i * 0.058;
  addHat(t, 0.08, 0.02);
  addPluck(t, 0.04, 880 + (i % 4) * 110, 0.04, (i % 2 ? 0.2 : -0.2));
}
// UI unfold whoosh at 1.1s
addChirp(1.05, 0.35, 220, 760, 0.16);
addBell(1.35, 784, 0.14, 0.35);

// 2. Upbeat 120 BPM bouncy lo-fi pop BGM from 1.5s to 29.8s
// Pause / duck briefly at 25.0s - 26.0s for the 99.99% stall gag!
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
  const t = 1.5 + step * (BEAT / 2); // eighth notes (0.25s)
  if (t >= 29.6) break;
  // Duck during the 99.99% comedic freeze (24.9s - 25.95s)
  const inStall = t >= 24.9 && t < 25.95;
  const inFried = t >= 17.0 && t < 18.0;
  const fadeOut = t > 28.5 ? Math.max(0, (29.6 - t) / 1.1) : 1;
  const masterGain = (inStall ? 0.18 : 1.0) * fadeOut;

  const bar = Math.floor(step / 8) % 4;
  const sub = step % 8;

  // Drums
  if (!inStall) {
    if (sub === 0 || sub === 4) addKick(t, 0.22 * masterGain);
    if (sub === 2 || sub === 6) addSnap(t, 0.11 * masterGain);
    addHat(t, (sub % 2 === 0 ? 0.055 : 0.035) * masterGain);
  }

  // Bass
  if (sub === 0 || sub === 3 || sub === 6) {
    addPluck(t, 0.28, midiToFreq(bassNotes[bar]), 0.16 * masterGain, -0.15);
  }

  // Chord stabs
  if (sub === 0 || sub === 4) {
    for (const n of chords[bar]) {
      const detune = inFried ? 1.04 : 1.0;
      addPluck(t, 0.35, midiToFreq(n) * detune, 0.048 * masterGain, 0.15);
    }
  }

  // Bouncy melody
  if (!inStall && (sub === 0 || sub === 2 || sub === 3 || sub === 5 || sub === 6)) {
    const mNote = melodyPattern[step % melodyPattern.length];
    const detune = inFried ? 1.06 : 1.0;
    addPluck(t, 0.22, midiToFreq(mNote) * detune, 0.075 * masterGain, Math.sin(step) * 0.35);
  }
}

// 3. Keyframe-synced Sound Effects (matching our visual beats)
// Dragging 4 clips + BGM (2.1s, 2.7s, 3.3s, 3.8s, 4.3s)
[2.1, 2.7, 3.3, 3.8, 4.3].forEach((t, i) => {
  addChirp(t, 0.14, 340 + i * 50, 680 + i * 60, 0.14);
});
// Blurry ramen alert (5.6s)
addChirp(5.6, 0.25, 420, 260, 0.13);
// Scissors snip "唰!" (6.6s) + trash "哐当!" (7.15s)
addHat(6.6, 0.24, 0.07);
addChirp(6.6, 0.09, 1400, 420, 0.18);
addKick(7.15, 0.3);
addBell(7.15, 310, 0.16, 0.25);
// Transitions basketball swish "空心入网!" (8.8s, 9.6s, 10.4s)
[8.8, 9.6, 10.4].forEach((t) => {
  addChirp(t, 0.22, 300, 920, 0.15);
  addBell(t + 0.2, 880, 0.14, 0.22);
});
// Typo question mark (13.6s), Ctrl+Z stomp "撤销!" (14.25s), "已修正" stamp (15.05s)
addChirp(13.6, 0.16, 480, 720, 0.15);
addKick(14.25, 0.28);
addChirp(14.25, 0.15, 620, 310, 0.18);
addBell(15.05, 987.77, 0.18, 0.35);
addBell(15.17, 1318.5, 0.18, 0.45);
// Sliders: sparkle up (16.2s), saturation fried (17.1s), pull back (18.1s), zoom punch (19.0s)
addChirp(16.2, 0.25, 500, 1200, 0.13);
addChirp(17.1, 0.35, 220, 95, 0.22);
addChirp(18.1, 0.22, 260, 520, 0.14);
addKick(19.0, 0.28);
addChirp(19.0, 0.18, 420, 880, 0.15);
// Beat sync "卡点!" (21.1s) - sparkling arpeggio
[0, 0.06, 0.12, 0.18, 0.24].forEach((dt, idx) => {
  addBell(21.1 + dt, midiToFreq(72 + idx * 3), 0.14, 0.25);
});
// Export click (23.8s)
addChirp(23.8, 0.12, 520, 780, 0.15);
// 99.99% sweat drop tick (25.1s, 25.5s)
addPluck(25.1, 0.06, 520, 0.1, 0);
addPluck(25.5, 0.06, 520, 0.1, 0);
// "叮!" Export Complete at 26.0s!
addBell(26.0, 1046.5, 0.28, 0.9);
addBell(26.12, 1318.5, 0.24, 0.9);
addBell(26.24, 1567.98, 0.24, 1.0);
// Sticky note pop (27.2s)
addChirp(27.2, 0.18, 380, 840, 0.15);

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
