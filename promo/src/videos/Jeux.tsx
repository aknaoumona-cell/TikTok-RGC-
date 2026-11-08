/**
 * TikTok #4 — « les jeux du serveur »   LOOK : AFFICHE POP PASTEL
 * Un fond pastel plein par jeu, typo géante foncée, rafale sur le beat.
 * 0–60    : accroche « ton jeu est sûrement ici »
 * 60–240  : 12 jeux × 15 images (clip du serveur, sinon image de gameplay)
 * 240–330 : « + autres jeux » : t'as aussi ta place
 * 330–420 : « et des mates pour chacune. »
 * 420–510 : carte de fin
 */
import React from "react";
import { AbsoluteFill, Audio, Img, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { COLORS } from "../config";
import { FONT, Flash, RiseWords, clamp, easeOut } from "../components";
import { EndCard, Meme, Shell } from "../memes";

export const JEUX_TOTAL = 510;
export const STEP = 15;
const INK = "#1A1424";

const PASTELS = ["#F9C9D6", "#DCCBFF", "#C8F0DF", "#FBE7A9", "#FFD3BA", "#C9E4FF"];

/** Les rôles de jeux du serveur (dans l'ordre du salon rôles). */
export const GAMES: { name: string; clip?: { src: string; start: number }; image?: string }[] = [
  { name: "Call of Duty", clip: { src: "clips/cod-sniper-rose.mp4", start: 1.0 } },
  { name: "Dead by Daylight", image: "gameplay/dead-by-daylight.jpg" },
  { name: "Fortnite", image: "gameplay/fortnite.jpg" },
  { name: "Marvel Rivals", clip: { src: "clips/marvel-rivals-highlight.mp4", start: 2.2 } },
  { name: "Overwatch", clip: { src: "clips/overwatch-hd.mp4", start: 0.2 } },
  { name: "Roblox", image: "gameplay/roblox.jpg" },
  { name: "Valorant", image: "gameplay/valorant.jpg" },
  { name: "Among Us", clip: { src: "clips/among-us-votes.mp4", start: 0.3 } },
  { name: "Minecraft", image: "gameplay/minecraft.jpg" },
  { name: "League of Legends", image: "gameplay/league-of-legends.jpg" },
  { name: "Aniimo", image: "gameplay/aniimo.jpg" },
  { name: "Disney Dreamlight Valley", image: "gameplay/disney-dreamlight-valley.jpg" },
];

/** Font size so that the longest word fits on one line. */
const fit = (name: string) => {
  const longest = Math.max(...name.split(" ").map((w) => w.length));
  return Math.min(name.length > 14 ? 112 : 150, Math.floor(900 / (longest * 0.82)));
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
    <Meme src="memes/girly-telephone.jpg" at={18} x={540} y={1330} w={500} rotate={-5} />
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
          top: 560,
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
      {g.image && (
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
          <Img src={staticFile(g.image)} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${1.12 - 0.008 * lf})` }} />
        </div>
      )}
    </AbsoluteFill>
  );
};

const Autres: React.FC = () => {
  const f = useCurrentFrame();
  const pop = interpolate(f, [0, 8], [0.6, 1], { ...clamp, easing: easeOut });
  return (
    <AbsoluteFill style={{ background: PASTELS[5] }}>
      <Dots color="#fff" />
      <div style={{ position: "absolute", top: 450, width: "100%", textAlign: "center", fontFamily: FONT.mono, fontWeight: 700, fontSize: 44, letterSpacing: 8, color: INK }}>+ BONUS</div>
      <div
        style={{
          position: "absolute",
          top: 560,
          width: "100%",
          textAlign: "center",
          fontFamily: FONT.display,
          fontWeight: 800,
          fontSize: 140,
          lineHeight: 1.0,
          letterSpacing: -4,
          color: INK,
          transform: `scale(${pop})`,
          textShadow: "6px 6px 0 rgba(255,255,255,0.75)",
        }}
      >
        AUTRES JEUX
      </div>
      <div style={{ position: "absolute", top: 860, width: "100%", textAlign: "center", padding: "0 70px" }}>
        <RiseWords text="tu joues à autre chose ?" start={8} stagger={2} style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 58, color: INK }} />
        <RiseWords text="t'as aussi ta place ✦" start={16} stagger={2} style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 104, color: COLORS.lilacDeep, lineHeight: 1.1, marginTop: 10 }} />
      </div>
      <Meme src="memes/girly-noeud-rose.jpg" at={24} x={540} y={1390} w={440} rotate={-5} />
    </AbsoluteFill>
  );
};

const Mates: React.FC = () => (
  <AbsoluteFill style={{ background: PASTELS[0] }}>
    <Dots color="#fff" />
    <div style={{ position: "absolute", top: 520, width: "100%", textAlign: "center", padding: "0 60px" }}>
      <RiseWords text="et des mates" start={2} style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 100, color: INK, letterSpacing: -3 }} />
      <RiseWords text="pour chacune." start={8} style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 160, color: COLORS.lilacDeep, lineHeight: 1.05 }} />
    </div>
    <Meme src="memes/girly-prient.jpg" at={14} x={350} y={1270} w={430} rotate={-6} />
    <Meme src="memes/girly-cri-joie.jpg" at={40} x={730} y={1400} w={400} rotate={7} />
  </AbsoluteFill>
);

export const JeuxVideo: React.FC = () => (
  <Shell hideBugFrom={420} ink="dark">
    <Sequence durationInFrames={60}>
      <Hook />
    </Sequence>
    <Sequence from={60} durationInFrames={180}>
      <Rafale />
    </Sequence>
    <Sequence from={240} durationInFrames={90}>
      <Autres />
    </Sequence>
    <Sequence from={330} durationInFrames={90}>
      <Mates />
    </Sequence>
    <Sequence from={420} durationInFrames={90}>
      <EndCard big="trouve tes mates" small="viens en voc sur le serveur" />
    </Sequence>
    <Flash at={240} strength={0.5} />
    <Flash at={330} strength={0.4} />
    <Flash at={420} strength={0.6} />
    <Audio src={staticFile("audio/sfx-jeux.wav")} />
  </Shell>
);
