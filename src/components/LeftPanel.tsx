import React from 'react';
import { COLORS, FONT_HAND } from '../theme';

export type LeftTab = 'media' | 'transition' | 'text';

interface LeftPanelProps {
  activeTab: LeftTab;
  highlightedIndex?: number;
}

const NightThumb: React.FC = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 62" preserveAspectRatio="none">
    <rect width={100} height={62} fill={COLORS.nightSky} />
    <circle cx={72} cy={17} r={7} fill="#FCE36D" />
    <circle cx={75} cy={15} r={6} fill={COLORS.nightSky} />
    {[
      [14, 12],
      [30, 18],
      [48, 10],
      [88, 14],
      [22, 26],
    ].map(([cx, cy], i) => (
      <circle key={i} cx={cx} cy={cy} r={1.2} fill="#FFF5C0" />
    ))}
    {/* Skyline */}
    <rect x={4} y={32} width={14} height={30} fill="#1E2346" stroke="#111" strokeWidth={1} />
    <rect x={18} y={24} width={16} height={38} fill="#252B56" stroke="#111" strokeWidth={1} />
    <rect x={34} y={36} width={13} height={26} fill="#1C2042" stroke="#111" strokeWidth={1} />
    <rect x={47} y={27} width={18} height={35} fill="#262D5A" stroke="#111" strokeWidth={1} />
    <rect x={65} y={34} width={15} height={28} fill="#1E2346" stroke="#111" strokeWidth={1} />
    <rect x={80} y={29} width={16} height={33} fill="#252B56" stroke="#111" strokeWidth={1} />
    {[22, 27, 51, 56, 84, 89].map((x, idx) => (
      <React.Fragment key={idx}>
        <rect x={x} y={32} width={2.5} height={3.5} fill="#F9DC68" />
        <rect x={x} y={40} width={2.5} height={3.5} fill="#F9DC68" />
        <rect x={x} y={48} width={2.5} height={3.5} fill="#F9DC68" />
      </React.Fragment>
    ))}
  </svg>
);

const RamenThumb: React.FC = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 62" preserveAspectRatio="none">
    <rect width={100} height={62} fill={COLORS.ramenBg} />
    {/* Bowl */}
    <path
      d="M20 34 Q20 56 50 56 Q80 56 80 34 Z"
      fill="#FFF8EC"
      stroke={COLORS.ink}
      strokeWidth={2}
    />
    <ellipse cx={50} cy={34} rx={30} ry={9} fill="#E6B265" stroke={COLORS.ink} strokeWidth={2} />
    {/* Narutomaki & nori */}
    <rect x={28} y={23} width={10} height={10} fill="#2A332C" stroke={COLORS.ink} strokeWidth={1.3} />
    <circle cx={63} cy={33} r={5.5} fill="#FFF" stroke={COLORS.ink} strokeWidth={1.4} />
    <circle cx={63} cy={33} r={2.5} fill="none" stroke="#E86B78" strokeWidth={1.3} />
    {/* Chopsticks lifting noodles */}
    <line x1={48} y1={28} x2={74} y2={6} stroke="#5B3F29" strokeWidth={2.5} />
    <line x1={53} y1={30} x2={80} y2={9} stroke="#5B3F29" strokeWidth={2.5} />
    <path d="M47 28 Q50 38 48 42 M52 28 Q55 37 53 41" stroke="#F8E29B" strokeWidth={2.2} fill="none" />
  </svg>
);

