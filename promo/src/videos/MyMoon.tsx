/**
 * TikTok #24 — trend « my moon… my maaaan » (le « man », c'est le serveur). Le son de la trend est ajouté dans TikTok.
 * LOOK : LUNE NACRÉE — nuit bleu profond → lilas, grosse lune qui brille, étoiles perlées.
 * Plein cadre (pas de réduction), textes plus petits et loin des bords.
 * 0–105 « my moon » (clip) · 105–120 zoom dans la lune · 120–330 « my maaaan » = le serveur · 330–420 carte de fin
 */
import React from "react";
import { AbsoluteFill, Easing, Img, Sequence, interpolate, random, staticFile, useCurrentFrame } from "remotion";
import { GameVideo, SfxAudio } from "../safe";
import { FONT, Flash, Sparkles, clamp, easeOut, useSpring } from "../components";
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
      <AbsoluteFill style={{ background: `radial-gradient(50% 30% at 50% 50%, rgba(201,167,255,${0.25 + glow}), transparent 70%)` }} />
    </AbsoluteFill>
  );
};

const Moon: React.FC<{ size: number; x: number; y: number }> = ({ size, x, y }) => (
  <div
    style={{
      position: "absolute",
      left: x - size / 2,
      top: y - size / 2,
      width: size,
      height: size,
      borderRadius: "50%",
      background: "radial-gradient(circle at 35% 30%, #FFFFFF, #F1E8FF 40%, #CDBBEF 75%, #A792D6)",
      boxShadow: `0 0 ${size * 0.25}px rgba(244,236,255,0.7), 0 0 ${size * 0.6}px rgba(201,167,255,0.45)`,
    }}
  >
    <div style={{ position: "absolute", left: "22%", top: "48%", width: "16%", height: "16%", borderRadius: "50%", background: "rgba(167,146,214,0.35)" }} />
    <div style={{ position: "absolute", left: "58%", top: "26%", width: "11%", height: "11%", borderRadius: "50%", background: "rgba(167,146,214,0.3)" }} />
    <div style={{ position: "absolute", left: "55%", top: "62%", width: "20%", height: "20%", borderRadius: "50%", background: "rgba(167,146,214,0.25)" }} />
  </div>
);

const Label: React.FC<{ text: string; at: number; top: number; size?: number }> = ({ text, at, top, size = 92 }) => {
  const s = useSpring(at, 12);
  return (
    <div style={{ position: "absolute", top, width: "100%", textAlign: "center", padding: "0 140px", opacity: s, transform: `translateY(${(1 - s) * 30}px)` }}>
      <span style={{ fontFamily: FONT.elegant, fontStyle: "italic", fontWeight: 700, fontSize: size, color: PEARL, textShadow: "0 0 24px rgba(201,167,255,0.9)" }}>{text}</span>
    </div>
  );
};

const MoonPart: React.FC = () => {
  const f = useCurrentFrame();
  const card = useSpring(6, 12);
  return (
    <AbsoluteFill>
      <Night />
      <Moon size={300} x={760 - f * 0.4} y={1420} />
      <Label text="my moon…" at={2} top={360} />
      <div style={{ position: "absolute", left: 120, top: 640, width: 840, height: 472, borderRadius: 28, overflow: "hidden", border: `5px solid ${PEARL}`, boxShadow: "0 0 50px rgba(201,167,255,0.55)", opacity: card, transform: `scale(${0.9 + 0.1 * card})` }}>
        <GameVideo src={staticFile("clips/ow-minuit.mp4")} volume={0.35} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ position: "absolute", top: 1160, width: "100%", textAlign: "center", padding: "0 140px", fontFamily: FONT.body, fontWeight: 700, fontSize: 40, color: "rgba(244,236,255,0.85)", opacity: interpolate(f, [14, 24], [0, 1], clamp) }}>
        mes games de minuit
      </div>
    </AbsoluteFill>
  );
};

/** the moon grows until it fills the screen (covers the cut) */
const MoonZoom: React.FC = () => {
  const f = useCurrentFrame();
  const size = interpolate(f, [0, 15], [300, 4200], { ...clamp, easing: Easing.in(Easing.cubic) });
  return (
    <AbsoluteFill>
      <Night />
      <Moon size={size} x={718} y={1420 - f * 30} />
    </AbsoluteFill>
  );
};

