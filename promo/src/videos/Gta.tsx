/**
 * TikTok #30 — sortie de GTA VI : « qui va jouer à GTA ce soir et demain ? »
 * Une seule image : fond ciel coucher de soleil + palmiers façon GTA VI (beaucoup de place pour le texte), zoom lent.
 * Logo RGC centré en haut, texte au milieu du ciel.
 */
import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SfxAudio } from "../safe";
import { FONT, clamp } from "../components";
import { Shell } from "../memes";

export const GTA_TOTAL = 420;
const VI_GRAD = "linear-gradient(100deg, #FFB86B 0%, #FF6FA8 45%, #B76BFF 100%)";

const appear = (f: number, at: number) => {
  const k = interpolate(f - at, [0, 12], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  return { opacity: k, transform: `translateY(${(1 - k) * 24}px)` } as React.CSSProperties;
};

export const GtaVideo: React.FC = () => {
  const f = useCurrentFrame();
  const zoom = 1.02 + f * 0.00015;
  const INK = "#3A1F5C";
  return (
    <Shell brand="center">
      <AbsoluteFill style={{ background: "#B48AC8" }}>
        <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 100%" }}>
          <Img src={staticFile("gta/gta6-ciel.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </AbsoluteFill>
        <div style={{ position: "absolute", top: 560, left: 120, right: 120, textAlign: "center" }}>
          <div style={{ ...appear(f, 6), fontFamily: FONT.mono, fontWeight: 700, fontSize: 30, letterSpacing: 10, color: "#fff", textShadow: `0 2px 10px ${INK}` }}>GTA VI</div>
          <div style={{ ...appear(f, 12), marginTop: 18, fontFamily: FONT.display, fontWeight: 800, fontSize: 70, lineHeight: 1.06, letterSpacing: -1.5, color: "#fff", textShadow: `0 4px 0 ${INK}, 0 0 26px rgba(255,111,168,0.8)` }}>
            qui va jouer à GTA
          </div>
          <div style={{ ...appear(f, 24), fontFamily: FONT.elegant, fontStyle: "italic", fontWeight: 700, fontSize: 84, lineHeight: 1.05, color: "#fff", textShadow: `0 3px 0 ${INK}, 0 0 24px rgba(255,184,107,0.9)` }}>
            ce soir et demain ?
          </div>
          <div style={{ ...appear(f, 110), fontFamily: FONT.body, fontWeight: 700, fontSize: 40, color: "#fff", marginTop: 40, lineHeight: 1.3, textShadow: `0 2px 12px ${INK}` }}>
            viens en parler avec nous sur le serveur
          </div>
          <div style={{ ...appear(f, 200), marginTop: 26, display: "inline-block", padding: "14px 28px", borderRadius: 24, background: "rgba(58,31,92,0.55)", border: "2px solid rgba(255,255,255,0.7)" }}>
            <span style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 34, color: "#fff" }}>et mets ton pseudo </span>
            <span style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 34, backgroundImage: VI_GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", WebkitTextFillColor: "transparent" }}>avec la police GTA</span>
          </div>
          <div style={{ ...appear(f, 290), marginTop: 46 }}>
            <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 32, color: INK, padding: "14px 32px", borderRadius: 999, background: "#fff", boxShadow: "0 0 30px rgba(255,111,168,0.7)" }}>lien en commentaire</span>
          </div>
        </div>
      </AbsoluteFill>
      <SfxAudio src={staticFile("audio/sfx-gta.wav")} />
    </Shell>
  );
};
