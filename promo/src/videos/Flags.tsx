/**
 * TikTok #5 — « red flags vs green flags d'un serveur Discord »   LOOK : BICOLORE
 * Rouge sombre pour les red flags, vert sombre pour les green flags, memes.
 * 0–60    : accroche
 * 60–240  : 4 red flags × 45 images (buzzer + shake + meme)
 * 240–270 : « et sur RGC ? » (scratch)
 * 270–390 : 4 green flags × 30 images (chime)
 * 390–480 : carte de fin
 */
import React from "react";
import {AbsoluteFill, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SfxAudio } from "../safe";
import { COLORS } from "../config";
import { BoxLetters, ButterflyZoom, FONT, Flash, RiseWords, Sparkles, chromeStyle, clamp, easeOut, useShake, useSpring } from "../components";
import { EndCard, Meme, Shell } from "../memes";

export const FLAGS_TOTAL = 480;

export const RED: { text: string; meme: string }[] = [
  { text: "2 000 membres et 0 message", meme: "memes/chat-qui-pleure.jpg" },
  { text: "des mecs qui se font passer pour des filles", meme: "memes/imposteur-among-us.jpg" },
  { text: "personne en voc, jamais", meme: "memes/chat-choque.jpg" },
  { text: "personne te répond quand t'arrives", meme: "memes/chat-what.jpg" },
];
export const GREEN = ["vérif vocale à l'entrée", "des events chaque mois", "des filles en voc pour jouer", "SFW · LGBTQ+ friendly · safe place"];

const RED_BG = "#1A0910";
const GREEN_BG = "#08170F";

const FlagIcon: React.FC = () => (
  <svg width="58" height="58" viewBox="0 0 24 24">
    <path d="M5 21V4" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    <path d="M5 4h12l-2.5 4L17 12H5z" fill="#FF3B5C" />
  </svg>
);
const CheckIcon: React.FC = () => (
  <svg width="58" height="58" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="11" fill="#7CF5B5" />
    <path d="M7 12.5l3.2 3.2L17.5 8.5" stroke={GREEN_BG} strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Card: React.FC<{ at: number; text: string; kind: "red" | "green"; index: number }> = ({ at, text, kind, index }) => {
  const f = useCurrentFrame();
  const s = useSpring(at, 11);
  if (f < at) return null;
  const red = kind === "red";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 26,
        padding: "24px 32px",
        borderRadius: 30,
        marginBottom: 20,
        background: red ? "rgba(70, 14, 28, 0.92)" : "rgba(16, 52, 38, 0.9)",
        border: `2px solid ${red ? "rgba(255,59,92,0.6)" : "rgba(124,245,181,0.6)"}`,
        boxShadow: `0 0 40px ${red ? "rgba(255,59,92,0.25)" : "rgba(124,245,181,0.25)"}, 0 20px 50px rgba(0,0,0,0.4)`,
        opacity: s,
        transform: `translateX(${(1 - s) * (index % 2 ? 160 : -160)}px) rotate(${(1 - s) * (index % 2 ? 6 : -6)}deg)`,
      }}
    >
      <div style={{ flex: "0 0 auto" }}>{red ? <FlagIcon /> : <CheckIcon />}</div>
      <span style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 44, color: "#fff", lineHeight: 1.2 }}>{text}</span>
    </div>
  );
};

const RedBg: React.FC = () => (
  <AbsoluteFill style={{ background: RED_BG }}>
    <AbsoluteFill style={{ background: "radial-gradient(60% 40% at 50% 30%, rgba(255,59,92,0.28), transparent 70%)" }} />
    <AbsoluteFill style={{ backgroundImage: "repeating-linear-gradient(135deg, rgba(255,59,92,0.05) 0 30px, transparent 30px 60px)" }} />
  </AbsoluteFill>
);

const GreenBg: React.FC = () => (
  <AbsoluteFill style={{ background: GREEN_BG }}>
    <AbsoluteFill style={{ background: "radial-gradient(60% 40% at 50% 30%, rgba(124,245,181,0.22), transparent 70%)" }} />
  </AbsoluteFill>
);

