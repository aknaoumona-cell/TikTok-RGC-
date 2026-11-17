/**
 * TikTok #26 — edit gameplay cinématique (Call of Duty). Presque pas de texte : coupes rythmées, zooms « punch »,
 * accélérations / ralentis, flashs. Le son tendance est ajouté dans TikTok (ici : son du jeu bas + bruitages).
 * Plein écran (1080×1920). 0–405 shots · 405–495 carte de fin
 */
import React from "react";
import { AbsoluteFill, Easing, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { GameVideo, SfxAudio } from "../safe";
import { FONT, Flash, clamp } from "../components";
import { EndCard, Shell } from "../memes";

const SHOTS: { src: string; dur: number; rate?: number; start?: number }[] = [
  { src: "e01", dur: 40, rate: 1 },
  { src: "e02", dur: 30, rate: 1.4 },
  { src: "e03", dur: 24, rate: 1.2 },
  { src: "e04", dur: 36, rate: 0.7 },
  { src: "e06", dur: 24, rate: 1.3 },
  { src: "e08", dur: 30, rate: 1 },
  { src: "e05", dur: 36, rate: 0.6 },
  { src: "e10", dur: 22, rate: 1.4 },
  { src: "e07", dur: 28, rate: 1 },
  { src: "e09", dur: 34, rate: 0.75, start: 1.5 },
  { src: "e12", dur: 22, rate: 1.5 },
  { src: "e13", dur: 30, rate: 1 },
  { src: "e11", dur: 49, rate: 0.6, start: 1 },
];
export const EDIT_SHOTS_END = SHOTS.reduce((a, s) => a + s.dur, 0);
export const EDIT_TOTAL = EDIT_SHOTS_END + 90;
export const EDIT_CUTS = SHOTS.reduce<number[]>((acc, s, i) => [...acc, i ? acc[i - 1] + SHOTS[i - 1].dur : 0], []);

const Shot: React.FC<{ s: (typeof SHOTS)[number]; i: number }> = ({ s, i }) => {
  const f = useCurrentFrame();
  const punch = interpolate(f, [0, 8], [1.22, 1.06], { ...clamp, easing: Easing.out(Easing.cubic) });
  const drift = 1 + f * 0.0012;
  const shakeX = f < 6 ? Math.sin(f * 3.1) * (6 - f) * 2 : 0;
  const slow = (s.rate ?? 1) < 0.9;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <AbsoluteFill style={{ transform: `translateX(${shakeX}px) scale(${punch * drift}) rotate(${i % 2 ? 0.6 : -0.6}deg)`, filter: slow ? "contrast(1.12) saturate(1.15)" : "contrast(1.05)" }}>
        <GameVideo src={staticFile(`clips/g/${s.src}.mp4`)} startFrom={Math.round((s.start ?? 0) * 30)} playbackRate={s.rate ?? 1} volume={0.45} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>
      {/* cinematic vignette + light leak on slow-mo shots */}
      <AbsoluteFill style={{ background: "radial-gradient(75% 60% at 50% 50%, transparent 55%, rgba(0,0,0,0.55))" }} />
      {slow && <AbsoluteFill style={{ background: "linear-gradient(120deg, rgba(183,155,255,0.18), transparent 40%, transparent 70%, rgba(255,170,120,0.14))", mixBlendMode: "screen" }} />}
    </AbsoluteFill>
  );
};

const Intro: React.FC = () => {
  const f = useCurrentFrame();
  const k = interpolate(f, [4, 14, 32, 40], [0, 1, 1, 0], clamp);
  return (
    <div style={{ position: "absolute", top: 860, width: "100%", textAlign: "center", opacity: k, letterSpacing: interpolate(f, [0, 40], [18, 30]) }}>
      <div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 34, color: "#fff", textShadow: "0 2px 16px rgba(0,0,0,0.9)" }}>CALL OF DUTY</div>
      <div style={{ fontFamily: FONT.elegant, fontStyle: "italic", fontWeight: 700, fontSize: 40, color: "#E7D6FF", letterSpacing: 2 }}>by rivals girls club</div>
    </div>
  );
};

export const EditVideo: React.FC = () => (
  <Shell hideBugFrom={EDIT_SHOTS_END} brand="center">
    {SHOTS.map((s, i) => (
      <Sequence key={s.src} from={EDIT_CUTS[i]} durationInFrames={s.dur}>
        <Shot s={s} i={i} />
      </Sequence>
    ))}
    <Sequence durationInFrames={40}>
      <Intro />
    </Sequence>
    <Sequence from={EDIT_SHOTS_END} durationInFrames={90}>
      <EndCard big="viens jouer" small="une team cod t'attend" />
    </Sequence>
    {EDIT_CUTS.slice(1).map((c, i) => (
      <Flash key={c} at={c} strength={i % 3 === 2 ? 0.55 : 0.22} />
    ))}
    <Flash at={EDIT_SHOTS_END} strength={0.6} />
    <SfxAudio src={staticFile("audio/sfx-edit.wav")} />
  </Shell>
);
