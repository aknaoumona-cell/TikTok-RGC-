/**
 * TikTok #6 — « ce que ton main dit de toi »   LOOK : CARTES HOLOGRAPHIQUES
 * Cartes à collectionner qui se retournent, bord holo animé, stats façon carte de jeu.
 * 0–60    : accroche
 * 60–420  : 4 cartes × 90 images
 * 420–510 : carte de fin
 */
import React from "react";
import {AbsoluteFill, Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SfxAudio } from "../safe";
import { FONT, Flash, RiseWords, Sparkles, clamp, easeOut, useSpring } from "../components";
import { EndCard, Meme, Shell } from "../memes";

export const MAINS_TOTAL = 510;
const CARD_DUR = 90;

export const MAINS = [
  {
    role: "SUPPORT",
    title: "tu mains un support",
    text: "t'es la maman de la team. tu revive tout le monde, même celles qui le méritent pas",
    stats: [["revive", 5], ["patience", 2]] as [string, number][],
    img: "heroes/support-mercy.jpg",
    hue: "#F7E3A3",
  },
  {
    role: "DPS",
    title: "tu mains un DPS",
    text: "tu prends tous les kills et après tu dis « c'était un travail d'équipe »",
    stats: [["kills", 5], ["humilité", 0]] as [string, number][],
    img: "heroes/dps-widowmaker.jpg",
    hue: "#CDB4FF",
  },
  {
    role: "TANK",
    title: "tu mains un tank",
    text: "t'es devant, tu prends tout dans la tête et tu gères le stress de toute la team",
    stats: [["sang-froid", 4], ["charge mentale", 5]] as [string, number][],
    img: "heroes/tank-dva.jpg",
    hue: "#BFE3FF",
  },
  {
    role: "SKINS ROSES",
    title: "tu joues que des skins roses",
    text: "tout le monde te sous-estime. grave erreur.",
    stats: [["aura", 5], ["skill", 5]] as [string, number][],
    img: "heroes/skin-rose-mercy.jpg",
    hue: "#F9C9D6",
  },
];

const holo = (f: number) =>
  `conic-gradient(from ${f * 4}deg, #FBD9E4, #E7D6FF, #BFEBD9, #F7E3A3, #BFE3FF, #FBD9E4)`;

const HoloBg: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#0E0A14" }}>
      <AbsoluteFill style={{ background: holo(f), opacity: 0.12, filter: "blur(80px)" }} />
      <AbsoluteFill style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
    </AbsoluteFill>
  );
};

const holoText = (f: number): React.CSSProperties => ({
  backgroundImage: "linear-gradient(100deg, #FBD9E4, #E7D6FF, #BFEBD9, #F7E3A3, #BFE3FF, #FBD9E4)",
  backgroundSize: "300% 100%",
  backgroundPosition: `${(f * 3) % 300}% 50%`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  WebkitTextFillColor: "transparent",
});

const Hook: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <HoloBg />
      <Sparkles count={14} seed="mh" />
      <div style={{ position: "absolute", top: 560, width: "100%", textAlign: "center", padding: "0 60px" }}>
        <RiseWords text="ce que ton main" start={4} style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 96, letterSpacing: -3, lineHeight: 1.05 }} wordStyle={() => holoText(f)} />
        <RiseWords text="dit de toi" start={10} style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 150, color: "#fff", lineHeight: 1.05 }} />
        <RiseWords text="(et de ta team)" start={18} style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 38, color: "rgba(255,255,255,0.7)", marginTop: 18, letterSpacing: 2 }} />
      </div>
      <Meme src="memes/chat-reflechit.jpg" at={22} x={540} y={1380} w={400} rotate={-5} />
    </AbsoluteFill>
  );
};

