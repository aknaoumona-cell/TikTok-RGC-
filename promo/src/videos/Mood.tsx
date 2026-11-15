/**
 * TikTok #23 — « 1 jeu = 1 mood »
 * LOOK : MOODBOARD POLAROID — papier crème, ruban adhésif, polaroid du clip, gros mot « mood » écrit en italique.
 * 0–90 accroche · 90–450 3 moods × 120 · 450–540 chute · 540–630 carte de fin
 */
import React from "react";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame } from "remotion";
import { GameVideo, SfxAudio } from "../safe";
import { FONT, Flash, RiseWords, useSpring } from "../components";
import { EndCard, Meme, Shell } from "../memes";

export const MOOD_TOTAL = 630;
const STEP = 120;
const INK = "#2E2433";

const MOODS = [
  { game: "VALORANT", mood: "concentration max", sub: "personne me parle pendant la phase d'achat", clip: "clips/val-mood.mp4", start: 0, tint: "#FFD3D8", meme: "memes/chat-cagoule.jpg" },
  { game: "DEAD BY DAYLIGHT", mood: "parano", sub: "je chuchote alors que le tueur m'entend pas", clip: "clips/dbd-mood.mp4", start: 0, tint: "#D9D2F2", meme: "memes/chat-flou-choque.jpg" },
  { game: "HEARTOPIA", mood: "zéro stress", sub: "le jeu qu'on lance après une ranked ratée", clip: "clips/heartopia-mood.mp4", start: 2, tint: "#CFF0DF", meme: "memes/chat-detente.jpg" },
];

const Paper: React.FC<{ tint?: string }> = ({ tint = "#F6EFE4" }) => (
  <AbsoluteFill style={{ background: "#F6EFE4" }}>
    <AbsoluteFill style={{ background: `radial-gradient(70% 50% at 50% 45%, ${tint}, transparent 75%)` }} />
    <AbsoluteFill style={{ backgroundImage: "linear-gradient(rgba(46,36,51,0.05) 2px, transparent 2px)", backgroundSize: "100% 64px" }} />
  </AbsoluteFill>
);

const Tape: React.FC<{ x: number; y: number; r: number }> = ({ x, y, r }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 190, height: 54, background: "rgba(231,214,255,0.75)", transform: `rotate(${r}deg)`, boxShadow: "0 2px 6px rgba(0,0,0,0.08)" }} />
);

const MoodCard: React.FC<{ m: (typeof MOODS)[number]; n: number }> = ({ m, n }) => {
  const f = useCurrentFrame();
  const s = useSpring(0, 11);
  const rot = n % 2 ? 3 : -3;
  return (
    <AbsoluteFill>
      <Paper tint={m.tint} />
      <div style={{ position: "absolute", top: 320, width: "100%", textAlign: "center", fontFamily: FONT.mono, fontWeight: 700, fontSize: 34, letterSpacing: 8, color: INK, opacity: 0.7 }}>{m.game}</div>
      <div style={{ position: "absolute", top: 400, left: 110, width: 860, background: "#fff", padding: "26px 26px 30px", boxShadow: "0 22px 50px rgba(46,36,51,0.25)", transform: `rotate(${rot + (1 - s) * 8}deg) translateY(${(1 - s) * 120}px)`, opacity: s }}>
        <div style={{ width: "100%", height: 484, overflow: "hidden", background: "#000" }}>
          <GameVideo src={staticFile(m.clip)} startFrom={Math.round(m.start * 30)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 40, color: INK, marginTop: 16 }}>mood : {m.mood}</div>
      </div>
      <Tape x={420} y={372} r={-4 + rot} />
      <div style={{ position: "absolute", top: 1150, width: "100%", textAlign: "center", padding: "0 90px" }}>
        <RiseWords text={m.mood} start={8} stagger={2} style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 110, color: INK, lineHeight: 1.02 }} />
        <RiseWords text={m.sub} start={16} stagger={2} style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 44, color: "#6B5873", lineHeight: 1.25, marginTop: 14 }} />
      </div>
      <Meme src={m.meme} at={30} x={n % 2 ? 180 : 900} y={1560} w={240} rotate={n % 2 ? -8 : 8} />
    </AbsoluteFill>
  );
};

const Hook: React.FC = () => (
  <AbsoluteFill>
    <Paper tint="#EADFFF" />
    <div style={{ position: "absolute", top: 560, width: "100%", textAlign: "center" }}>
      <RiseWords text="1 jeu" start={2} style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 150, color: INK, letterSpacing: -5, lineHeight: 1 }} />
      <RiseWords text="=" start={8} style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 110, color: "#9B6BE0", lineHeight: 1.1 }} />
      <RiseWords text="1 mood" start={12} style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 190, color: INK, lineHeight: 1 }} />
    </div>
  </AbsoluteFill>
);

const Chute: React.FC = () => (
  <AbsoluteFill>
    <Paper tint="#EADFFF" />
    <div style={{ position: "absolute", top: 600, width: "100%", textAlign: "center", padding: "0 80px" }}>
      <RiseWords text="et toi, c'est quoi ton mood ce soir ?" start={2} stagger={2} style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 70, color: INK, letterSpacing: -2, lineHeight: 1.1 }} />
      <RiseWords text="viens le partager en voc" start={14} stagger={2} style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 86, color: "#9B6BE0", lineHeight: 1.1, marginTop: 18 }} />
    </div>
  </AbsoluteFill>
);

export const MoodVideo: React.FC = () => (
  <Shell hideBugFrom={540} brand="center" ink="dark">
    <Sequence durationInFrames={90}>
      <Hook />
    </Sequence>
    {MOODS.map((m, i) => (
      <Sequence key={i} from={90 + i * STEP} durationInFrames={STEP}>
        <MoodCard m={m} n={i} />
      </Sequence>
    ))}
    <Sequence from={450} durationInFrames={90}>
      <Chute />
    </Sequence>
    <Sequence from={540} durationInFrames={90}>
      <EndCard big="partage ton mood" small="communauté gaming 100% filles" />
    </Sequence>
    {MOODS.map((_, i) => (
      <Flash key={i} at={90 + i * STEP} strength={0.3} color="#fff" />
    ))}
    <Flash at={450} strength={0.3} />
    <Flash at={540} strength={0.6} />
    <SfxAudio src={staticFile("audio/sfx-mood.wav")} />
  </Shell>
);
