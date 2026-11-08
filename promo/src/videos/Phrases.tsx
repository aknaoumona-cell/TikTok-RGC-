/**
 * TikTok #10 — « les phrases qu'on entend en voc »
 * LOOK : KARAOKÉ — fond noir, captures de jeu floutées, sous-titres qui se remplissent mot par mot,
 * barre « EN VOC » + durée d'appel, onde sonore. Phrases typiques (pas attribuées à des membres).
 * 0–60 accroche · 60–410 7 phrases × 50 · 410–500 carte de fin
 */
import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, interpolate, random, staticFile, useCurrentFrame } from "remotion";
import { COLORS } from "../config";
import { FONT, Flash, RiseWords, clamp } from "../components";
import { EndCard, Meme, Shell } from "../memes";

export const PHRASES_TOTAL = 500;
const STEP = 50;

const PHRASES = [
  { text: "attends je reviens, je vais chercher à manger", bg: "ingame/valorant-2.jpg" },
  { text: "il a un 1hp !!!", bg: "ingame/marvel-rivals-1.jpg", meme: "memes/chat-choque-main.jpg" },
  { text: "attendez, pause pipi !", bg: "ingame/valorant-reyna.jpg", meme: "memes/girly-doigt-dent.jpg" },
  { text: "qui a volé mon kill ??", bg: "ingame/overwatch-tracer.jpg", meme: "memes/chat-stress.jpg" },
  { text: "t'es mute depuis 10 minutes là", bg: "ingame/valorant-3.jpg", meme: "memes/chaton-timide.jpg" },
  { text: "allez dernière et après je dors", bg: "ingame/overwatch-dva.jpg", meme: "memes/chat-danse.jpg" },
  { text: "on est d'accord que c'était pas ma faute ?", bg: "ingame/marvel-rivals-select.jpg", meme: "memes/chat-rougit.jpg" },
];

const TopBar: React.FC<{ clock: string }> = ({ clock }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: "absolute", top: 300, width: "100%", display: "flex", justifyContent: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 28px", borderRadius: 999, background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.2)", fontFamily: FONT.mono, fontWeight: 700, fontSize: 30, color: "#fff" }}>
        <span style={{ width: 18, height: 18, borderRadius: 99, background: COLORS.live, opacity: Math.floor(f / 12) % 2 ? 0.3 : 1 }} />
        EN VOC · {clock}
      </div>
    </div>
  );
};

const Wave: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: "absolute", left: 120, right: 120, top: 1320, height: 120, display: "flex", alignItems: "center", gap: 8 }}>
      {new Array(40).fill(0).map((_, i) => {
        const h = 10 + random(`pw${i}-${Math.floor(f / 2)}`) * 90 * (0.4 + 0.6 * Math.abs(Math.sin(f / 5 + i / 3)));
        return <div key={i} style={{ flex: 1, height: h, borderRadius: 6, background: i % 2 ? COLORS.lilac : "#fff", opacity: 0.85 }} />;
      })}
    </div>
  );
};

const Karaoke: React.FC<{ text: string; lf: number }> = ({ text, lf }) => {
  const words = text.split(" ");
  const per = 26 / words.length;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0 26px", padding: "0 70px" }}>
      {words.map((w, i) => {
        const p = interpolate(lf - 4 - i * per, [0, per], [0, 1], clamp);
        return (
          <span key={i} style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 86, lineHeight: 1.12, letterSpacing: -2, backgroundImage: `linear-gradient(90deg, ${COLORS.lilac} ${p * 100}%, rgba(255,255,255,0.35) ${p * 100}%)`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", WebkitTextFillColor: "transparent", filter: p > 0 ? "drop-shadow(0 0 18px rgba(183,139,240,0.5))" : "none" }}>
            {w}
          </span>
        );
      })}
    </div>
  );
};

const Hook: React.FC = () => (
  <AbsoluteFill style={{ background: "#08070B" }}>
    <TopBar clock="00:41:08" />
    <div style={{ position: "absolute", top: 600, width: "100%", textAlign: "center", padding: "0 60px" }}>
      <RiseWords text="les phrases qu'on entend" start={2} stagger={2} style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 84, color: "#fff", letterSpacing: -2, lineHeight: 1.08 }} />
      <RiseWords text="en voc" start={10} stagger={2} style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 170, color: COLORS.lilac, lineHeight: 1.08, marginTop: 10 }} />
    </div>
    <Wave />
  </AbsoluteFill>
);

const Lines: React.FC = () => {
  const f = useCurrentFrame();
  const i = Math.min(PHRASES.length - 1, Math.floor(f / STEP));
  const lf = f - i * STEP;
  const p = PHRASES[i];
  const total = 41 * 60 + 8 + Math.floor(f / 30) * 37;
  const clock = `00:${String(Math.floor(total / 60) % 60).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
  return (
    <AbsoluteFill style={{ background: "#08070B" }}>
      <AbsoluteFill style={{ opacity: 0.45, filter: "blur(14px) saturate(1.2)", transform: `scale(${1.15 + lf * 0.002})` }}>
        <Img key={i} src={staticFile(p.bg)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(8,7,11,0.85), rgba(8,7,11,0.35) 50%, rgba(8,7,11,0.9))" }} />
      <TopBar clock={clock} />
      <div style={{ position: "absolute", top: 640, width: "100%" }}>
        <Karaoke text={p.text} lf={lf} />
      </div>
      <Wave />
      {p.meme && <Meme key={`m${i}`} src={p.meme} at={i * STEP + 22} x={i % 2 ? 800 : 280} y={1100} w={300} rotate={i % 2 ? 8 : -8} />}
    </AbsoluteFill>
  );
};

export const PhrasesVideo: React.FC = () => (
  <Shell hideBugFrom={410}>
    <Sequence durationInFrames={60}>
      <Hook />
    </Sequence>
    <Sequence from={60} durationInFrames={350}>
      <Lines />
    </Sequence>
    <Sequence from={410} durationInFrames={90}>
      <EndCard big="viens les entendre" small="en vrai, dans notre communauté" />
    </Sequence>
    {PHRASES.map((_, i) => (
      <Flash key={i} at={60 + i * STEP} strength={0.2} color="#B78BF0" />
    ))}
    <Flash at={410} strength={0.6} />
    <Audio src={staticFile("audio/sfx-phrases.wav")} />
  </Shell>
);
