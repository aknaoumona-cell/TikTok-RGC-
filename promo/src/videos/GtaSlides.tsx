/**
 * Diaporama GTA VI en 3 images fixes (à télécharger) — 1080×1920.
 * 1 : artwork officiel (logo GTA VI + Jason & Lucia) + logo du serveur + « qui va jouer à GTA ce soir et demain ? »
 * 2 : artwork officiel bandanas + logo Discord + texte serveur / pseudo
 * 3 : liste des salons du serveur (capture fournie, recadrée SANS le nombre de membres) + « viens en discuter avec nous »
 */
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { FONT } from "../components";
import { HANDLE } from "../config";

const INK = "#2E1B52";
const VI_GRAD = "linear-gradient(100deg, #FFB86B 0%, #FF6FA8 45%, #B76BFF 100%)";
const DISCORD_PATH = "M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z";

const Watermark: React.FC = () => (
  <div style={{ position: "absolute", left: 540, top: 1500, transform: "translate(-50%, -50%) rotate(-8deg)", fontFamily: FONT.mono, fontWeight: 700, fontSize: 30, letterSpacing: 3, color: "rgba(255,255,255,0.16)", whiteSpace: "nowrap" }}>✦ {HANDLE} ✦</div>
);

const Brand: React.FC<{ top: number; size?: number }> = ({ top, size = 110 }) => (
  <div style={{ position: "absolute", top, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
    <Img src={staticFile("brand/logo-rgc.png")} style={{ width: size, filter: "drop-shadow(0 0 16px rgba(183,139,240,0.95))" }} />
    <div style={{ fontFamily: FONT.elegant, fontStyle: "italic", fontWeight: 700, fontSize: 44, color: "#F4ECFF", textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}>{HANDLE}</div>
  </div>
);

const big: React.CSSProperties = { fontFamily: FONT.display, fontWeight: 800, fontSize: 62, lineHeight: 1.06, letterSpacing: -1.2, color: "#fff", textShadow: `0 4px 0 ${INK}, 0 0 24px rgba(255,111,168,0.85)` };
const serif: React.CSSProperties = { fontFamily: FONT.elegant, fontStyle: "italic", fontWeight: 700, fontSize: 76, lineHeight: 1.05, color: "#fff", textShadow: `0 3px 0 ${INK}, 0 0 22px rgba(255,184,107,0.9)` };

export const GtaSlide1: React.FC = () => (
  <AbsoluteFill style={{ background: INK }}>
    <Img src={staticFile("gta/gta6-wallpaper.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    <AbsoluteFill style={{ background: "radial-gradient(55% 12% at 50% 40%, rgba(46,27,82,0.5), rgba(46,27,82,0))" }} />
    <AbsoluteFill style={{ background: "linear-gradient(180deg, transparent 80%, rgba(46,27,82,0.7) 100%)" }} />
    <Brand top={585} size={92} />
    <div style={{ position: "absolute", top: 770, left: 120, right: 120, textAlign: "center" }}>
      <div style={big}>qui va jouer à GTA</div>
      <div style={serif}>ce soir et demain ?</div>
    </div>
    <Watermark />
  </AbsoluteFill>
);

export const GtaSlide2: React.FC = () => (
  <AbsoluteFill style={{ background: INK }}>
    <Img src={staticFile("gta/gta6-bandana.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    <div style={{ position: "absolute", top: 150, width: "100%", display: "flex", justifyContent: "center" }}>
      <div style={{ width: 150, height: 150, borderRadius: 40, background: "#5865F2", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 40px rgba(0,0,0,0.35), 0 0 40px rgba(88,101,242,0.6)" }}>
        <svg width="96" height="96" viewBox="0 0 24 24"><path d={DISCORD_PATH} fill="#fff" /></svg>
      </div>
    </div>
    <div style={{ position: "absolute", top: 350, left: 120, right: 120, textAlign: "center" }}>
      <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 46, color: "#fff", lineHeight: 1.3, textShadow: `0 2px 12px ${INK}` }}>viens en parler avec nous sur le serveur</div>
      <div style={{ marginTop: 28, display: "inline-block", padding: "16px 30px", borderRadius: 24, background: "rgba(46,27,82,0.6)", border: "2px solid rgba(255,255,255,0.7)" }}>
        <span style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 36, color: "#fff" }}>et mets ton pseudo </span>
        <span style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 36, backgroundImage: VI_GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", WebkitTextFillColor: "transparent" }}>avec la police GTA</span>
      </div>
    </div>
    <Watermark />
  </AbsoluteFill>
);

export const GtaSlide3: React.FC = () => (
  <AbsoluteFill style={{ background: "linear-gradient(170deg, #5B3FA0 0%, #C2639B 55%, #F2A46B 100%)" }}>
    <AbsoluteFill style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.12) 2px, transparent 2.5px)", backgroundSize: "40px 40px" }} />
    <Brand top={110} size={100} />
    <div style={{ position: "absolute", top: 330, left: 120, right: 120, textAlign: "center" }}>
      <div style={big}>viens en discuter</div>
      <div style={serif}>avec nous</div>
    </div>
    <div style={{ position: "absolute", top: 560, width: "100%", textAlign: "center" }}>
      <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 34, color: INK, padding: "16px 36px", borderRadius: 999, background: "#fff", boxShadow: "0 0 30px rgba(255,255,255,0.6)" }}>lien du serveur en commentaire</span>
    </div>
    <div style={{ position: "absolute", left: 150, top: 690, width: 780, height: 920, borderRadius: 36, overflow: "hidden", border: "4px solid rgba(255,255,255,0.85)", boxShadow: "0 30px 70px rgba(46,27,82,0.55)" }}>
      <Img src={staticFile("gta/salons-gta.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 50%" }} />
    </div>
    <Watermark />
  </AbsoluteFill>
);
