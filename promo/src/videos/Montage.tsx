/**
 * Montages de clips simples (le format qui a fait le plus de vues) : gameplay plein écran qui s'enchaîne vite,
 * logo RGC au milieu + une phrase (« qui veut jouer… ? »). Pas de compteur, pas de fin. Le son est ajouté dans TikTok
 * (le son du jeu reste, bas).
 */
import React from "react";
import { AbsoluteFill, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { GameVideo } from "../safe";
import { FONT, Flash, clamp } from "../components";
import { Shell } from "../memes";

type Shot = { src: string; dur?: number; rate?: number };
type Cfg = { shots: Shot[]; line1: string; line2: string };

const DEFAULT_DUR = 21;
const total = (c: Cfg) => c.shots.reduce((a, s) => a + (s.dur ?? DEFAULT_DUR), 0);

const ShotView: React.FC<{ s: Shot; i: number }> = ({ s, i }) => {
  const f = useCurrentFrame();
  const punch = interpolate(f, [0, 7], [1.18, 1.04], { ...clamp, easing: Easing.out(Easing.cubic) }) + f * 0.0015;
  const kick = f < 5 ? (5 - f) * (i % 2 ? 7 : -7) : 0;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <AbsoluteFill style={{ transform: `translateX(${kick}px) scale(${punch})` }}>
        <GameVideo src={staticFile(`clips/m/${s.src}.mp4`)} playbackRate={s.rate ?? 1} volume={0.35} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "radial-gradient(60% 45% at 50% 50%, rgba(0,0,0,0.35), transparent 75%)" }} />
    </AbsoluteFill>
  );
};

const Center: React.FC<{ c: Cfg }> = ({ c }) => {
  const f = useCurrentFrame();
  const k = interpolate(f, [0, 10], [0, 1], { ...clamp, easing: Easing.out(Easing.back(1.6)) });
  const beat = 1 + 0.04 * Math.max(0, Math.cos((f % DEFAULT_DUR) / DEFAULT_DUR * Math.PI * 2));
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", transform: `scale(${k * beat})`, padding: "0 140px", textAlign: "center" }}>
        <Img src={staticFile("brand/logo-rgc.png")} style={{ width: 300, filter: "drop-shadow(0 0 30px rgba(183,155,255,0.95)) drop-shadow(0 6px 20px rgba(0,0,0,0.6))" }} />
        <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 58, color: "#fff", letterSpacing: -1, lineHeight: 1.1, marginTop: 10, textShadow: "0 3px 18px rgba(0,0,0,0.9)" }}>{c.line1}</div>
        <div style={{ fontFamily: FONT.elegant, fontStyle: "italic", fontWeight: 700, fontSize: 62, color: "#E7D6FF", lineHeight: 1.05, textShadow: "0 0 22px rgba(183,155,255,0.9), 0 3px 14px rgba(0,0,0,0.9)" }}>{c.line2}</div>
      </div>
    </AbsoluteFill>
  );
};

const make = (c: Cfg): React.FC => {
  const starts = c.shots.reduce<number[]>((acc, s, i) => [...acc, i ? acc[i - 1] + (c.shots[i - 1].dur ?? DEFAULT_DUR) : 0], []);
  const V: React.FC = () => (
    <Shell brand="watermark">
      {c.shots.map((s, i) => (
        <Sequence key={s.src + i} from={starts[i]} durationInFrames={s.dur ?? DEFAULT_DUR}>
          <ShotView s={s} i={i} />
        </Sequence>
      ))}
      <Center c={c} />
      {starts.slice(1).map((st, i) => (
        <Flash key={st} at={st} strength={i % 4 === 3 ? 0.5 : 0.18} />
      ))}
    </Shell>
  );
  return V;
};

/* ---------- multi-jeux ---------- */
const MULTI: Cfg = {
  line1: "qui veut jouer",
  line2: "avec nous ?",
  shots: ["x01", "o09", "v06", "x05", "x12", "o08", "x03", "v07", "x10", "x15", "x07", "v12", "x14", "o10", "x02", "x13", "x08", "v01", "x11", "x04", "x06", "o12", "x16", "x09"].map((src) => ({ src })),
};
export const MONTAGE_MULTI_TOTAL = total(MULTI);
export const MontageMulti = make(MULTI);

/* ---------- Valorant ---------- */
const VALO: Cfg = {
  line1: "qui joue",
  line2: "à valorant ?",
  shots: ["v02", "v08", "v03", "v09", "v13", "v04", "v10", "v05", "v11"].flatMap((src, i) => [{ src, dur: i % 3 === 2 ? 30 : 24 }]),
};
export const MONTAGE_VALO_TOTAL = total(VALO);
export const MontageValo = make(VALO);

/* ---------- Overwatch ---------- */
const OW: Cfg = {
  line1: "qui joue",
  line2: "à overwatch ?",
  shots: ["o01", "o11", "o02", "o04", "o13", "o03", "o05", "o14", "o06", "o07"].map((src, i) => ({ src, dur: i % 3 === 1 ? 30 : 24 })),
};
export const MONTAGE_OW_TOTAL = total(OW);
export const MontageOw = make(OW);
