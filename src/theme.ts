export const VIDEO_WIDTH = 1280;
export const VIDEO_HEIGHT = 720;
export const VIDEO_FPS = 30;
export const TOTAL_FRAMES = 900; // 30.00s

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
  '"PingFang SC", "Hiragino Maru Gothic ProN", "Yuanti SC", "Microsoft YaHei", "Noto Sans SC", system-ui, sans-serif';

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
