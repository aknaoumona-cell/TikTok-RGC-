/**
 * TikTok #2 — « jouer seule vs jouer à plusieurs »   LOOK : CINÉMA
 * Image large plein écran (fond flouté, pas de bandes noires → TikTok ne zoome pas), sous-titres façon film.
 * 0–105   : chapitre 1 · solo (gris, ralenti, « wah wah »)
 * 105–300 : chapitre 2 · à plusieurs (couleurs chaudes, REC, clips sur le beat)
 * 300–420 : viens en voc sur le serveur et demande des mates
 */
import React from "react";
import { AbsoluteFill, Audio, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { COLORS } from "../config";
import { ButterflyZoom, FONT, Flash, beatPulse, clamp, easeOut } from "../components";
import { EndCard, Meme, Shell } from "../memes";

export const SOLO_TOTAL = 420;

const TXT = {
  solo: ["jouer seule…", "personne pour fêter ton clutch"],
  squad: ["jouer à plusieurs,", "c'est quand même mieux."],
  endBig: "viens en voc",
  endSmall: "sur le serveur",
  endExtra: "et demande des mates ✦",
};

const SQUAD_CLIPS = [
  { src: "clips/marvel-rivals-highlight.mp4", start: 2.2 },
  { src: "clips/among-us-votes.mp4", start: 12.6 },
  { src: "clips/overwatch-action.mp4", start: 1.5 },
  { src: "clips/cod-sniper-rose.mp4", start: 1.0 },
  { src: "clips/marvel-rivals-jungle.mp4", start: 4.0 },
  { src: "clips/overwatch-hd.mp4", start: 0.2 },
];

const PIC_TOP = 520;
const PIC_H = 760;

/** Wide picture (no frame, sharp edges) like a film shot. */
const Picture: React.FC<{ src: string; start: number; rate?: number; filter?: string; cutFrame?: number }> = ({ src, start, rate = 1, filter = "none", cutFrame = 0 }) => {
  const f = useCurrentFrame();
  const zoom = interpolate(f - cutFrame, [0, 30], [1.08, 1.0], { ...clamp, easing: easeOut });
  const media = (
    <OffthreadVideo src={staticFile(src)} startFrom={Math.round(start * 30)} playbackRate={rate} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
  );
  return (
    <>
    <AbsoluteFill style={{ transform: "scale(1.4)", filter: `blur(40px) brightness(0.45) saturate(1.2) ${filter === "none" ? "" : filter}` }}>{media}</AbsoluteFill>
    <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.35))" }} />
    <div style={{ position: "absolute", left: 0, top: PIC_TOP, width: 1080, height: PIC_H, overflow: "hidden", background: "#000", boxShadow: "0 30px 80px rgba(0,0,0,0.6)" }}>
      <div style={{ position: "absolute", inset: 0, transform: `scale(${zoom})`, filter }}>
        {media}
      </div>
      <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 120px rgba(0,0,0,0.6)" }} />
    </div>
    </>
  );
};

/** Film subtitles: two lines, fade in, white with a soft dark outline. */
const Subtitles: React.FC<{ lines: string[]; at: number; accent?: boolean }> = ({ lines, at, accent }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: "absolute", top: PIC_TOP + PIC_H + 70, width: "100%", textAlign: "center", padding: "0 70px" }}>
      {lines.map((l, i) => {
        const o = interpolate(f - at - i * 14, [0, 5], [0, 1], clamp);
        return (
          <div
            key={i}
            style={{
              fontFamily: i === 1 && accent ? FONT.serif : FONT.body,
              fontStyle: i === 1 && accent ? "italic" : "normal",
              fontWeight: i === 1 && accent ? 400 : 600,
              fontSize: i === 1 && accent ? 78 : 54,
              color: i === 1 && accent ? COLORS.blush : "#fff",
              lineHeight: 1.25,
              opacity: o,
              textShadow: "0 0 3px #000, 0 3px 14px rgba(0,0,0,0.9)",
            }}
          >
            {l}
          </div>
        );
      })}
    </div>
  );
};

const RecBadge: React.FC = () => {
  const f = useCurrentFrame();
  const blink = Math.floor(f / 12) % 2 === 0;
  return (
    <div style={{ position: "absolute", left: 40, top: PIC_TOP + 30, display: "flex", alignItems: "center", gap: 14, fontFamily: FONT.mono, fontWeight: 700, fontSize: 30, color: "#fff", textShadow: "0 2px 8px #000" }}>
      <span style={{ width: 22, height: 22, borderRadius: 99, background: COLORS.live, opacity: blink ? 1 : 0.25, boxShadow: `0 0 14px ${COLORS.live}` }} />
      REC · vocal
    </div>
  );
};

const SoloPart: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Picture src="clips/cod-action.mp4" start={3.5} rate={0.5} filter="grayscale(1) brightness(0.8) contrast(0.9)" />
    <Subtitles lines={TXT.solo} at={8} />
    <Meme src="memes/chat-pleure-telephone.jpg" at={50} x={830} y={PIC_TOP - 40} w={300} rotate={7} />
  </AbsoluteFill>
);

const SquadPart: React.FC = () => {
  const f = useCurrentFrame();
  const every = 30;
  const idx = Math.min(SQUAD_CLIPS.length - 1, Math.floor(f / every));
  const c = SQUAD_CLIPS[idx];
  const warm = 0.55 + 0.1 * beatPulse(f);
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <AbsoluteFill style={{ background: `radial-gradient(70% 30% at 50% 47%, rgba(246,193,209,${0.22 * warm}), transparent 70%)` }} />
      <Picture key={idx} src={c.src} start={c.start} filter="saturate(1.25) contrast(1.05) sepia(0.12) hue-rotate(-8deg)" cutFrame={idx * every} />
      <RecBadge />
      <Subtitles lines={TXT.squad} at={6} accent />
      <Meme src="memes/chat-gaming-chaise.jpg" at={40} x={250} y={PIC_TOP - 40} w={300} rotate={-8} until={100} />
      <Meme src="memes/chaton-manette.jpg" at={100} x={830} y={PIC_TOP - 40} w={300} rotate={8} until={160} />
      <Meme src="memes/chat-lunettes-soleil.jpg" at={160} x={540} y={PIC_TOP + PIC_H / 2} w={360} rotate={-4} />
    </AbsoluteFill>
  );
};

export const SoloVideo: React.FC = () => (
  <Shell hideBugFrom={300}>
    <Sequence durationInFrames={105}>
      <SoloPart />
    </Sequence>
    <Sequence from={105} durationInFrames={195}>
      <SquadPart />
    </Sequence>
    <Sequence from={300} durationInFrames={120}>
      <EndCard big={TXT.endBig} small={TXT.endSmall} extra={TXT.endExtra} />
    </Sequence>
    <ButterflyZoom at={105} />
    <Flash at={105} strength={0.75} />
    <Flash at={300} strength={0.6} />
    <Audio src={staticFile("audio/sfx-solo.wav")} />
  </Shell>
);
