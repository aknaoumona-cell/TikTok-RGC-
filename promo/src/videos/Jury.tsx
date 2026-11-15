/**
 * TikTok #22 — « note ce clutch de 0 à 10 »
 * LOOK : JURY TÉLÉ — rideau de velours bordeaux, projecteur, clip dans un cadre doré, 3 panneaux de notes qui se lèvent.
 * 0–90 accroche · 90–630 3 clutchs × 180 (clip 90 + notes 90) · 630–720 carte de fin
 */
import React from "react";
import { AbsoluteFill, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { GameVideo, SfxAudio } from "../safe";
import { FONT, Flash, RiseWords, clamp, easeOut, useSpring } from "../components";
import { EndCard, Meme, Shell } from "../memes";

export const JURY_TOTAL = 720;
const STEP = 180;
const NOTES_AT = 90;
const GOLD = "#F4C76B";

const CLUTCHS = [
  { clip: "clips/cod-clutch-rose.mp4", start: 4.5, game: "COD", scores: [["aura", "10"], ["skin rose", "11"], ["humilité", "2"]], meme: "memes/chat-pouce.jpg" },
  { clip: "clips/val-parfait.mp4", start: 2.3, game: "VALORANT", scores: [["précision", "9"], ["sang-froid", "10"], ["cri en voc", "10"]], meme: "memes/chat-lunettes-pouce.jpg" },
  { clip: "clips/lol-teamfight.mp4", start: 0, game: "LOL", scores: [["teamfight", "10"], ["survie", "2"], ["triple kill", "11"]], meme: "memes/chat-tigre-juge.jpg" },
];

const Curtain: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#2A0610" }}>
      <AbsoluteFill style={{ backgroundImage: "repeating-linear-gradient(90deg, #5A0C1F 0 40px, #3A0714 40px 70px, #6B1027 70px 90px)", opacity: 0.85 }} />
      <AbsoluteFill style={{ background: `radial-gradient(45% 35% at 50% ${42 + 2 * Math.sin(f / 25)}%, rgba(255,235,190,0.35), transparent 70%)` }} />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.5), transparent 25%, transparent 70%, rgba(0,0,0,0.6))" }} />
    </AbsoluteFill>
  );
};

const Paddle: React.FC<{ label: string; score: string; at: number; i: number }> = ({ label, score, at, i }) => {
  const f = useCurrentFrame();
  const up = interpolate(f - at, [0, 8], [0, 1], { ...clamp, easing: easeOut });
  const flip = interpolate(f - at, [4, 12], [90, 0], clamp);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", transform: `translateY(${(1 - up) * 300}px) rotate(${(i - 1) * 5}deg)` }}>
      <div style={{ width: 250, height: 220, borderRadius: 26, background: "#FFF8EC", border: `8px solid ${GOLD}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transform: `rotateX(${flip}deg)`, boxShadow: "0 18px 40px rgba(0,0,0,0.5)" }}>
        <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 104, color: "#2A0610", lineHeight: 1 }}>{score}</div>
        <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 30, color: "#7A2B3E", marginTop: 8 }}>{label}</div>
      </div>
      <div style={{ width: 16, height: 120, background: "linear-gradient(90deg, #8C5A1E, #D6A050, #8C5A1E)", borderRadius: 8 }} />
    </div>
  );
};

const Clutch: React.FC<{ c: (typeof CLUTCHS)[number]; n: number }> = ({ c, n }) => {
  const f = useCurrentFrame();
  const s = useSpring(0, 10);
  const shrink = interpolate(f, [NOTES_AT - 6, NOTES_AT + 6], [1, 0.78], { ...clamp, easing: easeOut });
  return (
    <AbsoluteFill>
      <Curtain />
      <div style={{ position: "absolute", top: 320, width: "100%", textAlign: "center" }}>
        <div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 32, letterSpacing: 6, color: GOLD }}>CLUTCH · {c.game}</div>
        <div style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 76, color: "#fff", marginTop: 4 }}>{f < NOTES_AT ? "le jury regarde…" : "les notes du jury"}</div>
      </div>
      <div style={{ position: "absolute", top: 520, left: 60, width: 960, height: 540, transform: `scale(${(0.85 + 0.15 * s) * shrink})`, transformOrigin: "50% 0%" }}>
        <div style={{ width: "100%", height: "100%", borderRadius: 20, overflow: "hidden", border: `10px solid ${GOLD}`, boxShadow: "0 0 60px rgba(244,199,107,0.45)" }}>
          <GameVideo src={staticFile(c.clip)} startFrom={Math.round(c.start * 30)} playbackRate={(c as { rate?: number }).rate ?? 1} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </div>
      {f >= NOTES_AT && (
        <div style={{ position: "absolute", top: 1010, width: "100%", display: "flex", justifyContent: "center", gap: 26 }}>
          {c.scores.map(([l, sc], i) => (
            <Paddle key={l} label={l} score={sc} at={NOTES_AT + i * 10} i={i} />
          ))}
        </div>
      )}
      <Meme src={c.meme} at={NOTES_AT + 36} x={n % 2 ? 180 : 900} y={540} w={240} rotate={n % 2 ? -9 : 9} />
    </AbsoluteFill>
  );
};

const Hook: React.FC = () => (
  <AbsoluteFill>
    <Curtain />
    <div style={{ position: "absolute", top: 500, width: "100%", textAlign: "center", padding: "0 80px" }}>
      <RiseWords text="note ce clutch" start={2} stagger={2} style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 100, color: "#fff", letterSpacing: -3, lineHeight: 1.05 }} />
      <RiseWords text="de 0 à 10" start={10} stagger={2} style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 140, color: GOLD, lineHeight: 1.08 }} />
      <RiseWords text="(le jury est sévère)" start={18} stagger={2} style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 38, color: "rgba(255,255,255,0.75)", marginTop: 14, letterSpacing: 2 }} />
    </div>
    <Meme src="memes/chat-persan-assis.jpg" at={22} x={540} y={1360} w={340} rotate={-4} />
  </AbsoluteFill>
);

export const JuryVideo: React.FC = () => (
  <Shell hideBugFrom={630} brand="center">
    <Sequence durationInFrames={90}>
      <Hook />
    </Sequence>
    {CLUTCHS.map((c, i) => (
      <Sequence key={i} from={90 + i * STEP} durationInFrames={STEP}>
        <Clutch c={c} n={i} />
      </Sequence>
    ))}
    <Sequence from={630} durationInFrames={90}>
      <EndCard big="viens clutch" small="le jury t'attend en voc" />
    </Sequence>
    {CLUTCHS.map((_, i) => (
      <Flash key={i} at={90 + i * STEP} strength={0.35} color={GOLD} />
    ))}
    <Flash at={630} strength={0.6} />
    <SfxAudio src={staticFile("audio/sfx-jury.wav")} />
  </Shell>
);
