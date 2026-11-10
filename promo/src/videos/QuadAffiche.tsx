/**
 * Affiche A4 (impression + partage) — Vide-grenier Quad Rider 31.
 * 1240×1754 px (A4) rendue en ×2 → 2480×3508 = A4 300 dpi :
 * npx remotion still QuadAffiche out/affiche-quad/affiche-a4.png --scale=2
 */
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { Q } from "../quad/kit";

export const AFFICHE_W = 1240;
export const AFFICHE_H = 1754;

const Pin: React.FC<{ s?: number; c?: string; d?: string }> = ({ s = 40, c = Q.red, d = Q.white }) => (
  <svg width={s * 0.75} height={s} viewBox="0 0 24 32"><path d="M12 0C5.4 0 0 5.3 0 11.9 0 20.8 12 32 12 32s12-11.2 12-20.1C24 5.3 18.6 0 12 0z" fill={c} /><circle cx="12" cy="11.5" r="4.6" fill={d} /></svg>
);
const Clock: React.FC<{ s?: number }> = ({ s = 40 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10.5" fill="none" stroke={Q.ink} strokeWidth="3" /><path d="M12 6 V12 L16 14.5" stroke={Q.ink} strokeWidth="3" fill="none" strokeLinecap="round" /></svg>
);
const Phone: React.FC<{ s?: number }> = ({ s = 34 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z" fill={Q.yellow} /></svg>
);

const Photo: React.FC<{ src: string; pos?: string; style: React.CSSProperties }> = ({ src, pos = "50% 50%", style }) => (
  <div style={{ position: "absolute", overflow: "hidden", ...style }}>
    <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: pos, filter: "contrast(1.08) saturate(1.1)" }} />
  </div>
);

const Feature: React.FC<{ title: string; sub: string }> = ({ title, sub }) => (
  <div style={{ flex: 1, borderLeft: `8px solid ${Q.yellow}`, paddingLeft: 22 }}>
    <div style={{ fontFamily: Q.title, fontSize: 50, color: Q.ink, lineHeight: 1.02 }}>{title}</div>
    <div style={{ fontFamily: Q.body, fontWeight: 600, fontSize: 30, color: "#444", marginTop: 6 }}>{sub}</div>
  </div>
);

