/**
 * TikTok #13 — « les green flags d'une mate de jeu »
 * LOOK : POST-ITS — fond menthe clair quadrillé, post-its colorés qui se collent un par un,
 * coche verte dessinée à la main.
 * 0–60 accroche · 60–330 5 post-its × 54 · 330–420 carte de fin
 */
import React from "react";
import {AbsoluteFill, Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SfxAudio } from "../safe";
import { COLORS } from "../config";
import { FONT, Flash, RiseWords, clamp, easeOut, useSpring } from "../components";
import { EndCard, Shell } from "../memes";

export const MATEFLAGS_TOTAL = 420;
const STEP = 54;
const INK = "#1E2A24";
const NOTE_COLORS = ["#FFF2A8", "#FFD6E2", "#D9F5E6", "#E4DAFF", "#FFE2C4"];

const FLAGS = [
  "elle te revive même quand t'as fait n'importe quoi",
  "elle dit « c'était pas ta faute » (c'était ta faute)",
  "elle reste en voc même quand elle joue plus",
  "elle hype tous tes clutch, même les ratés",
  "elle te ping quand y'a une soirée",
];

const POS = [
  { x: 300, y: 560, r: -5 },
  { x: 780, y: 640, r: 4 },
  { x: 320, y: 1000, r: 3 },
  { x: 770, y: 1080, r: -4 },
  { x: 540, y: 1420, r: 2 },
];

const Grid: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ background: "#E9F7EF" }}>
    <AbsoluteFill style={{ backgroundImage: "linear-gradient(rgba(30,42,36,0.07) 2px, transparent 2px), linear-gradient(90deg, rgba(30,42,36,0.07) 2px, transparent 2px)", backgroundSize: "54px 54px" }} />
    {children}
  </AbsoluteFill>
);

const Check: React.FC<{ p: number }> = ({ p }) => (
  <svg width="90" height="90" viewBox="0 0 90 90" style={{ position: "absolute", right: -18, top: -24 }}>
    <circle cx="45" cy="45" r="38" fill="#7CF5B5" stroke={INK} strokeWidth="5" opacity={p > 0 ? 1 : 0} />
    <path d="M26 46 L40 60 L66 30" fill="none" stroke={INK} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="70" strokeDashoffset={70 * (1 - p)} />
  </svg>
);

const Note: React.FC<{ text: string; at: number; i: number }> = ({ text, at, i }) => {
  const f = useCurrentFrame();
  const s = useSpring(at, 10);
  const check = interpolate(f - at - 14, [0, 8], [0, 1], { ...clamp, easing: easeOut });
  if (f < at) return null;
  const p = POS[i];
  return (
    <div style={{ position: "absolute", left: p.x, top: p.y, width: 440, minHeight: 300, transform: `translate(-50%, -50%) rotate(${p.r}deg) scale(${1.4 - 0.4 * s})`, opacity: Math.min(1, s * 2), background: NOTE_COLORS[i], padding: "50px 36px 36px", boxShadow: "0 16px 30px rgba(30,42,36,0.18)", fontFamily: FONT.body, fontWeight: 700, fontSize: 40, lineHeight: 1.22, color: INK }}>
      <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", width: 30, height: 30, borderRadius: 99, background: COLORS.live, boxShadow: "0 4px 6px rgba(0,0,0,0.25)" }} />
      {text}
      <Check p={check} />
    </div>
  );
};

const Hook: React.FC = () => (
  <Grid>
    <div style={{ position: "absolute", top: 520, width: "100%", textAlign: "center", padding: "0 60px" }}>
      <RiseWords text="les green flags" start={2} style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 112, color: "#1F8A5B", letterSpacing: -4 }} />
      <RiseWords text="d'une mate de jeu" start={8} style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 120, color: INK, lineHeight: 1.05 }} />
    </div>
    <div style={{ position: "absolute", top: 1080, left: 540, transform: "translateX(-50%) rotate(-3deg)", width: 520, height: 320, borderRadius: 24, overflow: "hidden", border: `8px solid ${INK}`, boxShadow: `12px 12px 0 ${INK}` }}>
      <Img src={staticFile("ingame/overwatch-mercy.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
  </Grid>
);

const Board: React.FC = () => (
  <Grid>
    <div style={{ position: "absolute", top: 300, width: "100%", textAlign: "center", fontFamily: FONT.display, fontWeight: 800, fontSize: 52, color: "#1F8A5B", letterSpacing: -1 }}>GREEN FLAGS D'UNE MATE</div>
    {FLAGS.map((t, i) => (
      <Note key={i} text={t} at={i * STEP} i={i} />
    ))}
  </Grid>
);

export const MateFlagsVideo: React.FC = () => (
  <Shell hideBugFrom={330} ink="dark">
    <Sequence durationInFrames={60}>
      <Hook />
    </Sequence>
    <Sequence from={60} durationInFrames={270}>
      <Board />
    </Sequence>
    <Sequence from={330} durationInFrames={90}>
      <EndCard big="trouve ta mate" small="communauté gaming 100% filles" />
    </Sequence>
    <Flash at={330} strength={0.6} />
    <SfxAudio src={staticFile("audio/sfx-mateflags.wav")} />
  </Shell>
);
