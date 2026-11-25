export const VIDEO_WIDTH = 1280;
export const VIDEO_HEIGHT = 720;
export const VIDEO_FPS = 30;
export const TOTAL_FRAMES = 900; // 30.00s

/**
 * Single source of truth for all visual & audio sync cues (in frames @ 30fps).
 * Both animation choreography and Freesound <Sequence> SFX read from TIMING.
 */
export const TIMING = {
  INTRO_TYPE_START: 2,
  UI_UNFOLD: 32,
  CLIP_DROP_1: 68,
  CLIP_DROP_2: 88,
  CLIP_DROP_3: 106,
  CLIP_DROP_4: 122,
  BGM_DROP: 128,
  BLUR_SNIP: 196,
  TRASH_IMPACT: 215,
  THROW_1: 254,
  THROW_2: 282,
  THROW_3: 308,
  TYPO_QUESTION: 398,
  CTRLZ_ANTICIPATE: 422,
  CTRLZ_LAUNCH: 426,
  CTRLZ_STOMP: 432,
  STAMP_FIXED: 448,
  SAT_FRIED: 514,
  BEAT_SYNC_PRESS: 626,
  BEAT_CASCADE_START: 634,
  EXPORT_CLICK: 718,
  EXPORT_DING: 780,
  OUTRO_NOTE_POP: 798,
} as const;

export const COLORS = {
  paper: '#F7F3E8',
  paperDark: '#EFE9D9',
  panelBg: '#FBF8F1',
  ink: '#2B2520',
  inkSoft: '#6E6459',
  inkMuted: '#A89E91',
  coral: '#D46D57',
  coralDark: '#B95440',
  coralLight: '#EB8F7A',
  yellow: '#F5CA4E',
  yellowSoft: '#FBF0C9',
  teal: '#67B8A1',
  tealDark: '#489882',
  lavender: '#D7CCF0',
  lavenderSoft: '#EAE4F7',
  mint: '#C8EFE2',
  pink: '#F59BB3',
  pinkSoft: '#FCE6ED',
  red: '#E04D42',
  green: '#4FA866',
  nightSky: '#2A2F5C',
  nightSkyTop: '#4A4E82',
  ramenBg: '#F4DFB0',
  shibaBg: '#C8EFE2',
  discoBg: '#6B5EA8',
  darkUi: '#262220',
};

export const FONT_HAND =
  '"XiaoKeHand", "Marker Felt", "Noteworthy", "PingFang SC", "Noto Sans SC", cursive, sans-serif';

export const FONT_MONO =
  '"SF Mono", "Menlo", "Monaco", "Cascadia Mono", "Consolas", monospace';

export function formatTimecode(frame: number, fps = VIDEO_FPS): string {
  const clamped = Math.max(0, Math.floor(frame));
  const totalSec = Math.floor(clamped / fps);
  const ff = clamped % fps;
  const ss = totalSec % 60;
  const mm = Math.floor(totalSec / 60) % 60;
  const hh = Math.floor(totalSec / 3600);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(hh)}:${pad(mm)}:${pad(ss)}:${pad(ff)}`;
}

export function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

export function easeOutCubic(t: number): number {
  const c = clamp01(t);
  return 1 - Math.pow(1 - c, 3);
}

export function easeInOutCubic(t: number): number {
  const c = clamp01(t);
  return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2;
}

export function easeOutBack(t: number): number {
  const c = clamp01(t);
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(c - 1, 3) + c1 * Math.pow(c - 1, 2);
}

export function prog(frame: number, start: number, end: number): number {
  if (end <= start) return frame >= start ? 1 : 0;
  return clamp01((frame - start) / (end - start));
}

/**
 * Deterministic damped micro-shake for physical impact weight (Disney Weight & Impact).
 */
export function microShake(
  frame: number,
  impactFrame: number,
  duration = 10,
  amplitude = 6
): { x: number; y: number } {
  const dt = frame - impactFrame;
  if (dt < 0 || dt > duration) return { x: 0, y: 0 };
  const decay = Math.pow(1 - dt / duration, 2);
  return {
    x: Math.sin(dt * 2.9) * amplitude * decay,
    y: Math.cos(dt * 3.7) * amplitude * 0.75 * decay,
  };
}
