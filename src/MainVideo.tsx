import React from 'react';
import { Audio, staticFile, useCurrentFrame } from 'remotion';
import { COLORS, easeInOutCubic, easeOutCubic, prog } from './theme';
import { PaperDefs } from './components/PaperDefs';
import { IntroTerminal } from './components/IntroTerminal';
import { TopBar } from './components/TopBar';
import { LeftPanel, LeftTab } from './components/LeftPanel';
import { RightPanel } from './components/RightPanel';
import { PhonePreview, PhoneScene } from './components/PhonePreview';
import { Timeline } from './components/Timeline';
import { MascotMood, MascotXiaoKe } from './components/MascotXiaoKe';
import { ComicFX } from './components/ComicFX';
import { OutroNote } from './components/OutroNote';

export const MainVideo: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- 1. CAMERA PAN & ZOOM (smoothly tracks action!) ----
  let camScale = 1;
  let camX = 0;
  let camY = 0;

  if (frame >= 50 && frame < 140) {
    // Zoom in slightly to Left Panel + Timeline during clip dragging
    const pIn = easeInOutCubic(prog(frame, 50, 62));
    const pOut = easeInOutCubic(prog(frame, 130, 140));
    const amt = pIn * (1 - pOut);
    camScale = 1 + 0.14 * amt;
    camX = 76 * amt;
    camY = -12 * amt;
  } else if (frame >= 158 && frame < 236) {
    // Focus on Timeline + Phone during blurry ramen cut
    const pIn = easeInOutCubic(prog(frame, 158, 170));
    const pOut = easeInOutCubic(prog(frame, 226, 236));
    const amt = pIn * (1 - pOut);
    camScale = 1 + 0.12 * amt;
    camX = 24 * amt;
    camY = -36 * amt;
  } else if (frame >= 350 && frame < 472) {
    // Slight zoom into center-bottom for Subtitle + Ctrl+Z gag
    const pIn = easeInOutCubic(prog(frame, 350, 364));
    const pOut = easeInOutCubic(prog(frame, 462, 472));
    const amt = pIn * (1 - pOut);
    camScale = 1 + 0.15 * amt;
    camX = 18 * amt;
    camY = -20 * amt;
  } else if (frame >= 472 && frame < 596) {
    // Pan right toward Phone + Right Sliders ("调整")
    const pIn = easeInOutCubic(prog(frame, 472, 486));
    const pOut = easeInOutCubic(prog(frame, 584, 596));
    const amt = pIn * (1 - pOut);
    camScale = 1 + 0.22 * amt;
    camX = -132 * amt;
    camY = 26 * amt;
  } else if (frame >= 714 && frame < 782) {
    // Zoom slightly toward top-right Export button for 99.99% stall gag
    const pIn = easeInOutCubic(prog(frame, 714, 728));
    const pOut = easeInOutCubic(prog(frame, 774, 782));
    const amt = pIn * (1 - pOut);
    camScale = 1 + 0.18 * amt;
    camX = -112 * amt;
    camY = 48 * amt;
  }

  // ---- 2. LEFT PANEL TAB & HIGHLIGHT ----
  let leftTab: LeftTab = 'media';
  let leftHighlight = -1;
  if (frame >= 238 && frame < 344) {
    leftTab = 'transition';
    if (frame >= 250 && frame < 278) leftHighlight = 0;
    else if (frame >= 280 && frame < 306) leftHighlight = 1;
    else if (frame >= 308 && frame < 332) leftHighlight = 3;
  } else if (frame >= 344) {
    leftTab = 'text';
    if (frame >= 352 && frame < 410) leftHighlight = 0;
  } else {
    if (frame >= 56 && frame < 72) leftHighlight = 0;
    else if (frame >= 74 && frame < 92) leftHighlight = 1;
    else if (frame >= 94 && frame < 110) leftHighlight = 2;
    else if (frame >= 112 && frame < 126) leftHighlight = 3;
  }

  // ---- 3. TIMELINE CLIPS, CUTS, TRANSITIONS, PLAYHEAD ----
  const clipCount =
    frame < 68 ? 0 : frame < 88 ? 1 : frame < 106 ? 2 : frame < 122 ? 3 : 4;
  const showBgm = frame >= 128;

  const ramenCutProgress = easeOutCubic(prog(frame, 206, 224));
  const showBlurPieceRemoved = frame >= 216;

  const transitionsPlaced =
    frame < 276 ? 0 : frame < 304 ? 1 : frame < 330 ? 2 : 3;

  let textClipText: string | null = null;
  if (frame >= 360) {
    if (frame < 388) {
      const n = Math.max(1, Math.floor(prog(frame, 360, 388) * 6));
      textClipText = '前方高能预敬'.slice(0, n);
    } else if (frame < 434) {
      textClipText = '前方高能预敬';
    } else if (frame < 448) {
      textClipText = '前方高能预';
    } else {
      textClipText = '前方高能预警';
    }
  }

  const beatMarkersCount =
    frame < 634 ? 0 : Math.min(24, Math.floor(prog(frame, 634, 658) * 24) + 1);
  const beatButtonPressed = frame >= 624 && frame <= 638;

  // Playhead X across the timeline (0..960)
  let playheadX = 12;
  if (frame >= 68 && frame < 140) {
    playheadX = 36 + prog(frame, 68, 140) * 140;
  } else if (frame >= 140 && frame < 168) {
    playheadX = 176 + prog(frame, 140, 168) * 205;
  } else if (frame >= 168 && frame < 208) {
    playheadX = 381 + Math.sin(frame * 0.15) * 4; // paused on blurry ramen
  } else if (frame >= 208 && frame < 248) {
    playheadX = 310;
  } else if (frame >= 248 && frame < 358) {
    playheadX = 160 + prog(frame, 248, 358) * 380;
  } else if (frame >= 358 && frame < 470) {
    playheadX = 530 + Math.sin(frame * 0.08) * 12; // on Shiba
  } else if (frame >= 470 && frame < 596) {
    playheadX = 760 + prog(frame, 470, 596) * 110; // on Disco
  } else if (frame >= 596 && frame < 712) {
    playheadX = 80 + prog(frame, 596, 712) * 860; // beat-synced full scrub!
  } else if (frame >= 712) {
    playheadX = 760 + ((frame - 712) * 4) % 180;
  }

  // ---- 4. RIGHT PANEL SLIDERS ----
  const sparkle =
    frame < 482
      ? 0
      : frame < 504
        ? prog(frame, 482, 504) * 70
        : frame < 596
          ? 70
          : 70 + prog(frame, 596, 616) * 20;

  let saturation = 100;
  if (frame >= 506 && frame < 524) {
    saturation = 100 + prog(frame, 506, 524) * 100; // up to 200 (爆表!!)
  } else if (frame >= 524 && frame < 538) {
    saturation = 200;
  } else if (frame >= 538 && frame < 554) {
    saturation = 200 - prog(frame, 538, 554) * 90; // pull back to 110%
  } else if (frame >= 554) {
    saturation = 110;
  }

  const zoomImpact =
    frame < 558 ? 0 : frame < 584 ? prog(frame, 558, 584) * 60 : 60;

  // ---- 5. EXPORT STATE ----
  let exportState: 'idle' | 'rendering' | 'stalled' | 'done' = 'idle';
  let exportPct = 0;
  if (frame >= 722 && frame < 748) {
    exportState = 'rendering';
    exportPct = 8 + easeOutCubic(prog(frame, 722, 748)) * 91;
  } else if (frame >= 748 && frame < 780) {
    exportState = 'stalled';
    exportPct = 99.99;
  } else if (frame >= 780) {
    exportState = 'done';
    exportPct = 100;
  }

  // ---- 6. PHONE PREVIEW SCENE & SUBTITLE ----
  let phoneScene: PhoneScene = 'black';
  let phoneSubtitle: string | undefined;
  let phoneSubtitleTypo = false;
  let transitionEffect: 'none' | 'swirl' | 'flip' | 'zoom' = 'none';
  let transitionProgress = 0;

  const isOutro = frame >= 798;

  if (isOutro) {
    // Rapid energetic highlight montage -> settles on 小克蹦迪 + "拿捏了!"
    if (frame < 814) phoneScene = 'night';
    else if (frame < 830) phoneScene = 'ramen';
    else if (frame < 846) phoneScene = 'shiba';
    else {
      phoneScene = 'disco';
      if (frame >= 852) phoneSubtitle = '拿捏了!';
    }
  } else if (frame < 68) {
    phoneScene = 'black';
  } else if (frame < 142) {
    phoneScene = 'night';
  } else if (frame < 166) {
    phoneScene = 'ramen';
  } else if (frame < 208) {
    phoneScene = 'ramen_blur';
  } else if (frame < 276) {
    phoneScene = 'ramen';
  } else if (frame < 306) {
    phoneScene = 'ramen';
    transitionEffect = 'swirl';
    transitionProgress = prog(frame, 276, 294);
  } else if (frame < 470) {
    phoneScene = 'shiba';
    if (frame < 322) {
      transitionEffect = 'flip';
      transitionProgress = prog(frame, 306, 322);
    }
    if (textClipText) {
      phoneSubtitle = textClipText;
      phoneSubtitleTypo = frame >= 384 && frame < 434;
    }
  } else if (frame < 596) {
    phoneScene = 'disco';
  } else if (frame < 712) {
    // Beat-synced rapid playback across all 4 clips
    const cycle = Math.floor((frame - 596) / 29) % 4;
    phoneScene = (['night', 'ramen', 'shiba', 'disco'] as PhoneScene[])[cycle];
    if (cycle === 2) phoneSubtitle = '前方高能预警';
  } else {
    phoneScene = 'disco';
  }

  // Beat pulse on every half-second (15 frames) once beat markers are active
  const beatPulse =
    beatMarkersCount > 0 ? Math.max(0, 1 - ((frame % 15) / 6)) : 0;

  // ---- 7. MASCOT 小克 CHOREOGRAPHY ----
  let mascotX = 210;
  let mascotY = 445;
  let mascotMood: MascotMood = 'normal';
  let mascotBounce = 0;
  let reachTarget: { x: number; y: number } | null = null;
  let speech: string | null = null;
  let showQuestionMark = false;
  let celebrateWave = false;

  if (frame < 56) {
    mascotX = 205;
    mascotY = 450;
    mascotMood = 'sleep';
  } else if (frame < 130) {
    mascotX = 205;
    mascotY = 446;
    mascotMood = 'normal';
    mascotBounce = 3;
    if (frame < 72) {
      speech = '开工！';
      reachTarget = { x: 88, y: 146 };
    } else if (frame < 92) {
      reachTarget = { x: 204, y: 146 };
    } else if (frame < 110) {
      reachTarget = { x: 88, y: 230 };
    } else if (frame < 126) {
      reachTarget = { x: 204, y: 230 };
    }
  } else if (frame < 236) {
    mascotX = 240;
    mascotY = 446;
    if (frame >= 168 && frame < 196) {
      speech = '这段在发呆 zzz';
      reachTarget = { x: 515, y: 505 };
    } else if (frame >= 196 && frame < 224) {
      mascotMood = 'happy';
      mascotBounce = 6;
    }
  } else if (frame < 342) {
    mascotX = 236;
    mascotY = 446;
    mascotMood = 'happy';
    if (frame >= 232 && frame < 246) {
      reachTarget = { x: 146, y: 96 }; // click 转场 tab
    } else if (frame >= 250 && frame < 264) {
      reachTarget = { x: 88, y: 158 };
    } else if (frame >= 280 && frame < 292) {
      reachTarget = { x: 204, y: 158 };
    }
  } else if (frame < 472) {
    // Subtitle & Ctrl+Z gag
    mascotX = 290;
    mascotY = frame >= 428 && frame <= 444 ? 548 : 446;
    if (frame >= 398 && frame < 424) {
      mascotMood = 'lookup';
      showQuestionMark = true;
    } else if (frame >= 424 && frame < 448) {
      mascotMood = 'normal';
      mascotBounce = 8;
    } else if (frame >= 448) {
      mascotMood = 'happy';
    }
  } else if (frame < 596) {
    // Reaching over to right sliders!
    mascotX = 430;
    mascotY = 448;
    if (frame >= 480 && frame < 506) {
      reachTarget = { x: 1018 + (sparkle / 100) * 218, y: 156 };
    } else if (frame >= 506 && frame < 554) {
      reachTarget = { x: 1018 + Math.min(1, saturation / 200) * 218, y: 215 };
      if (saturation >= 175) {
        mascotMood = 'shocked';
        mascotBounce = 9;
      }
    } else if (frame >= 556 && frame < 588) {
      reachTarget = { x: 1018 + (zoomImpact / 100) * 218, y: 274 };
      mascotMood = 'happy';
    }
  } else if (frame < 710) {
    // Pressing Beat Sync & bouncing along!
    mascotX = frame < 642 ? 520 : 520 + prog(frame, 642, 706) * 320;
    mascotY = 446;
    mascotMood = 'happy';
    mascotBounce = frame >= 634 ? 10 : 4;
    if (frame >= 614 && frame < 638) {
      reachTarget = { x: 1178, y: 598 }; // ▼ 卡点 button
    }
  } else if (frame < 798) {
    // Export button click & 99.99% sweat wait
    mascotX = 836;
    mascotY = 446;
    if (frame >= 712 && frame < 730) {
      reachTarget = { x: 1164, y: 38 }; // ↑ 导出 button
    } else if (frame >= 746 && frame < 780) {
      mascotMood = 'sweat';
      speech = '...';
    } else if (frame >= 780) {
      mascotMood = 'happy';
      mascotBounce = 12;
      celebrateWave = true;
    }
  } else {
    // Outro cool pose!
    mascotX = 1020;
    mascotY = 540;
    mascotMood = 'cool';
    mascotBounce = 4;
    celebrateWave = true;
  }

  // Brief dim-out cough gag right after over-saturation (536-546)
  const coughDim =
    frame >= 534 && frame <= 548
      ? 0.45 * Math.sin(prog(frame, 534, 548) * Math.PI)
      : 0;

  return (
    <div
      style={{
        width: 1280,
        height: 720,
        backgroundColor: COLORS.paper,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <PaperDefs />

      {/* Subtle Paper Grain Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          filter: 'url(#paper-grain)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Main Editor Canvas (Camera Zoom/Pan applied here) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translate(${camX}px, ${camY}px) scale(${camScale})`,
          transformOrigin: 'center center',
          opacity: frame < 34 ? 0 : isOutro ? 0.36 : 1,
          zIndex: 10,
        }}
      >
        <TopBar exportState={exportState} exportPct={exportPct} />
        <LeftPanel activeTab={leftTab} highlightedIndex={leftHighlight} />
        {!isOutro && (
          <PhonePreview
            scene={phoneScene}
            subtitle={phoneSubtitle}
            subtitleTypo={phoneSubtitleTypo}
            sparkleAmount={sparkle}
            saturation={saturation}
            zoomImpact={zoomImpact}
            beatPulse={beatPulse}
            isPlaying={frame >= 140 && frame < 720 && !(frame >= 168 && frame < 208)}
            transitionEffect={transitionEffect}
            transitionProgress={transitionProgress}
          />
        )}
        <RightPanel
          sparkle={sparkle}
          saturation={saturation}
          zoomImpact={zoomImpact}
          speed={1.0}
          activeSlider={
            frame >= 480 && frame < 506
              ? 'sparkle'
              : frame >= 506 && frame < 554
                ? 'saturation'
                : frame >= 556 && frame < 588
                  ? 'zoom'
                  : null
          }
        />
        <Timeline
          clipCount={clipCount}
          showBgm={showBgm}
          ramenCutProgress={ramenCutProgress}
          showBlurPieceRemoved={showBlurPieceRemoved}
          transitionsPlaced={transitionsPlaced}
          textClipText={textClipText}
          playheadX={playheadX}
          beatMarkersCount={beatMarkersCount}
          beatButtonPressed={beatButtonPressed}
        />
        {!isOutro && (
          <MascotXiaoKe
            x={mascotX}
            y={mascotY}
            mood={mascotMood}
            bounce={mascotBounce}
            reachTarget={reachTarget}
            speech={speech}
            showQuestionMark={showQuestionMark}
            celebrateWave={celebrateWave}
          />
        )}
        <ComicFX />
      </div>

      {/* Brief Dim Overlay for Fried Saturation Recovery Gag */}
      {coughDim > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#1E1A16',
            opacity: coughDim,
            zIndex: 42,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Outro Foreground Showcase Layer (un-dimmed!) */}
      {isOutro && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 44 }}>
          <OutroNote />
          <PhonePreview
            scene={phoneScene}
            subtitle={phoneSubtitle}
            sparkleAmount={85}
            saturation={110}
            zoomImpact={35}
            beatPulse={beatPulse}
            showDouyinOverlay={true}
            centerOverride={{ x: 542, y: 180, scale: 1.36 }}
          />
          <MascotXiaoKe
            x={mascotX}
            y={mascotY}
            mood="cool"
            scale={1.32}
            bounce={4}
            celebrateWave={true}
          />
        </div>
      )}

      {/* Intro Code Terminal (00:00 - 00:01.5) */}
      <IntroTerminal />

      {/* Original Procedural Soundtrack */}
      <Audio src={staticFile('audio/soundtrack.wav')} volume={0.9} />
    </div>
  );
};
