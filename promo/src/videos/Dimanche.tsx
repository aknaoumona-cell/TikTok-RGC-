/**
 * TikTok #14 — « un dimanche sur RGC »
 * LOOK : LO-FI COSY — images plein écran étalonnées chaudes, poussières qui flottent,
 * titres en bas façon carnet, petites étiquettes d'heure.
 * 0–60 accroche · 60–360 4 moments × 75 · 360–450 carte de fin
 */
import React from "react";
import { AbsoluteFill, Audio, Img, OffthreadVideo, Sequence, interpolate, random, staticFile, useCurrentFrame } from "remotion";
import { COLORS } from "../config";
import { FONT, Flash, RiseWords, clamp, easeOut } from "../components";
import { EndCard, Meme, Shell } from "../memes";

export const DIMANCHE_TOTAL = 450;
const STEP = 75;
const WARM = "#FFC48A";

const MOMENTS = [
  { tag: "l'aprem", text: "un film en voc, toutes ensemble", video: "server/cine-ecran.mp4" },
  { tag: "pendant le film", text: "on commente tout (vraiment tout)", img: "cozy/popcorn-tv.jpg", meme: "memes/girly-prient.jpg" },
  { tag: "le soir", text: "chill en voc, sans pression", img: "cozy/tasse-plaid.jpg", rec: true },
  { tag: "et parfois", text: "une petite game cosy entre filles", img: "cozy/bureau-pc.jpg", card: "gameplay/disney-dreamlight-valley.jpg" },
];

const Dust: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {new Array(28).fill(0).map((_, i) => {
        const x = random(`dx${i}`) * 1080;
        const y = (random(`dy${i}`) * 1920 - f * (0.6 + random(`ds${i}`))) % 1920;
        const s = 4 + random(`dz${i}`) * 8;
        return <div key={i} style={{ position: "absolute", left: x, top: y < 0 ? y + 1920 : y, width: s, height: s, borderRadius: 99, background: WARM, opacity: 0.25 + 0.4 * Math.abs(Math.sin(f / 20 + i)), filter: "blur(1px)" }} />;
      })}
    </AbsoluteFill>
  );
};

const Grade: React.FC = () => (
  <>
    <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(40,20,10,0.35), rgba(40,20,10,0.05) 40%, rgba(30,15,8,0.85))", mixBlendMode: "multiply" }} />
    <AbsoluteFill style={{ background: "radial-gradient(70% 50% at 50% 40%, rgba(255,196,138,0.25), transparent 70%)", mixBlendMode: "screen" }} />
  </>
);

const Hook: React.FC = () => (
  <AbsoluteFill style={{ background: "#1C120C" }}>
    <AbsoluteFill style={{ filter: "brightness(0.7) saturate(1.1)" }}>
      <Img src={staticFile("cozy/chambre-chat.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </AbsoluteFill>
    <Grade />
    <Dust />
    <div style={{ position: "absolute", top: 1150, width: "100%", padding: "0 80px" }}>
      <RiseWords text="un dimanche" start={4} style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 150, color: "#FFF4E8", lineHeight: 1, justifyContent: "flex-start" }} />
      <RiseWords text="sur RGC" start={10} style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 110, color: WARM, letterSpacing: -3, justifyContent: "flex-start" }} />
    </div>
  </AbsoluteFill>
);

const Moments: React.FC = () => {
  const f = useCurrentFrame();
  const i = Math.min(MOMENTS.length - 1, Math.floor(f / STEP));
  const lf = f - i * STEP;
  const m = MOMENTS[i];
  const fade = interpolate(lf, [0, 10], [0, 1], clamp);
  const zoom = 1.08 - 0.0012 * lf;
  return (
    <AbsoluteFill style={{ background: "#1C120C" }}>
      <AbsoluteFill style={{ opacity: fade, transform: `scale(${zoom})` }}>
        {m.video ? (
          <OffthreadVideo key={i} src={staticFile(m.video)} muted style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.9)", filter: "brightness(3.2) contrast(1.25) saturate(1.25) sepia(0.2)" }} />
        ) : (
          <Img key={i} src={staticFile(m.img!)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        )}
      </AbsoluteFill>
      <Grade />
      <Dust />
      {m.rec && (
        <div style={{ position: "absolute", top: 320, left: 70, display: "flex", alignItems: "center", gap: 14, padding: "12px 24px", borderRadius: 999, background: "rgba(28,18,12,0.6)", border: "1.5px solid rgba(255,196,138,0.5)", fontFamily: FONT.mono, fontWeight: 700, fontSize: 28, color: "#FFF4E8" }}>
          <span style={{ width: 16, height: 16, borderRadius: 99, background: COLORS.live, opacity: Math.floor(f / 12) % 2 ? 0.3 : 1 }} /> REC · Vocal
        </div>
      )}
      {m.card && (
        <div style={{ position: "absolute", left: 540, top: 760, transform: `translate(-50%, -50%) rotate(-3deg) scale(${interpolate(lf, [6, 16], [0.6, 1], { ...clamp, easing: easeOut })})`, width: 640, height: 400, borderRadius: 28, overflow: "hidden", border: "8px solid #FFF4E8", boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}>
          <Img src={staticFile(m.card)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      )}
      {m.meme && <Meme src={m.meme} at={i * STEP + 18} x={760} y={760} w={380} rotate={6} />}
      <div key={`t${i}`} style={{ position: "absolute", top: 1180, width: "100%", padding: "0 80px" }}>
        <div style={{ display: "inline-block", fontFamily: FONT.mono, fontWeight: 700, fontSize: 32, letterSpacing: 4, color: "#1C120C", background: WARM, padding: "8px 20px", borderRadius: 10, opacity: fade }}>{m.tag.toUpperCase()}</div>
        <RiseWords text={m.text} start={i * STEP + 6} stagger={2} style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 92, color: "#FFF4E8", lineHeight: 1.08, marginTop: 18, justifyContent: "flex-start" }} />
      </div>
    </AbsoluteFill>
  );
};

export const DimancheVideo: React.FC = () => (
  <Shell hideBugFrom={360}>
    <Sequence durationInFrames={60}>
      <Hook />
    </Sequence>
    <Sequence from={60} durationInFrames={300}>
      <Moments />
    </Sequence>
    <Sequence from={360} durationInFrames={90}>
      <EndCard big="viens chiller" small="avec la communauté" />
    </Sequence>
    <Flash at={360} strength={0.5} color="#FFC48A" />
    <Audio src={staticFile("audio/sfx-dimanche.wav")} />
  </Shell>
);