const Hook: React.FC = () => (
  <AbsoluteFill>
    <RedBg />
    <div style={{ position: "absolute", top: 560, width: "100%" }}>
      <BoxLetters text="attention" start={2} size={46} />
    </div>
    <div style={{ position: "absolute", top: 700, width: "100%", textAlign: "center", padding: "0 50px" }}>
      <RiseWords text="les red flags" start={6} style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 108, color: "#FF3B5C", letterSpacing: -3 }} />
      <RiseWords text="d'un serveur discord" start={12} style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 96, color: "#fff", lineHeight: 1.1 }} />
    </div>
    <Meme src="memes/chat-mefiant.jpg" at={18} x={540} y={1360} w={420} rotate={-5} />
  </AbsoluteFill>
);

const RedPart: React.FC = () => {
  const f = useCurrentFrame();
  const step = Math.min(RED.length - 1, Math.floor(f / 45));
  const shake = useShake(step * 45, 18);
  return (
    <AbsoluteFill style={{ transform: shake }}>
      <RedBg />
      <div style={{ position: "absolute", top: 400, width: "100%", textAlign: "center", fontFamily: FONT.display, fontWeight: 800, fontSize: 60, color: "#FF3B5C", letterSpacing: -1 }}>
        RED FLAGS
      </div>
      <div style={{ position: "absolute", top: 520, left: 70, width: 940 }}>
        {RED.map((r, i) => (
          <Card key={i} at={i * 45} text={r.text} kind="red" index={i} />
        ))}
      </div>
      {RED.map((r, i) => (
        <Meme key={i} src={r.meme} at={i * 45 + 6} until={(i + 1) * 45} x={i % 2 ? 330 : 750} y={1430} w={360} rotate={i % 2 ? -7 : 7} />
      ))}
    </AbsoluteFill>
  );
};

const Twist: React.FC = () => {
  const f = useCurrentFrame();
  const s = useSpring(0, 9);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: COLORS.night }} />
      <div style={{ position: "absolute", top: 640, width: "100%", textAlign: "center", transform: `scale(${1.4 - 0.4 * s})`, opacity: Math.min(1, s * 2) }}>
        <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 90, color: "#fff", letterSpacing: -2 }}>et sur</div>
        <div style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 220, lineHeight: 1.05, ...chromeStyle(f) }}>RGC ?</div>
      </div>
      <Meme src="memes/chat-lunettes-actually.jpg" at={4} x={540} y={1330} w={380} rotate={4} />
    </AbsoluteFill>
  );
};

const GreenPart: React.FC = () => {
  const f = useCurrentFrame();
  const glow = interpolate(f, [0, 20], [0, 1], { ...clamp, easing: easeOut });
  return (
    <AbsoluteFill>
      <GreenBg />
      <AbsoluteFill style={{ opacity: glow }}>
        <Sparkles count={16} seed="green" />
      </AbsoluteFill>
      <div style={{ position: "absolute", top: 400, width: "100%", textAlign: "center", fontFamily: FONT.display, fontWeight: 800, fontSize: 60, color: "#7CF5B5", letterSpacing: -1 }}>
        GREEN FLAGS
      </div>
      <div style={{ position: "absolute", top: 520, left: 70, width: 940 }}>
        {GREEN.map((t, i) => (
          <Card key={i} at={4 + i * 30} text={t} kind="green" index={i} />
        ))}
      </div>
      <Meme src="memes/chat-lunettes-soleil.jpg" at={96} x={540} y={1440} w={380} rotate={-5} />
    </AbsoluteFill>
  );
};

export const FlagsVideo: React.FC = () => (
  <Shell hideBugFrom={390}>
    <Sequence durationInFrames={60}>
      <Hook />
    </Sequence>
    <Sequence from={60} durationInFrames={180}>
      <RedPart />
    </Sequence>
    <Sequence from={240} durationInFrames={30}>
      <Twist />
    </Sequence>
    <Sequence from={270} durationInFrames={120}>
      <GreenPart />
    </Sequence>
    <Sequence from={390} durationInFrames={90}>
      <EndCard big="rejoins-nous" small="serveur discord 100% filles" />
    </Sequence>
    {RED.map((_, i) => (
      <Flash key={i} at={60 + i * 45} strength={0.35} color="#FF3B5C" />
    ))}
    <Flash at={240} strength={0.6} />
    <ButterflyZoom at={270} />
    <Flash at={270} strength={0.6} color="#7CF5B5" />
    <Flash at={390} strength={0.6} />
    <SfxAudio src={staticFile("audio/sfx-flags.wav")} />
  </Shell>
);
