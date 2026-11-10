/** Kit graphique commun — vidéo + carrousel « Vide-grenier Quad Rider 31 ».
 * Look : PHOTO DE TERRAIN plein écran, typo condensée énorme, surlignage jaune (couleur de l'asso), grain argentique.
 * Photos : vraies photos trouvées sur Pinterest (ambiance), aucune image IA — à remplacer par celles de l'asso si elle en a.
 */
import "@fontsource/anton/400.css";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/800.css";
import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

export const Q = {
  ink: "#0E0E0E",
  yellow: "#FFC400",
  white: "#FFFFFF",
  red: "#E5322D",
  title: "'Anton', sans-serif",
  body: "'Barlow Condensed', sans-serif",
};
const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const useSpr = (at: number, damping = 14, stiffness = 170) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: f - at, fps, config: { damping, mass: 0.6, stiffness } });
};

/** Photo plein cadre : punch-in à l'arrivée + zoom lent (Ken Burns). `still` pour le carrousel. */
export const Photo: React.FC<{ src: string; at?: number; dur?: number; pos?: string; dark?: number; still?: boolean; punch?: number; drift?: number; style?: React.CSSProperties }> = ({ src, at = 0, dur = 120, pos = "50% 50%", dark = 0.35, still, punch = 0.25, drift = 0.1, style }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = still ? 1 : spring({ frame: f - at, fps, config: { damping: 18, mass: 0.7, stiffness: 120 } });
  const kb = still ? 0 : interpolate(f - at, [0, dur], [0, drift], cl);
  const scale = 1.04 + (1 - p) * punch + kb;
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: Q.ink, ...style }}>
      <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: pos, transform: `scale(${scale})`, filter: "contrast(1.12) saturate(1.12)" }} />
      <AbsoluteFill style={{ background: `linear-gradient(180deg, rgba(0,0,0,${dark + 0.25}) 0%, rgba(0,0,0,${dark * 0.4}) 38%, rgba(0,0,0,${dark * 0.4}) 60%, rgba(0,0,0,${dark + 0.35}) 100%)` }} />
      <AbsoluteFill style={{ boxShadow: "inset 0 0 220px rgba(0,0,0,0.65)" }} />
    </AbsoluteFill>
  );
};

/** Grain argentique animé. */
export const Grain: React.FC<{ seed?: number; opacity?: number }> = ({ seed, opacity = 0.22 }) => {
  const f = useCurrentFrame();
  const s = seed ?? Math.floor(f / 2) % 8;
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, opacity, mixBlendMode: "overlay", pointerEvents: "none" }}>
      <filter id={`g${s}`}>
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={s} />
        <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.9 0" />
      </filter>
      <rect width="1080" height="1920" filter={`url(#g${s})`} />
    </svg>
  );
};

/** Ligne de titre géante. hl = surlignage jaune texte noir. */
export const Line: React.FC<{ children: React.ReactNode; size?: number; hl?: boolean; color?: string; at?: number; still?: boolean; rot?: number; from?: "up" | "left" | "slam" }> = ({ children, size = 160, hl, color = Q.white, at = 0, still, rot = 0, from = "up" }) => {
  const f = useCurrentFrame();
  const s = useSpr(at, 13, 190);
  if (!still && f < at) return <div style={{ height: size * 1.04 }} />;
  const k = still ? 1 : s;
  const tr =
    from === "left" ? `translateX(${(1 - k) * -160}px)` :
    from === "slam" ? `scale(${1 + (1 - k) * 1.4})` :
    `translateY(${(1 - k) * 90}px)`;
  return (
    <div style={{ transform: `${tr} rotate(${rot}deg)`, opacity: Math.min(1, k * 1.6), transformOrigin: "left center" }}>
      <span style={{ display: "inline-block", fontFamily: Q.title, fontSize: size, lineHeight: 1.04, textTransform: "uppercase", color: hl ? Q.ink : color, background: hl ? Q.yellow : "transparent", padding: hl ? `0 ${size * 0.12}px` : 0, textShadow: hl ? "none" : "0 6px 28px rgba(0,0,0,0.65), 0 3px 0 rgba(0,0,0,0.5)", boxShadow: hl ? "0 14px 40px rgba(0,0,0,0.45)" : "none" }}>
        {children}
      </span>
    </div>
  );
};

