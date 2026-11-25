import React from 'react';
import { COLORS, FONT_HAND, FONT_MONO } from '../theme';

interface TimelineProps {
  clipCount: number; // 0..4
  showBgm: boolean;
  ramenCutProgress: number; // 0 = intact with blurry mid, 0..1 = splitting/closing, 1 = clean joined
  showBlurPieceRemoved: boolean;
  transitionsPlaced: number; // 0..3
  textClipText: string | null;
  playheadX: number; // px relative to track area (0..1080)
  beatMarkersCount: number; // 0..24
  beatButtonPressed: boolean;
}

export const Timeline: React.FC<TimelineProps> = ({
  clipCount,
  showBgm,
  ramenCutProgress,
  showBlurPieceRemoved,
  transitionsPlaced,
  textClipText,
  playheadX,
  beatMarkersCount,
  beatButtonPressed,
}) => {
  // Base clip geometry inside track area (left starts at x=84)
  const nightW = 190;
  const ramenLeftW = 148;
  const ramenBlurW = 130 * (1 - ramenCutProgress);
  const ramenRightW = 84;
  const shibaW = 216;
  const discoW = 236;

  const nightX = 0;
  const ramenX = nightX + nightW + 4;
  const shibaX = ramenX + ramenLeftW + ramenBlurW + ramenRightW + 6;
  const discoX = shibaX + shibaW + 6;

  const rulerTicks = [
    '0:00',
    '0:02',
    '0:04',
    '0:06',
    '0:08',
    '0:10',
    '0:12',
    '0:14',
    '0:16',
  ];

  const transitionBadges = [
    { x: ramenX - 2, icon: '🌀' },
    { x: shibaX - 3, icon: '📄' },
    { x: discoX - 3, icon: '🔍' },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        left: 24,
        top: 396,
        width: 1232,
        height: 310,
        backgroundColor: COLORS.panelBg,
        border: `2.4px solid ${COLORS.ink}`,
        borderRadius: 14,
        boxSizing: 'border-box',
        overflow: 'hidden',
        filter: 'url(#hand-drawn-soft)',
      }}
    >
      {/* Time Ruler */}
      <div
        style={{
          height: 36,
          borderBottom: `1.8px solid ${COLORS.inkMuted}`,
          display: 'flex',
          alignItems: 'flex-end',
          paddingLeft: 84,
          position: 'relative',
          backgroundColor: '#F5EFE2',
        }}
      >
        {rulerTicks.map((label, idx) => (
          <div
            key={label}
            style={{
              position: 'absolute',
              left: 84 + idx * 134,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontFamily: FONT_MONO,
                fontSize: 11,
                color: COLORS.inkSoft,
                marginBottom: 2,
              }}
            >
              {label}
            </span>
            <div style={{ width: 1.5, height: 8, backgroundColor: COLORS.inkSoft }} />
          </div>
        ))}
      </div>

      {/* Track Body */}
      <div style={{ position: 'relative', height: 228 }}>
        {/* Left Track Headers */}
        <div
          style={{
            position: 'absolute',
            left: 14,
            top: 14,
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}
        >
          {/* Text Track T */}
          <div
            style={{
              width: 38,
              height: 34,
              borderRadius: 8,
              border: `2px solid ${COLORS.ink}`,
              backgroundColor: COLORS.yellowSoft,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: FONT_MONO,
              fontWeight: 900,
              fontSize: 16,
              color: COLORS.ink,
            }}
          >
            T
          </div>
          {/* Video Track */}
          <div
            style={{
              width: 38,
              height: 68,
              borderRadius: 8,
              border: `2px solid ${COLORS.ink}`,
              backgroundColor: '#E1F2EA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
              color: COLORS.ink,
            }}
          >
            ▶
          </div>
          {/* Audio Track */}
          <div
            style={{
              width: 38,
              height: 44,
              borderRadius: 8,
              border: `2px solid ${COLORS.ink}`,
              backgroundColor: COLORS.lavenderSoft,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 17,
              color: COLORS.ink,
            }}
          >
            ♪
          </div>
        </div>

        {/* Horizontal track lane guides */}
        <div
          style={{
            position: 'absolute',
            left: 84,
            right: 16,
            top: 14,
            height: 34,
            backgroundColor: 'rgba(235, 229, 215, 0.35)',
            borderRadius: 6,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 84,
            right: 16,
            top: 62,
            height: 68,
            backgroundColor: 'rgba(235, 229, 215, 0.45)',
            borderRadius: 8,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 84,
            right: 16,
            top: 144,
            height: 44,
            backgroundColor: 'rgba(235, 229, 215, 0.35)',
            borderRadius: 8,
          }}
        />

        {/* Track Content Container */}
        <div style={{ position: 'absolute', left: 84, top: 0, right: 16, bottom: 0 }}>
          {/* TEXT CLIP */}
          {textClipText && (
            <div
              style={{
                position: 'absolute',
                left: shibaX - 18,
                top: 15,
                width: 218,
                height: 32,
                borderRadius: 8,
                backgroundColor: COLORS.yellow,
                border: `2.2px solid ${COLORS.ink}`,
                display: 'flex',
                alignItems: 'center',
                padding: '0 10px',
                gap: 6,
                fontFamily: FONT_HAND,
                fontSize: 13,
                fontWeight: 800,
                color: COLORS.ink,
              }}
            >
              <span style={{ fontFamily: FONT_MONO, fontSize: 12 }}>T</span>
              <span>{textClipText}</span>
            </div>
          )}

          {/* VIDEO CLIPS */}
          {/* 1. 夜景.mp4 */}
          {clipCount >= 1 && (
            <div
              style={{
                position: 'absolute',
                left: nightX,
                top: 62,
                width: nightW,
                height: 68,
                borderRadius: 9,
                border: `2.2px solid ${COLORS.ink}`,
                backgroundColor: COLORS.nightSky,
                overflow: 'hidden',
              }}
            >
              <svg width="100%" height="100%" viewBox="0 0 190 68" preserveAspectRatio="none">
                <rect width={190} height={68} fill={COLORS.nightSky} />
                {[38, 102, 164].map((mx, i) => (
                  <g key={i} transform={`translate(${mx}, 16)`}>
                    <circle r={6} fill="#FCE36D" />
                    <circle cx={3} cy={-2} r={5} fill={COLORS.nightSky} />
                  </g>
                ))}
                {Array.from({ length: 14 }).map((_, i) => (
                  <rect
                    key={i}
                    x={i * 14}
                    y={34 + ((i * 7) % 14)}
                    width={12}
                    height={36}
                    fill={i % 2 === 0 ? '#1C2042' : '#252B56'}
                  />
                ))}
                {Array.from({ length: 18 }).map((_, i) => (
                  <rect
                    key={i}
                    x={6 + i * 10}
                    y={44 + ((i * 5) % 14)}
                    width={3}
                    height={4}
                    fill="#FCE36D"
                  />
                ))}
              </svg>
              <div
                style={{
                  position: 'absolute',
                  left: 6,
                  top: 4,
                  backgroundColor: 'rgba(255,253,248,0.9)',
                  padding: '1px 6px',
                  borderRadius: 5,
                  fontFamily: FONT_HAND,
                  fontSize: 10,
                  fontWeight: 700,
                  color: COLORS.ink,
                }}
              >
                夜景.mp4
              </div>
            </div>
          )}

          {/* 2. 拉面.mp4 (with optional blurry grey middle before cut!) */}
          {clipCount >= 2 && (
            <>
              {/* Left good part */}
              <div
                style={{
                  position: 'absolute',
                  left: ramenX,
                  top: 62,
                  width: ramenLeftW,
                  height: 68,
                  borderRadius: showBlurPieceRemoved ? '9px 4px 4px 9px' : '9px 0 0 9px',
                  border: `2.2px solid ${COLORS.ink}`,
                  backgroundColor: COLORS.ramenBg,
                  overflow: 'hidden',
                }}
              >
                <svg width="100%" height="100%" viewBox="0 0 148 68" preserveAspectRatio="none">
                  <rect width={148} height={68} fill={COLORS.ramenBg} />
                  {[36, 108].map((bx, i) => (
                    <g key={i} transform={`translate(${bx}, 38)`}>
                      <ellipse cx={0} cy={4} rx={24} ry={16} fill="#FFFBF0" stroke={COLORS.ink} strokeWidth={1.8} />
                      <ellipse cx={0} cy={-2} rx={20} ry={7} fill="#E3AC5C" stroke={COLORS.ink} strokeWidth={1.5} />
                      <line x1={2} y1={-4} x2={24} y2={-24} stroke="#5B3F29" strokeWidth={2.2} />
                    </g>
                  ))}
                </svg>
                <div
                  style={{
                    position: 'absolute',
                    left: 6,
                    top: 4,
                    backgroundColor: 'rgba(255,253,248,0.92)',
                    padding: '1px 6px',
                    borderRadius: 5,
                    fontFamily: FONT_HAND,
                    fontSize: 10,
                    fontWeight: 700,
                    color: COLORS.ink,
                  }}
                >
                  拉面.mp4
                </div>
              </div>

              {/* Blurry grey middle (shrinks & disappears once cut!) */}
              {!showBlurPieceRemoved && ramenBlurW > 4 && (
                <div
                  style={{
                    position: 'absolute',
                    left: ramenX + ramenLeftW,
                    top: 62,
                    width: ramenBlurW,
                    height: 68,
                    borderTop: `2.2px solid ${COLORS.ink}`,
                    borderBottom: `2.2px solid ${COLORS.ink}`,
                    background:
                      'repeating-linear-gradient(-45deg, #8A8680, #8A8680 8px, #76726C 8px, #76726C 16px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#EEE',
                    fontFamily: FONT_HAND,
                    fontSize: 11,
                    fontWeight: 700,
                    overflow: 'hidden',
                  }}
                >
                  {ramenBlurW > 50 ? '对焦中...' : ''}
                </div>
              )}

              {/* Right good part */}
              <div
                style={{
                  position: 'absolute',
                  left: ramenX + ramenLeftW + ramenBlurW,
                  top: 62,
                  width: ramenRightW,
                  height: 68,
                  borderRadius: showBlurPieceRemoved ? '4px 9px 9px 4px' : '0 9px 9px 0',
                  border: `2.2px solid ${COLORS.ink}`,
                  backgroundColor: COLORS.ramenBg,
                  overflow: 'hidden',
                }}
              >
                <svg width="100%" height="100%" viewBox="0 0 84 68" preserveAspectRatio="none">
                  <rect width={84} height={68} fill={COLORS.ramenBg} />
                  <g transform="translate(42, 38)">
                    <ellipse cx={0} cy={4} rx={24} ry={16} fill="#FFFBF0" stroke={COLORS.ink} strokeWidth={1.8} />
                    <ellipse cx={0} cy={-2} rx={20} ry={7} fill="#E3AC5C" stroke={COLORS.ink} strokeWidth={1.5} />
                    <line x1={2} y1={-4} x2={24} y2={-24} stroke="#5B3F29" strokeWidth={2.2} />
                  </g>
                </svg>
              </div>
            </>
          )}

          {/* 3. 柴犬.mov */}
          {clipCount >= 3 && (
            <div
              style={{
                position: 'absolute',
                left: shibaX,
                top: 62,
                width: shibaW,
                height: 68,
                borderRadius: 9,
                border: `2.2px solid ${COLORS.ink}`,
                backgroundColor: COLORS.shibaBg,
                overflow: 'hidden',
              }}
            >
              <svg width="100%" height="100%" viewBox="0 0 216 68" preserveAspectRatio="none">
                <rect width={216} height={68} fill={COLORS.shibaBg} />
                {[38, 108, 178].map((sx, i) => (
                  <g key={i} transform={`translate(${sx}, 38)`}>
                    <polygon points="-16,-14 -12,-28 -4,-14" fill="#D98344" stroke={COLORS.ink} strokeWidth={1.5} />
                    <polygon points="16,-14 12,-28 4,-14" fill="#D98344" stroke={COLORS.ink} strokeWidth={1.5} />
                    <ellipse cx={0} cy={2} rx={20} ry={17} fill="#D98344" stroke={COLORS.ink} strokeWidth={1.8} />
                    <ellipse cx={0} cy={7} rx={15} ry={11} fill="#FFF8EE" />
                    <circle cx={-6} cy={0} r={2} fill={COLORS.ink} />
                    <circle cx={6} cy={0} r={2} fill={COLORS.ink} />
                  </g>
                ))}
              </svg>
              <div
                style={{
                  position: 'absolute',
                  left: 6,
                  top: 4,
                  backgroundColor: 'rgba(255,253,248,0.92)',
                  padding: '1px 6px',
                  borderRadius: 5,
                  fontFamily: FONT_HAND,
                  fontSize: 10,
                  fontWeight: 700,
                  color: COLORS.ink,
                }}
              >
                柴犬.mov
              </div>
            </div>
          )}

          {/* 4. 小克蹦迪.mp4 */}
          {clipCount >= 4 && (
            <div
              style={{
                position: 'absolute',
                left: discoX,
                top: 62,
                width: discoW,
                height: 68,
                borderRadius: 9,
                border: `2.2px solid ${COLORS.ink}`,
                backgroundColor: COLORS.discoBg,
                overflow: 'hidden',
              }}
            >
              <svg width="100%" height="100%" viewBox="0 0 236 68" preserveAspectRatio="none">
                <rect width={236} height={68} fill={COLORS.discoBg} />
                <rect y={48} width={236} height={20} fill="#353166" />
                {[38, 102, 166, 214].map((cx, i) => (
                  <g key={i} transform={`translate(${cx}, ${34 + (i % 2 === 0 ? -2 : 2)})`}>
                    <rect x={-14} y={-10} width={28} height={20} rx={3} fill={COLORS.coral} stroke={COLORS.ink} strokeWidth={1.8} />
                    <circle cx={-5} cy={-2} r={1.6} fill={COLORS.ink} />
                    <circle cx={5} cy={-2} r={1.6} fill={COLORS.ink} />
                  </g>
                ))}
              </svg>
              <div
                style={{
                  position: 'absolute',
                  left: 6,
                  top: 4,
                  backgroundColor: 'rgba(255,253,248,0.92)',
                  padding: '1px 6px',
                  borderRadius: 5,
                  fontFamily: FONT_HAND,
                  fontSize: 10,
                  fontWeight: 700,
                  color: COLORS.ink,
                }}
              >
                小克蹦迪.mp4
              </div>
            </div>
          )}

          {/* TRANSITION JUNCTION BADGES */}
          {transitionBadges.map((b, idx) =>
            transitionsPlaced > idx ? (
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  left: b.x - 15,
                  top: 81,
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  backgroundColor: '#FFFDF8',
                  border: `2.2px solid ${COLORS.ink}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  zIndex: 5,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.14)',
                }}
              >
                {b.icon}
              </div>
            ) : null
          )}

          {/* AUDIO WAVEFORM TRACK */}
          {showBgm && (
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 144,
                width: 970,
                height: 44,
                borderRadius: 9,
                border: `2.2px solid ${COLORS.ink}`,
                backgroundColor: COLORS.lavenderSoft,
                overflow: 'hidden',
              }}
            >
              <svg width="100%" height="100%" viewBox="0 0 970 44" preserveAspectRatio="none">
                {Array.from({ length: 135 }).map((_, i) => {
                  const h = 8 + Math.abs(Math.sin(i * 0.7) * 16 + Math.cos(i * 1.9) * 9);
                  return (
                    <rect
                      key={i}
                      x={6 + i * 7.1}
                      y={(44 - h) / 2}
                      width={3}
                      height={h}
                      rx={1.5}
                      fill="#8E7CC3"
                    />
                  );
                })}
              </svg>
              <div
                style={{
                  position: 'absolute',
                  left: 8,
                  top: 3,
                  fontFamily: FONT_HAND,
                  fontSize: 10,
                  fontWeight: 700,
                  color: COLORS.ink,
                }}
              >
                ♪ bgm_小克.wav
              </div>
            </div>
          )}

          {/* BEAT SYNC BUTTON (Bottom right of audio lane) */}
          {showBgm && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: 148,
                width: 112,
                height: 36,
                borderRadius: 9,
                border: `2.2px solid ${COLORS.ink}`,
                backgroundColor: beatButtonPressed ? COLORS.yellow : '#FBF2CF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
                fontFamily: FONT_HAND,
                fontSize: 14,
                fontWeight: 800,
                color: COLORS.ink,
                transform: beatButtonPressed ? 'scale(0.95)' : 'scale(1)',
              }}
            >
              <span style={{ fontSize: 11 }}>▼</span>
              <span>卡点</span>
            </div>
          )}

          {/* BEAT MARKERS ROW */}
          {beatMarkersCount > 0 && (
            <div
              style={{
                position: 'absolute',
                left: 6,
                top: 194,
                display: 'flex',
                gap: 28,
              }}
            >
              {Array.from({ length: beatMarkersCount }).map((_, idx) => (
                <svg key={idx} width={14} height={14} viewBox="0 0 14 14">
                  <polygon
                    points="2,2 12,2 7,12"
                    fill={COLORS.yellow}
                    stroke={COLORS.ink}
                    strokeWidth={1.6}
                  />
                </svg>
              ))}
            </div>
          )}

          {/* PLAYHEAD */}
          <div
            style={{
              position: 'absolute',
              left: playheadX,
              top: -12,
              bottom: 10,
              zIndex: 12,
              pointerEvents: 'none',
            }}
          >
            <svg
              width={18}
              height={18}
              viewBox="0 0 18 18"
              style={{ position: 'absolute', left: -9, top: 0 }}
            >
              <polygon
                points="2,1 16,1 16,10 9,17 2,10"
                fill="#E04D42"
                stroke={COLORS.ink}
                strokeWidth={1.8}
              />
            </svg>
            <div
              style={{
                position: 'absolute',
                left: -1,
                top: 15,
                bottom: 0,
                width: 2.2,
                backgroundColor: '#E04D42',
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div
        style={{
          height: 36,
          padding: '0 22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: COLORS.inkMuted,
          fontFamily: FONT_HAND,
          fontSize: 11,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>−</span>
          <div style={{ width: 78, height: 3, backgroundColor: '#D6CFC0', position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                left: 32,
                top: -4,
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: '#FFF',
                border: `1.5px solid ${COLORS.inkSoft}`,
              }}
            />
          </div>
          <span>+</span>
        </div>
        <div>
          {beatMarkersCount > 0 ? '卡点 ✦ · 总时长 0:10.4' : `素材 ${clipCount} · 总时长 ${showBlurPieceRemoved ? '0:10.4' : '0:12.2'}`}
        </div>
      </div>
    </div>
  );
};
