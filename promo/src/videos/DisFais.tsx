/**
 * TikTok #17 — « ce que je dis en voc vs ce que je fais en game »
 * LOOK : REPLAY NÉON — fond anthracite, bulle « Vocal » en haut, clip COD en bas avec HUD « REPLAY » et tampon « EN VRAI ».
 * 0–90 accroche · 90–570 4 duos × 120 · 570–660 carte de fin
 */
import React from "react";
import { AbsoluteFill, Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { GameVideo, SfxAudio } from "../safe";
import { FONT, Flash, RiseWords, clamp, easeOut, useSpring } from "../components";
import { EndCard, Meme, Shell } from "../memes";

export const DISFAIS_TOTAL = 660;
const STEP = 120;
const REVEAL = 36; // frame in step where the clip shows up
const PINK = "#FF5FA2";

const DUOS = [
  { say: "t'inquiète, ce soir je joue safe", real: "atterrissage en plein milieu", clip: "clips/cod-atterrissage.mp4", start: 1, meme: "memes/chat-blanc-sournois.jpg" },
  { say: "je suis trop nulle au sniper", real: "elle sort le sniper", clip: "clips/cod-sniper-flamme.mp4", start: 0, meme: "memes/chat-glup.jpg" },
  { say: "moi je vais pas au corps à corps", real: "exécution, sans pitié", clip: "clips/cod-finish-violet.mp4", start: 2.4, meme: "memes/chat-roux-bouche-ouverte.jpg" },
  { say: "allez, dernière game et je dors", real: "victoire… donc on en relance une", clip: "clips/cod-podium.mp4", start: 0, meme: "memes/chat-mdr.jpg" },
];

const Bg: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#111015" }}>
      <AbsoluteFill style={{ background: `radial-gradient(70% 45% at 50% ${70 + 4 * Math.sin(f / 30)}%, ${PINK}33, transparent 70%)` }} />
      <AbsoluteFill style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.035) 0 2px, transparent 2px 6px)" }} />
    </AbsoluteFill>
  );
};

/** Discord-like voice bubble with the quote. */
const VoiceBubble: React.FC<{ text: string; at: number }> = ({ text, at }) => {
  const f = useCurrentFrame();
  const s = useSpring(at, 10);
  return (
    <div style={{ position: "absolute", top: 330, left: 90, right: 90, transform: `translateY(${(1 - s) * 40}px)`, opacity: s }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
        <span style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 26, color: "#fff", background: "#ED4245", padding: "6px 14px", borderRadius: 8, opacity: Math.floor(f / 14) % 2 ? 0.55 : 1 }}>REC</span>
        <span style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 32, color: "rgba(255,255,255,0.75)" }}>Vocal · ce que je dis</span>
      </div>
      <div style={{ background: "#2B2D31", borderRadius: 28, padding: "30px 36px", border: "2px solid rgba(255,255,255,0.08)" }}>
        <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 52, lineHeight: 1.15, color: "#fff", letterSpacing: -1 }}>« {text} »</div>
      </div>
    </div>
  );
};

const Replay: React.FC<{ d: (typeof DUOS)[number]; at: number }> = ({ d, at }) => {
  const f = useCurrentFrame();
  const s = useSpring(at, 9);
  const stamp = interpolate(f - at - 8, [0, 6], [2.2, 1], { ...clamp, easing: easeOut });
  if (f < at) return null;
  return (
    <div style={{ position: "absolute", top: 760, left: 60, width: 960, transform: `scale(${0.85 + 0.15 * s})`, opacity: s }}>
      <div style={{ position: "relative", width: 960, height: 540, borderRadius: 26, overflow: "hidden", border: `4px solid ${PINK}`, boxShadow: `0 0 50px ${PINK}66` }}>
        <Sequence from={at} layout="none"><GameVideo src={staticFile(d.clip)} startFrom={Math.round(d.start * 30)} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></Sequence>
        <div style={{ position: "absolute", left: 22, top: 18, display: "flex", alignItems: "center", gap: 10, fontFamily: FONT.mono, fontWeight: 700, fontSize: 26, color: "#fff", background: "rgba(0,0,0,0.55)", padding: "6px 14px", borderRadius: 8 }}>
          <svg width="18" height="20" viewBox="0 0 18 20"><path d="M2 1l15 9-15 9z" fill={PINK} /></svg>
          REPLAY
        </div>
      </div>
      <div style={{ position: "absolute", left: "50%", top: 470, transform: `translateX(-50%) rotate(-4deg) scale(${stamp})`, opacity: f - at > 8 ? 1 : 0, whiteSpace: "nowrap" }}>
        <span style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 46, color: "#111015", background: PINK, padding: "14px 30px", borderRadius: 16, boxShadow: "0 12px 30px rgba(0,0,0,0.5)" }}>EN VRAI : {d.real}</span>
      </div>
    </div>
  );
};

const Duos: React.FC = () => (
  <AbsoluteFill>
    <Bg />
    {DUOS.map((d, i) => (
      <Sequence key={i} from={i * STEP} durationInFrames={STEP} layout="none">
        <VoiceBubble text={d.say} at={0} />
        <Replay d={d} at={REVEAL} />
        <Meme src={d.meme} at={REVEAL + 22} x={i % 2 ? 230 : 850} y={1480} w={250} rotate={i % 2 ? -8 : 8} />
      </Sequence>
    ))}
  </AbsoluteFill>
);

const Hook: React.FC = () => (
  <AbsoluteFill>
    <Bg />
    <div style={{ position: "absolute", top: 560, width: "100%", textAlign: "center", padding: "0 80px" }}>
      <RiseWords text="ce que je dis en voc" start={2} stagger={2} style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 86, color: "#fff", letterSpacing: -3, lineHeight: 1.05 }} />
      <RiseWords text="vs" start={12} style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 120, color: PINK, lineHeight: 1.1 }} />
      <RiseWords text="ce que je fais en game" start={18} stagger={2} style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 86, color: "#fff", letterSpacing: -3, lineHeight: 1.05 }} />
    </div>
  </AbsoluteFill>
);

export const DisFaisVideo: React.FC = () => (
  <Shell hideBugFrom={570} brand="center">
    <Sequence durationInFrames={90}>
      <Hook />
    </Sequence>
    <Sequence from={90} durationInFrames={480}>
      <Duos />
    </Sequence>
    <Sequence from={570} durationInFrames={90}>
      <EndCard big="viens en voc" small="on dira rien (ou pas)" />
    </Sequence>
    {DUOS.map((_, i) => (
      <Flash key={i} at={90 + i * STEP + REVEAL} strength={0.35} color={PINK} />
    ))}
    <Flash at={570} strength={0.6} />
    <SfxAudio src={staticFile("audio/sfx-disfais.wav")} />
  </Shell>
);
