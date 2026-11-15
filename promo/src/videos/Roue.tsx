/**
 * TikTok #19 — « on joue à quoi ce soir ? »
 * LOOK : JEU TÉLÉ — fond bleu nuit, roue nacrée à 6 cases, ampoules qui clignotent, curseur doré.
 * 0–75 accroche · 75–525 3 tours × 150 (roue 60 + clip 90) · 525–615 chute · 615–705 carte de fin
 */
import React from "react";
import { AbsoluteFill, Easing, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SfxAudio } from "../safe";
import { FONT, Flash, RiseWords, clamp, easeOut, useSpring } from "../components";
import { EndCard, Meme, Shell } from "../memes";

export const ROUE_TOTAL = 705;
const SPIN = 60;
const ROUND = 150;
const GOLD = "#FFD27A";

const GAMES = ["COD", "OVERWATCH", "MARVEL RIVALS", "VALORANT", "DBD", "HEARTOPIA"];
const SEG = ["#FBD9E4", "#E7D6FF", "#BFEBD9", "#F7E3A3", "#BFE3FF", "#FFD6C2"];

const ROUNDS = [
  { game: 1, clip: "clips/ow-roue.mp4", start: 0, meme: "memes/chat-noir-applaudit.jpg", line: "ce soir : overwatch" },
  { game: 2, clip: "clips/mr-roue.mp4", start: 0, rate: 0.95, meme: "memes/chat-appelle-moi.jpg", line: "ce soir : marvel rivals" },
  { game: 4, clip: "clips/dbd-roue.mp4", start: 3, meme: "memes/chat-casque-chaise.jpg", line: "ce soir : dbd" },
];

/** rotation (deg) that brings segment g under the top pointer */
const target = (g: number) => -g * 60;
const ends: number[] = [];
ROUNDS.reduce((prev, r) => {
  let e = target(r.game);
  while (e < prev + 1080) e += 360;
  ends.push(e);
  return e;
}, 0);

const Bg: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#0D1238" }}>
      <AbsoluteFill style={{ background: `conic-gradient(from ${f * 0.6}deg at 50% 52%, #1A2266, #0D1238 12%, #1A2266 25%, #0D1238 37%, #1A2266 50%, #0D1238 62%, #1A2266 75%, #0D1238 87%, #1A2266)`, opacity: 0.8 }} />
      <AbsoluteFill style={{ background: "radial-gradient(55% 35% at 50% 52%, rgba(255,210,122,0.25), transparent 70%)" }} />
    </AbsoluteFill>
  );
};

const Wheel: React.FC<{ rot: number; win?: number }> = ({ rot, win }) => {
  const f = useCurrentFrame();
  const R = 380;
  return (
    <div style={{ position: "absolute", left: 540 - R - 40, top: 1000 - R - 40, width: (R + 40) * 2, height: (R + 40) * 2 }}>
      <svg width={(R + 40) * 2} height={(R + 40) * 2} viewBox={`${-R - 40} ${-R - 40} ${(R + 40) * 2} ${(R + 40) * 2}`}>
        <circle r={R + 30} fill="#2A1E52" stroke={GOLD} strokeWidth={8} />
        {new Array(24).fill(0).map((_, i) => {
          const a = (i / 24) * Math.PI * 2;
          const on = (i + Math.floor(f / 5)) % 2 === 0;
          return <circle key={i} cx={Math.cos(a) * (R + 16)} cy={Math.sin(a) * (R + 16)} r={8} fill={on ? "#FFF6D8" : "#8C6A2E"} />;
        })}
        <g transform={`rotate(${rot})`}>
          {GAMES.map((g, i) => {
            const a0 = ((i * 60 - 30 - 90) * Math.PI) / 180;
            const a1 = ((i * 60 + 30 - 90) * Math.PI) / 180;
            const hl = win === i && Math.floor(f / 6) % 2 === 0;
            return (
              <g key={g}>
                <path d={`M0 0 L${Math.cos(a0) * R} ${Math.sin(a0) * R} A${R} ${R} 0 0 1 ${Math.cos(a1) * R} ${Math.sin(a1) * R} Z`} fill={hl ? "#FFFFFF" : SEG[i]} stroke="#fff" strokeWidth={4} />
                <g transform={`rotate(${i * 60}) translate(0 ${-R * 0.62}) rotate(90)`}>
                  <text textAnchor="middle" dominantBaseline="middle" transform="rotate(-90)" style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: g.length > 9 ? 30 : 38, fill: "#2A1E52" }}>
                    {g}
                  </text>
                </g>
              </g>
            );
          })}
          <circle r={70} fill="url(#pearl)" stroke={GOLD} strokeWidth={6} />
        </g>
        <defs>
          <radialGradient id="pearl" cx="35%" cy="30%">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="60%" stopColor="#E7D6FF" />
            <stop offset="100%" stopColor="#B9A3E8" />
          </radialGradient>
        </defs>
        <path d={`M-34 ${-R - 52} L34 ${-R - 52} L0 ${-R + 22} Z`} fill={GOLD} stroke="#2A1E52" strokeWidth={5} />
      </svg>
    </div>
  );
};

