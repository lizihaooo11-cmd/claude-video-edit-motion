import React from 'react';
import { COLORS } from '../theme';

interface IconProps {
  size?: number;
}

export const SwirlIcon: React.FC<IconProps> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 28 28">
    <path
      d="M14 14 C14 11 18 11 18 14 C18 19 10 19 10 14 C10 7 22 7 22 14 C22 22 6 23 6 14 C6 6 14 4 19 6"
      fill="none"
      stroke="#5C85B8"
      strokeWidth={2.8}
      strokeLinecap="round"
    />
    <path
      d="M14 14 C14 11 18 11 18 14 C18 19 10 19 10 14 C10 7 22 7 22 14 C22 22 6 23 6 14 C6 6 14 4 19 6"
      fill="none"
      stroke={COLORS.ink}
      strokeWidth={1.3}
      strokeLinecap="round"
    />
  </svg>
);

export const FlipIcon: React.FC<IconProps> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 28 28">
    <path
      d="M6 4 L18 4 L23 9 L23 24 L6 24 Z"
      fill="#FFFDF8"
      stroke={COLORS.ink}
      strokeWidth={2.2}
      strokeLinejoin="round"
    />
    <path d="M18 4 L18 9 L23 9" fill="#E8DFCA" stroke={COLORS.ink} strokeWidth={2} strokeLinejoin="round" />
    <line x1={10} y1={14} x2={19} y2={14} stroke={COLORS.inkSoft} strokeWidth={1.8} strokeLinecap="round" />
    <line x1={10} y1={19} x2={16} y2={19} stroke={COLORS.inkSoft} strokeWidth={1.8} strokeLinecap="round" />
  </svg>
);

export const FlashIcon: React.FC<IconProps> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 28 28">
    <polygon
      points="16,3 6,16 13,16 11,25 22,12 15,12"
      fill={COLORS.yellow}
      stroke={COLORS.ink}
      strokeWidth={2.2}
      strokeLinejoin="round"
    />
  </svg>
);

export const ZoomIcon: React.FC<IconProps> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 28 28">
    <circle cx={12} cy={12} r={7.5} fill="#E7F4FC" stroke={COLORS.ink} strokeWidth={2.3} />
    <line x1={17.5} y1={17.5} x2={24} y2={24} stroke={COLORS.ink} strokeWidth={3} strokeLinecap="round" />
    <line x1={9} y1={12} x2={15} y2={12} stroke={COLORS.ink} strokeWidth={2} strokeLinecap="round" />
    <line x1={12} y1={9} x2={12} y2={15} stroke={COLORS.ink} strokeWidth={2} strokeLinecap="round" />
  </svg>
);

export const SlideIcon: React.FC<IconProps> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 28 28">
    <rect x={4} y={6} width={14} height={16} rx={2.5} fill="#BFE7CE" stroke={COLORS.ink} strokeWidth={2.1} />
    <path d="M14 14 L24 14 M20 10 L24 14 L20 18" fill="none" stroke={COLORS.ink} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const DissolveIcon: React.FC<IconProps> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 28 28">
    <circle cx={11} cy={14} r={7} fill="#D5DDF7" stroke={COLORS.ink} strokeWidth={2} opacity={0.85} />
    <circle cx={17} cy={14} r={7} fill="#F7D5E8" stroke={COLORS.ink} strokeWidth={2} strokeDasharray="3 2" opacity={0.85} />
  </svg>
);

export const HeartIcon: React.FC<IconProps> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 28 28">
    <path
      d="M14 24 C14 24 4 17.5 4 10.5 C4 6.5 7.2 4 10.5 4 C12.4 4 13.5 5.2 14 6.5 C14.5 5.2 15.6 4 17.5 4 C20.8 4 24 6.5 24 10.5 C24 17.5 14 24 14 24 Z"
      fill="#F27A9B"
      stroke={COLORS.ink}
      strokeWidth={2.2}
      strokeLinejoin="round"
    />
    <path d="M8.5 9.5 Q9.5 7.5 11.5 8" fill="none" stroke="#FFF" strokeWidth={1.8} strokeLinecap="round" />
  </svg>
);

export const CommentIcon: React.FC<IconProps> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 28 28">
    <path
      d="M5 7 C5 5.2 6.5 4 8.5 4 L20.5 4 C22.5 4 24 5.2 24 7 L24 17 C24 18.8 22.5 20 20.5 20 L12 20 L7 24 L8 20 C6.2 19.6 5 18.5 5 17 Z"
      fill="#FFFDF8"
      stroke={COLORS.ink}
      strokeWidth={2.2}
      strokeLinejoin="round"
    />
    <circle cx={10.5} cy={12} r={1.6} fill={COLORS.ink} />
    <circle cx={14.5} cy={12} r={1.6} fill={COLORS.ink} />
    <circle cx={18.5} cy={12} r={1.6} fill={COLORS.ink} />
  </svg>
);

export const ShareIcon: React.FC<IconProps> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 28 28">
    <path
      d="M16 5 L25 13 L16 21 L16 16 C10 16 6.5 18.2 4 23 C4.8 15.5 9 10.5 16 10 Z"
      fill="#FFFDF8"
      stroke={COLORS.ink}
      strokeWidth={2.2}
      strokeLinejoin="round"
    />
  </svg>
);

export const SparkleIcon: React.FC<{ size?: number; fill?: string }> = ({
  size = 18,
  fill = COLORS.yellow,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path
      d="M12 2 L14.8 9.2 L22 12 L14.8 14.8 L12 22 L9.2 14.8 L2 12 L9.2 9.2 Z"
      fill={fill}
      stroke={COLORS.ink}
      strokeWidth={1.8}
      strokeLinejoin="round"
    />
  </svg>
);
