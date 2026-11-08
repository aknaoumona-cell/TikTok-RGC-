/**
 * TikTok #11 — « ce que je pensais vs la réalité en rejoignant un serveur entre filles »
 * LOOK : SPLIT-SCREEN haut/bas — haut gris et éteint (« ce que je pensais »),
 * bas vif et coloré (« la réalité »), barre de séparation qui claque.
 * 0–60 accroche · 60–330 3 duos × 90 · 330–420 carte de fin
 */
import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { COLORS } from "../config";
import { FONT, Flash, RiseWords, clamp, easeOut } from "../components";
import { EndCard, Shell } from "../memes";

export const REALITE_TOTAL = 420;
const STEP = 90;
const REVEAL = 34;

const PAIRS = [
  { think: "un serveur entre filles = calme et un peu mort", thinkImg: "cozy/setup-2.jpg", real: "des cris sur Among Us à 1h du mat'", realImg: "memes/barbie-rire.jpg" },
  { think: "personne va jouer à mes jeux", thinkImg: "memes/chat-stresse.jpg", real: "y'a même une catégorie « autres jeux »", realImg: "ingame/marvel-rivals-select.jpg" },
  { think: "ça va être gênant en voc", thinkImg: "memes/chat-what.jpg", real: "on parle de tout pendant 3h, même plus de la game", realImg: "memes/girly-excitee.jpg" },
];

const Half: React.FC<{ top: boolean; label: string; text: string; img: string; on: number }> = ({ top, label, text, img, on }) => {
  const y = top ? 0 : 960;
  return (
    <div style={{ position: "absolute", left: 0, top: y, width: 1080, height: 960, overflow: "hidden", background: top ? "#2A2830" : "#1A1222" }}>
      <Img src={staticFile(img)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: top ? "grayscale(1) brightness(0.45) blur(2px)" : `saturate(1.3) brightness(${0.55 + 0.1 * on})`, transform: `scale(${1.05 + (top ? 0 : 0.05 * on)})` }} />
      <div style={{ position: "absolute", inset: 0, background: top ? "rgba(40,38,46,0.35)" : "linear-gradient(180deg, rgba(110,75,184,0.35), rgba(26,18,34,0.55))" }} />
      <div style={{ position: "absolute", left: 60, right: 60, top: top ? 300 : 120 }}>
        <div style={{ display: "inline-block", fontFamily: FONT.mono, fontWeight: 700, fontSize: 30, letterSpacing: 5, padding: "10px 20px", borderRadius: 12, color: top ? "#BDB8C6" : "#1A1222", background: top ? "rgba(255,255,255,0.08)" : COLORS.blush }}>{label}</div>
        <div style={{ marginTop: 22, fontFamily: top ? FONT.serif : FONT.display, fontStyle: top ? "italic" : "normal", fontWeight: top ? 400 : 800, fontSize: top ? 74 : 72, lineHeight: 1.1, letterSpacing: top ? 0 : -2, color: top ? "#D8D4DE" : "#fff", textShadow: top ? "none" : "0 4px 24px rgba(0,0,0,0.6)" }}>{text}</div>
      </div>
    </div>
  );
};

const Hook: React.FC = () => (
  <AbsoluteFill style={{ background: "linear-gradient(180deg, #2A2830 50%, #1A1222 50%)" }}>
    <div style={{ position: "absolute", top: 560, width: "100%", textAlign: "center", padding: "0 60px" }}>
      <RiseWords text="ce que je pensais" start={2} style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 110, color: "#D8D4DE", lineHeight: 1.05 }} />
      <RiseWords text="VS" start={8} style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 60, color: COLORS.blush, margin: "20px 0" }} />
      <RiseWords text="la réalité" start={12} style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 130, color: "#fff", letterSpacing: -4, lineHeight: 1 }} />
      <RiseWords text="en rejoignant un serveur entre filles" start={18} stagger={2} style={{ fontFamily: FONT.body, fontWeight: 600, fontSize: 44, color: "rgba(255,255,255,0.8)", marginTop: 30 }} />
    </div>
  </AbsoluteFill>
);

const Pairs: React.FC = () => {
  const f = useCurrentFrame();
  const i = Math.min(PAIRS.length - 1, Math.floor(f / STEP));
  const lf = f - i * STEP;
  const p = PAIRS[i];
  const reveal = interpolate(lf, [REVEAL, REVEAL + 10], [0, 1], { ...clamp, easing: easeOut });
  const bar = interpolate(lf, [REVEAL - 2, REVEAL + 4], [0, 1], { ...clamp, easing: easeOut });
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Half top label="CE QUE JE PENSAIS" text={p.think} img={p.thinkImg} on={0} />
      <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, clipPath: `inset(960px ${(1 - reveal) * 100}% 0 0)` }}>
        <Half top={false} label="LA RÉALITÉ" text={p.real} img={p.realImg} on={reveal} />
      </div>
      <div style={{ position: "absolute", left: 0, top: 952, width: `${bar * 100}%`, height: 16, background: `linear-gradient(90deg, ${COLORS.blush}, ${COLORS.lilac})`, boxShadow: `0 0 30px ${COLORS.lilac}` }} />
    </AbsoluteFill>
  );
};

export const RealiteVideo: React.FC = () => (
  <Shell hideBugFrom={330}>
    <Sequence durationInFrames={60}>
      <Hook />
    </Sequence>
    <Sequence from={60} durationInFrames={270}>
      <Pairs />
    </Sequence>
    <Sequence from={330} durationInFrames={90}>
      <EndCard big="viens voir par toi-même" small="communauté gaming 100% filles" />
    </Sequence>
    {PAIRS.map((_, i) => (
      <Flash key={i} at={60 + i * STEP + REVEAL} strength={0.4} color="#F6C1D1" />
    ))}
    <Flash at={330} strength={0.6} />
    <Audio src={staticFile("audio/sfx-realite.wav")} />
  </Shell>
);