const ShibaThumb: React.FC = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 62" preserveAspectRatio="none">
    <rect width={100} height={62} fill={COLORS.shibaBg} />
    {/* Shiba */}
    <path d="M35 20 L40 7 L49 18 Z" fill="#D98344" stroke={COLORS.ink} strokeWidth={1.8} />
    <path d="M65 20 L60 7 L51 18 Z" fill="#D98344" stroke={COLORS.ink} strokeWidth={1.8} />
    <ellipse cx={50} cy={35} rx={21} ry={18} fill="#D98344" stroke={COLORS.ink} strokeWidth={2} />
    <ellipse cx={50} cy={41} rx={17} ry={12} fill="#FFF7EB" />
    <circle cx={42} cy={32} r={2.2} fill={COLORS.ink} />
    <circle cx={58} cy={32} r={2.2} fill={COLORS.ink} />
    <ellipse cx={50} cy={38} rx={3} ry={2} fill={COLORS.ink} />
    <rect x={36} y={51} width={28} height={6} rx={3} fill="#D94A4A" stroke={COLORS.ink} strokeWidth={1.5} />
    <circle cx={50} cy={56} r={3} fill="#F5CA4E" stroke={COLORS.ink} strokeWidth={1.2} />
    <path d="M74 16 C74 13 78 13 78 16 C78 19 74 21 74 21 C74 21 70 19 70 16 C70 13 74 13 74 16 Z" fill="#F07394" />
  </svg>
);

const DiscoThumb: React.FC = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 62" preserveAspectRatio="none">
    <rect width={100} height={62} fill={COLORS.discoBg} />
    <polygon points="0,42 100,42 100,62 0,62" fill="#3B3A70" />
    <line x1={25} y1={42} x2={10} y2={62} stroke="#8B7CE0" strokeWidth={1} />
    <line x1={50} y1={42} x2={50} y2={62} stroke="#8B7CE0" strokeWidth={1} />
    <line x1={75} y1={42} x2={90} y2={62} stroke="#8B7CE0" strokeWidth={1} />
    <circle cx={50} cy={14} r={6} fill="#E6EAFF" stroke={COLORS.ink} strokeWidth={1.5} />
    {/* Mini 小克 dancing */}
    <rect x={38} y={26} width={24} height={18} rx={3} fill={COLORS.coral} stroke={COLORS.ink} strokeWidth={1.8} />
    <line x1={38} y1={32} x2={31} y2={24} stroke={COLORS.coral} strokeWidth={4} strokeLinecap="round" />
    <line x1={62} y1={32} x2={69} y2={24} stroke={COLORS.coral} strokeWidth={4} strokeLinecap="round" />
    <circle cx={46} cy={34} r={1.6} fill={COLORS.ink} />
    <circle cx={54} cy={34} r={1.6} fill={COLORS.ink} />
  </svg>
);

