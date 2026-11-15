/**
 * TikTok #18 — « Among Us entre filles : t'es laquelle ? »
 * LOOK : ÉCRAN DE VOTE PASTEL — fond lilas clair, tablette arrondie avec le clip, carte de vote qui se coche.
 * 0–90 accroche · 90–510 4 types × 105 · 510–600 carte de fin
 */
import React from "react";
import { AbsoluteFill, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { GameVideo, SfxAudio } from "../safe";
import { FONT, Flash, RiseWords, clamp, easeOut, useSpring } from "../components";
import { EndCard, Meme, Shell } from "../memes";

export const AMONG_TOTAL = 600;
const STEP = 105;
const INK = "#2A2140";
const COLS = ["#FF8FB1", "#8FD3FF", "#B8F2A0", "#C9A7FF"];

const TYPES = [
  { t: "celle qui vote au hasard", s: "(et c'est souvent juste)", clip: "clips/among-cafet.mp4", start: 0, meme: "memes/chat-noir-chargement.jpg" },
  { t: "celle qui se défend trop fort", s: "(elle était innocente en plus)", clip: "clips/among-cafet.mp4", start: 4.6, meme: "memes/chat-sourire-innocent.jpg" },
  { t: "celle qui fait toutes ses tâches", s: "(pendant que les autres papotent)", clip: "clips/among-taches.mp4", start: 0, meme: "memes/chat-noir-sourire.jpg" },
  { t: "l'imposteuse qui rigole en voc", s: "(et qui se grille toute seule)", clip: "clips/among-cargo.mp4", start: 0, meme: "memes/chat-noir-regard.jpg" },
];

const Bg: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #EFE6FF, #FBE9F2)" }}>
      <AbsoluteFill style={{ backgroundImage: "radial-gradient(rgba(42,33,64,0.08) 3px, transparent 3.5px)", backgroundSize: "54px 54px", backgroundPosition: `${f * 0.6}px ${f * 0.6}px` }} />
    </AbsoluteFill>
  );
};

/** Little crewmate-like bean drawn in SVG (generic shape, not game art). */
const Bean: React.FC<{ c: string; size?: number }> = ({ c, size = 60 }) => (
  <svg width={size} height={size * 1.1} viewBox="0 0 40 44">
    <rect x="2" y="16" width="8" height="18" rx="4" fill={c} stroke={INK} strokeWidth="2.5" />
    <path d="M8 40V16a12 12 0 0 1 24 0v24h-9v-6h-6v6z" fill={c} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
    <rect x="17" y="10" width="17" height="10" rx="5" fill="#CFEFFF" stroke={INK} strokeWidth="2.5" />
  </svg>
);

const Ballot: React.FC<{ active: number; lf: number }> = ({ active, lf }) => (
  <div style={{ position: "absolute", top: 1130, left: 90, right: 90, background: "#fff", borderRadius: 30, padding: "18px 22px", border: `4px solid ${INK}`, boxShadow: "0 16px 0 rgba(42,33,64,0.18)" }}>
    {TYPES.map((t, i) => {
      const on = i === active;
      const done = i < active;
      const check = on ? interpolate(lf, [40, 48], [0, 1], { ...clamp, easing: easeOut }) : done ? 1 : 0;
      return (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 18, padding: "10px 12px", borderRadius: 18, background: on ? `${COLS[i]}55` : "transparent", opacity: on || done ? 1 : 0.45 }}>
          <Bean c={COLS[i]} size={46} />
          <div style={{ flex: 1, fontFamily: FONT.body, fontWeight: 700, fontSize: 34, color: INK }}>{t.t}</div>
          <div style={{ width: 52, height: 52, borderRadius: 14, border: `3px solid ${INK}`, display: "flex", alignItems: "center", justifyContent: "center", background: check ? "#7CE0A0" : "#fff" }}>
            <svg width="30" height="30" viewBox="0 0 24 24" style={{ transform: `scale(${check})` }}>
              <path d="M5 12.5l4.5 4.5L19 7.5" stroke={INK} strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      );
    })}
  </div>
);

const Types: React.FC = () => {
  const f = useCurrentFrame();
  const i = Math.min(TYPES.length - 1, Math.floor(f / STEP));
  const lf = f - i * STEP;
  const t = TYPES[i];
  const s = useSpring(i * STEP, 10);
  return (
    <AbsoluteFill>
      <Bg />
      <div key={`h${i}`} style={{ position: "absolute", top: 320, width: "100%", textAlign: "center", padding: "0 80px" }}>
        <RiseWords text={t.t} start={i * STEP + 2} stagger={2} style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 58, color: INK, letterSpacing: -1.5, lineHeight: 1.08 }} />
        <RiseWords text={t.s} start={i * STEP + 10} stagger={2} style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 50, color: "#8A5CC9", marginTop: 6 }} />
      </div>
      <div style={{ position: "absolute", top: 560, left: 140, width: 800, height: 480, borderRadius: 36, overflow: "hidden", border: `6px solid ${INK}`, boxShadow: `0 14px 0 ${COLS[i]}`, transform: `rotate(${(1 - s) * -4}deg) scale(${0.92 + 0.08 * s})` }}>
        <Sequence key={`v${i}`} from={i * STEP} durationInFrames={STEP} layout="none">
          <GameVideo src={staticFile(t.clip)} startFrom={Math.round(t.start * 30)} playbackRate={(t as { rate?: number }).rate ?? 1} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </Sequence>
      </div>
      <Ballot active={i} lf={lf} />
      <Meme key={`m${i}`} src={t.meme} at={i * STEP + 26} until={(i + 1) * STEP} x={i % 2 ? 170 : 910} y={560} w={230} rotate={i % 2 ? -10 : 10} />
    </AbsoluteFill>
  );
};

const Hook: React.FC = () => (
  <AbsoluteFill>
    <Bg />
    <div style={{ position: "absolute", top: 520, width: "100%", textAlign: "center", padding: "0 80px" }}>
      <RiseWords text="among us entre filles" start={2} stagger={2} style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 82, color: INK, letterSpacing: -3, lineHeight: 1.05 }} />
      <RiseWords text="t'es laquelle ?" start={12} stagger={2} style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 140, color: "#8A5CC9", lineHeight: 1.1, marginTop: 10 }} />
    </div>
    <div style={{ position: "absolute", top: 1060, width: "100%", display: "flex", justifyContent: "center", gap: 30 }}>
      {COLS.map((c, i) => (
        <div key={c} style={{ transform: `translateY(${Math.sin(i + 0) * 10}px)` }}>
          <Bean c={c} size={120} />
        </div>
      ))}
    </div>
  </AbsoluteFill>
);

export const AmongVideo: React.FC = () => (
  <Shell hideBugFrom={510} brand="center" ink="dark">
    <Sequence durationInFrames={90}>
      <Hook />
    </Sequence>
    <Sequence from={90} durationInFrames={420}>
      <Types />
    </Sequence>
    <Sequence from={510} durationInFrames={90}>
      <EndCard big="viens jouer" small="on vote ensemble en voc" />
    </Sequence>
    {TYPES.map((_, i) => (
      <Flash key={i} at={90 + i * STEP} strength={0.3} color="#C9A7FF" />
    ))}
    <Flash at={510} strength={0.6} />
    <SfxAudio src={staticFile("audio/sfx-among.wav")} />
  </Shell>
);
