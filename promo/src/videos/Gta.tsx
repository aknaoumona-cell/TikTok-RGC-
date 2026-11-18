/**
 * TikTok #30 — sortie de GTA VI : « qui va jouer à GTA ce soir et demain ? »
 * 2 artworks officiels GTA VI (Jason & Lucia) façon diaporama : slide 1 avec le logo GTA (titre dans le ciel),
 * glissement droite → gauche, slide 2 bandanas (ciel prolongé) avec logo RGC + le reste du texte.
 */
import React from "react";
import { AbsoluteFill, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SfxAudio } from "../safe";
import { FONT, clamp } from "../components";
import { Shell } from "../memes";

export const GTA_TOTAL = 435;
const VI_GRAD = "linear-gradient(100deg, #FFB86B 0%, #FF6FA8 45%, #B76BFF 100%)";

const appear = (f: number, at: number) => {
  const k = interpolate(f - at, [0, 12], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  return { opacity: k, transform: `translateY(${(1 - k) * 24}px)` } as React.CSSProperties;
};

const INK = "#2E1B52";
const SWITCH = 135; // slide 1 -> slide 2
const T = 10; // transition length

const Title: React.FC<{ top: number; f: number }> = ({ top, f }) => (
  <div style={{ position: "absolute", top, left: 120, right: 120, textAlign: "center" }}>
    <div style={{ ...appear(f, 8), fontFamily: FONT.display, fontWeight: 800, fontSize: 60, lineHeight: 1.06, letterSpacing: -1.2, color: "#fff", textShadow: `0 4px 0 ${INK}, 0 0 24px rgba(255,111,168,0.85)` }}>qui va jouer à GTA</div>
    <div style={{ ...appear(f, 20), fontFamily: FONT.elegant, fontStyle: "italic", fontWeight: 700, fontSize: 74, lineHeight: 1.05, color: "#fff", textShadow: `0 3px 0 ${INK}, 0 0 22px rgba(255,184,107,0.9)` }}>ce soir et demain ?</div>
  </div>
);

/** Slide 1 : artwork officiel (logo GTA VI en haut, Jason & Lucia sur la voiture) */
const Slide1: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ transform: `scale(${1.02 + f * 0.0002})`, transformOrigin: "50% 30%" }}>
        <Img src={staticFile("gta/gta6-wallpaper.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "radial-gradient(55% 8% at 50% 37%, rgba(46,27,82,0.5), rgba(46,27,82,0))" }} />
      <Title top={610} f={f} />
      <div style={{ position: "absolute", top: 1760, width: "100%", display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
        <Img src={staticFile("brand/logo-rgc.png")} style={{ width: 64, filter: "drop-shadow(0 0 12px rgba(183,139,240,0.9))" }} />
        <span style={{ fontFamily: FONT.elegant, fontStyle: "italic", fontWeight: 700, fontSize: 36, color: "#F4ECFF", textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}>@rivalsgirlsclub</span>
      </div>
    </AbsoluteFill>
  );
};

/** Slide 2 : artwork officiel bandanas (ciel prolongé en haut pour le texte) */
const Slide2: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ transform: `scale(${1.02 + f * 0.00015})`, transformOrigin: "50% 100%" }}>
        <Img src={staticFile("gta/gta6-bandana.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>
      <div style={{ position: "absolute", top: 120, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Img src={staticFile("brand/logo-rgc.png")} style={{ width: 96, filter: "drop-shadow(0 0 14px rgba(183,139,240,0.9))" }} />
        <div style={{ fontFamily: FONT.elegant, fontStyle: "italic", fontWeight: 700, fontSize: 44, color: "#F4ECFF", textShadow: "0 0 18px rgba(183,139,240,0.7)" }}>@rivalsgirlsclub</div>
      </div>
      <div style={{ position: "absolute", top: 380, left: 120, right: 120, textAlign: "center" }}>
        <div style={{ ...appear(f, 6), fontFamily: FONT.body, fontWeight: 700, fontSize: 42, color: "#fff", lineHeight: 1.3, textShadow: `0 2px 12px ${INK}` }}>viens en parler avec nous sur le serveur</div>
        <div style={{ ...appear(f, 90), marginTop: 26, display: "inline-block", padding: "14px 28px", borderRadius: 24, background: "rgba(46,27,82,0.6)", border: "2px solid rgba(255,255,255,0.7)" }}>
          <span style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 34, color: "#fff" }}>et mets ton pseudo </span>
          <span style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 34, backgroundImage: VI_GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", WebkitTextFillColor: "transparent" }}>avec la police GTA</span>
        </div>
        <div style={{ ...appear(f, 180), marginTop: 34 }}>
          <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 32, color: INK, padding: "14px 32px", borderRadius: 999, background: "#fff", boxShadow: "0 0 30px rgba(255,111,168,0.7)" }}>lien en commentaire</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const GtaVideo: React.FC = () => {
  const f = useCurrentFrame();
  // page-like slide from right to left
  const p = interpolate(f, [SWITCH, SWITCH + T], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  return (
    <Shell brand="watermark">
      <AbsoluteFill style={{ background: "#2E1B52", overflow: "hidden" }}>
        {f < SWITCH + T && (
          <AbsoluteFill style={{ transform: `translateX(${-p * 1080}px)` }}>
            <Slide1 />
          </AbsoluteFill>
        )}
        {f >= SWITCH && (
          <AbsoluteFill style={{ transform: `translateX(${(1 - p) * 1080}px)` }}>
            <Sequence from={SWITCH} layout="none">
              <Slide2 />
            </Sequence>
          </AbsoluteFill>
        )}
      </AbsoluteFill>
      <SfxAudio src={staticFile("audio/sfx-gta.wav")} />
    </Shell>
  );
};