const FEATURES = [
  "100% filles",
  "vérif vocale : un petit vocal, c'est rapide",
  "des filles en voc pour jouer",
  "des events chaque mois",
  "SFW · LGBTQ+ friendly · safe place",
];

const SparkleIcon: React.FC = () => (
  <svg width="30" height="30" viewBox="0 0 24 24">
    <path d="M12 1l2.4 7.6L22 11l-7.6 2.4L12 21l-2.4-7.6L2 11l7.6-2.4z" fill={LILAC} />
  </svg>
);

const ManPart: React.FC = () => {
  const f = useCurrentFrame();
  // "my maaaan": the "a" keeps stretching like the song
  const nA = Math.min(7, 1 + Math.floor(f / 5));
  const logo = useSpring(18, 12);
  const pulse = 0.5 + 0.5 * Math.sin(f / 8);
  return (
    <AbsoluteFill>
      <Night glow={0.15} />
      <AbsoluteFill style={{ background: "radial-gradient(60% 40% at 50% 38%, rgba(244,236,255,0.35), transparent 70%)" }} />
      <Sparkles count={22} seed="man" />
      <Label text={`my m${"a".repeat(nA)}n`} at={0} top={330} size={104} />
      <div style={{ position: "absolute", top: 480, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", opacity: logo, transform: `scale(${0.5 + 0.5 * logo})` }}>
        <Img src={staticFile("brand/logo-rgc.png")} style={{ width: 300, filter: `drop-shadow(0 0 ${30 + 24 * pulse}px rgba(201,167,255,0.95))` }} />
        <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 40, color: PEARL, letterSpacing: 1, marginTop: 6 }}>le serveur</div>
      </div>
      <div style={{ position: "absolute", top: 920, left: 140, right: 140, display: "flex", flexDirection: "column", gap: 16 }}>
        {FEATURES.map((t, i) => {
          const at = 48 + i * 22;
          const k = interpolate(f - at, [0, 8], [0, 1], { ...clamp, easing: easeOut });
          return (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 24px", borderRadius: 20, background: "rgba(244,236,255,0.12)", border: "2px solid rgba(244,236,255,0.35)", opacity: k, transform: `translateX(${(1 - k) * (i % 2 ? 60 : -60)}px)` }}>
              <SparkleIcon />
              <span style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 34, color: PEARL }}>{t}</span>
            </div>
          );
        })}
        {f > 48 + FEATURES.length * 22 && (
          <div style={{ alignSelf: "center", marginTop: 6, display: "flex", alignItems: "center", gap: 12, fontFamily: FONT.body, fontWeight: 700, fontSize: 32, color: PEARL }}>
            <span style={{ fontFamily: FONT.mono, fontSize: 24, color: "#fff", background: "#ED4245", padding: "4px 12px", borderRadius: 8, opacity: Math.floor(f / 12) % 2 ? 0.5 : 1 }}>REC</span>
            Vocal
          </div>
        )}
      </div>
      <Meme src="memes/chat-emu.jpg" at={30} until={150} x={830} y={560} w={200} rotate={8} />
      <Meme src="memes/chaton-pouce.jpg" at={170} x={250} y={1640} w={220} rotate={-7} />
    </AbsoluteFill>
  );
};

export const MyMoonVideo: React.FC = () => (
  <Shell hideBugFrom={330} brand="center">
    <Sequence durationInFrames={105}>
      <MoonPart />
    </Sequence>
    <Sequence from={105} durationInFrames={15}>
      <MoonZoom />
    </Sequence>
    <Sequence from={120} durationInFrames={210}>
      <ManPart />
    </Sequence>
    <Sequence from={330} durationInFrames={90}>
      <EndCard big="ton maaan aussi ?" small="serveur discord 100% filles" />
    </Sequence>
    <Flash at={120} strength={0.9} />
    <Flash at={330} strength={0.6} />
    <SfxAudio src={staticFile("audio/sfx-mymoon.wav")} />
  </Shell>
);
