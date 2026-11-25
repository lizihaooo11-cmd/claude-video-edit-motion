import React from 'react';
import { COLORS, FONT_HAND, FONT_MONO } from '../theme';
import { SparkleIcon } from './HandIcons';

interface RightPanelProps {
  sparkle: number; // 0..100
  saturation: number; // 0..200 (180+ = 爆表!!)
  zoomImpact: number; // 0..100
  speed: number; // 1.0
  activeSlider?: 'sparkle' | 'saturation' | 'zoom' | null;
}

export const RightPanel: React.FC<RightPanelProps> = ({
  sparkle,
  saturation,
  zoomImpact,
  speed,
  activeSlider = null,
}) => {
  const isOverSaturated = saturation >= 175;

  const sliders: {
    key: 'sparkle' | 'saturation' | 'zoom' | 'speed';
    label: string;
    valueText: string;
    ratio: number;
    fillColor: string;
    danger?: boolean;
  }[] = [
    {
      key: 'sparkle',
      label: '闪光',
      valueText: `${Math.round(sparkle)}%`,
      ratio: sparkle / 100,
      fillColor: COLORS.yellow,
    },
    {
      key: 'saturation',
      label: '饱和度',
      valueText: isOverSaturated ? '爆表!!' : `${Math.round(saturation)}%`,
      ratio: Math.min(1, saturation / 200),
      fillColor: isOverSaturated
        ? 'linear-gradient(90deg, #FF4D4D, #FFB800, #34D399, #60A5FA, #F43F5E)'
        : COLORS.teal,
      danger: isOverSaturated,
    },
    {
      key: 'zoom',
      label: '缩放冲击',
      valueText: `${Math.round(zoomImpact)}%`,
      ratio: zoomImpact / 100,
      fillColor: '#6EA8E5',
    },
    {
      key: 'speed',
      label: '速度',
      valueText: `${speed.toFixed(1)}x`,
      ratio: 0.5,
      fillColor: COLORS.teal,
    },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        left: 998,
        top: 72,
        width: 258,
        height: 312,
        backgroundColor: COLORS.panelBg,
        border: `2.4px solid ${COLORS.ink}`,
        borderRadius: 14,
        padding: '14px 16px',
        boxSizing: 'border-box',
        filter: 'url(#hand-drawn-soft)',
      }}
    >
      <div
        style={{
          fontFamily: FONT_HAND,
          fontSize: 19,
          fontWeight: 800,
          color: COLORS.ink,
          marginBottom: 14,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <span>调整</span>
        <SparkleIcon size={18} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 19 }}>
        {sliders.map((s) => {
          const isActive = activeSlider === s.key;
          return (
            <div key={s.key}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 7,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_HAND,
                    fontSize: 14,
                    fontWeight: 600,
                    color: COLORS.ink,
                  }}
                >
                  {s.label}
                </span>
                <span
                  style={{
                    fontFamily: s.danger ? FONT_HAND : FONT_MONO,
                    fontSize: s.danger ? 15 : 13,
                    fontWeight: s.danger ? 900 : 700,
                    color: s.danger ? COLORS.red : COLORS.inkSoft,
                  }}
                >
                  {s.valueText}
                </span>
              </div>

              {/* Slider track */}
              <div
                style={{
                  position: 'relative',
                  height: 9,
                  borderRadius: 6,
                  border: `1.8px solid ${COLORS.ink}`,
                  backgroundColor: '#ECE6D8',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${Math.max(0, Math.min(100, s.ratio * 100))}%`,
                    background: s.fillColor,
                    borderRadius: 5,
                  }}
                />
                {/* Knob */}
                <div
                  style={{
                    position: 'absolute',
                    left: `calc(${Math.max(0, Math.min(100, s.ratio * 100))}% - 9px)`,
                    top: -6,
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    backgroundColor: s.danger ? COLORS.red : isActive ? COLORS.yellow : '#FFFDF8',
                    border: `2.2px solid ${COLORS.ink}`,
                    boxShadow: isActive ? '0 0 0 4px rgba(245,202,78,0.45)' : 'none',
                  }}
                >
                  {/* Starburst sparkles popping around 闪光 knob when dragged up! */}
                  {s.key === 'sparkle' && s.ratio > 0.25 && isActive && (
                    <svg
                      width={56}
                      height={56}
                      viewBox="-28 -28 56 56"
                      style={{ position: 'absolute', left: -21, top: -21, pointerEvents: 'none' }}
                    >
                      {[
                        [-18, -14, 0.7, COLORS.yellow],
                        [18, -12, 0.65, '#F27A9B'],
                        [16, 15, 0.55, COLORS.yellow],
                        [-16, 16, 0.5, '#FFFDF0'],
                      ].map(([sx, sy, sc, fill], i) => (
                        <path
                          key={i}
                          d="M0 -8 L2 -2 L8 0 L2 2 L0 8 L-2 2 L-8 0 L-2 -2 Z"
                          fill={String(fill)}
                          stroke={COLORS.ink}
                          strokeWidth={1.3}
                          transform={`translate(${sx}, ${sy}) scale(${sc})`}
                        />
                      ))}
                    </svg>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
