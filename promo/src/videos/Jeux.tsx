/**
 * TikTok #4 — « les jeux du serveur »   LOOK : AFFICHE POP PASTEL
 * Un fond pastel plein par jeu, typo géante foncée, rafale sur le beat.
 * 0–60    : accroche « ton jeu est sûrement ici »
 * 60–240  : 12 jeux × 15 images
 * 240–300 : « et des mates pour chacun. »
 * 300–390 : carte de fin
 */
import React from "react";
import { AbsoluteFill, Audio, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { COLORS } from "../config";
import { FONT, Flash, RiseWords, clamp, easeOut } from "../components";
import { EndCard, Meme, Shell } from "../memes";

export const JEUX_TOTAL = 390;
export const STEP = 15;
const INK = "#1A1424";

const PASTELS = ["#F9C9D6", "#DCCBFF", "#C8F0DF", "#FBE7A9", "#FFD3BA", "#C9E4FF"];

/** Les rôles de jeux du serveur (dans l'ordre du salon rôles). */
export const GAMES: { name: string; clip?: { src: string; start: number } }[] = [
  { name: "Call of Duty", clip: { src: "clips/cod-sniper-rose.mp4", start: 1.0 } },
  { name: "Dead by Daylight" },
  { name: "Fortnite" },
  { name: "Marvel Rivals", clip: { src: "clips/marvel-rivals-highlight.mp4", start: 2.2 } },
  { name: "Overwatch", clip: { src: "clips/overwatch-hd.mp4", start: 0.2 } },
  { name: "Roblox" },
  { name: "Valorant" },
  { name: "Among Us", clip: { src: "clips/among-us-votes.mp4", start: 0.3 } },
  { name: "Minecraft" },
  { name: "League of Legends" },
  { name: "Aniimo" },
  { name: "Disney Dreamlight Valley" },
];

/** Font size so that the longest word fits on one line. */
const fit = (name: string) => {
  const longest = Math.max(...name.split(" ").map((w) => w.length));
  return Math.min(150, Math.floor(900 / (longest * 0.82)));
};

const Dots: React.FC<{ color: string }> = ({ color }) => (
  <AbsoluteFill style={{ backgroundImage: `radial-gradient(${color} 3px, transparent 3.5px)`, backgroundSize: "44px 44px", opacity: 0.35 }} />
);

const Hook: React.FC = () => (
  <AbsoluteFill style={{ background: PASTELS[1] }}>
    <Dots color="#fff" />
    <div style={{ position: "absolute", top: 470, width: "100%", textAlign: "center", fontFamily: FONT.mono, fontWeight: 700, fontSize: 40, letterSpacing: 10, color: INK }}>12 JEUX</div>
    <div style={{ position: "absolute", top: 560, width: "100%", textAlign: "center", padding: "0 60px" }}>
      <RiseWords text="ton jeu est" start={4} style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 100, color: INK, letterSpacing: -3 }} />
      <RiseWords text="sûrement ici" start={10} style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 160, color: COLORS.lilacDeep, lineHeight: 1.05 }} />
    </div>
    <Meme src="memes/chaton-manette.jpg" at={18} x={540} y={1330} w={520} rotate={-5} />
  </AbsoluteFill>
);

const Rafale: React.FC = () => {
  const f = useCurrentFrame();
  const i = Math.min(GAMES.length - 1, Math.floor(f / STEP));
  const g = GAMES[i];
  const lf = f - i * STEP;
  const pop = interpolate(lf, [0, 6], [0.7, 1], { ...clamp, easing: easeOut });
  const slide = interpolate(lf, [0, 6], [60, 0], { ...clamp, easing: easeOut });
  const bg = PASTELS[i % PASTELS.length];
  return (
    <AbsoluteFill style={{ background: bg }}>
      <Dots color="#fff" />
      <div style={{ position: "absolute", top: 450, width: "100%", textAlign: "center", fontFamily: FONT.mono, fontWeight: 700, fontSize: 44, letterSpacing: 8, color: INK }}>
        {String(i + 1).padStart(2, "0")} / 12
      </div>
      <div
        style={{
          position: "absolute",
          top: g.clip ? 560 : 760,
          width: "100%",
          padding: "0 70px",
          textAlign: "center",
          fontFamily: FONT.display,
          fontWeight: 800,
          fontSize: fit(g.name),
          lineHeight: 1.0,
          letterSpacing: -4,
          color: INK,
          textTransform: "uppercase",
          transform: `scale(${pop}) translateY(${slide}px)`,
          textShadow: "6px 6px 0 rgba(255,255,255,0.75)",
        }}
      >
        {g.name}
      </div>
      {g.clip && (
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 1010,
            width: 800,
            height: 450,
            borderRadius: 36,
            overflow: "hidden",
            border: `8px solid ${INK}`,
            boxShadow: `14px 14px 0 ${INK}`,
            transform: `rotate(${i % 2 ? 3 : -3}deg) scale(${pop})`,
          }}
        >
          <OffthreadVideo key={i} src={staticFile(g.clip.src)} startFrom={Math.round(g.clip.start * 30)} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      )}
    </AbsoluteFill>
  );
};

const Mates: React.FC = () => (
  <AbsoluteFill style={{ background: PASTELS[0] }}>
    <Dots color="#fff" />
    <div style={{ position: "absolute", top: 520, width: "100%", textAlign: "center", padding: "0 60px" }}>
      <RiseWords text="et des mates" start={2} style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 100, color: INK, letterSpacing: -3 }} />
      <RiseWords text="pour chacun." start={8} style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 160, color: COLORS.lilacDeep, lineHeight: 1.05 }} />
    </div>
    <Meme src="memes/chat-gaming-chaise.jpg" at={14} x={540} y={1300} w={540} rotate={5} />
  </AbsoluteFill>
);

export const JeuxVideo: React.FC = () => (
  <Shell hideBugFrom={300} ink="dark">
    <Sequence durationInFrames={60}>
      <Hook />
    </Sequence>
    <Sequence from={60} durationInFrames={180}>
      <Rafale />
    </Sequence>
    <Sequence from={240} durationInFrames={60}>
      <Mates />
    </Sequence>
    <Sequence from={300} durationInFrames={90}>
      <EndCard big="trouve tes mates" small="viens en voc sur le serveur" />
    </Sequence>
    <Flash at={240} strength={0.5} />
    <Flash at={300} strength={0.6} />
    <Audio src={staticFile("audio/sfx-jeux.wav")} />
  </Shell>
);
