/**
 * TikTok #24 — trend « my moon… my maaaan » (soft launch : on devine sans montrer, puis révélation au refrain).
 * Le « man », c'est le serveur. Le son de la trend est ajouté dans TikTok.
 * LOOK : LUNE NACRÉE — nuit bleu profond → lilas, lune perlée, étoiles. Plein cadre, textes petits et loin des bords.
 * 0–15 nuit · 15–120 « my moon… » 3 indices flous qui arrivent de DROITE À GAUCHE · 120–135 whip vers la gauche
 * 135–330 « my maaaan » = le serveur (vraies captures du serveur) · 330–420 carte de fin
 */
import React from "react";
import { AbsoluteFill, Easing, Img, Sequence, interpolate, random, staticFile, useCurrentFrame } from "remotion";
import { GameVideo, SfxAudio } from "../safe";
import { FONT, Flash, Sparkles, clamp, useSpring } from "../components";
import { EndCard, Meme, Shell } from "../memes";

export const MYMOON_TOTAL = 420;
const PEARL = "#F4ECFF";
const LILAC = "#C9A7FF";

const Night: React.FC<{ glow?: number }> = ({ glow = 0 }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #0B1033 0%, #1D1648 55%, #3A2A6B 100%)" }}>
      {new Array(60).fill(0).map((_, i) => {
        const tw = 0.4 + 0.6 * Math.abs(Math.sin(f / 14 + i));
        return <div key={i} style={{ position: "absolute", left: random(`sx${i}`) * 1080, top: random(`sy${i}`) * 1920, width: 4, height: 4, borderRadius: 9, background: PEARL, opacity: tw * 0.8 }} />;
      })}
      <AbsoluteFill style={{ background: `radial-gradient(50% 30% at 50% 50%, rgba(201,167,255,${0.22 + glow}), transparent 70%)` }} />
    </AbsoluteFill>
  );
};

