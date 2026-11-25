# Claude Video Edit Motion (`小克剪辑`) — Remotion Recreation

A 30-second (`1280×720`, `30 fps`, `900 frames`) hand-drawn motion graphic recreated in **Remotion + React + TypeScript + SVG**, depicting the playful story of **小克 (XiaoKe)** building a video editor in code and editing a short vertical video in 30 seconds.

## Highlights

- **00:00 – 00:01.5**: Minimalist code terminal (`小克.js — 终端`) typing `const 剪辑软件 = 小克.写代码()` and morphing into the full hand-drawn video editor UI.
- **00:01.5 – 00:04.6**: Stretching arm choreography dragging `夜景.mp4`, `拉面.mp4`, `柴犬.mov`, `小克蹦迪.mp4`, and `♪ bgm_小克.wav` onto the timeline.
- **00:04.7 – 00:07.6**: Out-of-focus ramen clip (`对焦中...`) spotted (`这段在发呆 zzz`), snipped (`唰!`), and tossed into a hand-drawn trash can (`哐当!`).
- **00:07.7 – 00:11.3**: Basketball-arc throws placing `旋转` / `翻页` / `缩放` transitions onto clip junctions (`空心入网!`).
- **00:11.4 – 00:15.6**: Subtitle typo (`前方高能预敬`), giant `Ctrl+Z` keycap stomp (`撤销!`), and green rubber stamp (`已修正`).
- **00:15.7 – 00:19.7**: Right-panel slider adjustments (`闪光`, over-saturated `饱和度:拉满 / 爆表!!` recovery, and `缩放冲击`).
- **00:19.8 – 00:23.5**: One-click `▼ 卡点` beat-sync markers cascading across the audio track.
- **00:23.6 – 00:26.5**: Export progress stalling at `渲染中 99.99%` with sweat drop (`...`), then snapping to `完成 ✓` (`叮!`) with confetti.
- **00:26.6 – 00:30.0**: Final vertical showcase (`拿捏了!`, `10.2w` / `2333`), taped hand-drawn sticky note (`30 秒剪完，Opus 5.5 — 小克收工 ✨`), and sunglasses pose.
- **Original Procedural Audio**: Includes `scripts/generate-audio.mjs` to synthesize an upbeat 120 BPM backing track and frame-synced UI SFX with zero external audio dependencies.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. (Optional) Regenerate the procedural soundtrack
npm run generate-audio

# 3. Preview in Remotion Studio
npm run dev

# 4. Render 1280x720 30fps MP4
npm run render
```

The rendered output is written to `out/claude-video-edit-motion.mp4`.

## Tech Stack

- [Remotion 4](https://www.remotion.dev/)
- React 18 & TypeScript 5
- Pure SVG illustrations & organic hand-drawn line-boil filter (`feTurbulence` + `feDisplacementMap`)
- Procedural PCM WAV soundtrack generator (`scripts/generate-audio.mjs`)
