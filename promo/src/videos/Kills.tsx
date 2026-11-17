/**
 * TikTok #29 — « 10 kills en 10 secondes » : vrais kills de la communauté (Overwatch + Valorant), repérés dans le fil
 * d'éliminations de chaque clip (pseudos floutés). Compteur qui monte au moment où le kill s'affiche.
 * 0–45 accroche · 45–363 enchaînement · 363–420 « 10/10 » · 420–510 carte de fin
 */
import React from "react";
import { AbsoluteFill, Freeze, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { GameVideo, SfxAudio } from "../safe";
import { FONT, Flash, clamp, easeOut } from "../components";
import { EndCard, Shell } from "../memes";

const PINK = "#FF5FA2";
// dur in frames; kills = local frames where the kill appears in the feed
const SHOTS = [
  { src: "k1", dur: 30, kills: [27] },
  { src: "k2", dur: 30, kills: [27] },
  { src: "k3", dur: 30, kills: [27] },
  { src: "k4", dur: 33, kills: [30] },
  { src: "k5", dur: 33, kills: [30] },
  { src: "k6", dur: 33, kills: [30] },
  { src: "k7", dur: 63, kills: [30, 60] },
  { src: "k8", dur: 33, kills: [30] },
  { src: "k9", dur: 33, kills: [30] },
];
const START = 45;
const starts = SHOTS.reduce<number[]>((acc, s, i) => [...acc, i ? acc[i - 1] + SHOTS[i - 1].dur : START], []);
export const KILL_FRAMES = SHOTS.flatMap((s, i) => s.kills.map((k) => starts[i] + k));
const BODY_END = starts[starts.length - 1] + SHOTS[SHOTS.length - 1].dur;
export const KILLS_TOTAL = BODY_END + 57 + 90;

const Counter: React.FC = () => {
  const f = useCurrentFrame();
  const n = KILL_FRAMES.filter((k) => f >= k).length;
  const last = Math.max(...KILL_FRAMES.filter((k) => f >= k), -100);
  const pop = interpolate(f - last, [0, 8], [1.35, 1], { ...clamp, easing: easeOut });
  const secs = Math.max(0, (f - START) / 30);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", top: 1440, width: "100%", textAlign: "center" }}>
        <span style={{ display: "inline-block", fontFamily: FONT.display, fontWeight: 800, fontSize: 120, color: "#fff", transform: `scale(${pop})`, textShadow: `0 0 30px ${PINK}` }}>{n}</span>
        <span style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 56, color: "rgba(255,255,255,0.6)" }}>/10</span>
        <div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 26, letterSpacing: 4, color: PINK }}>KILLS · {secs.toFixed(1).replace(".", ",")} s</div>
      </div>
    </AbsoluteFill>
  );
};

const Shot: React.FC<{ s: (typeof SHOTS)[number] }> = ({ s }) => {
  const f = useCurrentFrame();
  const hit = Math.min(...s.kills.map((k) => (f >= k ? f - k : 99)));
  const z = 1.18 + (hit < 6 ? (6 - hit) * 0.025 : 0);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ transform: "scale(1.3)", filter: "blur(40px) brightness(0.4)" }}>
        <GameVideo src={staticFile(`clips/g/${s.src}.mp4`)} sound={false} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>
      <div style={{ position: "absolute", left: 0, top: 420, width: 1080, height: 960, overflow: "hidden" }}>
        <div style={{ width: "100%", height: "100%", transform: `scale(${z})` }}>
          <GameVideo src={staticFile(`clips/g/${s.src}.mp4`)} volume={0.6} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        {hit < 8 && <AbsoluteFill style={{ boxShadow: `inset 0 0 0 ${12 - hit}px ${PINK}` }} />}
      </div>
    </AbsoluteFill>
  );
};

const Title: React.FC<{ big?: boolean }> = ({ big }) => (
  <div style={{ position: "absolute", top: big ? 760 : 300, width: "100%", textAlign: "center", padding: "0 140px" }}>
    <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: big ? 84 : 52, color: "#fff", letterSpacing: -1, textShadow: "0 3px 16px rgba(0,0,0,0.8)" }}>10 kills</div>
    <div style={{ fontFamily: FONT.elegant, fontStyle: "italic", fontWeight: 700, fontSize: big ? 80 : 50, color: PINK }}>en 10 secondes</div>
  </div>
);

export const KillsVideo: React.FC = () => (
  <Shell hideBugFrom={BODY_END + 57} brand="center">
    <AbsoluteFill style={{ background: "#0B0A10" }} />
    <Sequence durationInFrames={START}>
      <AbsoluteFill style={{ filter: "blur(10px) brightness(0.6)" }}>
        <Freeze frame={0}>
          <Shot s={SHOTS[0]} />
        </Freeze>
      </AbsoluteFill>
      <Title big />
    </Sequence>
    {SHOTS.map((s, i) => (
      <Sequence key={s.src} from={starts[i]} durationInFrames={s.dur}>
        <Shot s={s} />
      </Sequence>
    ))}
    <Sequence from={START} durationInFrames={BODY_END - START}>
      <Title />
    </Sequence>
    <Sequence from={BODY_END} durationInFrames={57}>
      <AbsoluteFill style={{ filter: "saturate(0.3) brightness(0.55)" }}>
        <Freeze frame={SHOTS[8].dur - 1}>
          <Shot s={SHOTS[8]} />
        </Freeze>
      </AbsoluteFill>
      <div style={{ position: "absolute", top: 780, width: "100%", textAlign: "center", fontFamily: FONT.elegant, fontStyle: "italic", fontWeight: 700, fontSize: 80, color: "#fff" }}>c'est carré.</div>
    </Sequence>
    <Sequence durationInFrames={BODY_END + 57}>
      <Counter />
    </Sequence>
    <Sequence from={BODY_END + 57} durationInFrames={90}>
      <EndCard big="viens jouer" small="ta team t'attend en voc" />
    </Sequence>
    {KILL_FRAMES.map((k) => (
      <Flash key={k} at={k} strength={0.25} color={PINK} />
    ))}
    <Flash at={BODY_END + 57} strength={0.6} />
    <SfxAudio src={staticFile("audio/sfx-kills.wav")} />
  </Shell>
);
