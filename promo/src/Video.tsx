import React from "react";
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import "@fontsource/unbounded/700.css";
import "@fontsource/unbounded/800.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/space-mono/700.css";
import "@fontsource/dm-serif-display/400-italic.css";
import { CLIPS, MUSIC, T, TEXT } from "./config";
import { Branding, ButterflyZoom, Flash, Grain, clamp } from "./components";
import { BavardesScene, ChatScene, ClipLineScene, CtaScene, HookScene, OutroScene, TalkScene, ValuesScene } from "./scenes";

const S: React.FC<{ t: { from: number; dur: number }; children: React.ReactNode }> = ({ t, children }) => (
  <Sequence from={t.from} durationInFrames={t.dur}>
    {children}
  </Sequence>
);

export const RGCPromo: React.FC<{ withMusic: boolean }> = ({ withMusic }) => {
  const f = useCurrentFrame();
  // hide the small corner logo while the big logo is on screen
  const bugOpacity = interpolate(f, [T.cta.from - 4, T.cta.from], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ background: "#120F18" }}>
      <S t={T.hook}><HookScene /></S>
      <S t={T.bavardes}><BavardesScene /></S>
      <S t={T.game}><ClipLineScene clips={CLIPS.game} every={15} lines={TEXT.lines.game} /></S>
      <S t={T.votes}><ClipLineScene clips={CLIPS.votes} every={30} lines={TEXT.lines.votes} /></S>
      <S t={T.cine}><ClipLineScene clips={CLIPS.cine} every={30} lines={TEXT.lines.cine} images /></S>
      <S t={T.talk}><TalkScene /></S>
      <S t={T.chat}><ChatScene /></S>
      <S t={T.values}><ValuesScene /></S>
      <S t={T.cta}><CtaScene /></S>
      <S t={T.outro}><OutroScene /></S>

      {/* transitions */}
      <ButterflyZoom at={T.bavardes.from} />
      <Flash at={T.bavardes.from} strength={0.75} />
      <Flash at={T.votes.from} strength={0.35} />
      <Flash at={T.cine.from} strength={0.35} />
      <Flash at={T.talk.from} strength={0.35} />
      <Flash at={T.chat.from} strength={0.4} color="#B78BF0" />
      <Flash at={T.values.from} strength={0.7} />
      <Flash at={T.cta.from} strength={0.75} />
      <Flash at={T.outro.from} strength={0.4} color="#E7D6FF" />

      <AbsoluteFill style={{ opacity: f < T.cta.from ? 1 : bugOpacity }}>
        <Branding />
      </AbsoluteFill>
      <Grain />
      {withMusic && <Audio src={staticFile(MUSIC)} />}
    </AbsoluteFill>
  );
};
