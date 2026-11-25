import React from 'react';
import { Audio, Sequence, staticFile } from 'remotion';
import { TIMING } from '../theme';

/**
 * Frame-accurate audio layer combining:
 * 1. Clean procedural BGM bed (soundtrack.wav)
 * 2. Real CC0 Freesound SFX synced to the exact same TIMING constants as visual motion
 */
export const SoundTrack: React.FC = () => {
  return (
    <>
      {/* Upbeat lo-fi pop BGM bed */}
      <Audio src={staticFile('audio/soundtrack.wav')} volume={0.55} />

      {/* 1. Intro mechanical keyboard typing */}
      <Sequence from={TIMING.INTRO_TYPE_START} durationInFrames={32}>
        <Audio src={staticFile('audio/sfx/clean/typing.mp3')} volume={0.78} />
      </Sequence>

      {/* 2. Terminal morphing into Editor UI */}
      <Sequence from={TIMING.UI_UNFOLD} durationInFrames={18}>
        <Audio src={staticFile('audio/sfx/clean/whoosh.mp3')} volume={0.72} />
      </Sequence>

      {/* 3. Dragging 4 clips + BGM onto timeline */}
      {[
        TIMING.CLIP_DROP_1,
        TIMING.CLIP_DROP_2,
        TIMING.CLIP_DROP_3,
        TIMING.CLIP_DROP_4,
        TIMING.BGM_DROP,
      ].map((f, idx) => (
        <Sequence key={`drop-${idx}`} from={f} durationInFrames={10}>
          <Audio src={staticFile('audio/sfx/clean/pop.mp3')} volume={0.72} />
        </Sequence>
      ))}

      {/* 4. Scissors snip "唰!" & Trash can clank "哐当!" */}
      <Sequence from={TIMING.BLUR_SNIP} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx/clean/snip.mp3')} volume={0.95} />
      </Sequence>
      <Sequence from={TIMING.TRASH_IMPACT} durationInFrames={24}>
        <Audio src={staticFile('audio/sfx/clean/trash.mp3')} volume={0.92} />
      </Sequence>

      {/* 5. Basketball transition throws "空心入网!" */}
      {[TIMING.THROW_1, TIMING.THROW_2, TIMING.THROW_3].map((f, idx) => (
        <React.Fragment key={`throw-${idx}`}>
          <Sequence from={f} durationInFrames={16}>
            <Audio src={staticFile('audio/sfx/clean/whoosh.mp3')} volume={0.62} />
          </Sequence>
          <Sequence from={f + 20} durationInFrames={10}>
            <Audio src={staticFile('audio/sfx/clean/pop.mp3')} volume={0.68} />
          </Sequence>
        </React.Fragment>
      ))}

      {/* 6. Typo question mark -> Ctrl+Z stomp -> Rubber stamp "已修正" */}
      <Sequence from={TIMING.TYPO_QUESTION} durationInFrames={28}>
        <Audio src={staticFile('audio/sfx/clean/question.mp3')} volume={0.85} />
      </Sequence>
      <Sequence from={TIMING.CTRLZ_STOMP} durationInFrames={16}>
        <Audio src={staticFile('audio/sfx/clean/trash.mp3')} volume={0.78} />
      </Sequence>
      <Sequence from={TIMING.STAMP_FIXED} durationInFrames={20}>
        <Audio src={staticFile('audio/sfx/clean/stamp.mp3')} volume={0.92} />
      </Sequence>

      {/* 7. Over-saturation "饱和度:拉满" error buzz */}
      <Sequence from={TIMING.SAT_FRIED} durationInFrames={12}>
        <Audio src={staticFile('audio/sfx/clean/buzz.mp3')} volume={0.82} />
      </Sequence>

      {/* 8. Beat-sync button press & rapid beat pops */}
      <Sequence from={TIMING.BEAT_SYNC_PRESS} durationInFrames={10}>
        <Audio src={staticFile('audio/sfx/clean/pop.mp3')} volume={0.8} />
      </Sequence>
      {[0, 4, 8, 12].map((dt, idx) => (
        <Sequence key={`beat-${idx}`} from={TIMING.BEAT_CASCADE_START + dt} durationInFrames={9}>
          <Audio src={staticFile('audio/sfx/clean/pop.mp3')} volume={0.42 + idx * 0.08} />
        </Sequence>
      ))}

      {/* 9. Export click & "叮!" Export Complete Bell */}
      <Sequence from={TIMING.EXPORT_CLICK} durationInFrames={10}>
        <Audio src={staticFile('audio/sfx/clean/pop.mp3')} volume={0.75} />
      </Sequence>
      <Sequence from={TIMING.EXPORT_DING} durationInFrames={50}>
        <Audio src={staticFile('audio/sfx/clean/ding.mp3')} volume={0.95} />
      </Sequence>

      {/* 10. Outro sticky note pop */}
      <Sequence from={TIMING.OUTRO_NOTE_POP} durationInFrames={14}>
        <Audio src={staticFile('audio/sfx/clean/whoosh.mp3')} volume={0.6} />
      </Sequence>
    </>
  );
};