const Title: React.FC = () => (
  <div style={{ position: "absolute", top: 330, width: "100%", textAlign: "center" }}>
    <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 72, color: "#fff", letterSpacing: -2 }}>on joue à quoi</div>
    <div style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 92, color: GOLD, lineHeight: 1.05 }}>ce soir ?</div>
  </div>
);

const Round: React.FC<{ k: number }> = ({ k }) => {
  const f = useCurrentFrame();
  const r = ROUNDS[k];
  const from = k ? ends[k - 1] : 0;
  const p = interpolate(f, [0, SPIN - 6], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const rot = from + (ends[k] - from) * p;
  const card = useSpring(SPIN, 10);
  return (
    <AbsoluteFill>
      <Bg />
      <Title />
      <Wheel rot={rot} win={f >= SPIN - 6 ? r.game : undefined} />
      {f >= SPIN && (
        <>
          <AbsoluteFill style={{ background: "rgba(13,18,56,0.65)", opacity: card }} />
          <div style={{ position: "absolute", top: 640, left: 60, width: 960, height: 540, borderRadius: 30, overflow: "hidden", border: `6px solid ${GOLD}`, boxShadow: "0 0 70px rgba(255,210,122,0.5)", transform: `scale(${0.6 + 0.4 * card})`, opacity: card }}>
            <Sequence from={SPIN} layout="none">
              <OffthreadVideo src={staticFile(r.clip)} startFrom={Math.round(r.start * 30)} playbackRate={r.rate ?? 1} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </Sequence>
          </div>
          <div style={{ position: "absolute", top: 1230, width: "100%", textAlign: "center", opacity: card }}>
            <span style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 54, color: "#2A1E52", background: `linear-gradient(120deg, #FFF6D8, ${GOLD})`, padding: "16px 36px", borderRadius: 999 }}>{r.line}</span>
          </div>
          <Meme src={r.meme} at={SPIN + 20} x={k % 2 ? 190 : 890} y={1440} w={260} rotate={k % 2 ? -8 : 8} />
        </>
      )}
    </AbsoluteFill>
  );
};

const Hook: React.FC = () => {
  const s = useSpring(0, 10);
  return (
    <AbsoluteFill>
      <Bg />
      <Title />
      <div style={{ transform: `scale(${0.6 + 0.4 * s})`, transformOrigin: "540px 1000px" }}>
        <Wheel rot={useCurrentFrame() * 2} />
      </div>
    </AbsoluteFill>
  );
};

const Chute: React.FC = () => (
  <AbsoluteFill>
    <Bg />
    <div style={{ position: "absolute", top: 560, width: "100%", textAlign: "center", padding: "0 80px" }}>
      <RiseWords text="pas envie de choisir ?" start={2} stagger={2} style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 76, color: "#fff", letterSpacing: -2, lineHeight: 1.08 }} />
      <RiseWords text="y'a toujours une team en voc, sur tous les jeux" start={12} stagger={2} style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 76, color: GOLD, lineHeight: 1.12, marginTop: 14 }} />
    </div>
  </AbsoluteFill>
);

export const RoueVideo: React.FC = () => (
  <Shell hideBugFrom={615} brand="center">
    <Sequence durationInFrames={75}>
      <Hook />
    </Sequence>
    {ROUNDS.map((_, k) => (
      <Sequence key={k} from={75 + k * ROUND} durationInFrames={ROUND}>
        <Round k={k} />
      </Sequence>
    ))}
    <Sequence from={525} durationInFrames={90}>
      <Chute />
    </Sequence>
    <Sequence from={615} durationInFrames={90}>
      <EndCard big="choisis ton jeu" small="la team est déjà en voc" />
    </Sequence>
    {ROUNDS.map((_, k) => (
      <Flash key={k} at={75 + k * ROUND + SPIN} strength={0.45} color={GOLD} />
    ))}
    <Flash at={525} strength={0.4} />
    <Flash at={615} strength={0.6} />
    <SfxAudio src={staticFile("audio/sfx-roue.wav")} />
  </Shell>
);
