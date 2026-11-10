/**
 * TikTok #16 — « ton jeu préféré selon ton signe astro »
 * LOOK : ASTRO MYSTIQUE — nuit bleu minuit étoilée, constellations qui se dessinent,
 * cadre en arche façon carte de tarot, accents or champagne.
 * 0–60 accroche · 60–1260 12 signes × 100 · 1260–1350 carte de fin
 */
import React from "react";
import {AbsoluteFill, Img, OffthreadVideo, Sequence, interpolate, random, staticFile, useCurrentFrame } from "remotion";
import { SfxAudio } from "../safe";
import { FONT, Flash, RiseWords, clamp, easeOut, useSpring } from "../components";
import { EndCard, Shell } from "../memes";

export const ASTRO_TOTAL = 1350;
const STEP = 100;
const GOLD = "#F3D9A4";

type Sign = { sign: string; dates: string; game: string; line: string; img?: string; clip?: { src: string; start: number } };

export const SIGNS: Sign[] = [
  { sign: "Bélier", dates: "21 mars – 19 avril", game: "Valorant", line: "elle rage, mais elle clutch", img: "astro/valorant.jpg" },
  { sign: "Taureau", dates: "20 avril – 20 mai", game: "Disney Dreamlight Valley", line: "sa maison, son jardin, et la paix", img: "astro/disney-dreamlight-valley.jpg" },
  { sign: "Gémeaux", dates: "21 mai – 20 juin", game: "Among Us", line: "elle ment trop bien. méfiance.", img: "astro/among-us.jpg" },
  { sign: "Cancer", dates: "21 juin – 22 juillet", game: "Minecraft", line: "elle construit une maison pour toute la team", img: "astro/minecraft.jpg" },
  { sign: "Lion", dates: "23 juillet – 22 août", game: "Marvel Rivals", line: "elle veut le MVP. et elle l'a.", img: "astro/marvel-rivals.jpg" },
  { sign: "Vierge", dates: "23 août – 22 sept.", game: "League of Legends", line: "elle connaît toutes les stats et corrige ton build", img: "astro/league-of-legends.jpg" },
  { sign: "Balance", dates: "23 sept. – 22 oct.", game: "Overwatch", line: "elle met la paix dans la team (et elle heal)", img: "astro/overwatch.jpg" },
  { sign: "Scorpion", dates: "23 oct. – 21 nov.", game: "Dead by Daylight", line: "elle te traque. et elle adore ça.", img: "astro/dead-by-daylight.jpg" },
  { sign: "Sagittaire", dates: "22 nov. – 21 déc.", game: "Fortnite", line: "elle drop n'importe où, juste pour le fun", img: "astro/fortnite.jpg" },
  { sign: "Capricorne", dates: "22 déc. – 19 janv.", game: "Call of Duty", line: "elle grind les ranked comme un taf", img: "astro/call-of-duty.jpg" },
  { sign: "Verseau", dates: "20 janv. – 18 fév.", game: "Aniimo", line: "elle joue à un jeu que personne connaît encore", img: "astro/aniimo.jpg" },
  { sign: "Poissons", dates: "19 fév. – 20 mars", game: "Roblox", line: "40 mondes ouverts et une imagination sans fin", img: "astro/roblox.jpg" },
];

const Sky: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "radial-gradient(120% 80% at 50% 20%, #1B2350 0%, #0B0E24 55%, #06071A 100%)" }}>
      {new Array(90).fill(0).map((_, i) => {
        const x = random(`sx${i}`) * 1080;
        const y = random(`sy${i}`) * 1920;
        const s = 2 + random(`ss${i}`) * 4;
        const tw = 0.3 + 0.7 * Math.abs(Math.sin(f / (10 + random(`st${i}`) * 20) + i));
        return <div key={i} style={{ position: "absolute", left: x, top: y, width: s, height: s, borderRadius: 99, background: i % 7 === 0 ? GOLD : "#fff", opacity: tw }} />;
      })}
    </AbsoluteFill>
  );
};

/** Seeded constellation that draws itself line by line. */
const Constellation: React.FC<{ seed: string; at: number }> = ({ seed, at }) => {
  const f = useCurrentFrame();
  const pts = new Array(6).fill(0).map((_, i) => ({ x: 140 + random(`${seed}x${i}`) * 800, y: 300 + random(`${seed}y${i}`) * 260 }));
  const p = interpolate(f - at, [0, 24], [0, 1], { ...clamp, easing: easeOut });
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
      {pts.slice(1).map((q, i) => {
        const a = pts[i];
        const k = Math.max(0, Math.min(1, p * 5 - i));
        return <line key={i} x1={a.x} y1={a.y} x2={a.x + (q.x - a.x) * k} y2={a.y + (q.y - a.y) * k} stroke={GOLD} strokeOpacity={0.55} strokeWidth={3} />;
      })}
      {pts.map((q, i) => (
        <circle key={i} cx={q.x} cy={q.y} r={7} fill="#fff" opacity={p > i / 6 ? 1 : 0} style={{ filter: `drop-shadow(0 0 8px ${GOLD})` }} />
      ))}
    </svg>
  );
};

