/**
 * TikTok #12 — « les sons de discord qui nous font quelque chose »
 * LOOK : NÉON BLURPLE — fond bleu-violet, grand visualiseur audio circulaire qui réagit au son.
 * (Sons recréés, pas les sons officiels.)
 * 0–60 accroche · 60–360 4 sons × 75 · 360–450 carte de fin
 */
import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, interpolate, random, staticFile, useCurrentFrame } from "remotion";
import { FONT, Flash, RiseWords, clamp, easeOut } from "../components";
import { EndCard, Shell } from "../memes";

export const SONS_TOTAL = 450;
const STEP = 75;
const HIT = 14; // frame in step where the sound plays
const BLURPLE = "#5865F2";

const SONS = [
  { title: "le son quand quelqu'une", title2: "rejoint le voc", meme: "memes/chat-yeux-coeur.jpg" },
  { title: "la notif d'un message", title2: "à 3h du mat'", meme: "memes/chat-telephone-lit.jpg" },
  { title: "le son quand tu réalises", title2: "que t'étais mute", meme: "memes/chat-choque.jpg" },
  { title: "le son de déco", title2: "en pleine ranked", meme: "memes/chat-qui-pleure.jpg" },
];

const Bg: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#141633" }}>
      <AbsoluteFill style={{ background: `radial-gradient(60% 40% at 50% ${45 + 3 * Math.sin(f / 20)}%, ${BLURPLE}88, transparent 70%)` }} />
      <AbsoluteFill style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 2px, transparent 2.5px)", backgroundSize: "40px 40px" }} />
    </AbsoluteFill>
  );
};

/** Circular visualizer: bars around a ring, energy spikes when the sound hits. */
const Visualizer: React.FC<{ energy: number; cx?: number; cy?: number }> = ({ energy, cx = 540, cy = 960 }) => {
  const f = useCurrentFrame();
  const N = 64;
  const R = 230;
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
      <circle cx={cx} cy={cy} r={R - 20} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth={4} />
      {new Array(N).fill(0).map((_, i) => {
        const a = (i / N) * Math.PI * 2;
        const len = 18 + (random(`v${i}-${Math.floor(f / 2)}`) * 40 + 30 * Math.abs(Math.sin(i / 4 + f / 6))) * (0.35 + 1.6 * energy);
        const x1 = cx + Math.cos(a) * R;
        const y1 = cy + Math.sin(a) * R;
        const x2 = cx + Math.cos(a) * (R + len);
        const y2 = cy + Math.sin(a) * (R + len);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={i % 2 ? "#fff" : "#B9C0FF"} strokeWidth={10} strokeLinecap="round" />;
      })}
    </svg>
  );
};

const Hook: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <Visualizer energy={0.3 + 0.2 * Math.abs(Math.sin(f / 8))} cy={1250} />
      <div style={{ position: "absolute", top: 420, width: "100%", textAlign: "center", padding: "0 60px" }}>
        <RiseWords text="les sons de discord" start={2} style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 92, color: "#fff", letterSpacing: -3, lineHeight: 1.05 }} />
        <RiseWords text="qui nous font quelque chose" start={10} stagger={2} style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 92, color: "#B9C0FF", lineHeight: 1.08, marginTop: 8 }} />
      </div>
      <div style={{ position: "absolute", top: 1220, width: "100%", textAlign: "center", fontFamily: FONT.mono, fontWeight: 700, fontSize: 30, color: "#fff", letterSpacing: 4 }}>METS LE SON</div>
    </AbsoluteFill>
  );
};

const Sounds: React.FC = () => {
  const f = useCurrentFrame();
  const i = Math.min(SONS.length - 1, Math.floor(f / STEP));
  const lf = f - i * STEP;
  const s = SONS[i];
  const energy = Math.max(0.15, Math.exp(-Math.max(0, lf - HIT) / 8) * (lf >= HIT ? 1 : 0));
  const memeIn = interpolate(lf, [HIT + 4, HIT + 14], [0, 1], { ...clamp, easing: easeOut });
  return (
    <AbsoluteFill>
      <Bg />
      <div style={{ position: "absolute", top: 300, width: "100%", textAlign: "center", fontFamily: FONT.mono, fontWeight: 700, fontSize: 34, letterSpacing: 6, color: "#B9C0FF" }}>
        SON {i + 1} / 4
      </div>
      <div key={i} style={{ position: "absolute", top: 380, width: "100%", textAlign: "center", padding: "0 60px" }}>
        <RiseWords text={s.title} start={i * STEP + 2} stagger={2} style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 66, color: "#fff", letterSpacing: -2 }} />
        <RiseWords text={s.title2} start={i * STEP + 6} stagger={2} style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 92, color: "#B9C0FF" }} />
      </div>
      <Visualizer energy={energy} cy={1080} />
      <div style={{ position: "absolute", left: 540, top: 1080, transform: `translate(-50%, -50%) scale(${0.4 + 0.6 * memeIn})`, opacity: memeIn, width: 380, height: 380, borderRadius: 999, overflow: "hidden", border: "8px solid #fff", boxShadow: `0 0 60px ${BLURPLE}` }}>
        <Img src={staticFile(s.meme)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
    </AbsoluteFill>
  );
};

export const SonsVideo: React.FC = () => (
  <Shell hideBugFrom={360}>
    <Sequence durationInFrames={60}>
      <Hook />
    </Sequence>
    <Sequence from={60} durationInFrames={300}>
      <Sounds />
    </Sequence>
    <Sequence from={360} durationInFrames={90}>
      <EndCard big="viens les entendre" small="chez nous, en voc" />
    </Sequence>
    {SONS.map((_, i) => (
      <Flash key={i} at={60 + i * STEP + HIT} strength={0.3} color="#5865F2" />
    ))}
    <Flash at={360} strength={0.6} />
    <Audio src={staticFile("audio/sfx-sons.wav")} />
  </Shell>
);