export const Sub: React.FC<{ children: React.ReactNode; size?: number; at?: number; still?: boolean; color?: string; style?: React.CSSProperties }> = ({ children, size = 56, at = 0, still, color = Q.white, style }) => {
  const f = useCurrentFrame();
  const o = still ? 1 : interpolate(f - at, [0, 8], [0, 1], cl);
  const y = still ? 0 : interpolate(f - at, [0, 10], [24, 0], cl);
  return <div style={{ fontFamily: Q.body, fontWeight: 600, fontSize: size, lineHeight: 1.18, color, opacity: o, transform: `translateY(${y}px)`, textShadow: "0 3px 18px rgba(0,0,0,0.8)", ...style }}>{children}</div>;
};

export const Pill: React.FC<{ children: React.ReactNode; bg?: string; color?: string; size?: number; at?: number; still?: boolean }> = ({ children, bg = Q.white, color = Q.ink, size = 40, at = 0, still }) => {
  const s = useSpr(at, 12, 200);
  const k = still ? 1 : s;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 12, background: bg, color, fontFamily: Q.body, fontWeight: 800, fontSize: size, letterSpacing: 2, textTransform: "uppercase", padding: `${size * 0.2}px ${size * 0.55}px`, borderRadius: 999, transform: `scale(${0.6 + k * 0.4})`, opacity: Math.min(1, k * 1.5), transformOrigin: "left center" }}>{children}</span>
  );
};

/** Signature permanente en haut. */
export const Brand: React.FC<{ dark?: boolean }> = ({ dark }) => (
  <div style={{ position: "absolute", left: 70, top: 120, display: "flex", alignItems: "center", gap: 14 }}>
    <div style={{ width: 20, height: 20, background: Q.yellow, transform: "rotate(45deg)", boxShadow: dark ? "none" : "0 0 0 4px rgba(0,0,0,0.25)" }} />
    <div style={{ fontFamily: Q.body, fontWeight: 800, fontSize: 32, letterSpacing: 5, color: dark ? Q.ink : Q.white, textShadow: dark ? "none" : "0 2px 10px rgba(0,0,0,0.8)" }}>ASSO QUAD RIDER 31</div>
  </div>
);

/** Fond jaune avec traces de pneus (écran infos). */
export const YellowTread: React.FC<{ offset?: number }> = ({ offset = 0 }) => (
  <AbsoluteFill style={{ background: Q.yellow }}>
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: 0.09 }}>
      <defs>
        <pattern id="tr" width="64" height="200" patternUnits="userSpaceOnUse" patternTransform={`rotate(-20) translate(${offset} 0)`}>
          <path d="M8 10 L40 50 L8 90 M8 110 L40 150 L8 190" stroke="#000" strokeWidth="18" fill="none" />
        </pattern>
      </defs>
      <rect x="-200" y="200" width="1500" height="220" fill="url(#tr)" transform="rotate(-8 540 300)" />
      <rect x="-200" y="1500" width="1500" height="220" fill="url(#tr)" transform="rotate(-8 540 1600)" />
    </svg>
  </AbsoluteFill>
);

/** Ligne d'info : étiquette + valeur. */
export const InfoRow: React.FC<{ label: string; children: React.ReactNode; at?: number; still?: boolean }> = ({ label, children, at = 0, still }) => {
  const s = useSpr(at, 14, 180);
  const k = still ? 1 : s;
  return (
    <div style={{ display: "flex", gap: 28, alignItems: "flex-start", marginTop: 46, opacity: Math.min(1, k * 1.5), transform: `translateX(${(1 - k) * -120}px)` }}>
      <div style={{ minWidth: 170, background: Q.ink, color: Q.yellow, fontFamily: Q.body, fontWeight: 800, fontSize: 32, letterSpacing: 4, padding: "10px 0", textAlign: "center", marginTop: 18 }}>{label}</div>
      <div style={{ color: Q.ink }}>{children}</div>
    </div>
  );
};