export const QuadAffiche: React.FC = () => (
  <AbsoluteFill style={{ background: "#F6F3EC" }}>
    {/* bandeau asso */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 150, background: Q.ink, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 70px" }}>
      <div style={{ lineHeight: 1 }}>
        <div style={{ fontFamily: Q.body, fontWeight: 800, fontSize: 28, letterSpacing: 9, color: Q.white }}>ASSOCIATION</div>
        <div style={{ fontFamily: Q.title, fontSize: 84, color: Q.yellow, marginTop: 4 }}>QUAD RIDER 31</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14, background: "#222", borderRadius: 999, padding: "12px 30px 12px 22px" }}>
        <Pin s={46} />
        <span style={{ fontFamily: Q.title, fontSize: 48, color: Q.white }}>LONGAGES</span>
      </div>
    </div>

    {/* photos : brocante | quad, coupe en biais */}
    <Photo src="quad/broc-vaisselle.jpg" style={{ left: 0, top: 150, width: 760, height: 690, clipPath: "polygon(0 0, 100% 0, 78% 100%, 0 100%)" }} />
    <Photo src="quad/quad-gerbe.jpg" pos="35% 50%" style={{ left: 560, top: 150, width: 680, height: 690, clipPath: "polygon(29% 0, 100% 0, 100% 100%, 0 100%)" }} />
    <div style={{ position: "absolute", left: 0, top: 150, width: 1240, height: 690, background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.65) 100%)" }} />
    <div style={{ position: "absolute", left: 736, top: 150, width: 14, height: 690, background: Q.yellow, transform: "skewX(-16.8deg)", transformOrigin: "top" }} />

    {/* titre */}
    <div style={{ position: "absolute", left: 70, top: 540 }}>
      <div style={{ fontFamily: Q.title, fontSize: 210, lineHeight: 0.92, color: Q.white, textShadow: "0 8px 30px rgba(0,0,0,0.6)" }}>VIDE-GRENIER</div>
      <div style={{ display: "inline-block", marginTop: 18, background: Q.white, color: Q.ink, fontFamily: Q.body, fontWeight: 800, fontSize: 42, letterSpacing: 3, padding: "6px 22px" }}>INTÉRIEUR &amp; EXTÉRIEUR</div>
    </div>

    {/* bandeau baptême */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 840, height: 150, background: Q.yellow, display: "flex", alignItems: "center", padding: "0 70px", gap: 26 }}>
      <div style={{ fontFamily: Q.title, fontSize: 92, color: Q.ink, lineHeight: 1 }}>+ BAPTÊMES DE QUAD</div>
      <div style={{ fontFamily: Q.body, fontWeight: 800, fontSize: 40, color: Q.ink, lineHeight: 1.05 }}>TOUTE LA<br />JOURNÉE</div>
    </div>

    {/* date / heure / lieu */}
    <div style={{ position: "absolute", left: 70, right: 70, top: 1003 }}>
      <div style={{ fontFamily: Q.body, fontWeight: 800, fontSize: 44, letterSpacing: 6, color: Q.red }}>DIMANCHE</div>
      <div style={{ fontFamily: Q.title, fontSize: 146, color: Q.ink, lineHeight: 0.95 }}>15 NOVEMBRE 2026</div>
      <div style={{ display: "flex", gap: 60, marginTop: 24, alignItems: "flex-start" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Clock s={52} />
          <span style={{ fontFamily: Q.title, fontSize: 70, color: Q.ink }}>9H – 17H30</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
          <div style={{ marginTop: 6 }}><Pin s={58} /></div>
          <div>
            <div style={{ fontFamily: Q.title, fontSize: 58, color: Q.ink, lineHeight: 1 }}>FOYER DU RABÉ</div>
            <div style={{ fontFamily: Q.body, fontWeight: 600, fontSize: 34, color: "#333", marginTop: 6 }}>chemin des Communaux · Longages</div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 30, marginTop: 30 }}>
        <Feature title="BUVETTE" sub="boissons sur place" />
        <Feature title="FOOD TRUCK" sub="de quoi manger sur place" />
      </div>
    </div>

    {/* exposants */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 1470, height: 284, background: Q.ink, padding: "26px 70px 0" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 24 }}>
        <span style={{ fontFamily: Q.title, fontSize: 64, color: Q.yellow }}>EXPOSANTS</span>
        <span style={{ fontFamily: Q.body, fontWeight: 800, fontSize: 38, color: Q.white }}>inscription jusqu'au vendredi 13/11/2026</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 4 }}>
        <Phone s={40} />
        <span style={{ fontFamily: Q.title, fontSize: 56, color: Q.white }}>06 58 34 33 78</span>
        <span style={{ fontFamily: Q.body, fontWeight: 600, fontSize: 36, color: "#AAA", margin: "0 6px" }}>ou</span>
        <span style={{ fontFamily: Q.title, fontSize: 56, color: Q.white }}>06 80 94 24 70</span>
      </div>
      <div style={{ fontFamily: Q.body, fontWeight: 600, fontSize: 34, color: Q.white, marginTop: 0 }}>associationquadrider31@gmail.com</div>
      <div style={{ position: "absolute", left: 70, right: 70, bottom: 14, display: "flex", justifyContent: "space-between", fontFamily: Q.body, fontWeight: 600, fontSize: 20, color: "#888" }}>
        <span>RNA : W311008482</span>
        <span>Imprimé par nos soins – Ne pas jeter sur la voie publique</span>
      </div>
    </div>
  </AbsoluteFill>
);