export const LeftPanel: React.FC<LeftPanelProps> = ({ activeTab, highlightedIndex = -1 }) => {
  const tabs: { id: LeftTab; label: string }[] = [
    { id: 'media', label: '素材' },
    { id: 'transition', label: '转场' },
    { id: 'text', label: '文字' },
  ];

  const clips = [
    { name: '夜景.mp4', dur: '2.4s', thumb: <NightThumb /> },
    { name: '拉面.mp4', dur: '4.6s', thumb: <RamenThumb /> },
    { name: '柴犬.mov', dur: '2.4s', thumb: <ShibaThumb /> },
    { name: '小克蹦迪.mp4', dur: '2.8s', thumb: <DiscoThumb /> },
  ];

  const transitions = [
    { name: '旋转', bg: '#F8EFF7', icon: '🌀' },
    { name: '翻页', bg: '#FBF7E8', icon: '📄' },
    { name: '闪黑', bg: '#F9E6F0', icon: '⚡' },
    { name: '缩放', bg: '#E7F4FC', icon: '🔍' },
    { name: '滑动', bg: '#EAF7EC', icon: '➡️' },
    { name: '溶解', bg: '#EEF1FA', icon: '✨' },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        left: 24,
        top: 72,
        width: 246,
        height: 312,
        backgroundColor: COLORS.panelBg,
        border: `2.4px solid ${COLORS.ink}`,
        borderRadius: 14,
        padding: 10,
        boxSizing: 'border-box',
        filter: 'url(#hand-drawn-soft)',
      }}
    >
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
        {tabs.map((tab) => {
          const active = tab.id === activeTab;
          return (
            <div
              key={tab.id}
              style={{
                flex: 1,
                height: 28,
                borderRadius: 7,
                border: `2px solid ${COLORS.ink}`,
                backgroundColor: active ? COLORS.yellow : '#F1ECE0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: FONT_HAND,
                fontSize: 13,
                fontWeight: active ? 800 : 600,
                color: active ? COLORS.ink : COLORS.inkSoft,
              }}
            >
              {tab.label}
            </div>
          );
        })}
      </div>

      {/* Tab Content: MEDIA */}
      {activeTab === 'media' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 8,
          }}
        >
          {clips.map((c, idx) => (
            <div
              key={c.name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: highlightedIndex === idx ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: 60,
                  borderRadius: 8,
                  border: `2px solid ${highlightedIndex === idx ? COLORS.coral : COLORS.ink}`,
                  overflow: 'hidden',
                }}
              >
                {c.thumb}
                <div
                  style={{
                    position: 'absolute',
                    right: 4,
                    bottom: 3,
                    backgroundColor: 'rgba(30,26,22,0.78)',
                    color: '#FFF',
                    fontSize: 9,
                    padding: '1px 4px',
                    borderRadius: 4,
                    fontFamily: FONT_HAND,
                  }}
                >
                  {c.dur}
                </div>
              </div>
              <span
                style={{
                  fontFamily: FONT_HAND,
                  fontSize: 11,
                  color: COLORS.ink,
                  marginTop: 2,
                }}
              >
                {c.name}
              </span>
            </div>
          ))}

          {/* 2 Dashed Import Placeholders */}
          {[0, 1].map((i) => (
            <div
              key={i}
              style={{
                height: 66,
                borderRadius: 8,
                border: `1.8px dashed ${COLORS.inkMuted}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: COLORS.inkMuted,
                fontFamily: FONT_HAND,
                fontSize: 11,
                gap: 2,
              }}
            >
              <span style={{ fontSize: 20, lineHeight: 1 }}>+</span>
              <span>导入素材</span>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content: TRANSITIONS */}
      {activeTab === 'transition' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 8,
          }}
        >
          {transitions.map((tr, idx) => (
            <div
              key={tr.name}
              style={{
                height: 76,
                borderRadius: 9,
                border: `2px solid ${highlightedIndex === idx ? COLORS.coral : COLORS.ink}`,
                backgroundColor: tr.bg,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
                transform: highlightedIndex === idx ? 'scale(1.06)' : 'scale(1)',
              }}
            >
              <span style={{ fontSize: 22 }}>{tr.icon}</span>
              <span
                style={{
                  fontFamily: FONT_HAND,
                  fontSize: 13,
                  fontWeight: 700,
                  color: COLORS.ink,
                }}
              >
                {tr.name}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content: TEXT PRESETS */}
      {activeTab === 'text' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div
            style={{
              height: 76,
              borderRadius: 10,
              border: `2.2px solid ${COLORS.ink}`,
              backgroundColor: COLORS.yellowSoft,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: FONT_HAND,
                fontSize: 26,
                fontWeight: 900,
                color: COLORS.yellow,
                WebkitTextStroke: `1.8px ${COLORS.ink}`,
                textShadow: `2px 2px 0 ${COLORS.ink}`,
              }}
            >
              前方高能
            </span>
          </div>

          <div
            style={{
              height: 76,
              borderRadius: 10,
              border: `2px solid ${COLORS.ink}`,
              backgroundColor: COLORS.pinkSoft,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: FONT_HAND,
                fontSize: 20,
                fontWeight: 800,
                color: '#E15E87',
                backgroundColor: '#FFF',
                padding: '4px 18px',
                borderRadius: 20,
                border: '2px solid #E15E87',
              }}
            >
              好耶~
            </span>
          </div>

          <div
            style={{
              height: 76,
              borderRadius: 10,
              border: `2px solid ${COLORS.ink}`,
              backgroundColor: '#292434',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: FONT_HAND,
                fontSize: 21,
                fontWeight: 800,
                color: '#F5E7FF',
                textShadow: '0 0 10px #D47BFF, 0 0 20px #9D4EDD',
              }}
            >
              霓虹 NEON
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
