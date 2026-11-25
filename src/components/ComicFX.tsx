import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, FONT_HAND, FONT_MONO, easeOutBack, easeOutCubic, prog } from '../theme';

const ComicStampText: React.FC<{
  text: string;
  x: number;
  y: number;
  color?: string;
  size?: number;
  rotate?: number;
  scale?: number;
}> = ({ text, x, y, color = COLORS.yellow, size = 34, rotate = -6, scale = 1 }) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      transform: `translate(-50%, -50%) rotate(${rotate}deg) scale(${scale})`,
      fontFamily: FONT_HAND,
      fontSize: size,
      fontWeight: 900,
      color,
      WebkitTextStroke: `2.2px ${COLORS.ink}`,
      textShadow: `3px 3px 0 ${COLORS.ink}`,
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
      zIndex: 40,
    }}
  >
    {text}
  </div>
);

export const ComicFX: React.FC = () => {
  const frame = useCurrentFrame();

  // 0. Flying Dragged Clip Cards (LeftPanel -> Timeline arc, Disney Arcs & Follow-through)
  const flyingClips = [
    { start: 56, end: 68, fromX: 88, fromY: 146, toX: 190, toY: 492, label: '夜景.mp4', bg: COLORS.nightSky, fg: '#FFF' },
    { start: 76, end: 88, fromX: 204, fromY: 146, toX: 430, toY: 492, label: '拉面.mp4', bg: COLORS.ramenBg, fg: COLORS.ink },
    { start: 95, end: 106, fromX: 88, fromY: 230, toX: 690, toY: 492, label: '柴犬.mov', bg: COLORS.shibaBg, fg: COLORS.ink },
    { start: 112, end: 122, fromX: 204, fromY: 230, toX: 910, toY: 492, label: '小克蹦迪', bg: COLORS.discoBg, fg: '#FFF' },
  ];

  // 1. Cut & Trash Gag (frames 196-228)
  const showSlash = frame >= 196 && frame <= 212;
  const slashScale = easeOutBack(prog(frame, 196, 203));

  const showTrash = frame >= 206 && frame <= 230;
  const trashP = prog(frame, 206, 224);
  const trashBounce = frame >= 216 ? Math.sin(prog(frame, 216, 226) * Math.PI) * 10 : 0;

  // 2. Basketball Transition Throw Arc (frames 254-332)
  const throws = [
    { start: 254, end: 278, fromX: 85, fromY: 162, toX: 298, toY: 518, icon: '🌀' },
    { start: 282, end: 306, fromX: 205, fromY: 162, toX: 540, toY: 518, icon: '📄' },
    { start: 308, end: 332, fromX: 205, fromY: 245, toX: 760, toY: 518, icon: '🔍' },
  ];

  // 3. Ctrl+Z Keycap Stomp (frames 424-466)
  const showCtrlZ = frame >= 424 && frame <= 466;
  const ctrlZScale = easeOutBack(prog(frame, 424, 432));
  const ctrlZPressed = frame >= 432 && frame <= 444;

  // 4. Green Rubber Stamp "已修正" (frames 448-470)
  const showFixedStamp = frame >= 448 && frame <= 472;
  const fixedScale = 1.6 - 0.6 * easeOutCubic(prog(frame, 448, 454));

  // 5. Over-saturation banner "饱和度:拉满" (frames 512-536)
  const showFriedBanner = frame >= 512 && frame <= 536;
  const friedShakeX = Math.sin(frame * 2.5) * 4;

  // 6. Beat Sync "卡点!" (frames 634-662)
  const showBeatText = frame >= 634 && frame <= 662;
  const beatTextScale = easeOutBack(prog(frame, 634, 642));

  // 7. Export "叮!" & Confetti (frames 780-899)
  const showDing = frame >= 780 && frame <= 808;
  const dingScale = easeOutBack(prog(frame, 780, 788));
  const showConfetti = frame >= 780;

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 38 }}>
      {/* Flying Dragged Clip Cards */}
      {flyingClips.map((fc, idx) => {
        if (frame < fc.start || frame > fc.end) return null;
        const t = easeOutCubic(prog(frame, fc.start, fc.end));
        const cx = (fc.fromX + fc.toX) / 2;
        const cy = Math.min(fc.fromY, fc.toY) - 48;
        const bx = (1 - t) * (1 - t) * fc.fromX + 2 * (1 - t) * t * cx + t * t * fc.toX;
        const by = (1 - t) * (1 - t) * fc.fromY + 2 * (1 - t) * t * cy + t * t * fc.toY;
        const rot = -12 + t * 18;
        return (
          <div
            key={`fc-${idx}`}
            style={{
              position: 'absolute',
              left: bx - 44,
              top: by - 26,
              width: 88,
              height: 52,
              borderRadius: 8,
              backgroundColor: fc.bg,
              border: `2.2px solid ${COLORS.ink}`,
              boxShadow: '4px 6px 0 rgba(43,37,32,0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: FONT_HAND,
              fontSize: 12,
              fontWeight: 800,
              color: fc.fg,
              transform: `rotate(${rot}deg) scale(${1.05 - t * 0.1})`,
              zIndex: 39,
            }}
          >
            {fc.label}
          </div>
        );
      })}

      {/* Scissors Slash "唰!" */}
      {showSlash && (
        <>
          <svg
            width={1280}
            height={720}
            viewBox="0 0 1280 720"
            style={{ position: 'absolute', inset: 0 }}
          >
            <line
              x1={448}
              y1={460}
              x2={448}
              y2={585}
              stroke={COLORS.red}
              strokeWidth={4}
              strokeDasharray="8 6"
            />
            <line
              x1={578}
              y1={460}
              x2={578}
              y2={585}
              stroke={COLORS.red}
              strokeWidth={4}
              strokeDasharray="8 6"
            />
          </svg>
          <ComicStampText
            text="唰!"
            x={515}
            y={442}
            color="#FF8C69"
            size={42}
            rotate={-10}
            scale={slashScale}
          />
        </>
      )}

      {/* Trash Can + Flying Blurry Clip + "哐当!" */}
      {showTrash && (
        <>
          {/* Flying grey blurry block into trash */}
          {trashP < 0.65 && (
            <div
              style={{
                position: 'absolute',
                left: 500 + trashP * 40,
                top: 520 + trashP * 110 - Math.sin(trashP * Math.PI * 1.5) * 70,
                width: 72 * (1 - trashP * 0.5),
                height: 36 * (1 - trashP * 0.5),
                borderRadius: 6,
                backgroundColor: '#88837B',
                border: `2px solid ${COLORS.ink}`,
                transform: `rotate(${trashP * 240}deg)`,
              }}
            />
          )}

          {/* Hand-drawn Trash Can */}
          <svg
            width={94}
            height={110}
            viewBox="0 0 94 110"
            style={{
              position: 'absolute',
              left: 510,
              top: 565 - trashBounce,
              filter: 'url(#hand-drawn-soft)',
            }}
          >
            <path
              d="M18 30 L26 98 Q47 104 68 98 L76 30 Z"
              fill="#DCE1E5"
              stroke={COLORS.ink}
              strokeWidth={2.8}
            />
            <ellipse cx={47} cy={30} rx={30} ry={8} fill="#B8C0C7" stroke={COLORS.ink} strokeWidth={2.6} />
            <line x1={34} y1={44} x2={37} y2={88} stroke={COLORS.inkSoft} strokeWidth={2.2} />
            <line x1={47} y1={44} x2={47} y2={88} stroke={COLORS.inkSoft} strokeWidth={2.2} />
            <line x1={60} y1={44} x2={57} y2={88} stroke={COLORS.inkSoft} strokeWidth={2.2} />
          </svg>

          {frame >= 215 && (
            <ComicStampText
              text="哐当!"
              x={648}
              y={628}
              color={COLORS.yellow}
              size={38}
              rotate={6}
              scale={easeOutBack(prog(frame, 215, 222))}
            />
          )}
        </>
      )}

      {/* Transition Throws (Basketball Arc + "空心入网!") */}
      {throws.map((tr, idx) => {
        if (frame < tr.start || frame > tr.end) return null;
        const t = prog(frame, tr.start, tr.end);
        const cx = (tr.fromX + tr.toX) / 2;
        const cy = Math.min(tr.fromY, tr.toY) - 95;
        // Quadratic Bezier point
        const bx = (1 - t) * (1 - t) * tr.fromX + 2 * (1 - t) * t * cx + t * t * tr.toX;
        const by = (1 - t) * (1 - t) * tr.fromY + 2 * (1 - t) * t * cy + t * t * tr.toY;
        return (
          <React.Fragment key={idx}>
            <svg
              width={1280}
              height={720}
              viewBox="0 0 1280 720"
              style={{ position: 'absolute', inset: 0 }}
            >
              <path
                d={`M ${tr.fromX} ${tr.fromY} Q ${cx} ${cy} ${tr.toX} ${tr.toY}`}
                fill="none"
                stroke={COLORS.inkSoft}
                strokeWidth={2.2}
                strokeDasharray="6 6"
                opacity={0.7}
              />
            </svg>
            <div
              style={{
                position: 'absolute',
                left: bx - 18,
                top: by - 18,
                width: 36,
                height: 36,
                borderRadius: '50%',
                backgroundColor: '#FFFDF8',
                border: `2.4px solid ${COLORS.ink}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                transform: `rotate(${t * 360}deg)`,
              }}
            >
              {tr.icon}
            </div>
          </React.Fragment>
        );
      })}
      {frame >= 272 && frame <= 304 && (
        <ComicStampText
          text="空心入网!"
          x={430}
          y={346}
          color={COLORS.yellow}
          size={32}
          rotate={-6}
          scale={easeOutBack(prog(frame, 272, 280))}
        />
      )}

      {/* Giant Ctrl+Z Keycap + "撤销!" */}
      {showCtrlZ && (
        <>
          <div
            style={{
              position: 'absolute',
              left: 205,
              top: ctrlZPressed ? 590 : 582,
              width: 176,
              height: 102,
              borderRadius: 16,
              backgroundColor: '#FFFDF8',
              border: `3.2px solid ${COLORS.ink}`,
              boxShadow: ctrlZPressed
                ? `0 2px 0 ${COLORS.ink}`
                : `0 10px 0 #D8D1C3, 0 12px 0 ${COLORS.ink}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: FONT_MONO,
              fontSize: 34,
              fontWeight: 900,
              color: COLORS.ink,
              transform: `scale(${ctrlZScale})`,
            }}
          >
            Ctrl+Z
          </div>

          {ctrlZPressed && (
            <svg
              width={1280}
              height={720}
              viewBox="0 0 1280 720"
              style={{ position: 'absolute', inset: 0, zIndex: 41 }}
            >
              {[-1, 1].map((dir) => {
                const puffP = prog(frame, 432, 444);
                const px = 290 + dir * (36 + puffP * 38);
                const py = 584 - puffP * 14;
                const r = 13 * (1 - puffP * 0.45);
                return (
                  <g key={dir} opacity={1 - puffP * 0.85}>
                    <circle cx={px} cy={py} r={r} fill="#FFFDF8" stroke={COLORS.ink} strokeWidth={2} />
                    <circle cx={px + dir * 10} cy={py + 4} r={r * 0.7} fill="#FFFDF8" stroke={COLORS.ink} strokeWidth={1.8} />
                  </g>
                );
              })}
            </svg>
          )}

          {frame >= 430 && frame <= 452 && (
            <ComicStampText
              text="撤销!"
              x={318}
              y={392}
              color="#78C6BA"
              size={38}
              rotate={-8}
              scale={easeOutBack(prog(frame, 430, 437))}
            />
          )}
        </>
      )}

      {/* Green Stamp "已修正" */}
      {showFixedStamp && (
        <div
          style={{
            position: 'absolute',
            left: 790,
            top: 196,
            padding: '10px 24px',
            border: `4px double ${COLORS.green}`,
            borderRadius: 10,
            color: COLORS.green,
            fontFamily: FONT_HAND,
            fontSize: 34,
            fontWeight: 900,
            letterSpacing: 4,
            transform: `rotate(-11deg) scale(${fixedScale})`,
            backgroundColor: 'rgba(255,253,248,0.82)',
          }}
        >
          已修正
        </div>
      )}

      {/* Over-saturation Banner "饱和度:拉满" */}
      {showFriedBanner && (
        <ComicStampText
          text="饱和度:拉满"
          x={630 + friedShakeX}
          y={112}
          color="#FF6B4A"
          size={40}
          rotate={-3}
        />
      )}

      {/* Beat Sync "卡点!" */}
      {showBeatText && (
        <ComicStampText
          text="卡点!"
          x={268}
          y={578}
          color={COLORS.yellow}
          size={40}
          rotate={-8}
          scale={beatTextScale}
        />
      )}

      {/* Export Complete "叮!" */}
      {showDing && (
        <ComicStampText
          text="叮!"
          x={965}
          y={116}
          color="#5CC47E"
          size={46}
          rotate={8}
          scale={dingScale}
        />
      )}

      {/* Confetti Burst on Export Complete */}
      {showConfetti && (
        <svg
          width={1280}
          height={720}
          viewBox="0 0 1280 720"
          style={{ position: 'absolute', inset: 0 }}
        >
          {Array.from({ length: 24 }).map((_, i) => {
            const dt = frame - 780;
            const angle = (i / 24) * Math.PI * 2 + 0.3;
            const speed = 5 + (i % 5) * 2.6;
            const startX = i % 2 === 0 ? 1120 : 640;
            const startY = i % 2 === 0 ? 50 : 210;
            const cx = startX + Math.cos(angle) * speed * dt * 0.7;
            const cy = startY + Math.sin(angle) * speed * dt * 0.5 + 0.14 * dt * dt;
            const opacity = Math.max(0, 1 - dt / 95);
            const colors = [COLORS.yellow, COLORS.coral, COLORS.teal, COLORS.pink, '#6EA8E5'];
            return (
              <rect
                key={i}
                x={cx}
                y={cy}
                width={9}
                height={5}
                rx={1}
                fill={colors[i % colors.length]}
                stroke={COLORS.ink}
                strokeWidth={1}
                opacity={opacity}
                transform={`rotate(${dt * (6 + (i % 7))} ${cx} ${cy})`}
              />
            );
          })}
        </svg>
      )}
    </div>
  );
};