const Card: React.FC<{ m: (typeof MAINS)[number]; n: number }> = ({ m, n }) => {
  const f = useCurrentFrame();
  const flip = interpolate(f, [0, 16], [180, 0], { ...clamp, easing: easeOut });
  const lift = useSpring(0, 12);
  const tilt = Math.sin(f / 18) * 4;
  const textIn = interpolate(f, [16, 26], [0, 1], clamp);
  const shine = interpolate(f, [18, 40], [-40, 140], clamp);
  return (
    <AbsoluteFill>
      <HoloBg />
      <Sparkles count={12} seed={`mc${n}`} />
      <div style={{ position: "absolute", top: 300, width: "100%", textAlign: "center", fontFamily: FONT.mono, fontWeight: 700, fontSize: 34, letterSpacing: 8, color: "rgba(255,255,255,0.75)" }}>
        CARTE {n} / 4
      </div>
      <div style={{ position: "absolute", left: 160, top: 380, width: 760, height: 1150, perspective: 1800 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 44,
            padding: 10,
            background: holo(f),
            boxShadow: `0 0 70px ${m.hue}66, 0 40px 90px rgba(0,0,0,0.6)`,
            transform: `rotateY(${flip + tilt}deg) translateY(${(1 - lift) * 60}px)`,
            backfaceVisibility: "hidden",
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 36, overflow: "hidden", background: "#17111F" }}>
            <div style={{ position: "relative", height: 640, overflow: "hidden" }}>
              <Img src={staticFile(m.img)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "45% 30%", transform: `scale(${1.08 - 0.0008 * f})` }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(115deg, transparent ${shine - 15}%, rgba(255,255,255,0.45) ${shine}%, transparent ${shine + 15}%)`, mixBlendMode: "screen" }} />
              <div style={{ position: "absolute", left: 26, top: 26, fontFamily: FONT.display, fontWeight: 800, fontSize: 34, color: "#17111F", background: m.hue, padding: "10px 22px", borderRadius: 999 }}>{m.role}</div>
            </div>
            <div style={{ padding: "30px 40px", opacity: textIn }}>
              <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 52, lineHeight: 1.05, letterSpacing: -1.5, ...holoText(f) }}>{m.title}</div>
              <div style={{ fontFamily: FONT.body, fontWeight: 600, fontSize: 38, lineHeight: 1.3, color: "#fff", marginTop: 16 }}>{m.text}</div>
              <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 10 }}>
                {m.stats.map(([label, v], i) => {
                  const fill = interpolate(f, [30 + i * 6, 46 + i * 6], [0, v / 5], { ...clamp, easing: easeOut });
                  return (
                    <div key={label} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <div style={{ width: 250, fontFamily: FONT.mono, fontWeight: 700, fontSize: 26, color: "rgba(255,255,255,0.8)" }}>{label}</div>
                      <div style={{ flex: 1, height: 18, borderRadius: 99, background: "rgba(255,255,255,0.12)", overflow: "hidden" }}>
                        <div style={{ width: `${fill * 100}%`, height: "100%", borderRadius: 99, background: holo(f) }} />
                      </div>
                      <div style={{ width: 50, fontFamily: FONT.mono, fontWeight: 700, fontSize: 26, color: "#fff", textAlign: "right" }}>{v}/5</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const MainsVideo: React.FC = () => (
  <Shell hideBugFrom={420}>
    <Sequence durationInFrames={60}>
      <Hook />
    </Sequence>
    {MAINS.map((m, i) => (
      <Sequence key={i} from={60 + i * CARD_DUR} durationInFrames={CARD_DUR}>
        <Card m={m} n={i + 1} />
      </Sequence>
    ))}
    <Sequence from={420} durationInFrames={90}>
      <EndCard big="trouve ta team" small="communauté gaming 100% filles" />
    </Sequence>
    {MAINS.map((_, i) => (
      <Flash key={i} at={60 + i * CARD_DUR} strength={0.35} color="#E7D6FF" />
    ))}
    <Flash at={420} strength={0.6} />
    <SfxAudio src={staticFile("audio/sfx-mains.wav")} />
  </Shell>
);
