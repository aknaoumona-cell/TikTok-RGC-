/**
 * TikTok #25 — « avant, on était un serveur Marvel Rivals » (fait réel : présentation du serveur « Anciennement sur Marvel Rivals »).
 * LOOK : GAMEPLAY EN GRAND puis MOSAÏQUE — clips Marvel Rivals plein cadre, puis le cadre se découpe en grille de jeux.
 * 0–240 Marvel Rivals · 240–510 mosaïque multi-jeux · 510–600 carte de fin
 */
import React from "react";
import { AbsoluteFill, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { GameVideo, SfxAudio } from "../safe";
import { BigClip } from "../gameplay";
import { FONT, Flash, clamp, easeOut } from "../components";
import { EndCard, Shell } from "../memes";

export const HISTOIRE_TOTAL = 600;
const PEARL = "#F4ECFF";

const Caption: React.FC<{ a: string; b?: string; at?: number }> = ({ a, b, at = 0 }) => {
  const f = useCurrentFrame();
  const k = interpolate(f - at, [0, 10], [0, 1], { ...clamp, easing: easeOut });
  return (
    <div style={{ position: "absolute", top: 300, width: "100%", textAlign: "center", padding: "0 140px", opacity: k, transform: `translateY(${(1 - k) * 20}px)` }}>
      <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 44, color: PEARL, textShadow: "0 2px 14px rgba(0,0,0,0.8)" }}>{a}</div>
      {b && <div style={{ fontFamily: FONT.elegant, fontStyle: "italic", fontWeight: 700, fontSize: 68, color: "#fff", textShadow: "0 0 22px rgba(183,155,255,0.9)", lineHeight: 1.05 }}>{b}</div>}
    </div>
  );
};

const TILES = [
  { src: "clips/g/mr-hist1.mp4", start: 4, label: "MARVEL RIVALS" },
  { src: "clips/g/tile-cod.mp4", start: 0, label: "CALL OF DUTY" },
  { src: "clips/g/tile-val.mp4", start: 0, label: "VALORANT" },
  { src: "clips/g/tile-ow.mp4", start: 0, label: "OVERWATCH" },
  { src: "clips/g/tile-dbd.mp4", start: 0, label: "DEAD BY DAYLIGHT" },
];

const Mosaic: React.FC = () => {
  const f = useCurrentFrame();
  const W = 420;
  const H = 420;
  const GAP = 20;
  const X0 = (1080 - (W * 2 + GAP)) / 2;
  const Y0 = 520;
  const cells = [...TILES, null];
  return (
    <AbsoluteFill style={{ background: "radial-gradient(80% 60% at 50% 45%, #2A2140, #0D0B14)" }}>
      {cells.map((t, i) => {
        const at = i * 14;
        const k = interpolate(f - at, [0, 12], [0, 1], { ...clamp, easing: Easing.out(Easing.back(1.4)) });
        const x = X0 + (i % 2) * (W + GAP);
        const y = Y0 + Math.floor(i / 2) * (H + GAP);
        return (
          <div key={i} style={{ position: "absolute", left: x, top: y, width: W, height: H, borderRadius: 26, overflow: "hidden", transform: `scale(${k})`, opacity: k, border: "3px solid rgba(244,236,255,0.35)", boxShadow: "0 20px 40px rgba(0,0,0,0.5)", background: "#17141F" }}>
            {t ? (
              <>
                <Sequence from={at} layout="none">
                  <GameVideo src={staticFile(t.src)} startFrom={Math.round(t.start * 30)} sound={i === 0} volume={0.35} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </Sequence>
                <div style={{ position: "absolute", left: 14, bottom: 14, fontFamily: FONT.mono, fontWeight: 700, fontSize: 20, letterSpacing: 2, color: "#fff", background: "rgba(0,0,0,0.55)", padding: "5px 10px", borderRadius: 8 }}>{t.label}</div>
              </>
            ) : (
              <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", background: "linear-gradient(145deg, #2B2340, #1A1626)" }}>
                <Img src={staticFile("brand/logo-rgc.png")} style={{ width: 200, filter: "drop-shadow(0 0 24px rgba(183,155,255,0.9))" }} />
                <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 26, color: PEARL, marginTop: 6 }}>+ plein d'autres</div>
              </AbsoluteFill>
            )}
          </div>
        );
      })}
      <Caption a="et maintenant…" b="on joue à tout" at={6} />
    </AbsoluteFill>
  );
};

export const HistoireVideo: React.FC = () => (
  <Shell hideBugFrom={510} brand="center">
    <Sequence durationInFrames={95}>
      <BigClip src="clips/g/mr-hist1.mp4" height={1180} />
      <Caption a="au début, on était" b="un serveur Marvel Rivals" at={4} />
    </Sequence>
    <Sequence from={95} durationInFrames={85}>
      <BigClip src="clips/g/mr-hist2.mp4" height={1180} />
      <Caption a="des soirées entières" b="sur Marvel Rivals" />
    </Sequence>
    <Sequence from={180} durationInFrames={60}>
      <BigClip src="clips/g/mr-hist3.mp4" height={1180} />
      <Caption a="et puis la communauté" b="a grandi…" />
    </Sequence>
    <Sequence from={240} durationInFrames={270}>
      <Mosaic />
    </Sequence>
    <Sequence from={510} durationInFrames={90}>
      <EndCard big="rejoins-nous" small="une team sur chaque jeu" />
    </Sequence>
    <Flash at={95} strength={0.3} />
    <Flash at={180} strength={0.3} />
    <Flash at={240} strength={0.7} />
    <Flash at={510} strength={0.6} />
    <SfxAudio src={staticFile("audio/sfx-histoire.wav")} />
  </Shell>
);
