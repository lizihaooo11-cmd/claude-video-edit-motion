import React from 'react';
import { Composition } from 'remotion';
import { MainVideo } from './MainVideo';
import { VIDEO_FPS, VIDEO_HEIGHT, VIDEO_WIDTH, TOTAL_FRAMES } from './theme';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ClaudeVideoEditMotion"
        component={MainVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
    </>
  );
};
