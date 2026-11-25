import React from 'react';
import { staticFile, useCurrentFrame } from 'remotion';

/**
 * Provides bundled handwritten font (@font-face), subtle hand-drawn line boil
 * (stepped every 4 frames), and warm paper texture defs.
 */
export const PaperDefs: React.FC = () => {
  const frame = useCurrentFrame();
  const boilSeed = (Math.floor(frame / 4) % 7) + 1;

  return (
    <>
      <style>{`
        @font-face {
          font-family: 'XiaoKeHand';
          src: url('${staticFile('fonts/ZCOOLKuaiLe-Regular.ttf')}') format('truetype');
          font-weight: 100 900;
          font-style: normal;
          font-display: block;
        }
      `}</style>
      <svg
        width={0}
        height={0}
        style={{ position: 'absolute', pointerEvents: 'none' }}
        aria-hidden="true"
      >
      <defs>
        <filter id="hand-drawn-boil" x="-4%" y="-4%" width="108%" height="108%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.018"
            numOctaves={2}
            seed={boilSeed}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={1.8}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        <filter id="hand-drawn-soft" x="-3%" y="-3%" width="106%" height="106%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.022"
            numOctaves={1}
            seed={boilSeed + 10}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={1.1}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        <filter id="paper-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves={3}
            stitchTiles="stitch"
            result="grain"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.45
                    0 0 0 0 0.38
                    0 0 0 0 0.28
                    0 0 0 0.045 0"
          />
        </filter>

        <filter id="blur-focus" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="5.5" />
        </filter>
      </defs>
    </svg>
    </>
  );
};