const goldText: React.CSSProperties = {
  backgroundImage: "linear-gradient(180deg, #FFF6E2 0%, #F3D9A4 45%, #C9A15E 60%, #FFF1D2 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  WebkitTextFillColor: "transparent",
};

const Hook: React.FC = () => (
  <AbsoluteFill>
    <Sky />
    <Constellation seed="hook" at={0} />
    <div style={{ position: "absolute", top: 700, width: "100%", textAlign: "center", padding: "0 60px" }}>
      <RiseWords text="ton jeu préféré" start={4} style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 92, color: "#fff", letterSpacing: -3 }} />
      <RiseWords text="selon ton signe" start={10} style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 140, lineHeight: 1.05 }} wordStyle={() => goldText} />
      <RiseWords text="(on a raison, c'est tout)" start={18} style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 36, color: "rgba(255,255,255,0.7)", marginTop: 24, letterSpacing: 2 }} />
    </div>
  </AbsoluteFill>
);

const SignScene: React.FC = () => {
  const f = useCurrentFrame();
  const i = Math.min(SIGNS.length - 1, Math.floor(f / STEP));
  const lf = f - i * STEP;
  const s = SIGNS[i];
  const card = useSpring(i * STEP + 6, 12);
  const lineIn = interpolate(lf, [18, 28], [0, 1], { ...clamp, easing: easeOut });
  return (
    <AbsoluteFill>
      <Sky />
      <Constellation key={i} seed={s.sign} at={i * STEP} />
      <div style={{ position: "absolute", top: 300, width: "100%", textAlign: "center", fontFamily: FONT.mono, fontWeight: 700, fontSize: 30, letterSpacing: 5, color: GOLD }}>
        {String(i + 1).padStart(2, "0")} / 12 · {s.dates.toUpperCase()}
      </div>
      <div key={`n${i}`} style={{ position: "absolute", top: 360, width: "100%", textAlign: "center" }}>
        <RiseWords text={s.sign} start={i * STEP + 2} style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 170, lineHeight: 1.05 }} wordStyle={() => goldText} />
      </div>
      {/* tarot-like arched frame */}
      <div style={{ position: "absolute", left: 190, top: 640, width: 700, height: 600, transform: `translateY(${(1 - card) * 80}px)`, opacity: card }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: "350px 350px 30px 30px", padding: 8, background: `linear-gradient(180deg, #FFF1D2, ${GOLD} 40%, #A9823F)`, boxShadow: `0 0 50px rgba(243,217,164,0.35)` }}>
          <div style={{ width: "100%", height: "100%", borderRadius: "342px 342px 24px 24px", overflow: "hidden", background: "#000" }}>
            {s.clip ? (
              <OffthreadVideo key={i} src={staticFile(s.clip.src)} startFrom={Math.round(s.clip.start * 30)} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <Img key={i} src={staticFile(s.img!)} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${1.1 - 0.0012 * lf})` }} />
            )}
          </div>
        </div>
        <div style={{ position: "absolute", left: "50%", bottom: -36, transform: "translateX(-50%)", whiteSpace: "nowrap", fontFamily: FONT.display, fontWeight: 800, fontSize: s.game.length > 16 ? 38 : 46, color: "#0B0E24", background: GOLD, padding: "14px 34px", borderRadius: 999, boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }}>
          {s.game}
        </div>
      </div>
      <div style={{ position: "absolute", top: 1330, width: "100%", textAlign: "center", padding: "0 80px", opacity: lineIn, transform: `translateY(${(1 - lineIn) * 30}px)` }}>
        <div style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 70, color: "#fff", lineHeight: 1.12 }}>{s.line}</div>
      </div>
    </AbsoluteFill>
  );
};

export const AstroVideo: React.FC = () => (
  <Shell hideBugFrom={1260}>
    <Sequence durationInFrames={60}>
      <Hook />
    </Sequence>
    <Sequence from={60} durationInFrames={1200}>
      <SignScene />
    </Sequence>
    <Sequence from={1260} durationInFrames={90}>
      <EndCard big="t'es quel signe ?" small="tes mates t'attendent sur le serveur" />
    </Sequence>
    {SIGNS.map((_, i) => (
      <Flash key={i} at={60 + i * STEP} strength={0.18} color="#F3D9A4" />
    ))}
    <Flash at={1260} strength={0.6} />
    <SfxAudio src={staticFile("audio/sfx-astro.wav")} />
  </Shell>
);
