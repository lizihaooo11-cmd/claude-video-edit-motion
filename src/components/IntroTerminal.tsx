import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, FONT_HAND, FONT_MONO, easeInOutCubic, prog } from '../theme';

const LINE_1 = 'const 剪辑软件 = 小克.写代码()';
const LINE_2 = '剪辑软件.画出(时间轴, 预览, 面板)';

export const IntroTerminal: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame > 46) return null;

  const t1 = prog(frame, 2, 16);
  const t2 = prog(frame, 17, 30);
  const expand = easeInOutCubic(prog(frame, 32, 44));

  const chars1 = Math.floor(t1 * LINE_1.length);
  const chars2 = Math.floor(t2 * LINE_2.length);
  const showCursorOnLine1 = frame < 17;
  const cursorBlink = Math.floor(frame / 5) % 2 === 0 || frame < 30;

  // Morph from centered terminal (656 x 204) to full editor frame (1256 x 696)
  const w = 656 + (1256 - 656) * expand;
  const h = 204 + (696 - 204) * expand;
  const x = (1280 - w) / 2;
  const y = (720 - h) / 2;
  const contentOpacity = 1 - prog(frame, 32, 39);
  const shellOpacity = 1 - prog(frame, 41, 46);

  const renderLine1 = (txt: string) => {
    // Simple syntax coloring matching reference
    const kw = txt.slice(0, 5); // "const"
    const rest = txt.slice(5);
    return (
      <>
        <span style={{ color: '#6E71C9', fontWeight: 700 }}>{kw}</span>
        <span style={{ color: COLORS.ink }}>{rest}</span>
      </>
    );
  };

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 50,
        pointerEvents: 'none',
        opacity: shellOpacity,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: w,
          height: h,
          backgroundColor: '#FCFBF7',
          border: `2.5px solid ${COLORS.ink}`,
          borderRadius: 12,
          boxShadow: '4px 6px 0px rgba(43,37,32,0.12)',
          overflow: 'hidden',
          filter: 'url(#hand-drawn-soft)',
        }}
      >
        {/* Terminal Title Bar */}
        <div
          style={{
            height: 36,
            borderBottom: `2px solid ${COLORS.ink}`,
            backgroundColor: '#F5EFE2',
            display: 'flex',
            alignItems: 'center',
            padding: '0 14px',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', gap: 7 }}>
            <span
              style={{
                width: 11,
                height: 11,
                borderRadius: '50%',
                backgroundColor: '#EF6C60',
                border: `1.5px solid ${COLORS.ink}`,
              }}
            />
            <span
              style={{
                width: 11,
                height: 11,
                borderRadius: '50%',
                backgroundColor: '#F5C44F',
                border: `1.5px solid ${COLORS.ink}`,
              }}
            />
            <span
              style={{
                width: 11,
                height: 11,
                borderRadius: '50%',
                backgroundColor: '#69C478',
                border: `1.5px solid ${COLORS.ink}`,
              }}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              textAlign: 'center',
              fontFamily: FONT_HAND,
              fontSize: 14,
              color: COLORS.inkSoft,
              opacity: contentOpacity,
            }}
          >
            小克.js — 终端
          </div>
        </div>

        {/* Code Area */}
        <div
          style={{
            padding: '22px 26px',
            fontFamily: FONT_HAND,
            fontSize: 25,
            lineHeight: 1.85,
            opacity: contentOpacity,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span
              style={{
                width: 28,
                fontFamily: FONT_MONO,
                fontSize: 15,
                color: COLORS.inkMuted,
              }}
            >
              1
            </span>
            <span>{renderLine1(LINE_1.slice(0, chars1))}</span>
            {showCursorOnLine1 && cursorBlink && (
              <span
                style={{
                  display: 'inline-block',
                  width: 11,
                  height: 26,
                  backgroundColor: COLORS.coral,
                  marginLeft: 4,
                  borderRadius: 2,
                }}
              />
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span
              style={{
                width: 28,
                fontFamily: FONT_MONO,
                fontSize: 15,
                color: COLORS.inkMuted,
              }}
            >
              2
            </span>
            <span style={{ color: COLORS.ink }}>{LINE_2.slice(0, chars2)}</span>
            {!showCursorOnLine1 && cursorBlink && (
              <span
                style={{
                  display: 'inline-block',
                  width: 11,
                  height: 26,
                  backgroundColor: COLORS.coral,
                  marginLeft: 4,
                  borderRadius: 2,
                }}
              />
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span
              style={{
                width: 28,
                fontFamily: FONT_MONO,
                fontSize: 15,
                color: COLORS.inkMuted,
              }}
            >
              3
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
