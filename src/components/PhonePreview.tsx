import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, FONT_HAND } from '../theme';
import { CommentIcon, HeartIcon, ShareIcon } from './HandIcons';

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
      {/* Smartphone Body with subtle glossy bezel highlight */}
      <div
        style={{
          width: 196,
          height: 300,
          borderRadius: 28,
          background: 'linear-gradient(145deg, #322E2B 0%, #1E1B19 55%, #2B2724 100%)',
          border: `3px solid ${COLORS.ink}`,
          padding: 7,
          boxSizing: 'border-box',
          boxShadow: '0 10px 24px rgba(43,37,32,0.22)',
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
                  background:
                    'linear-gradient(135deg, #33302E 0%, #24211F 48%, #2C2927 52%, #1C1A18 100%)',
                }}
              />
            )}

            {/* 1. 夜景.mp4 — Multi-layer atmospheric night skyline with moon halo, red beacons & depth */}
            {scene === 'night' && (
              <svg width="100%" height="100%" viewBox="0 0 182 286">
                <defs>
                  <linearGradient id="nightSkyV4" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#262A53" />
                    <stop offset="52%" stopColor="#434A80" />
                    <stop offset="100%" stopColor="#6B6DA4" />
                  </linearGradient>
                  <radialGradient id="moonHalo" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFF4B8" stopOpacity="0.55" />
                    <stop offset="60%" stopColor="#FCE36D" stopOpacity="0.16" />
                    <stop offset="100%" stopColor="#FCE36D" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <rect width={182} height={286} fill="url(#nightSkyV4)" />

                {/* Soft atmospheric cloud bands */}
                <ellipse cx={42} cy={124} rx={52} ry={14} fill="#5B6198" opacity={0.35} />
                <ellipse cx={146} cy={108} rx={48} ry={12} fill="#5B6198" opacity={0.3} />

                {/* Twinkling 4-point stars + micro dots */}
                {[
                  [26, 48, 0.9],
                  [64, 78, 1.1],
                  [148, 52, 0.8],
                  [112, 128, 1.2],
                  [42, 98, 0.7],
                ].map(([sx, sy, sc], idx) => {
                  const tw = 0.65 + 0.35 * Math.sin(frame * 0.25 + idx * 1.3);
                  return (
                    <path
                      key={`st-${idx}`}
                      d="M0 -6 L1.4 -1.4 L6 0 L1.4 1.4 L0 6 L-1.4 1.4 L-6 0 L-1.4 -1.4 Z"
                      fill="#FFF8D0"
                      transform={`translate(${sx}, ${sy}) scale(${sc * tw})`}
                    />
                  );
                })}
                {[
                  [18, 28],
                  [84, 34],
                  [132, 32],
                  [164, 88],
                  [78, 114],
                  [22, 134],
                ].map(([cx, cy], i) => (
                  <circle key={`d-${i}`} cx={cx} cy={cy} r={1.2} fill="#FFF5C8" opacity={0.75} />
                ))}

                {/* Crescent Moon with warm halo */}
                <circle cx={124} cy={72} r={44} fill="url(#moonHalo)" />
                <g transform={`translate(124, 72) rotate(${Math.sin(frame * 0.08) * 4})`}>
                  <path
                    d="M -4 -20 A 20 20 0 1 0 18 10 A 15 15 0 1 1 -4 -20 Z"
                    fill="#FDE267"
                    stroke={COLORS.ink}
                    strokeWidth={2}
                    strokeLinejoin="round"
                  />
                  {/* Subtle crescent inner shading */}
                  <path
                    d="M -6 -12 A 16 16 0 0 0 8 11"
                    fill="none"
                    stroke="#E8B93C"
                    strokeWidth={2}
                    strokeLinecap="round"
                    opacity={0.7}
                  />
                </g>

                {/* Far background hazy skyline (parallax slower) */}
                <g transform={`translate(${Math.sin(frame * 0.04) * 1.8}, 0)`} opacity={0.85}>
                  <rect x={-4} y={148} width={28} height={140} fill="#383E70" stroke="#22264B" strokeWidth={1.6} />
                  <rect x={22} y={132} width={26} height={156} fill="#3D4478" stroke="#22264B" strokeWidth={1.6} />
                  <rect x={46} y={144} width={32} height={144} fill="#363C6C" stroke="#22264B" strokeWidth={1.6} />
                  <rect x={76} y={136} width={28} height={152} fill="#3F467C" stroke="#22264B" strokeWidth={1.6} />
                  <rect x={102} y={142} width={34} height={146} fill="#383E70" stroke="#22264B" strokeWidth={1.6} />
                  <rect x={134} y={130} width={26} height={158} fill="#3D4478" stroke="#22264B" strokeWidth={1.6} />
                  <rect x={158} y={140} width={28} height={148} fill="#363C6C" stroke="#22264B" strokeWidth={1.6} />
                  {/* Rooftop antenna + blinking red beacon */}
                  <line x1={90} y1={122} x2={90} y2={136} stroke="#22264B" strokeWidth={1.8} />
                  <circle
                    cx={90}
                    cy={121}
                    r={2.4}
                    fill="#FF5C5C"
                    opacity={Math.floor(frame / 12) % 2 === 0 ? 1 : 0.25}
                  />
                </g>

                {/* Foreground detailed dark skyscrapers */}
                <g transform={`translate(${Math.sin(frame * 0.04) * 3.5}, 0)`}>
                  {[
                    { x: -2, y: 176, w: 30, h: 112, c: '#22264A' },
                    { x: 26, y: 162, w: 32, h: 126, c: '#282E58' },
                    { x: 56, y: 186, w: 28, h: 102, c: '#1F2446' },
                    { x: 82, y: 158, w: 36, h: 130, c: '#2A315E' },
                    { x: 116, y: 174, w: 32, h: 114, c: '#22264A' },
                    { x: 146, y: 164, w: 38, h: 124, c: '#272D56' },
                  ].map((b, bi) => (
                    <g key={bi}>
                      <rect
                        x={b.x}
                        y={b.y}
                        width={b.w}
                        height={b.h}
                        fill={b.c}
                        stroke="#151833"
                        strokeWidth={2}
                      />
                      {/* Warm lit window grid */}
                      {[0, 1, 2, 3, 4, 5].map((row) =>
                        [0, 1, 2].map((col) => {
                          const wx = b.x + 5 + col * 8;
                          const wy = b.y + 8 + row * 15;
                          if (wx + 5 > b.x + b.w - 2 || wy + 8 > 282) return null;
                          const seed = (bi * 17 + row * 7 + col * 11) % 7;
                          const lit = seed < 4 && (seed + Math.floor(frame / 18)) % 5 !== 0;
                          if (!lit) return null;
                          return (
                            <rect
                              key={`${row}-${col}`}
                              x={wx}
                              y={wy}
                              width={5.5}
                              height={8}
                              rx={1}
                              fill={seed === 0 ? '#FFE58F' : '#F6C94E'}
                            />
                          );
                        })
                      )}
                    </g>
                  ))}
                </g>
              </svg>
            )}

            {/* 2. 拉面.mp4 — Authentic Japanese ramen shop: noren curtain, wooden counter, key-fret bowl, rich toppings */}
            {(scene === 'ramen' || scene === 'ramen_blur') && (
              <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 182 286"
                  style={{
                    filter: scene === 'ramen_blur' ? 'blur(6px) grayscale(0.72)' : 'none',
                  }}
                >
                  <defs>
                    <linearGradient id="wallWarm" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F4E6BE" />
                      <stop offset="100%" stopColor="#ECD9A6" />
                    </linearGradient>
                    <linearGradient id="woodTable" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#DEB078" />
                      <stop offset="100%" stopColor="#C89358" />
                    </linearGradient>
                    <radialGradient id="brothGrad" cx="50%" cy="45%" r="55%">
                      <stop offset="0%" stopColor="#C98A3E" />
                      <stop offset="70%" stopColor="#A66B2B" />
                      <stop offset="100%" stopColor="#7C4D1E" />
                    </radialGradient>
                  </defs>

                  {/* Warm izakaya wall */}
                  <rect width={182} height={212} fill="url(#wallWarm)" />
                  {/* Wooden counter table with subtle grain */}
                  <rect y={210} width={182} height={76} fill="url(#woodTable)" />
                  <line x1={0} y1={210} x2={182} y2={210} stroke={COLORS.ink} strokeWidth={2.4} />
                  <line x1={12} y1={234} x2={170} y2={234} stroke="#B88248" strokeWidth={1.2} opacity={0.55} />
                  <line x1={28} y1={262} x2={156} y2={262} stroke="#B88248" strokeWidth={1.2} opacity={0.55} />

                  {/* 4-Panel Japanese Noren Curtain at Top */}
                  {[
                    { x: 10, w: 38, txt: null },
                    { x: 52, w: 37, txt: '拉' },
                    { x: 93, w: 37, txt: '面' },
                    { x: 134, w: 38, txt: null },
                  ].map((p, idx) => (
                    <g key={idx}>
                      <path
                        d={`M${p.x} 0 L${p.x + p.w} 0 L${p.x + p.w} 46 Q${p.x + p.w / 2} 50 ${p.x} 46 Z`}
                        fill="#3B5582"
                        stroke={COLORS.ink}
                        strokeWidth={2}
                      />
                      {p.txt ? (
                        <text
                          x={p.x + p.w / 2}
                          y={35}
                          textAnchor="middle"
                          fontFamily={FONT_HAND}
                          fontSize={22}
                          fontWeight={900}
                          fill="#FFFDF5"
                        >
                          {p.txt}
                        </text>
                      ) : (
                        <circle cx={p.x + p.w / 2} cy={28} r={5.5} fill="#FFFDF5" />
                      )}
                    </g>
                  ))}

                  {/* Soft rising steam plumes */}
                  {[54, 86, 118].map((sx, i) => {
                    const shift = (frame * 1.8 + i * 16) % 28;
                    return (
                      <path
                        key={i}
                        d={`M${sx} ${148 - shift} Q${sx - 9} ${130 - shift} ${sx + 3} ${112 - shift} Q${sx + 10} ${96 - shift} ${sx - 2} ${82 - shift}`}
                        fill="none"
                        stroke="#FFFDF6"
                        strokeWidth={4}
                        strokeLinecap="round"
                        opacity={0.62 - shift * 0.016}
                      />
                    );
                  })}

                  {/* Contact shadow on wooden counter */}
                  <ellipse cx={91} cy={246} rx={48} ry={9} fill="#8C5F30" opacity={0.42} />

                  {/* Ceramic Ramen Bowl Foot & Body */}
                  <path
                    d="M66 234 L69 245 Q91 249 113 245 L116 234 Z"
                    fill="#EFE6D5"
                    stroke={COLORS.ink}
                    strokeWidth={2.2}
                  />
                  <path
                    d="M20 174 Q22 238 91 238 Q160 238 162 174 Z"
                    fill="#FFFBF2"
                    stroke={COLORS.ink}
                    strokeWidth={2.6}
                  />
                  {/* Soft lower bowl shading */}
                  <path
                    d="M34 212 Q91 236 148 212 Q126 236 91 236 Q56 236 34 212 Z"
                    fill="#E5DCCB"
                    opacity={0.75}
                  />
                  {/* Traditional Red Key-Fret Band (回字纹) along upper bowl */}
                  <path
                    d="M25 186 Q91 206 157 186 L154 202 Q91 221 28 202 Z"
                    fill="#FDF3E7"
                    stroke="#C8463E"
                    strokeWidth={1.6}
                  />
                  {[36, 52, 68, 84, 100, 116, 132, 146].map((rx, i) => {
                    const ry = 194 + Math.sin(((rx - 25) / 132) * Math.PI) * 14;
                    return (
                      <rect
                        key={i}
                        x={rx - 4}
                        y={ry - 4}
                        width={8}
                        height={8}
                        fill="none"
                        stroke="#C8463E"
                        strokeWidth={1.5}
                      />
                    );
                  })}

                  {/* Bowl Rim & Rich Broth */}
                  <ellipse
                    cx={91}
                    cy={174}
                    rx={71}
                    ry={22}
                    fill="#FFFBF2"
                    stroke={COLORS.ink}
                    strokeWidth={2.6}
                  />
                  <ellipse
                    cx={91}
                    cy={175}
                    rx={64}
                    ry={17}
                    fill="url(#brothGrad)"
                    stroke={COLORS.ink}
                    strokeWidth={1.8}
                  />

                  {/* Rich Toppings */}
                  {/* Chashu pork slice */}
                  <ellipse cx={64} cy={170} rx={16} ry={10} fill="#B86B4B" stroke={COLORS.ink} strokeWidth={1.8} />
                  <ellipse cx={64} cy={170} rx={11} ry={6.5} fill="#E7A58C" />
                  <path d="M58 170 Q64 166 70 170" fill="none" stroke="#9C5035" strokeWidth={1.5} />

                  {/* Half-boiled Ajitama Egg */}
                  <ellipse cx={54} cy={182} rx={13} ry={9} fill="#FFFDF8" stroke={COLORS.ink} strokeWidth={1.8} />
                  <ellipse cx={54} cy={182} rx={7} ry={5} fill="#F29E2E" />
                  <circle cx={52} cy={180} r={1.8} fill="#FFE6A3" />

                  {/* Dark Nori Seaweed Sheet */}
                  <path
                    d="M104 148 L128 152 L124 176 L100 172 Z"
                    fill="#253127"
                    stroke={COLORS.ink}
                    strokeWidth={1.8}
                  />

                  {/* Pink-Swirl Narutomaki */}
                  <ellipse cx={126} cy={180} rx={12} ry={9} fill="#FFF" stroke={COLORS.ink} strokeWidth={1.8} />
                  <path
                    d="M126 176 A4.5 3.5 0 1 1 121.5 180 A2.5 2 0 1 1 126 181.5"
                    fill="none"
                    stroke="#E86E82"
                    strokeWidth={1.8}
                  />

                  {/* Green Scallions (葱花) */}
                  {[
                    [78, 184],
                    [84, 180],
                    [98, 186],
                    [108, 182],
                    [72, 176],
                  ].map(([gx, gy], i) => (
                    <ellipse
                      key={i}
                      cx={gx}
                      cy={gy}
                      rx={3.5}
                      ry={2}
                      fill="#5CA44E"
                      stroke="#2D5726"
                      strokeWidth={0.9}
                    />
                  ))}

                  {/* Tapered Wooden Chopsticks lifting layered wavy noodles */}
                  <g transform={`translate(0, ${Math.sin(frame * 0.2) * 5})`}>
                    {[82, 86, 90, 94, 98].map((nx, i) => (
                      <path
                        key={i}
                        d={`M${nx} 122 Q${nx - 2 + (i % 2) * 4} 150 ${nx + (i % 2 ? -2 : 2)} 180`}
                        stroke={i % 2 === 0 ? '#F9E294' : '#E5C569'}
                        strokeWidth={2.6}
                        strokeLinecap="round"
                        fill="none"
                      />
                    ))}
                    <polygon
                      points="88,120 182,58 182,66 91,124"
                      fill="#8B5E34"
                      stroke={COLORS.ink}
                      strokeWidth={1.6}
                    />
                    <polygon
                      points="91,126 182,72 182,80 94,130"
                      fill="#7A502B"
                      stroke={COLORS.ink}
                      strokeWidth={1.6}
                    />
                  </g>
                </svg>

                {/* Out of focus overlay */}
                {scene === 'ramen_blur' && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(120, 118, 112, 0.42)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10,
                    }}
                  >
                    <svg width={46} height={46} viewBox="0 0 46 46">
                      <circle
                        cx={23}
                        cy={23}
                        r={16}
                        fill="none"
                        stroke="rgba(255,255,255,0.35)"
                        strokeWidth={4}
                      />
                      <path
                        d="M23 7 A16 16 0 0 1 39 23"
                        fill="none"
                        stroke="#FFF"
                        strokeWidth={4}
                        strokeLinecap="round"
                        transform={`rotate(${(frame * 14) % 360} 23 23)`}
                      />
                    </svg>
                    <span
                      style={{
                        fontFamily: FONT_HAND,
                        fontSize: 19,
                        fontWeight: 800,
                        color: '#FFF',
                        textShadow: '0 2px 6px rgba(0,0,0,0.65)',
                      }}
                    >
                      对焦中...
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* 3. 柴犬.mov — Soft painted fur shading, gentle head sway, warm blush & bokeh */}
            {scene === 'shiba' && (
              <svg width="100%" height="100%" viewBox="0 0 182 286">
                <defs>
                  <radialGradient id="shibaBgGrad" cx="50%" cy="42%" r="65%">
                    <stop offset="0%" stopColor="#DDF7EE" />
                    <stop offset="100%" stopColor="#B8E7D7" />
                  </radialGradient>
                  <linearGradient id="shibaFur" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#DF8C49" />
                    <stop offset="100%" stopColor="#C46B2E" />
                  </linearGradient>
                  <radialGradient id="blushGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#F58DA8" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#F58DA8" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <rect width={182} height={286} fill="url(#shibaBgGrad)" />
                {/* Soft pastel bokeh circles */}
                {[
                  [28, 52, 12],
                  [152, 46, 15],
                  [34, 134, 9],
                  [156, 148, 11],
                ].map(([dx, dy, r], i) => (
                  <circle key={i} cx={dx} cy={dy} r={r} fill="#FFFFFF" opacity={0.32} />
                ))}

                {/* Floating Hand-drawn Heart */}
                <g transform={`translate(122, ${68 + Math.sin(frame * 0.22) * 5})`}>
                  <path
                    d="M12 6 C12 0 22 0 22 7 C22 14 12 20 12 20 C12 20 2 14 2 7 C2 0 12 0 12 6 Z"
                    fill="#F07394"
                    stroke={COLORS.ink}
                    strokeWidth={2.2}
                  />
                  <path d="M6 6 Q7 4 9 5" fill="none" stroke="#FFF" strokeWidth={1.6} strokeLinecap="round" />
                </g>

                {/* Shiba Body */}
                <g transform={`translate(0, ${Math.sin(frame * 0.22) * 3})`}>
                  {/* Wagging fluffy tail */}
                  <ellipse
                    cx={146}
                    cy={212}
                    rx={17}
                    ry={11}
                    fill="url(#shibaFur)"
                    stroke={COLORS.ink}
                    strokeWidth={2.4}
                    transform={`rotate(${-24 + Math.sin(frame * 0.5) * 16} 146 212)`}
                  />
                  {/* Torso with soft shading */}
                  <path
                    d="M28 286 L36 206 Q91 186 146 206 L154 286 Z"
                    fill="url(#shibaFur)"
                    stroke={COLORS.ink}
                    strokeWidth={2.8}
                  />
                  <ellipse cx={91} cy={250} rx={38} ry={36} fill="#FFF9F0" />

                  {/* Gently tilting Head */}
                  <g transform={`rotate(${Math.sin(frame * 0.14) * 3.5} 91 184)`}>
                    {/* Ears */}
                    <path
                      d="M42 128 L52 78 L80 112 Z"
                      fill="url(#shibaFur)"
                      stroke={COLORS.ink}
                      strokeWidth={2.8}
                      strokeLinejoin="round"
                    />
                    <path d="M50 120 L56 90 L72 110 Z" fill="#F5B4B4" />
                    <path
                      d="M140 128 L130 78 L102 112 Z"
                      fill="url(#shibaFur)"
                      stroke={COLORS.ink}
                      strokeWidth={2.8}
                      strokeLinejoin="round"
                    />
                    <path d="M132 120 L126 90 L110 110 Z" fill="#F5B4B4" />

                    {/* Head shape with soft cheek fluff */}
                    <ellipse
                      cx={91}
                      cy={152}
                      rx={53}
                      ry={45}
                      fill="url(#shibaFur)"
                      stroke={COLORS.ink}
                      strokeWidth={2.8}
                    />
                    {/* Cream mask */}
                    <path
                      d="M41 162 Q64 148 91 156 Q118 148 141 162 Q138 196 91 196 Q44 196 41 162 Z"
                      fill="#FFF9F0"
                    />
                    {/* Signature Shiba eyebrow dots */}
                    <ellipse cx={73} cy={135} rx={5.5} ry={3.2} fill="#FFF9F0" />
                    <ellipse cx={109} cy={135} rx={5.5} ry={3.2} fill="#FFF9F0" />
                    {/* Happy curved eyes */}
                    <path
                      d="M64 150 Q70 142 76 150"
                      fill="none"
                      stroke={COLORS.ink}
                      strokeWidth={2.8}
                      strokeLinecap="round"
                    />
                    <path
                      d="M106 150 Q112 142 118 150"
                      fill="none"
                      stroke={COLORS.ink}
                      strokeWidth={2.8}
                      strokeLinecap="round"
                    />
                    {/* Soft radial blush */}
                    <ellipse cx={58} cy={164} rx={13} ry={8} fill="url(#blushGlow)" />
                    <ellipse cx={124} cy={164} rx={13} ry={8} fill="url(#blushGlow)" />
                    {/* Shiny nose & mouth */}
                    <ellipse cx={91} cy={160} rx={5.5} ry={3.8} fill={COLORS.ink} />
                    <circle cx={89.5} cy={159} r={1.2} fill="#FFF" opacity={0.75} />
                    <path
                      d="M84 166 Q91 174 98 166"
                      fill="none"
                      stroke={COLORS.ink}
                      strokeWidth={2.5}
                      strokeLinecap="round"
                    />
                  </g>

                  {/* Red Collar with shadow & golden bell */}
                  <path
                    d="M50 198 Q91 212 132 198"
                    fill="none"
                    stroke="#A63232"
                    strokeWidth={11}
                    strokeLinecap="round"
                  />
                  <path
                    d="M50 196 Q91 210 132 196"
                    fill="none"
                    stroke="#DC4C4C"
                    strokeWidth={8}
                    strokeLinecap="round"
                  />
                  <circle cx={91} cy={210} r={7.5} fill="#F5CA4E" stroke={COLORS.ink} strokeWidth={2} />
                  <circle cx={89} cy={208} r={2} fill="#FFF6CC" />
                </g>
              </svg>
            )}

            {/* 4. 小克蹦迪.mp4 — Glowing disco ball, radial bokeh, rich perspective dance floor & floor reflection */}
            {scene === 'disco' && (
              <svg width="100%" height="100%" viewBox="0 0 182 286">
                <defs>
                  <linearGradient id="discoSkyV4" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5852A2" />
                    <stop offset="52%" stopColor="#8A70BC" />
                    <stop offset="100%" stopColor="#A676A8" />
                  </linearGradient>
                  <radialGradient id="discoGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
                    <stop offset="45%" stopColor="#D7DFFF" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#D7DFFF" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="xiaoKeBody" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E17C65" />
                    <stop offset="100%" stopColor="#C45C47" />
                  </linearGradient>
                </defs>
                <rect width={182} height={286} fill="url(#discoSkyV4)" />

                {/* Translucent rotating disco spotlight beams */}
                <g opacity={0.2}>
                  {[-55, -24, 6, 36, 66].map((deg, idx) => (
                    <polygon
                      key={idx}
                      points="91,56 62,286 120,286"
                      fill="#FFF5E1"
                      transform={`rotate(${deg + Math.sin(frame * 0.08 + idx) * 8} 91 56)`}
                    />
                  ))}
                </g>

                {/* Floating soft bokeh lights in background */}
                {[
                  [28, 76, 11],
                  [154, 64, 14],
                  [142, 134, 9],
                  [34, 152, 8],
                ].map(([bx, by, r], i) => (
                  <circle key={i} cx={bx} cy={by} r={r} fill="#FFF2FF" opacity={0.22} />
                ))}

                {/* Perspective checkered dance floor with glowing tiles */}
                <polygon points="0,190 182,190 182,286 0,286" fill="#2A2856" />
                {[0, 1, 2, 3, 4].map((row) =>
                  [0, 1, 2, 3, 4, 5].map((col) => {
                    const y1 = 190 + row * 19.5;
                    const y2 = y1 + 19.5;
                    const spread1 = 1 + row * 0.26;
                    const spread2 = 1 + (row + 1) * 0.26;
                    const cx = 91;
                    const w = 32;
                    const x1L = cx + (col - 3) * w * spread1;
                    const x1R = cx + (col - 2) * w * spread1;
                    const x2L = cx + (col - 3) * w * spread2;
                    const x2R = cx + (col - 2) * w * spread2;
                    const lit = (row + col + Math.floor(frame / 4)) % 3 === 0;
                    const palette = ['#56C5E5', '#F47EA8', '#F5CA4E', '#7D76D6', '#5CE0B2'];
                    const fill = lit ? palette[(row * 2 + col) % palette.length] : '#37346B';
                    return (
                      <polygon
                        key={`${row}-${col}`}
                        points={`${x1L},${y1} ${x1R},${y1} ${x2R},${y2} ${x2L},${y2}`}
                        fill={fill}
                        stroke="#211E45"
                        strokeWidth={1.1}
                        opacity={0.92}
                      />
                    );
                  })
                )}

                {/* Floor contact shadow under dancing 小克 */}
                <ellipse cx={91} cy={218} rx={38} ry={8} fill="#181533" opacity={0.45} />

                {/* Multi-faceted Disco Ball with halo */}
                <line x1={91} y1={0} x2={91} y2={36} stroke={COLORS.ink} strokeWidth={2.5} />
                <circle cx={91} cy={56} r={42} fill="url(#discoGlow)" />
                <g transform="translate(91, 56)">
                  <circle cx={0} cy={0} r={20} fill="#DCE4FF" stroke={COLORS.ink} strokeWidth={2.4} />
                  <ellipse cx={0} cy={0} rx={11} ry={20} fill="none" stroke="#8592C4" strokeWidth={1.3} />
                  <ellipse cx={0} cy={0} rx={20} ry={8} fill="none" stroke="#8592C4" strokeWidth={1.3} />
                  <line x1={-20} y1={0} x2={20} y2={0} stroke="#8592C4" strokeWidth={1.3} />
                  <line x1={0} y1={-20} x2={0} y2={20} stroke="#8592C4" strokeWidth={1.3} />
                  <rect x={-7 + Math.sin(frame * 0.3) * 7} y={-9} width={6} height={6} fill="#FFF" />
                  <rect x={2 - Math.sin(frame * 0.3) * 6} y={4} width={5} height={5} fill="#FCE36D" />
                  <rect x={-11} y={3} width={5} height={5} fill="#A6E3FF" />
                </g>

                {/* Radial speed lines when zoomImpact > 20 */}
                {zoomImpact > 20 && (
                  <g opacity={0.42}>
                    {Array.from({ length: 12 }).map((_, i) => {
                      const ang = (i * Math.PI * 2) / 12 + frame * 0.04;
                      const x1 = 91 + Math.cos(ang) * 58;
                      const y1 = 155 + Math.sin(ang) * 75;
                      const x2 = 91 + Math.cos(ang) * 130;
                      const y2 = 155 + Math.sin(ang) * 160;
                      return (
                        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FFFDF0" strokeWidth={2} />
                      );
                    })}
                  </g>
                )}

                {/* 3D-shaded Dancing 小克 mascot */}
                <g
                  transform={`translate(91, ${172 - Math.abs(Math.sin(frame * 0.32)) * 14}) rotate(${Math.sin(frame * 0.32) * 8})`}
                >
                  <rect x={-26} y={24} width={11} height={18} rx={3} fill={COLORS.coralDark} stroke={COLORS.ink} strokeWidth={2.4} />
                  <rect x={15} y={24} width={11} height={18} rx={3} fill={COLORS.coralDark} stroke={COLORS.ink} strokeWidth={2.4} />
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
                  <rect
                    x={-36}
                    y={-28}
                    width={72}
                    height={56}
                    rx={8}
                    fill="url(#xiaoKeBody)"
                    stroke={COLORS.ink}
                    strokeWidth={3}
                  />
                  {/* Top-left subtle painted highlight */}
                  <line x1={-28} y1={-22} x2={24} y2={-22} stroke="#F5A693" strokeWidth={2.4} strokeLinecap="round" opacity={0.65} />
                  <path d="M-18 -4 Q-12 -12 -6 -4" fill="none" stroke={COLORS.ink} strokeWidth={3} strokeLinecap="round" />
                  <path d="M6 -4 Q12 -12 18 -4" fill="none" stroke={COLORS.ink} strokeWidth={3} strokeLinecap="round" />
                  <ellipse cx={-22} cy={6} rx={6} ry={3.5} fill="#F59BB3" opacity={0.78} />
                  <ellipse cx={22} cy={6} rx={6} ry={3.5} fill="#F59BB3" opacity={0.78} />
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
                  <g key={idx} transform={`translate(${sx}, ${sy}) scale(${size})`}>
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
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
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

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <HeartIcon size={22} />
                  <div style={{ fontFamily: FONT_HAND, fontSize: 10, color: '#FFF', fontWeight: 700, textShadow: '0 1px 2px #000', marginTop: 1 }}>
                    10.2w
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <CommentIcon size={21} />
                  <div style={{ fontFamily: FONT_HAND, fontSize: 10, color: '#FFF', fontWeight: 700, textShadow: '0 1px 2px #000', marginTop: 1 }}>
                    2333
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <ShareIcon size={21} />
                  <div style={{ fontFamily: FONT_HAND, fontSize: 10, color: '#FFF', fontWeight: 700, textShadow: '0 1px 2px #000', marginTop: 1 }}>
                    分享
                  </div>
                </div>
              </div>

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
