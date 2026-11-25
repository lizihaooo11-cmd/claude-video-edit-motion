import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, FONT_HAND } from '../theme';

export type PhoneScene =
  | 'black'
  | 'night'
  | 'ramen'
  | 'ramen_blur'
  | 'shiba'
  | 'disco';

interface PhonePreviewProps {
  scene: PhoneScene;
  subtitle?: string;
  subtitleTypo?: boolean;
  sparkleAmount?: number; // 0..100
  saturation?: number; // 100 normal, 200 fried
  zoomImpact?: number; // 0..100
  beatPulse?: number; // 0..1
  isPlaying?: boolean;
  showDouyinOverlay?: boolean;
  centerOverride?: {
    x?: number;
    y?: number;
    scale?: number;
  };
  transitionEffect?: 'none' | 'swirl' | 'flip' | 'zoom';
  transitionProgress?: number; // 0..1
}

export const PhonePreview: React.FC<PhonePreviewProps> = ({
  scene,
  subtitle,
  subtitleTypo = false,
  sparkleAmount = 0,
  saturation = 100,
  zoomImpact = 0,
  beatPulse = 0,
  isPlaying = false,
  showDouyinOverlay = false,
  centerOverride,
  transitionEffect = 'none',
  transitionProgress = 0,
}) => {
  const frame = useCurrentFrame();

  const isFried = saturation >= 175;
  const satFilter = isFried
    ? `saturate(3.8) contrast(1.45) hue-rotate(${(frame * 14) % 360}deg)`
    : `saturate(${saturation / 100})`;

  const zoomScale =
    1 + (zoomImpact / 100) * 0.14 * Math.abs(Math.sin(frame * 0.42)) + beatPulse * 0.08;

  let trTransform = `scale(${zoomScale})`;
  if (transitionEffect === 'swirl' && transitionProgress > 0 && transitionProgress < 1) {
    const p = Math.sin(transitionProgress * Math.PI);
    trTransform = `scale(${1 + p * 0.25}) rotate(${p * 180}deg)`;
  } else if (transitionEffect === 'flip' && transitionProgress > 0 && transitionProgress < 1) {
    const p = Math.sin(transitionProgress * Math.PI);
    trTransform = `scaleX(${1 - p * 0.78})`;
  } else if (transitionEffect === 'zoom' && transitionProgress > 0 && transitionProgress < 1) {
    const p = Math.sin(transitionProgress * Math.PI);
    trTransform = `scale(${1 + p * 0.4})`;
  }

  const left = centerOverride?.x ?? 542;
  const top = centerOverride?.y ?? 70;
  const outerScale = centerOverride?.scale ?? 1;

  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width: 196,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transform: `scale(${outerScale})`,
        transformOrigin: 'center center',
      }}
    >
      {/* Smartphone Body */}
      <div
        style={{
          width: 196,
          height: 300,
          borderRadius: 28,
          backgroundColor: '#24201E',
          border: `3px solid ${COLORS.ink}`,
          padding: 7,
          boxSizing: 'border-box',
          boxShadow: '0 8px 20px rgba(43,37,32,0.16)',
          position: 'relative',
        }}
      >
        {/* Side Buttons */}
        <div
          style={{
            position: 'absolute',
            left: -4,
            top: 62,
            width: 3,
            height: 22,
            backgroundColor: COLORS.ink,
            borderRadius: 2,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: -4,
            top: 94,
            width: 3,
            height: 28,
            backgroundColor: COLORS.ink,
            borderRadius: 2,
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: -4,
            top: 84,
            width: 3,
            height: 36,
            backgroundColor: COLORS.ink,
            borderRadius: 2,
          }}
        />

        {/* Inner Screen */}
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 21,
            overflow: 'hidden',
            backgroundColor: '#201E1D',
            position: 'relative',
          }}
        >
          {/* Animated Scene Layer */}
          <div
            style={{
              width: '100%',
              height: '100%',
              transform: trTransform,
              filter: satFilter,
            }}
          >
            {scene === 'black' && (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(145deg, #2B2826 0%, #1F1C1A 100%)',
                }}
              />
            )}

            {scene === 'night' && (
              <svg width="100%" height="100%" viewBox="0 0 182 286">
                <defs>
                  <linearGradient id="nightGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B4177" />
                    <stop offset="100%" stopColor="#1D2247" />
                  </linearGradient>
                </defs>
                <rect width={182} height={286} fill="url(#nightGrad)" />
                {/* Twinkling stars */}
                {[
                  [28, 42],
                  [62, 68],
                  [145, 48],
                  [38, 108],
                  [118, 92],
                  [156, 118],
                  [88, 44],
                ].map(([cx, cy], idx) => (
                  <circle
                    key={idx}
                    cx={cx}
                    cy={cy}
                    r={1.6 + Math.sin(frame * 0.25 + idx) * 0.8}
                    fill="#FFF7C8"
                  />
                ))}
                {/* Crescent Moon */}
                <g transform={`translate(122, 68) rotate(${Math.sin(frame * 0.08) * 5})`}>
                  <circle cx={0} cy={0} r={19} fill="#FCE36D" stroke={COLORS.ink} strokeWidth={2} />
                  <circle cx={8} cy={-5} r={16} fill="#33396B" />
                </g>
                {/* City Skyline */}
                <g transform={`translate(${Math.sin(frame * 0.05) * 3}, 0)`}>
                  <rect x={-4} y={168} width={34} height={122} fill="#1E2346" stroke="#12162E" strokeWidth={2} />
                  <rect x={28} y={142} width={38} height={148} fill="#252C5A" stroke="#12162E" strokeWidth={2} />
                  <rect x={64} y={176} width={30} height={114} fill="#1B2040" stroke="#12162E" strokeWidth={2} />
                  <rect x={92} y={136} width={42} height={154} fill="#272F5F" stroke="#12162E" strokeWidth={2} />
                  <rect x={132} y={162} width={32} height={128} fill="#1E2346" stroke="#12162E" strokeWidth={2} />
                  <rect x={160} y={150} width={28} height={140} fill="#242B58" stroke="#12162E" strokeWidth={2} />
                  {/* Glowing windows */}
                  {[
                    [8, 182],
                    [18, 182],
                    [8, 202],
                    [38, 158],
                    [50, 158],
                    [38, 178],
                    [50, 198],
                    [72, 192],
                    [102, 152],
                    [116, 152],
                    [102, 174],
                    [116, 196],
                    [142, 178],
                    [142, 202],
                    [168, 168],
                  ].map(([wx, wy], i) => (
                    <rect
                      key={i}
                      x={wx}
                      y={wy}
                      width={7}
                      height={10}
                      rx={1}
                      fill={(i + Math.floor(frame / 10)) % 5 === 0 ? '#8490C7' : '#FCE36D'}
                    />
                  ))}
                </g>
              </svg>
            )}

            {(scene === 'ramen' || scene === 'ramen_blur') && (
              <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 182 286"
                  style={{
                    filter: scene === 'ramen_blur' ? 'blur(6px) grayscale(0.75)' : 'none',
                  }}
                >
                  <rect width={182} height={286} fill="#F5E4B8" />
                  {/* Top Blue Ramen Sign */}
                  <rect
                    x={22}
                    y={14}
                    width={138}
                    height={46}
                    rx={6}
                    fill="#3E5C8A"
                    stroke={COLORS.ink}
                    strokeWidth={2.5}
                  />
                  <text
                    x={91}
                    y={46}
                    textAnchor="middle"
                    fontFamily={FONT_HAND}
                    fontSize={24}
                    fontWeight={900}
                    fill="#FFF9EB"
                    letterSpacing={6}
                  >
                    拉面
                  </text>
                  {/* Steam wisps */}
                  {[48, 86, 124].map((sx, i) => (
                    <path
                      key={i}
                      d={`M${sx} ${156 - ((frame * 2 + i * 14) % 24)} Q${sx - 8} ${138 - ((frame * 2 + i * 14) % 24)} ${sx + 4} ${122 - ((frame * 2 + i * 14) % 24)}`}
                      fill="none"
                      stroke="#FFFDF6"
                      strokeWidth={3.5}
                      strokeLinecap="round"
                      opacity={0.75}
                    />
                  ))}
                  {/* Ramen Bowl */}
                  <path
                    d="M24 184 Q24 252 91 252 Q158 252 158 184 Z"
                    fill="#FFFBF0"
                    stroke={COLORS.ink}
                    strokeWidth={3}
                  />
                  {/* Bowl Pattern */}
                  <path
                    d="M36 208 Q91 224 146 208"
                    fill="none"
                    stroke="#D95D4E"
                    strokeWidth={3}
                    strokeDasharray="8 6"
                  />
                  <ellipse
                    cx={91}
                    cy={184}
                    rx={67}
                    ry={22}
                    fill="#E3AC5C"
                    stroke={COLORS.ink}
                    strokeWidth={3}
                  />
                  {/* Toppings: Nori, Egg, Narutomaki */}
                  <rect
                    x={38}
                    y={150}
                    width={24}
                    height={26}
                    rx={2}
                    fill="#263228"
                    stroke={COLORS.ink}
                    strokeWidth={2}
                    transform="rotate(-10 50 163)"
                  />
                  <ellipse
                    cx={65}
                    cy={184}
                    rx={14}
                    ry={10}
                    fill="#FFF"
                    stroke={COLORS.ink}
                    strokeWidth={2}
                  />
                  <circle cx={65} cy={184} r={6} fill="#F4A836" />
                  <circle
                    cx={126}
                    cy={182}
                    r={12}
                    fill="#FFF"
                    stroke={COLORS.ink}
                    strokeWidth={2}
                  />
                  <path
                    d="M126 177 A5 5 0 1 1 121 182 A3 3 0 1 1 126 184"
                    fill="none"
                    stroke="#E86E7D"
                    strokeWidth={2}
                  />
                  {/* Chopsticks lifting noodles */}
                  <g transform={`translate(0, ${Math.sin(frame * 0.2) * 5})`}>
                    <path
                      d="M84 134 Q82 162 86 182 M92 134 Q96 162 91 184 M100 136 Q98 164 102 182"
                      stroke="#FBE396"
                      strokeWidth={4.5}
                      strokeLinecap="round"
                      fill="none"
                    />
                    <line
                      x1={80}
                      y1={134}
                      x2={166}
                      y2={74}
                      stroke="#60412B"
                      strokeWidth={5}
                      strokeLinecap="round"
                    />
                    <line
                      x1={86}
                      y1={142}
                      x2={172}
                      y2={88}
                      stroke="#60412B"
                      strokeWidth={5}
                      strokeLinecap="round"
                    />
                  </g>
                </svg>

                {/* Out of focus overlay */}
                {scene === 'ramen_blur' && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(130, 128, 122, 0.38)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10,
                    }}
                  >
                    <svg width={44} height={44} viewBox="0 0 44 44">
                      <circle
                        cx={22}
                        cy={22}
                        r={16}
                        fill="none"
                        stroke="rgba(255,255,255,0.35)"
                        strokeWidth={4}
                      />
                      <path
                        d="M22 6 A16 16 0 0 1 38 22"
                        fill="none"
                        stroke="#FFF"
                        strokeWidth={4}
                        strokeLinecap="round"
                        transform={`rotate(${(frame * 14) % 360} 22 22)`}
                      />
                    </svg>
                    <span
                      style={{
                        fontFamily: FONT_HAND,
                        fontSize: 18,
                        fontWeight: 800,
                        color: '#FFF',
                        textShadow: '0 2px 6px rgba(0,0,0,0.6)',
                      }}
                    >
                      对焦中...
                    </span>
                  </div>
                )}
              </div>
            )}

            {scene === 'shiba' && (
              <svg width="100%" height="100%" viewBox="0 0 182 286">
                <rect width={182} height={286} fill="#C8EFE2" />
                {/* Subtle polka dots */}
                {[
                  [26, 44],
                  [72, 32],
                  [148, 52],
                  [34, 118],
                  [152, 134],
                ].map(([dx, dy], i) => (
                  <circle key={i} cx={dx} cy={dy} r={6} fill="#D9F6EC" />
                ))}
                {/* Floating hearts */}
                <g transform={`translate(34, ${82 + Math.sin(frame * 0.2) * 5})`}>
                  <path
                    d="M12 6 C12 0 22 0 22 7 C22 14 12 20 12 20 C12 20 2 14 2 7 C2 0 12 0 12 6 Z"
                    fill="#F07394"
                    stroke={COLORS.ink}
                    strokeWidth={2}
                  />
                </g>
                <g transform={`translate(132, ${96 + Math.cos(frame * 0.22) * 5}) scale(0.85)`}>
                  <path
                    d="M12 6 C12 0 22 0 22 7 C22 14 12 20 12 20 C12 20 2 14 2 7 C2 0 12 0 12 6 Z"
                    fill="#F07394"
                    stroke={COLORS.ink}
                    strokeWidth={2}
                  />
                </g>

                {/* Shiba Body */}
                <g transform={`translate(0, ${Math.sin(frame * 0.25) * 4})`}>
                  {/* Tail wagging */}
                  <ellipse
                    cx={146}
                    cy={218}
                    rx={16}
                    ry={10}
                    fill="#D98344"
                    stroke={COLORS.ink}
                    strokeWidth={2.5}
                    transform={`rotate(${-25 + Math.sin(frame * 0.5) * 18} 146 218)`}
                  />
                  {/* Torso */}
                  <path
                    d="M34 286 L42 204 Q91 186 140 204 L148 286 Z"
                    fill="#D98344"
                    stroke={COLORS.ink}
                    strokeWidth={3}
                  />
                  <ellipse cx={91} cy={246} rx={36} ry={34} fill="#FFF8EE" />
                  {/* Ears */}
                  <path
                    d="M44 124 L52 78 L80 112 Z"
                    fill="#D98344"
                    stroke={COLORS.ink}
                    strokeWidth={3}
                    strokeLinejoin="round"
                  />
                  <path d="M52 118 L57 90 L73 110 Z" fill="#F5B8B8" />
                  <path
                    d="M138 124 L130 78 L102 112 Z"
                    fill="#D98344"
                    stroke={COLORS.ink}
                    strokeWidth={3}
                    strokeLinejoin="round"
                  />
                  <path d="M130 118 L125 90 L109 110 Z" fill="#F5B8B8" />
                  {/* Head */}
                  <ellipse
                    cx={91}
                    cy={152}
                    rx={52}
                    ry={45}
                    fill="#D98344"
                    stroke={COLORS.ink}
                    strokeWidth={3}
                  />
                  {/* Cream cheeks */}
                  <ellipse cx={91} cy={168} rx={44} ry={28} fill="#FFF8EE" />
                  {/* Eyebrow dots */}
                  <ellipse cx={72} cy={134} rx={5} ry={3} fill="#FFF8EE" />
                  <ellipse cx={110} cy={134} rx={5} ry={3} fill="#FFF8EE" />
                  {/* Happy eyes */}
                  <path
                    d="M64 150 Q70 142 76 150"
                    fill="none"
                    stroke={COLORS.ink}
                    strokeWidth={3}
                    strokeLinecap="round"
                  />
                  <path
                    d="M106 150 Q112 142 118 150"
                    fill="none"
                    stroke={COLORS.ink}
                    strokeWidth={3}
                    strokeLinecap="round"
                  />
                  {/* Blush */}
                  <ellipse cx={58} cy={164} rx={9} ry={5} fill="#F7A7B8" opacity={0.7} />
                  <ellipse cx={124} cy={164} rx={9} ry={5} fill="#F7A7B8" opacity={0.7} />
                  {/* Nose & smile */}
                  <ellipse cx={91} cy={160} rx={5} ry={3.5} fill={COLORS.ink} />
                  <path
                    d="M84 166 Q91 174 98 166"
                    fill="none"
                    stroke={COLORS.ink}
                    strokeWidth={2.6}
                    strokeLinecap="round"
                  />
                  {/* Red Collar + Bell */}
                  <path
                    d="M52 196 Q91 208 130 196"
                    fill="none"
                    stroke="#D94A4A"
                    strokeWidth={9}
                    strokeLinecap="round"
                  />
                  <circle cx={91} cy={208} r={7} fill="#F5CA4E" stroke={COLORS.ink} strokeWidth={2} />
                </g>
              </svg>
            )}

            {scene === 'disco' && (
              <svg width="100%" height="100%" viewBox="0 0 182 286">
                <defs>
                  <linearGradient id="discoSky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6E62B6" />
                    <stop offset="65%" stopColor="#8E79CC" />
                    <stop offset="100%" stopColor="#353166" />
                  </linearGradient>
                </defs>
                <rect width={182} height={286} fill="url(#discoSky)" />

                {/* Perspective checkered dance floor */}
                <polygon points="0,192 182,192 182,286 0,286" fill="#2E2B5C" />
                {[0, 1, 2, 3, 4].map((row) =>
                  [0, 1, 2, 3, 4, 5].map((col) => {
                    const y1 = 192 + row * 19;
                    const y2 = y1 + 19;
                    const spread1 = 1 + row * 0.25;
                    const spread2 = 1 + (row + 1) * 0.25;
                    const cx = 91;
                    const w = 32;
                    const x1L = cx + (col - 3) * w * spread1;
                    const x1R = cx + (col - 2) * w * spread1;
                    const x2L = cx + (col - 3) * w * spread2;
                    const x2R = cx + (col - 2) * w * spread2;
                    const lit = (row + col + Math.floor(frame / 4)) % 3 === 0;
                    const palette = ['#56C5E5', '#F47EA8', '#F5CA4E', '#6764B5'];
                    const fill = lit ? palette[(row + col) % palette.length] : '#393670';
                    return (
                      <polygon
                        key={`${row}-${col}`}
                        points={`${x1L},${y1} ${x1R},${y1} ${x2R},${y2} ${x2L},${y2}`}
                        fill={fill}
                        stroke="#24214A"
                        strokeWidth={1}
                        opacity={0.9}
                      />
                    );
                  })
                )}

                {/* Disco ball */}
                <line x1={91} y1={0} x2={91} y2={38} stroke={COLORS.ink} strokeWidth={2.5} />
                <g transform={`translate(91, 56)`}>
                  <circle cx={0} cy={0} r={20} fill="#DCE3FF" stroke={COLORS.ink} strokeWidth={2.5} />
                  <ellipse cx={0} cy={0} rx={10} ry={20} fill="none" stroke="#8C99CC" strokeWidth={1.5} />
                  <line x1={-20} y1={0} x2={20} y2={0} stroke="#8C99CC" strokeWidth={1.5} />
                  <rect
                    x={-6 + Math.sin(frame * 0.3) * 8}
                    y={-8}
                    width={6}
                    height={6}
                    fill="#FFF"
                  />
                  <rect
                    x={2 - Math.sin(frame * 0.3) * 7}
                    y={4}
                    width={5}
                    height={5}
                    fill="#FCE36D"
                  />
                </g>

                {/* Radial speed lines when zoomImpact > 20 */}
                {zoomImpact > 20 && (
                  <g opacity={0.45}>
                    {Array.from({ length: 12 }).map((_, i) => {
                      const ang = (i * Math.PI * 2) / 12 + frame * 0.04;
                      const x1 = 91 + Math.cos(ang) * 58;
                      const y1 = 155 + Math.sin(ang) * 75;
                      const x2 = 91 + Math.cos(ang) * 130;
                      const y2 = 155 + Math.sin(ang) * 160;
                      return (
                        <line
                          key={i}
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke="#FFFDF0"
                          strokeWidth={2.2}
                        />
                      );
                    })}
                  </g>
                )}

                {/* Dancing 小克 mascot */}
                <g
                  transform={`translate(91, ${172 - Math.abs(Math.sin(frame * 0.32)) * 14}) rotate(${Math.sin(frame * 0.32) * 8})`}
                >
                  {/* Legs */}
                  <rect x={-26} y={24} width={11} height={18} rx={3} fill={COLORS.coralDark} stroke={COLORS.ink} strokeWidth={2.4} />
                  <rect x={15} y={24} width={11} height={18} rx={3} fill={COLORS.coralDark} stroke={COLORS.ink} strokeWidth={2.4} />
                  {/* Raised arms */}
                  <path
                    d={`M-34 -2 L-48 ${-24 + Math.sin(frame * 0.4) * 8}`}
                    stroke={COLORS.ink}
                    strokeWidth={11}
                    strokeLinecap="round"
                  />
                  <path
                    d={`M-34 -2 L-48 ${-24 + Math.sin(frame * 0.4) * 8}`}
                    stroke={COLORS.coral}
                    strokeWidth={6.5}
                    strokeLinecap="round"
                  />
                  <path
                    d={`M34 -2 L48 ${-24 - Math.sin(frame * 0.4) * 8}`}
                    stroke={COLORS.ink}
                    strokeWidth={11}
                    strokeLinecap="round"
                  />
                  <path
                    d={`M34 -2 L48 ${-24 - Math.sin(frame * 0.4) * 8}`}
                    stroke={COLORS.coral}
                    strokeWidth={6.5}
                    strokeLinecap="round"
                  />
                  {/* Body */}
                  <rect
                    x={-36}
                    y={-28}
                    width={72}
                    height={56}
                    rx={8}
                    fill={COLORS.coral}
                    stroke={COLORS.ink}
                    strokeWidth={3}
                  />
                  {/* Happy ^ ^ eyes */}
                  <path d="M-18 -4 Q-12 -12 -6 -4" fill="none" stroke={COLORS.ink} strokeWidth={3} strokeLinecap="round" />
                  <path d="M6 -4 Q12 -12 18 -4" fill="none" stroke={COLORS.ink} strokeWidth={3} strokeLinecap="round" />
                  <ellipse cx={-22} cy={6} rx={6} ry={3.5} fill="#F59BB3" opacity={0.75} />
                  <ellipse cx={22} cy={6} rx={6} ry={3.5} fill="#F59BB3" opacity={0.75} />
                </g>
              </svg>
            )}
          </div>

          {/* Sparkles overlay from 闪光 slider */}
          {sparkleAmount > 15 && (
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 182 286"
              style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
            >
              {[
                [26, 72, 1],
                [148, 64, 0.85],
                [38, 178, 0.75],
                [152, 198, 1.05],
                [124, 118, 0.65],
              ].map(([sx, sy, sc], idx) => {
                const twinkle = 0.55 + 0.45 * Math.sin(frame * 0.35 + idx * 1.4);
                const size = sc * (sparkleAmount / 80) * twinkle;
                return (
                  <g
                    key={idx}
                    transform={`translate(${sx}, ${sy}) scale(${size})`}
                  >
                    <path
                      d="M0 -12 L3 -3 L12 0 L3 3 L0 12 L-3 3 L-12 0 L-3 -3 Z"
                      fill="#FFFDF0"
                      stroke={COLORS.ink}
                      strokeWidth={1.5}
                    />
                  </g>
                );
              })}
            </svg>
          )}

          {/* Subtitle overlay */}
          {subtitle && (
            <div
              style={{
                position: 'absolute',
                left: 6,
                right: 6,
                bottom: showDouyinOverlay ? 156 : 56,
                textAlign: 'center',
                pointerEvents: 'none',
              }}
            >
              <span
                style={{
                  fontFamily: FONT_HAND,
                  fontSize: showDouyinOverlay ? 30 : 21,
                  fontWeight: 900,
                  color: COLORS.yellow,
                  WebkitTextStroke: `1.8px ${COLORS.ink}`,
                  textShadow: `2px 2px 0 ${COLORS.ink}`,
                  letterSpacing: 1,
                }}
              >
                {subtitle}
              </span>
              {subtitleTypo && (
                <div
                  style={{
                    position: 'absolute',
                    right: 16,
                    bottom: -4,
                    width: 22,
                    height: 5,
                    borderBottom: `2.5px wavy ${COLORS.red}`,
                  }}
                />
              )}
            </div>
          )}

          {/* Douyin / Short-video Showcase Overlay (Outro) */}
          {showDouyinOverlay && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
              }}
            >
              {/* Right action icons */}
              <div
                style={{
                  position: 'absolute',
                  right: 8,
                  bottom: 66,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    backgroundColor: COLORS.coral,
                    border: `2px solid #FFF`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  <span style={{ color: COLORS.ink, fontSize: 10, fontWeight: 900 }}>||</span>
                  <span
                    style={{
                      position: 'absolute',
                      bottom: -5,
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: '#EF476F',
                      color: '#FFF',
                      fontSize: 10,
                      lineHeight: '11px',
                      textAlign: 'center',
                      fontWeight: 900,
                    }}
                  >
                    +
                  </span>
                </div>

                {/* Heart */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 18, lineHeight: 1 }}>🩷</div>
                  <div style={{ fontFamily: FONT_HAND, fontSize: 9, color: '#FFF', fontWeight: 700, textShadow: '0 1px 2px #000' }}>
                    10.2w
                  </div>
                </div>
                {/* Comment */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 16, lineHeight: 1 }}>💬</div>
                  <div style={{ fontFamily: FONT_HAND, fontSize: 9, color: '#FFF', fontWeight: 700, textShadow: '0 1px 2px #000' }}>
                    2333
                  </div>
                </div>
                {/* Share */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 16, lineHeight: 1 }}>↪️</div>
                  <div style={{ fontFamily: FONT_HAND, fontSize: 9, color: '#FFF', fontWeight: 700, textShadow: '0 1px 2px #000' }}>
                    分享
                  </div>
                </div>
              </div>

              {/* Bottom author caption */}
              <div
                style={{
                  position: 'absolute',
                  left: 10,
                  right: 42,
                  bottom: 10,
                  color: '#FFF',
                  fontFamily: FONT_HAND,
                  textShadow: '0 1px 3px rgba(0,0,0,0.85)',
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 800 }}>@小克 · Opus 5.5</div>
                <div style={{ fontSize: 9, opacity: 0.92, marginTop: 2 }}>
                  #AI剪辑 #卡点 #code2video
                </div>
              </div>
            </div>
          )}

          {/* Dynamic Island Notch */}
          <div
            style={{
              position: 'absolute',
              top: 7,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 34,
              height: 9,
              borderRadius: 6,
              backgroundColor: '#181513',
            }}
          />
        </div>
      </div>

      {/* Transport Controls under Phone */}
      {!showDouyinOverlay && (
        <div
          style={{
            marginTop: 7,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            color: COLORS.ink,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 900 }}>|◀</span>
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              border: `2px solid ${COLORS.ink}`,
              backgroundColor: COLORS.panelBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 10,
              fontWeight: 900,
            }}
          >
            {isPlaying ? '❚❚' : '▶'}
          </div>
          <span style={{ fontSize: 13, fontWeight: 900 }}>▶|</span>
        </div>
      )}
    </div>
  );
};
