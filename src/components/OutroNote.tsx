import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, FONT_HAND, easeOutBack, easeOutCubic, prog } from '../theme';

export const OutroNote: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < 798) return null;

  const pop = easeOutBack(prog(frame, 798, 814));
  const line1Full = '30 秒剪完，';
  const line2Full = 'Opus 5.5';
  const line1Chars = Math.floor(prog(frame, 808, 826) * line1Full.length);
  const line2Chars = Math.floor(prog(frame, 826, 846) * line2Full.length);
  const underlineP = easeOutCubic(prog(frame, 844, 860));
  const line3Op = prog(frame, 856, 870);

  const line1 = line1Full.slice(0, line1Chars);
  const line2 = line2Full.slice(0, line2Chars);

  return (
    <div
      style={{
        position: 'absolute',
        left: 44,
        top: 162,
        width: 360,
        height: 320,
        backgroundColor: '#FFFDF7',
        border: `2.8px solid ${COLORS.ink}`,
        borderRadius: 12,
        boxShadow: '6px 8px 0 rgba(43,37,32,0.14)',
        padding: '44px 32px 26px',
        boxSizing: 'border-box',
        transform: `rotate(-1.8deg) scale(${pop})`,
        transformOrigin: 'center center',
        filter: 'url(#hand-drawn-soft)',
        zIndex: 45,
      }}
    >
      {/* Yellow Masking Tape on top */}
      <div
        style={{
          position: 'absolute',
          top: -12,
          left: '50%',
          transform: 'translateX(-50%) rotate(1.5deg)',
          width: 102,
          height: 24,
          backgroundColor: 'rgba(245, 202, 78, 0.78)',
          border: `1.5px solid rgba(43,37,32,0.22)`,
        }}
      />

      {/* Subtle Notebook Ruled Lines */}
      {[78, 134, 190, 246].map((ly) => (
        <div
          key={ly}
          style={{
            position: 'absolute',
            left: 18,
            right: 18,
            top: ly,
            height: 1,
            backgroundColor: 'rgba(168, 158, 145, 0.25)',
          }}
        />
      ))}

      {/* Line 1 */}
      <div
        style={{
          fontFamily: FONT_HAND,
          fontSize: 32,
          fontWeight: 700,
          color: COLORS.ink,
          height: 46,
        }}
      >
        {line1}
      </div>

      {/* Line 2: Opus 5.5 + Coral Brush Underline */}
      <div style={{ marginTop: 22, position: 'relative', height: 74 }}>
        <div
          style={{
            fontFamily: FONT_HAND,
            fontSize: 54,
            fontWeight: 900,
            color: COLORS.ink,
            letterSpacing: 1,
          }}
        >
          {line2}
        </div>
        <svg
          width={290}
          height={18}
          viewBox="0 0 290 18"
          style={{ position: 'absolute', left: -4, bottom: -6 }}
        >
          <path
            d="M 4 12 Q 140 2 284 10"
            fill="none"
            stroke={COLORS.coral}
            strokeWidth={6}
            strokeLinecap="round"
            strokeDasharray={300}
            strokeDashoffset={300 * (1 - underlineP)}
          />
        </svg>
      </div>

      {/* Line 3: — 小克收工 ✨ */}
      <div
        style={{
          marginTop: 40,
          textAlign: 'right',
          fontFamily: FONT_HAND,
          fontSize: 25,
          fontWeight: 700,
          color: COLORS.inkSoft,
          opacity: line3Op,
        }}
      >
        — 小克收工 <span style={{ color: COLORS.yellow }}>✦</span>
      </div>
    </div>
  );
};
