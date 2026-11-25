import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, FONT_HAND } from '../theme';

export type MascotMood =
  | 'sleep'
  | 'normal'
  | 'happy'
  | 'lookup'
  | 'shocked'
  | 'sweat'
  | 'cool';

interface MascotXiaoKeProps {
  x: number; // center X in 1280x720 canvas
  y: number; // center Y in 1280x720 canvas
  mood?: MascotMood;
  scale?: number;
  /** Squash & stretch anchored at feet (Disney Squash & Stretch) */
  scaleX?: number;
  scaleY?: number;
  /** Body lean angle in degrees (Anticipation / Follow-through) */
  leanDeg?: number;
  /** Asymmetric hop amplitude */
  bounce?: number;
  /** Optional world-space point (x, y) that 小克 stretches his right arm to touch/grab */
  reachTarget?: { x: number; y: number } | null;
  /** 0..1 arm extension progress for elastic whip-out & retract */
  armExtend?: number;
  speech?: string | null;
  showQuestionMark?: boolean;
  celebrateWave?: boolean;
}

export const MascotXiaoKe: React.FC<MascotXiaoKeProps> = ({
  x,
  y,
  mood = 'normal',
  scale = 1,
  scaleX = 1,
  scaleY = 1,
  leanDeg = 0,
  bounce = 0,
  reachTarget = null,
  armExtend = 1,
  speech = null,
  showQuestionMark = false,
  celebrateWave = false,
}) => {
  const frame = useCurrentFrame();

  // Asymmetric bounce (faster snap up, crisp contact at bottom)
  const rawPhase = (frame * 0.42) % (Math.PI * 2);
  const hop = bounce > 0 ? Math.pow(Math.abs(Math.sin(rawPhase / 2)), 0.72) * bounce : 0;
  // Subtle alive breathing during moving holds
  const breathY = 1 + Math.sin(frame * 0.14) * 0.018;
  const breathX = 1 - Math.sin(frame * 0.14) * 0.012;
  // Periodic deterministic eye blink during holds (frames 0..2 of every 78 frames)
  const isBlinking = (mood === 'normal' || mood === 'sweat') && frame % 78 >= 75;

  const bodyY = y - hop;
  const finalScaleX = scale * scaleX * breathX;
  const finalScaleY = scale * scaleY * breathY;

  // Shoulder anchor for stretchy arm
  const shoulderX = x + 36 * scale;
  const shoulderY = bodyY + 2 * scale;

  const tipX = reachTarget
    ? shoulderX + (reachTarget.x - shoulderX) * armExtend
    : shoulderX;
  const tipY = reachTarget
    ? shoulderY + (reachTarget.y - shoulderY) * armExtend
    : shoulderY;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 30,
      }}
    >
      {/* Stretchy Arm SVG Layer */}
      {reachTarget && armExtend > 0.04 && (
        <svg
          width={1280}
          height={720}
          viewBox="0 0 1280 720"
          style={{ position: 'absolute', inset: 0, filter: 'url(#hand-drawn-soft)' }}
        >
          <path
            d={`M ${shoulderX} ${shoulderY} Q ${(shoulderX + tipX) / 2} ${Math.min(shoulderY, tipY) - 24 * armExtend} ${tipX} ${tipY}`}
            fill="none"
            stroke={COLORS.ink}
            strokeWidth={13}
            strokeLinecap="round"
          />
          <path
            d={`M ${shoulderX} ${shoulderY} Q ${(shoulderX + tipX) / 2} ${Math.min(shoulderY, tipY) - 24 * armExtend} ${tipX} ${tipY}`}
            fill="none"
            stroke={COLORS.coral}
            strokeWidth={8}
            strokeLinecap="round"
          />
          <circle
            cx={tipX}
            cy={tipY}
            r={7}
            fill={COLORS.coral}
            stroke={COLORS.ink}
            strokeWidth={2.4}
          />
        </svg>
      )}

      {/* Character Body (pivoted at feet for grounded squash & stretch) */}
      <div
        style={{
          position: 'absolute',
          left: x,
          top: bodyY,
          transform: `translate(-50%, -50%) rotate(${leanDeg}deg) scale(${finalScaleX}, ${finalScaleY})`,
          transformOrigin: '50% 82%',
          filter: 'url(#hand-drawn-soft)',
        }}
      >
        <svg width={120} height={104} viewBox="-60 -52 120 104" style={{ overflow: 'visible' }}>
          {/* 4 stubby Claude-mascot legs */}
          <rect x={-32} y={20} width={9} height={16} rx={3} fill={COLORS.coralDark} stroke={COLORS.ink} strokeWidth={2.4} />
          <rect x={-16} y={20} width={9} height={16} rx={3} fill={COLORS.coralDark} stroke={COLORS.ink} strokeWidth={2.4} />
          <rect x={7} y={20} width={9} height={16} rx={3} fill={COLORS.coralDark} stroke={COLORS.ink} strokeWidth={2.4} />
          <rect x={23} y={20} width={9} height={16} rx={3} fill={COLORS.coralDark} stroke={COLORS.ink} strokeWidth={2.4} />

          {/* Left stubby arm */}
          <rect
            x={-48}
            y={-4}
            width={12}
            height={11}
            rx={4}
            fill={COLORS.coral}
            stroke={COLORS.ink}
            strokeWidth={2.4}
          />

          {/* Right arm (normal or raised wave when not reaching) */}
          {(!reachTarget || armExtend <= 0.04) && !celebrateWave && (
            <rect
              x={36}
              y={-4}
              width={12}
              height={11}
              rx={4}
              fill={COLORS.coral}
              stroke={COLORS.ink}
              strokeWidth={2.4}
            />
          )}

          {celebrateWave && (
            <g transform={`rotate(${Math.sin(frame * 0.4) * 10} 36 0)`}>
              <path
                d="M36 0 L48 -24"
                stroke={COLORS.ink}
                strokeWidth={12}
                strokeLinecap="round"
              />
              <path
                d="M36 0 L48 -24"
                stroke={COLORS.coral}
                strokeWidth={7.5}
                strokeLinecap="round"
              />
              <path
                d="M54 -36 L56 -30 L62 -28 L56 -26 L54 -20 L52 -26 L46 -28 L52 -30 Z"
                fill="#FFFDF0"
                stroke={COLORS.ink}
                strokeWidth={1.6}
              />
            </g>
          )}

          {/* Main Rectangular Terracotta Body with painted bevel highlight & bottom shade */}
          <defs>
            <linearGradient id="mascotBodyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E17D67" />
              <stop offset="68%" stopColor={COLORS.coral} />
              <stop offset="100%" stopColor="#BE5A45" />
            </linearGradient>
          </defs>
          <rect
            x={-38}
            y={-26}
            width={76}
            height={50}
            rx={7}
            fill="url(#mascotBodyGrad)"
            stroke={COLORS.ink}
            strokeWidth={2.8}
          />
          <line
            x1={-31}
            y1={-21}
            x2={29}
            y2={-21}
            stroke="#F6AA98"
            strokeWidth={2.4}
            strokeLinecap="round"
            opacity={0.7}
          />

          {/* Faces by mood */}
          {mood === 'sleep' && (
            <>
              <line x1={-16} y1={-4} x2={-8} y2={-4} stroke={COLORS.ink} strokeWidth={2.8} strokeLinecap="round" />
              <line x1={8} y1={-4} x2={16} y2={-4} stroke={COLORS.ink} strokeWidth={2.8} strokeLinecap="round" />
              <circle
                cx={2}
                cy={12}
                r={6 + Math.sin(frame * 0.25) * 2}
                fill="#E7F4FC"
                stroke={COLORS.ink}
                strokeWidth={1.8}
                opacity={0.9}
              />
            </>
          )}

          {mood === 'normal' && (
            isBlinking ? (
              <>
                <line x1={-16} y1={-4} x2={-8} y2={-4} stroke={COLORS.ink} strokeWidth={2.8} strokeLinecap="round" />
                <line x1={8} y1={-4} x2={16} y2={-4} stroke={COLORS.ink} strokeWidth={2.8} strokeLinecap="round" />
              </>
            ) : (
              <>
                <rect x={-14} y={-11} width={5} height={13} rx={2} fill={COLORS.ink} />
                <rect x={9} y={-11} width={5} height={13} rx={2} fill={COLORS.ink} />
              </>
            )
          )}

          {mood === 'happy' && (
            <>
              <path d="M-18 -3 Q-12 -12 -6 -3" fill="none" stroke={COLORS.ink} strokeWidth={3} strokeLinecap="round" />
              <path d="M6 -3 Q12 -12 18 -3" fill="none" stroke={COLORS.ink} strokeWidth={3} strokeLinecap="round" />
              <ellipse cx={-23} cy={6} rx={6} ry={3.5} fill="#F59BB3" opacity={0.8} />
              <ellipse cx={23} cy={6} rx={6} ry={3.5} fill="#F59BB3" opacity={0.8} />
            </>
          )}

          {mood === 'lookup' && (
            <>
              <circle cx={-12} cy={-5} r={7} fill="#FFF" stroke={COLORS.ink} strokeWidth={2} />
              <circle cx={-10} cy={-8} r={3} fill={COLORS.ink} />
              <circle cx={12} cy={-5} r={7} fill="#FFF" stroke={COLORS.ink} strokeWidth={2} />
              <circle cx={14} cy={-8} r={3} fill={COLORS.ink} />
            </>
          )}

          {mood === 'shocked' && (
            <>
              <path d="M-19 -10 L-9 -4 L-19 2" fill="none" stroke={COLORS.ink} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
              <path d="M19 -10 L9 -4 L19 2" fill="none" stroke={COLORS.ink} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
              <ellipse cx={0} cy={10} rx={5} ry={6} fill={COLORS.ink} />
            </>
          )}

          {mood === 'sweat' && (
            <>
              {isBlinking ? (
                <>
                  <line x1={-16} y1={-4} x2={-8} y2={-4} stroke={COLORS.ink} strokeWidth={2.6} strokeLinecap="round" />
                  <line x1={8} y1={-4} x2={16} y2={-4} stroke={COLORS.ink} strokeWidth={2.6} strokeLinecap="round" />
                </>
              ) : (
                <>
                  <rect x={-14} y={-9} width={5} height={11} rx={2} fill={COLORS.ink} />
                  <rect x={9} y={-9} width={5} height={11} rx={2} fill={COLORS.ink} />
                </>
              )}
              <path
                d={`M29 ${-18 + (frame % 16) * 0.65} Q35 -8 29 -4 Q23 -8 29 ${-18 + (frame % 16) * 0.65} Z`}
                fill="#7EC8F2"
                stroke={COLORS.ink}
                strokeWidth={1.6}
              />
            </>
          )}

          {mood === 'cool' && (
            <>
              <g transform="translate(0, -28)">
                <rect x={-26} y={-6} width={22} height={12} rx={3} fill="#1E1B18" stroke="#FFF" strokeWidth={1.2} />
                <rect x={4} y={-6} width={22} height={12} rx={3} fill="#1E1B18" stroke="#FFF" strokeWidth={1.2} />
                <line x1={-4} y1={-1} x2={4} y2={-1} stroke="#1E1B18" strokeWidth={3} />
                <line x1={-21} y1={-3} x2={-15} y2={2} stroke="#FFF" strokeWidth={1.6} opacity={0.65} />
                <line x1={9} y1={-3} x2={15} y2={2} stroke="#FFF" strokeWidth={1.6} opacity={0.65} />
              </g>
              <rect x={-14} y={-10} width={5} height={12} rx={2} fill={COLORS.ink} />
              <path d="M6 -3 Q12 -10 18 -3" fill="none" stroke={COLORS.ink} strokeWidth={3} strokeLinecap="round" />
              <ellipse cx={-23} cy={6} rx={6} ry={3.5} fill="#F59BB3" opacity={0.85} />
              <ellipse cx={23} cy={6} rx={6} ry={3.5} fill="#F59BB3" opacity={0.85} />
            </>
          )}

          {showQuestionMark && (
            <text
              x={0}
              y={-36 + Math.sin(frame * 0.4) * 3}
              textAnchor="middle"
              fontFamily={FONT_HAND}
              fontSize={28}
              fontWeight={900}
              fill={COLORS.yellow}
              stroke={COLORS.ink}
              strokeWidth={1.6}
            >
              ?
            </text>
          )}
        </svg>

        {speech && (
          <div
            style={{
              position: 'absolute',
              left: '50%',
              bottom: '92%',
              transform: 'translateX(-50%)',
              backgroundColor: '#FFFDF8',
              border: `2.2px solid ${COLORS.ink}`,
              borderRadius: 12,
              padding: '5px 12px',
              whiteSpace: 'nowrap',
              fontFamily: FONT_HAND,
              fontSize: 15,
              fontWeight: 800,
              color: COLORS.ink,
              boxShadow: '2px 3px 0 rgba(43,37,32,0.12)',
            }}
          >
            {speech}
          </div>
        )}
      </div>
    </div>
  );
};