const Moon: React.FC<{ size: number; x: number; y: number }> = ({ size, x, y }) => (
  <div style={{ position: "absolute", left: x - size / 2, top: y - size / 2, width: size, height: size, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%, #FFFFFF, #F1E8FF 40%, #CDBBEF 75%, #A792D6)", boxShadow: `0 0 ${size * 0.25}px rgba(244,236,255,0.7), 0 0 ${size * 0.6}px rgba(201,167,255,0.45)` }}>
    <div style={{ position: "absolute", left: "22%", top: "48%", width: "16%", height: "16%", borderRadius: "50%", background: "rgba(167,146,214,0.35)" }} />
    <div style={{ position: "absolute", left: "58%", top: "26%", width: "11%", height: "11%", borderRadius: "50%", background: "rgba(167,146,214,0.3)" }} />
  </div>
);

const Title: React.FC<{ text: string; top: number; size?: number; at?: number }> = ({ text, top, size = 84, at = 0 }) => {
  const s = useSpring(at, 12);
  return (
    <div style={{ position: "absolute", top, width: "100%", textAlign: "center", padding: "0 140px", opacity: s }}>
      <span style={{ fontFamily: FONT.elegant, fontStyle: "italic", fontWeight: 700, fontSize: size, color: PEARL, textShadow: "0 0 24px rgba(201,167,255,0.9)" }}>{text}</span>
    </div>
  );
};

/** slide in from the RIGHT, slide out to the LEFT (whip with motion blur) */
const useSlideRL = (dur: number, inF = 8, outF = 8) => {
  const f = useCurrentFrame();
  const x = f < inF ? interpolate(f, [0, inF], [1100, 0], { ...clamp, easing: Easing.out(Easing.cubic) }) : interpolate(f, [dur - outF, dur], [0, -1100], { ...clamp, easing: Easing.in(Easing.cubic) });
  const blur = f < inF || f > dur - outF ? 14 : 0;
  return { transform: `translateX(${x}px)`, filter: blur ? `blur(${blur}px)` : undefined } as React.CSSProperties;
};

const Teaser: React.FC<{ children: React.ReactNode; dur: number }> = ({ children, dur }) => {
  const f = useCurrentFrame();
  const st = useSlideRL(dur);
  const focus = interpolate(f, [8, dur - 8], [7, 2], clamp); // stays a bit blurry: it's a hint
  return (
    <div style={{ position: "absolute", left: 120, top: 600, width: 840, height: 720, borderRadius: 34, overflow: "hidden", border: `4px solid ${PEARL}`, boxShadow: "0 0 50px rgba(201,167,255,0.5)", ...st }}>
      <div style={{ width: "100%", height: "100%", filter: `blur(${focus}px) saturate(1.1)`, transform: `scale(${1.15 - f * 0.002})` }}>{children}</div>
    </div>
  );
};

const MoonPart: React.FC = () => (
  <AbsoluteFill>
    <Night />
    <Moon size={220} x={820} y={1520} />
    <Title text="my moon…" top={360} at={2} />
    <Sequence from={15} durationInFrames={35} layout="none">
      <Teaser dur={35}>
        <GameVideo src={staticFile("clips/ow-minuit.mp4")} volume={0.3} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </Teaser>
    </Sequence>
    <Sequence from={50} durationInFrames={35} layout="none">
      <Teaser dur={35}>
        <AbsoluteFill style={{ background: "#2B2D31", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("server/rgc-papillon.png")} style={{ width: "90%" }} />
        </AbsoluteFill>
      </Teaser>
    </Sequence>
    <Sequence from={85} durationInFrames={35} layout="none">
      <Teaser dur={35}>
        <AbsoluteFill style={{ background: "#2B2D31", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("server/rgc-perles.png")} style={{ height: "45%", objectFit: "cover" }} />
        </AbsoluteFill>
      </Teaser>
    </Sequence>
  </AbsoluteFill>
);

/** whip pan to the left between the two parts */
const Whip: React.FC = () => {
  const f = useCurrentFrame();
  const x = interpolate(f, [0, 15], [0, -1080], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: x, top: 0, width: 2160, height: 1920, display: "flex", filter: "blur(16px)" }}>
        <div style={{ width: 1080, height: 1920, position: "relative" }}>
          <Night />
        </div>
        <div style={{ width: 1080, height: 1920, position: "relative" }}>
          <Night glow={0.2} />
          <Moon size={700} x={540} y={960} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SCREENS = [
  { src: "server/rgc-presentation.png", cap: "une safe place entre filles" },
  { src: "server/rgc-semaine.png", cap: "ta semaine sur RGC" },
  { src: "server/rgc-soiree-ow.png", cap: "des soirées pour jouer ensemble" },
  { src: "server/rgc-roles-jeux.png", cap: "une team sur chaque jeu" },
];
const SHOT = 48;

const Screen: React.FC<{ s: (typeof SCREENS)[number] }> = ({ s }) => {
  const st = useSlideRL(SHOT, 8, 7);
  return (
    <div style={{ position: "absolute", left: 120, top: 640, width: 840, height: 860, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", ...st }}>
      <div style={{ maxHeight: 740, borderRadius: 26, overflow: "hidden", border: `4px solid ${PEARL}`, boxShadow: "0 0 60px rgba(201,167,255,0.55), 0 30px 60px rgba(0,0,0,0.5)" }}>
        <Img src={staticFile(s.src)} style={{ display: "block", width: 840, maxHeight: 740, objectFit: "cover", objectPosition: "50% 0%" }} />
      </div>
      <div style={{ marginTop: 22, fontFamily: FONT.body, fontWeight: 700, fontSize: 36, color: PEARL, background: "rgba(244,236,255,0.12)", border: "2px solid rgba(244,236,255,0.35)", padding: "10px 26px", borderRadius: 999 }}>{s.cap}</div>
    </div>
  );
};

const ManPart: React.FC = () => {
  const f = useCurrentFrame();
  const nA = Math.min(7, 1 + Math.floor(f / 5)); // "my maaaaaan" stretches like the song
  const pulse = 0.5 + 0.5 * Math.sin(f / 8);
  return (
    <AbsoluteFill>
      <Night glow={0.12} />
      <Sparkles count={20} seed="man" />
      <Title text={`my m${"a".repeat(nA)}n`} top={320} size={96} />
      <div style={{ position: "absolute", top: 450, width: "100%", display: "flex", justifyContent: "center", alignItems: "center", gap: 14 }}>
        <Img src={staticFile("brand/logo-rgc.png")} style={{ width: 90, filter: `drop-shadow(0 0 ${18 + 14 * pulse}px rgba(201,167,255,0.95))` }} />
        <span style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 38, color: PEARL }}>le serveur</span>
      </div>
      {SCREENS.map((s, i) => (
        <Sequence key={s.src} from={6 + i * SHOT} durationInFrames={SHOT} layout="none">
          <Screen s={s} />
        </Sequence>
      ))}
      <Meme src="memes/chat-emu.jpg" at={20} until={100} x={880} y={1580} w={190} rotate={8} />
      <Meme src="memes/chaton-pouce.jpg" at={120} x={210} y={1600} w={200} rotate={-7} />
    </AbsoluteFill>
  );
};

export const MyMoonVideo: React.FC = () => (
  <Shell hideBugFrom={330} brand="center">
    <Sequence durationInFrames={120}>
      <MoonPart />
    </Sequence>
    <Sequence from={120} durationInFrames={15}>
      <Whip />
    </Sequence>
    <Sequence from={135} durationInFrames={195}>
      <ManPart />
    </Sequence>
    <Sequence from={330} durationInFrames={90}>
      <EndCard big="ton maaan aussi ?" small="serveur discord 100% filles" />
    </Sequence>
    <Flash at={135} strength={0.8} />
    <Flash at={330} strength={0.6} />
    <SfxAudio src={staticFile("audio/sfx-mymoon.wav")} />
  </Shell>
);
