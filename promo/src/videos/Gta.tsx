/**
 * TikTok #30 — sortie de GTA VI : « qui va jouer à GTA ce soir et demain ? »
 * Une seule image : l'artwork officiel GTA VI (Jason & Lucia sur la voiture, logo en haut, 9:16) en fond plein écran, zoom lent.
 * Le logo GTA occupe le haut → logo RGC + texte placés dans le ciel (entre le logo GTA et les palmiers). Filigrane centré.
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
  const logoIn = appear(f, 2);
  return (
    <Shell brand="watermark">
      <AbsoluteFill style={{ background: "#2A1D4A" }}>
        <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 40%" }}>
          <Img src={staticFile("gta/gta6-wallpaper.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </AbsoluteFill>
        {/* soft veil in the sky (between the GTA logo and the palm trees) so the text reads well */}
        <AbsoluteFill style={{ background: "radial-gradient(60% 13% at 50% 42%, rgba(42,29,74,0.55), rgba(42,29,74,0) 100%)" }} />
        <AbsoluteFill style={{ background: "linear-gradient(180deg, transparent 82%, rgba(42,29,74,0.75) 100%)" }} />
        <div style={{ position: "absolute", top: 600, left: 120, right: 120, textAlign: "center" }}>
          <div style={{ ...logoIn, display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
            <Img src={staticFile("brand/logo-rgc.png")} style={{ width: 70, filter: "drop-shadow(0 0 12px rgba(183,107,255,0.9))" }} />
            <span style={{ fontFamily: FONT.elegant, fontStyle: "italic", fontWeight: 700, fontSize: 36, color: "#fff", textShadow: "0 2px 10px rgba(42,29,74,0.9)" }}>@rivalsgirlsclub</span>
          </div>
          <div style={{ ...appear(f, 12), marginTop: 10, fontFamily: FONT.display, fontWeight: 800, fontSize: 58, lineHeight: 1.08, letterSpacing: -1, color: "#fff", textShadow: "0 3px 0 #6B2FA0, 0 0 22px rgba(255,111,168,0.9)" }}>
            qui va jouer à GTA
          </div>
          <div style={{ ...appear(f, 24), fontFamily: FONT.elegant, fontStyle: "italic", fontWeight: 700, fontSize: 70, lineHeight: 1.05, backgroundImage: VI_GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", WebkitTextFillColor: "transparent", filter: "drop-shadow(0 2px 3px rgba(42,29,74,1)) drop-shadow(0 0 10px rgba(42,29,74,0.8))" }}>
            ce soir et demain ?
          </div>
          <div style={{ ...appear(f, 110), fontFamily: FONT.body, fontWeight: 700, fontSize: 36, color: "#fff", marginTop: 18, lineHeight: 1.3, textShadow: "0 2px 10px rgba(42,29,74,0.95)" }}>
            viens en parler avec nous sur le serveur
          </div>
          <div style={{ ...appear(f, 200), marginTop: 16, display: "inline-block", padding: "12px 24px", borderRadius: 22, background: "rgba(42,29,74,0.72)", border: "2px solid rgba(255,111,168,0.75)", boxShadow: "0 0 24px rgba(255,111,168,0.45)" }}>
            <span style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 32, color: "#fff" }}>et mets ton pseudo </span>
            <span style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 32, backgroundImage: VI_GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", WebkitTextFillColor: "transparent" }}>avec la police GTA</span>
          </div>
        </div>
        <div style={{ ...appear(f, 290), position: "absolute", top: 1730, width: "100%", textAlign: "center" }}>
          <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 32, color: "#2A1D4A", padding: "14px 32px", borderRadius: 999, background: VI_GRAD, boxShadow: "0 0 30px rgba(255,111,168,0.6)" }}>lien en commentaire</span>
        </div>
      </AbsoluteFill>
      <SfxAudio src={staticFile("audio/sfx-gta.wav")} />
    </Shell>
  );
};
