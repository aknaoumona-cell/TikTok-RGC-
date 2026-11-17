/**
 * TikTok #28 — « COD, Valorant ou Overwatch : choisis ton camp »
 * 3 manches plein cadre (une couleur par jeu), puis les 3 côte à côte : « t'es team quoi ? ».
 * 0–390 3 × 130 · 390–510 triptyque · 510–600 carte de fin
 */
import React from "react";
import { AbsoluteFill, Easing, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { GameVideo, SfxAudio } from "../safe";
import { BigClip } from "../gameplay";
import { FONT, Flash, clamp, easeOut } from "../components";
import { EndCard, Shell } from "../memes";

export const CAMP_TOTAL = 600;
const ROUND = 130;

const CAMPS = [
  { game: "CALL OF DUTY", short: "COD", color: "#FF9A3C", src: "clips/g/camp-cod.mp4", start: 3 },
  { game: "VALORANT", short: "VALO", color: "#FF4F6B", src: "clips/g/camp-val.mp4", start: 1.3 },
  { game: "OVERWATCH", short: "OW", color: "#4FB3FF", src: "clips/g/camp-ow.mp4", start: 0.6 },
];

const Round: React.FC<{ c: (typeof CAMPS)[number]; n: number }> = ({ c, n }) => {
  const f = useCurrentFrame();
  const k = interpolate(f, [0, 10], [0, 1], { ...clamp, easing: easeOut });
  return (
    <AbsoluteFill>
      <BigClip src={c.src} start={c.start} height={1120}>
        <AbsoluteFill style={{ boxShadow: `inset 0 0 0 10px ${c.color}` }} />
      </BigClip>
      <AbsoluteFill style={{ background: `linear-gradient(180deg, ${c.color}55, transparent 22%, transparent 80%, ${c.color}55)` }} />
      <div style={{ position: "absolute", top: 300, width: "100%", textAlign: "center", opacity: k, transform: `translateY(${(1 - k) * 20}px)` }}>
        <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 64, color: c.color, letterSpacing: -1, textShadow: "0 3px 18px rgba(0,0,0,0.8)" }}>TEAM {c.short}</div>
      </div>
    </AbsoluteFill>
  );
};

const Triptych: React.FC = () => {
  const f = useCurrentFrame();
  const W = 260;
  const GAP = 20;
  const X0 = (1080 - (W * 3 + GAP * 2)) / 2;
  return (
    <AbsoluteFill style={{ background: "radial-gradient(80% 60% at 50% 45%, #241E33, #0B0A10)" }}>
      <div style={{ position: "absolute", top: 300, width: "100%", textAlign: "center", padding: "0 140px" }}>
        <div style={{ fontFamily: FONT.elegant, fontStyle: "italic", fontWeight: 700, fontSize: 76, color: "#fff" }}>t'es team quoi ?</div>
        <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 32, color: "rgba(244,236,255,0.8)", opacity: interpolate(f, [30, 40], [0, 1], clamp) }}>réponds en commentaire</div>
      </div>
      {CAMPS.map((c, i) => {
        const k = interpolate(f - i * 8, [0, 14], [0, 1], { ...clamp, easing: Easing.out(Easing.back(1.5)) });
        return (
          <div key={c.short} style={{ position: "absolute", left: X0 + i * (W + GAP), top: 560, width: W, height: 820, borderRadius: 28, overflow: "hidden", border: `5px solid ${c.color}`, boxShadow: `0 0 40px ${c.color}66`, transform: `translateY(${(1 - k) * 200}px)`, opacity: k }}>
            <GameVideo src={staticFile(c.src)} startFrom={Math.round((c.start + 1) * 30)} sound={false} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "18px 0", textAlign: "center", background: c.color, fontFamily: FONT.display, fontWeight: 800, fontSize: 34, color: "#111" }}>{c.short}</div>
          </div>
        );
      })}
      <div style={{ position: "absolute", top: 1430, width: "100%", textAlign: "center", fontFamily: FONT.body, fontWeight: 700, fontSize: 34, color: "#F4ECFF", opacity: interpolate(f, [50, 62], [0, 1], clamp) }}>sur le serveur, y'a une team pour chacune</div>
    </AbsoluteFill>
  );
};

export const CampVideo: React.FC = () => (
  <Shell hideBugFrom={510} brand="center">
    {CAMPS.map((c, i) => (
      <Sequence key={c.short} from={i * ROUND} durationInFrames={ROUND}>
        <Round c={c} n={i + 1} />
      </Sequence>
    ))}
    <Sequence from={390} durationInFrames={120}>
      <Triptych />
    </Sequence>
    <Sequence from={510} durationInFrames={90}>
      <EndCard big="choisis ta team" small="communauté gaming 100% filles" />
    </Sequence>
    {CAMPS.map((c, i) => (
      <Flash key={c.short} at={i * ROUND} strength={0.4} color={c.color} />
    ))}
    <Flash at={390} strength={0.5} />
    <Flash at={510} strength={0.6} />
    <SfxAudio src={staticFile("audio/sfx-camp.wav")} />
  </Shell>
);
