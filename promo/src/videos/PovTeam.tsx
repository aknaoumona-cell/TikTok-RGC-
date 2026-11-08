/**
 * TikTok #9 — « pov : t'as enfin trouvé des mates qui jouent à la même heure que toi »
 * LOOK : SCRAPBOOK — papier crème, polaroids scotchés qui s'empilent, heures au feutre.
 * 0–60 accroche · 60–360 4 moments × 75 · 360–450 carte de fin
 */
import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { COLORS } from "../config";
import { FONT, Flash, RiseWords, clamp, easeOut, useSpring } from "../components";
import { EndCard, Shell } from "../memes";

export const POVTEAM_TOTAL = 450;
const STEP = 75;
const INK = "#2A2230";

const MOMENTS = [
  { time: "22:47", text: "tu rejoins le voc, un peu stressée", img: "memes/chat-nervous-gulp.jpg", x: 330, y: 760, r: -6 },
  { time: "23:30", text: "premier fou rire. t'as oublié que tu les connaissais pas", img: "ingame/overwatch-select.jpg", x: 740, y: 820, r: 5 },
  { time: "01:12", text: "« allez une dernière » (c'était pas la dernière)", img: "memes/chat-casque-rose.jpg", x: 360, y: 900, r: 4 },
  { time: "le lendemain", text: "« on se refait une game ce soir ? »", img: "memes/chat-noeud-coeurs.jpg", x: 720, y: 960, r: -5 },
];

const Paper: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ background: "#F3ECE2" }}>
    <AbsoluteFill style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(120,100,90,0.06) 0 2px, transparent 2px 58px)" }} />
    <AbsoluteFill style={{ background: "radial-gradient(120% 80% at 50% 40%, transparent 60%, rgba(120,90,70,0.18))" }} />
    {children}
  </AbsoluteFill>
);

const Polaroid: React.FC<{ img: string; at: number; x: number; y: number; r: number; caption?: string; w?: number }> = ({ img, at, x, y, r, caption, w = 440 }) => {
  const f = useCurrentFrame();
  const s = useSpring(at, 11);
  if (f < at) return null;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, transform: `translate(-50%, -50%) rotate(${r + (1 - s) * 18}deg) scale(${0.6 + 0.4 * s})`, opacity: s, background: "#fff", padding: "22px 22px 80px", boxShadow: "0 18px 40px rgba(60,40,30,0.25)" }}>
      <div style={{ width: "100%", aspectRatio: "1 / 1", overflow: "hidden", background: "#ddd" }}>
        <Img src={staticFile(img)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      {caption && <div style={{ position: "absolute", left: 22, right: 22, bottom: 18, fontFamily: FONT.serif, fontStyle: "italic", fontSize: 34, color: INK, textAlign: "center" }}>{caption}</div>}
      <div style={{ position: "absolute", top: -22, left: "50%", width: 150, height: 44, transform: "translateX(-50%) rotate(-4deg)", background: "rgba(246,193,209,0.75)" }} />
    </div>
  );
};

const Hook: React.FC = () => (
  <Paper>
    <div style={{ position: "absolute", top: 400, width: "100%", padding: "0 80px" }}>
      <RiseWords text="pov :" start={2} style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 48, color: COLORS.lilacDeep, justifyContent: "flex-start" }} />
      <RiseWords text="t'as enfin trouvé des mates qui jouent à la même heure que toi" start={6} stagger={2} style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 92, color: INK, lineHeight: 1.08, justifyContent: "flex-start", marginTop: 10 }} />
    </div>
    <Polaroid img="memes/girly-doigt-dent.jpg" at={20} x={720} y={1370} r={6} w={400} />
  </Paper>
);

const Moments: React.FC = () => {
  const f = useCurrentFrame();
  const i = Math.min(MOMENTS.length - 1, Math.floor(f / STEP));
  const lf = f - i * STEP;
  const m = MOMENTS[i];
  const mark = interpolate(lf, [4, 14], [0, 1], { ...clamp, easing: easeOut });
  return (
    <Paper>
      {MOMENTS.slice(0, i + 1).map((p, k) => (
        <div key={k} style={{ opacity: k < i ? 0.55 : 1 }}>
          <Polaroid img={p.img} at={k * STEP + 2} x={p.x} y={p.y} r={p.r} />
        </div>
      ))}
      <div style={{ position: "absolute", top: 300, width: "100%", textAlign: "center" }}>
        <span style={{ position: "relative", display: "inline-block", fontFamily: FONT.display, fontWeight: 800, fontSize: 96, color: INK, letterSpacing: -3 }}>
          <span style={{ position: "absolute", left: -16, right: -16, bottom: 10, height: 40, background: COLORS.blush, transform: `scaleX(${mark}) rotate(-2deg)`, transformOrigin: "left", zIndex: 0 }} />
          <span style={{ position: "relative" }}>{m.time}</span>
        </span>
      </div>
      <div key={i} style={{ position: "absolute", top: 1330, width: "100%", padding: "0 70px", textAlign: "center" }}>
        <RiseWords text={m.text} start={i * STEP + 8} stagger={2} style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 70, color: INK, lineHeight: 1.12 }} />
      </div>
      {i === MOMENTS.length - 1 && lf > 40 && (
        <div style={{ position: "absolute", top: 1560, width: "100%", textAlign: "center", fontFamily: FONT.display, fontWeight: 800, fontSize: 52, color: COLORS.lilacDeep, opacity: interpolate(lf, [40, 48], [0, 1], clamp) }}>
          et là t'as compris : t'as une team.
        </div>
      )}
    </Paper>
  );
};

export const PovTeamVideo: React.FC = () => (
  <Shell hideBugFrom={360} ink="dark">
    <Sequence durationInFrames={60}>
      <Hook />
    </Sequence>
    <Sequence from={60} durationInFrames={300}>
      <Moments />
    </Sequence>
    <Sequence from={360} durationInFrames={90}>
      <EndCard big="trouve ta team" small="communauté gaming 100% filles" />
    </Sequence>
    <Flash at={360} strength={0.6} />
    <Audio src={staticFile("audio/sfx-povteam.wav")} />
  </Shell>
);
