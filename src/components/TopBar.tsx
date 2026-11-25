import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, FONT_HAND, FONT_MONO, formatTimecode, prog } from '../theme';

interface TopBarProps {
  exportState: 'idle' | 'rendering' | 'stalled' | 'done';
  exportPct: number;
}

export const TopBar: React.FC<TopBarProps> = ({ exportState, exportPct }) => {
  const frame = useCurrentFrame();

  const btnBg =
    exportState === 'idle'
      ? COLORS.teal
      : exportState === 'done'
        ? '#5CC47E'
        : '#F6E7B4';

  const btnText =
    exportState === 'idle'
      ? '↑ 导出'
      : exportState === 'done'
        ? '完成 ✓'
        : exportState === 'stalled'
          ? '渲染中 99.99%'
          : `渲染中 ${Math.floor(exportPct)}%`;

  const fillWidth =
    exportState === 'rendering'
      ? `${Math.min(99, exportPct)}%`
      : exportState === 'stalled'
        ? '98.5%'
        : '0%';

  const pulseDone =
    exportState === 'done' ? 1 + 0.08 * Math.sin(prog(frame, 780, 795) * Math.PI) : 1;

  return (
    <div
      style={{
        position: 'absolute',
        left: 24,
        top: 14,
        width: 1232,
        height: 46,
        backgroundColor: COLORS.panelBg,
        border: `2.4px solid ${COLORS.ink}`,
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 14px',
        boxSizing: 'border-box',
        filter: 'url(#hand-drawn-soft)',
      }}
    >
      {/* Left: traffic lights + clapperboard + filename */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#EF6C60', '#F5C44F', '#69C478'].map((c) => (
            <span
              key={c}
              style={{
                width: 11,
                height: 11,
                borderRadius: '50%',
                backgroundColor: c,
                border: `1.6px solid ${COLORS.ink}`,
              }}
            />
          ))}
        </div>

        {/* Mini hand-drawn clapperboard icon */}
        <svg width={24} height={22} viewBox="0 0 24 22" style={{ marginLeft: 4 }}>
          <rect
            x={2}
            y={7}
            width={19}
            height={13}
            rx={2}
            fill={COLORS.coral}
            stroke={COLORS.ink}
            strokeWidth={1.8}
          />
          <path
            d="M2 7 L20 3 L21 7 L3 10 Z"
            fill="#F5CA4E"
            stroke={COLORS.ink}
            strokeWidth={1.6}
          />
          <line x1={7} y1={5} x2={9} y2={9} stroke={COLORS.ink} strokeWidth={1.5} />
          <line x1={13} y1={4} x2={15} y2={8} stroke={COLORS.ink} strokeWidth={1.5} />
        </svg>

        <span
          style={{
            fontFamily: FONT_HAND,
            fontSize: 16,
            fontWeight: 600,
            color: COLORS.ink,
            letterSpacing: 0.2,
          }}
        >
          小克剪辑_最终版_打死不改(3).mp4
        </span>
      </div>

      {/* Center: SMPTE Timecode pill + autosave */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            backgroundColor: '#35312D',
            color: '#F7F3E8',
            fontFamily: FONT_MONO,
            fontSize: 16,
            fontWeight: 700,
            padding: '5px 18px',
            borderRadius: 8,
            border: `2px solid ${COLORS.ink}`,
            letterSpacing: 1.2,
          }}
        >
          {formatTimecode(frame)}
        </div>
        <span
          style={{
            fontFamily: FONT_HAND,
            fontSize: 12,
            color: COLORS.inkMuted,
          }}
        >
          · 已自动保存
        </span>
      </div>

      {/* Right: 1080p badge + Export button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            padding: '4px 12px',
            border: `2px solid ${COLORS.ink}`,
            borderRadius: 7,
            backgroundColor: '#FFFDF7',
            fontFamily: FONT_MONO,
            fontSize: 13,
            fontWeight: 700,
            color: COLORS.ink,
          }}
        >
          1080p
        </div>

        <div
          style={{
            position: 'relative',
            width: 170,
            height: 32,
            borderRadius: 8,
            border: `2.2px solid ${COLORS.ink}`,
            backgroundColor: btnBg,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${pulseDone})`,
          }}
        >
          {(exportState === 'rendering' || exportState === 'stalled') && (
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: fillWidth,
                backgroundColor: COLORS.yellow,
              }}
            />
          )}
          <span
            style={{
              position: 'relative',
              zIndex: 2,
              fontFamily: FONT_HAND,
              fontSize: 15,
              fontWeight: 800,
              color: exportState === 'idle' || exportState === 'done' ? '#FFFDF8' : COLORS.ink,
              textShadow:
                exportState === 'idle' || exportState === 'done'
                  ? '0 1px 0 rgba(0,0,0,0.25)'
                  : 'none',
            }}
          >
            {btnText}
          </span>
        </div>
      </div>
    </div>
  );
};
