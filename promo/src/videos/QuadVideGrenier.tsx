/**
 * Hors série RGC — Vide-grenier de l'Association Quad Rider 31 (Longages, dim. 15 nov. 2026)
 * Format TikTok / Snap Spotlight / Reels, 1080×1920, 30 i/s, 24,5 s. Bruitages seuls (son tendance à ajouter dans l'appli).
 * LOOK : TERRAIN / OFF-ROAD — bitume sombre, jaune signalisation (couleur de l'asso), bandes de chantier,
 * traces de pneus, éclaboussures de boue, quad en motion design (aucune image IA).
 * Zone sûre : texte entre x 70–900 et y 230–1450 (les boutons TikTok/Snap sont à droite et en bas).
 * 0–110 accroche · 110–215 vide-grenier · 215–325 baptême de quad · 325–420 buvette · 420–540 infos · 540–645 exposants · 645–735 fin
 */
import "@fontsource/anton/400.css";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/800.css";
import React from "react";
import { AbsoluteFill, Audio, Sequence, interpolate, random, staticFile, useCurrentFrame } from "remotion";
import { clamp, easeOut, useSpring } from "../components";

export const QUAD_TOTAL = 735;

const C = {
  ink: "#121212",
  asphalt: "#1C1C1C",
  yellow: "#FFC400",
  white: "#F7F4EC",
  mud: "#6E4B2A",
  red: "#E5322D",
};
const F = {
  title: "'Anton', sans-serif",
  body: "'Barlow Condensed', sans-serif",
};

/* ---------- décor ---------- */
const Asphalt: React.FC<{ tint?: string }> = ({ tint = C.asphalt }) => (
  <AbsoluteFill style={{ background: tint }}>
    <AbsoluteFill style={{ background: "radial-gradient(70% 45% at 50% 40%, rgba(255,255,255,0.07), transparent 70%)" }} />
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: 0.35 }}>
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" />
        <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0" />
      </filter>
      <rect width="1080" height="1920" filter="url(#grain)" />
    </svg>
  </AbsoluteFill>
);

/** Bande de chantier jaune/noire qui défile. */
const Hazard: React.FC<{ top: number; h?: number; speed?: number; rot?: number }> = ({ top, h = 46, speed = 3, rot = 0 }) => {
  const f = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute", left: -100, right: -100, top, height: h, transform: `rotate(${rot}deg)`,
        backgroundImage: `repeating-linear-gradient(-45deg, ${C.yellow} 0 32px, ${C.ink} 32px 64px)`,
        backgroundPositionX: f * speed, boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
      }}
    />
  );
};

/** Trace de pneu (crans en chevrons) qui se dessine de gauche à droite. */
const TireTrack: React.FC<{ y: number; at: number; dur?: number; opacity?: number; rot?: number }> = ({ y, at, dur = 18, opacity = 0.18, rot = 0 }) => {
  const f = useCurrentFrame();
  const p = interpolate(f - at, [0, dur], [0, 1], { ...clamp, easing: easeOut });
  return (
    <div style={{ position: "absolute", left: 0, top: y, width: 1080 * p, height: 120, overflow: "hidden", opacity, transform: `rotate(${rot}deg)`, transformOrigin: "left center" }}>
      <svg width={1080} height={120}>
        <defs>
          <pattern id={`tread${y}`} width="48" height="120" patternUnits="userSpaceOnUse">
            <path d="M6 6 L30 30 L6 54 M6 66 L30 90 L6 114" stroke="#fff" strokeWidth="14" fill="none" strokeLinecap="square" />
          </pattern>
        </defs>
        <rect width="1080" height="120" fill={`url(#tread${y})`} />
      </svg>
    </div>
  );
};

/** Éclaboussures de boue qui giclent à un instant donné. */
const Splat: React.FC<{ at: number; x: number; y: number; seed: number; color?: string; n?: number; spread?: number }> = ({ at, x, y, seed, color = C.mud, n = 14, spread = 260 }) => {
  const f = useCurrentFrame();
  const t = f - at;
  if (t < 0) return null;
  const k = interpolate(t, [0, 9], [0, 1], { ...clamp, easing: easeOut });
  return (
    <>
      {Array.from({ length: n }).map((_, i) => {
        const a = random(`a${seed}${i}`) * Math.PI * 2;
        const d = (0.35 + random(`d${seed}${i}`) * 0.65) * spread * k;
        const r = 8 + random(`r${seed}${i}`) * 26;
        return (
          <div key={i} style={{ position: "absolute", left: x + Math.cos(a) * d - r, top: y + Math.sin(a) * d - r, width: r * 2, height: r * 2 * (0.8 + random(`h${seed}${i}`) * 0.4), borderRadius: "50%", background: color, opacity: 0.9 }} />
        );
      })}
    </>
  );
};

/** Quad stylisé vu de profil (motion design). */
const Quad: React.FC<{ size?: number; spin?: number; bounce?: number }> = ({ size = 520, spin = 0, bounce = 0 }) => {
  const wheel = (cx: number) => (
    <g transform={`translate(${cx} 230)`}>
      <circle r="78" fill="#0B0B0B" />
      <g transform={`rotate(${spin})`}>
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x="-10" y="-84" width="20" height="18" rx="3" fill="#2A2A2A" transform={`rotate(${i * 30})`} />
        ))}
        <circle r="42" fill={C.yellow} />
        <circle r="30" fill="#151515" />
        {[0, 72, 144, 216, 288].map((r) => <circle key={r} cx="0" cy="-20" r="5" fill={C.yellow} transform={`rotate(${r})`} />)}
      </g>
    </g>
  );
  return (
    <svg width={size} height={size * 0.62} viewBox="0 0 520 322" style={{ transform: `translateY(${bounce}px)`, overflow: "visible" }}>
      {/* suspensions */}
      <path d="M125 230 L170 150 M395 230 L350 150" stroke="#3A3A3A" strokeWidth="16" strokeLinecap="round" />
      <path d="M140 205 L165 160 M380 205 L355 160" stroke={C.yellow} strokeWidth="6" strokeDasharray="6 5" />
      {/* carrosserie */}
      <path d="M40 150 Q60 108 130 104 L210 98 L250 128 L330 128 L360 96 L470 104 Q500 110 505 150 L470 168 L360 160 L330 178 L210 178 L170 160 L60 168 Z" fill={C.yellow} stroke="#0B0B0B" strokeWidth="8" strokeLinejoin="round" />
      <path d="M70 150 L150 140 M380 140 L470 150" stroke="#0B0B0B" strokeWidth="6" strokeLinecap="round" />
      {/* selle */}
      <path d="M215 120 Q240 92 300 96 L340 104 L332 128 L246 128 Z" fill="#141414" />
      {/* guidon */}
      <path d="M350 100 L380 46 L420 40" stroke="#141414" strokeWidth="12" strokeLinecap="round" fill="none" />
      {/* phare */}
      <ellipse cx="492" cy="128" rx="12" ry="9" fill="#FFF6C9" />
      {wheel(125)}
      {wheel(395)}
    </svg>
  );
};

/* ---------- texte ---------- */
const Pop: React.FC<{ at: number; children: React.ReactNode; style?: React.CSSProperties; from?: "up" | "left" | "scale" }> = ({ at, children, style, from = "up" }) => {
  const s = useSpring(at, 13);
  const f = useCurrentFrame();
  if (f < at) return null;
  const tr = from === "left" ? `translateX(${(1 - s) * -120}px)` : from === "scale" ? `scale(${0.4 + s * 0.6}) rotate(${(1 - s) * -8}deg)` : `translateY(${(1 - s) * 70}px)`;
  return <div style={{ opacity: Math.min(1, s * 1.5), transform: tr, ...style }}>{children}</div>;
};

const Chip: React.FC<{ children: React.ReactNode; bg?: string; color?: string; size?: number; rot?: number }> = ({ children, bg = C.yellow, color = C.ink, size = 44, rot = -2 }) => (
  <span style={{ display: "inline-block", background: bg, color, fontFamily: F.body, fontWeight: 800, fontSize: size, letterSpacing: 2, padding: `${size * 0.12}px ${size * 0.4}px`, transform: `rotate(${rot}deg)`, textTransform: "uppercase" }}>{children}</span>
);

const Big: React.FC<{ children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties }> = ({ children, size = 150, color = C.white, style }) => (
  <div style={{ fontFamily: F.title, fontSize: size, lineHeight: 0.95, color, textTransform: "uppercase", textShadow: "0 8px 0 rgba(0,0,0,0.35)", ...style }}>{children}</div>
);

const Body: React.FC<{ children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties }> = ({ children, size = 54, color = C.white, style }) => (
  <div style={{ fontFamily: F.body, fontWeight: 600, fontSize: size, lineHeight: 1.15, color, ...style }}>{children}</div>
);

/** Volet bandes de chantier qui couvre chaque coupe. */
const Wipe: React.FC<{ at: number }> = ({ at }) => {
  const f = useCurrentFrame();
  const t = f - at;
  if (t < -8 || t > 8) return null;
  const x = interpolate(t, [-8, 8], [1400, -1700], { ...clamp, easing: easeOut });
  return (
    <div style={{ position: "absolute", top: -400, bottom: -400, left: x, width: 1500, transform: "skewX(-18deg)", backgroundImage: `repeating-linear-gradient(-45deg, ${C.yellow} 0 60px, ${C.ink} 60px 120px)`, boxShadow: "0 0 60px rgba(0,0,0,0.6)" }} />
  );
};

/** Petit tag permanent en haut à gauche. */
const Tag: React.FC = () => (
  <div style={{ position: "absolute", left: 70, top: 120, display: "flex", alignItems: "center", gap: 14 }}>
    <div style={{ width: 22, height: 22, background: C.yellow, transform: "rotate(45deg)" }} />
    <div style={{ fontFamily: F.body, fontWeight: 800, fontSize: 34, letterSpacing: 4, color: C.white, opacity: 0.85 }}>QUAD RIDER 31</div>
  </div>
);

const Pad: React.FC<{ children: React.ReactNode; top?: number }> = ({ children, top = 300 }) => (
  <div style={{ position: "absolute", left: 70, right: 160, top }}>{children}</div>
);

/* ---------- scènes ---------- */
const S1Hook: React.FC = () => {
  const f = useCurrentFrame();
  const x = interpolate(f, [0, 28], [-700, 270], { ...clamp, easing: easeOut });
  const spin = interpolate(f, [0, 28], [0, 720], { ...clamp, easing: easeOut }) + f * 2;
  const bounce = Math.sin(f * 0.9) * interpolate(f, [24, 40], [10, 2], clamp);
  return (
    <AbsoluteFill>
      <Asphalt />
      <TireTrack y={1330} at={0} dur={28} opacity={0.12} />
      <Pad top={290}>
        <Pop at={6}><Chip size={50}>ce dimanche à Longages</Chip></Pop>
        <Pop at={16} style={{ marginTop: 40 }}><Big size={170}>tu chines…</Big></Pop>
        <Pop at={38} style={{ marginTop: 10 }}><Big size={170} color={C.yellow}>et tu fais</Big></Pop>
        <Pop at={46}><Big size={170} color={C.yellow}>du quad.</Big></Pop>
      </Pad>
      <div style={{ position: "absolute", left: x, top: 1080 }}><Quad size={560} spin={spin} bounce={bounce} /></div>
      <Splat at={26} x={330} y={1400} seed={1} n={12} spread={200} />
    </AbsoluteFill>
  );
};

const TAGS = ["déco", "livres", "jouets", "meubles", "valises", "lampes"];
const S2Grenier: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Asphalt tint="#211A14" />
      <Hazard top={250} h={34} speed={2} rot={-3} />
      <Pad top={360}>
        <Pop at={4} from="scale"><Big size={200} color={C.yellow}>vide-</Big></Pop>
        <Pop at={10} from="scale"><Big size={200} color={C.yellow}>grenier</Big></Pop>
        <Pop at={20} style={{ marginTop: 24 }}><Chip bg={C.white} size={52} rot={1.5}>intérieur + extérieur</Chip></Pop>
      </Pad>
      <div style={{ position: "absolute", left: 70, right: 170, top: 1010, display: "flex", flexWrap: "wrap", gap: 22 }}>
        {TAGS.map((t, i) => {
          const at = 30 + i * 6;
          const swing = Math.sin((f - at) * 0.25) * interpolate(f - at, [0, 30], [14, 2], clamp);
          return (
            <Pop key={t} at={at}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, background: "#E9D9B8", color: C.ink, fontFamily: F.body, fontWeight: 800, fontSize: 48, padding: "10px 30px 10px 22px", clipPath: "polygon(28px 0, 100% 0, 100% 100%, 28px 100%, 0 50%)", paddingLeft: 48, transform: `rotate(${swing}deg)`, transformOrigin: "left center" }}>
                <div style={{ width: 14, height: 14, borderRadius: 99, background: C.asphalt }} />
                {t}
              </div>
            </Pop>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const Gauge: React.FC<{ at: number }> = ({ at }) => {
  const f = useCurrentFrame();
  const a = interpolate(f - at, [0, 20, 26, 34], [-120, 95, 70, 85], { ...clamp, easing: easeOut }) + Math.sin(f * 1.7) * 2;
  return (
    <svg width={360} height={240} viewBox="-180 -180 360 240">
      <path d="M-150 0 A150 150 0 0 1 150 0" stroke="#333" strokeWidth="26" fill="none" />
      <path d="M-150 0 A150 150 0 0 1 150 0" stroke={C.yellow} strokeWidth="26" fill="none" strokeDasharray={`${interpolate(a, [-120, 95], [0, 471], clamp)} 999`} />
      {Array.from({ length: 9 }).map((_, i) => <rect key={i} x="-3" y="-128" width="6" height="22" fill={C.white} transform={`rotate(${-90 + i * 22.5})`} />)}
      <g transform={`rotate(${a * 0.78})`}><path d="M-8 0 L0 -130 L8 0 Z" fill={C.red} /></g>
      <circle r="18" fill={C.white} />
    </svg>
  );
};

const S3Bapteme: React.FC = () => {
  const f = useCurrentFrame();
  const shake = f > 20 && f < 34 ? (random(`s${f}`) - 0.5) * 14 : 0;
  return (
    <AbsoluteFill style={{ transform: `translate(${shake}px, ${shake * 0.6}px)` }}>
      <Asphalt />
      <TireTrack y={330} at={0} dur={16} opacity={0.1} rot={-6} />
      <TireTrack y={1290} at={6} dur={16} opacity={0.1} rot={4} />
      <Pad top={300}>
        <Pop at={4}><Chip size={50} bg={C.red} color={C.white}>le petit plus</Chip></Pop>
        <Pop at={12} style={{ marginTop: 36 }}><Big size={175}>baptême</Big></Pop>
        <Pop at={18}><Big size={175} color={C.yellow}>de quad</Big></Pop>
        <Pop at={30} style={{ marginTop: 26 }}><Body size={62}>toute la journée, pour tester</Body></Pop>
        <Pop at={36}><Body size={62}>les sensations sur place</Body></Pop>
      </Pad>
      <div style={{ position: "absolute", left: 70, top: 1160 }}><Gauge at={20} /></div>
      <div style={{ position: "absolute", left: 470, top: 1210, opacity: 0.95 }}><Quad size={400} spin={f * 14} bounce={Math.sin(f * 1.3) * 4} /></div>
      <Splat at={22} x={640} y={1440} seed={3} n={16} spread={240} />
    </AbsoluteFill>
  );
};

const Cup: React.FC = () => (
  <svg width={150} height={190} viewBox="0 0 150 190">
    <path d="M20 40 L130 40 L115 180 L35 180 Z" fill={C.white} />
    <rect x="12" y="24" width="126" height="22" rx="6" fill={C.yellow} />
    <path d="M90 24 L105 0" stroke={C.red} strokeWidth="10" strokeLinecap="round" />
    <rect x="30" y="95" width="90" height="30" fill={C.yellow} />
  </svg>
);
const Burger: React.FC = () => (
  <svg width={210} height={170} viewBox="0 0 210 170">
    <path d="M15 75 Q15 10 105 10 Q195 10 195 75 Z" fill="#E09A3E" />
    {[[60, 40], [100, 30], [140, 45], [85, 58], [125, 60]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="6" ry="3" fill="#FFF0C8" />)}
    <path d="M8 85 Q40 72 70 88 Q105 72 140 88 Q170 72 202 85 L202 95 L8 95 Z" fill="#6BBF4E" />
    <rect x="12" y="95" width="186" height="26" rx="12" fill="#5A2E1B" />
    <rect x="8" y="118" width="194" height="10" fill={C.yellow} />
    <path d="M15 128 L195 128 Q195 160 105 160 Q15 160 15 128 Z" fill="#E09A3E" />
  </svg>
);

const S4Buvette: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Asphalt tint="#1A1A22" />
      <Hazard top={1500} h={34} speed={-2} rot={2} />
      <Pad top={380}>
        <Pop at={4}><Big size={175}>buvette</Big></Pop>
        <Pop at={10}><Big size={175} color={C.yellow}>+ food truck</Big></Pop>
        <Pop at={24} style={{ marginTop: 30 }}><Body size={62}>de quoi tenir de 9h à la fermeture</Body></Pop>
      </Pad>
      <div style={{ position: "absolute", left: 120, top: 1000, display: "flex", alignItems: "flex-end", gap: 90, transform: "scale(1.5)", transformOrigin: "left top" }}>
        <Pop at={32} from="scale"><div style={{ transform: `rotate(${Math.sin(f * 0.15) * 4}deg)` }}><Burger /></div></Pop>
        <Pop at={38} from="scale"><div style={{ transform: `rotate(${Math.sin(f * 0.15 + 1) * 5}deg)` }}><Cup /></div></Pop>
      </div>
    </AbsoluteFill>
  );
};

const Row: React.FC<{ at: number; label: string; children: React.ReactNode }> = ({ at, label, children }) => (
  <Pop at={at} from="left" style={{ display: "flex", gap: 26, alignItems: "flex-start", marginTop: 50 }}>
    <div style={{ minWidth: 150, fontFamily: F.body, fontWeight: 800, fontSize: 34, letterSpacing: 3, color: C.ink, background: C.yellow, padding: "8px 14px", textAlign: "center", marginTop: 14 }}>{label}</div>
    <div>{children}</div>
  </Pop>
);

const S5Infos: React.FC = () => (
  <AbsoluteFill>
    <Asphalt />
    <Pad top={400}>
      <Pop at={2}><Big size={140} color={C.yellow}>on note</Big></Pop>
      <Row at={10} label="QUAND"><Big size={92}>dim. 15 novembre</Big></Row>
      <Row at={22} label="HORAIRES"><Big size={110}>9h – 17h30</Big></Row>
      <Row at={34} label="OÙ">
        <Big size={104}>foyer du Rabé</Big>
        <Body size={50} style={{ marginTop: 8, opacity: 0.85 }}>chemin des Communaux</Body>
        <Body size={50} style={{ opacity: 0.85 }}>Longages (31)</Body>
      </Row>
      <Row at={46} label="ESPACE"><Body size={58} style={{ marginTop: 12 }}>intérieur et extérieur</Body></Row>
    </Pad>
  </AbsoluteFill>
);

const S6Expo: React.FC = () => {
  const f = useCurrentFrame();
  const blink = Math.floor(f / 8) % 2 === 0;
  return (
    <AbsoluteFill>
      <Asphalt tint="#231A12" />
      <Hazard top={240} h={34} speed={2} rot={-2} />
      <Pad top={400}>
        <Pop at={4}><Big size={165}>envie d'un</Big></Pop>
        <Pop at={8}><Big size={165} color={C.yellow}>stand ?</Big></Pop>
        <Pop at={20} style={{ marginTop: 34 }}>
          <Chip size={52} bg={blink ? C.red : "#B3221E"} color={C.white} rot={-1.5}>inscriptions jusqu'au ven. 13/11</Chip>
        </Pop>
        <Pop at={32} style={{ marginTop: 50 }}><Body size={44} style={{ opacity: 0.7, letterSpacing: 2 }}>APPELLE</Body></Pop>
        <Pop at={36}><Big size={124}>06 58 34 33 78</Big></Pop>
        <Pop at={42}><Big size={124}>06 80 94 24 70</Big></Pop>
      </Pad>
    </AbsoluteFill>
  );
};

const S7End: React.FC = () => {
  const f = useCurrentFrame();
  const x = interpolate(f, [20, 85], [-560, 1200], { ...clamp });
  return (
    <AbsoluteFill>
      <Asphalt />
      <Hazard top={300} h={40} speed={3} rot={-4} />
      <Hazard top={1420} h={40} speed={-3} rot={-4} />
      <Pad top={470}>
        <Pop at={2}><Body size={52} style={{ letterSpacing: 4 }}>ASSOCIATION</Body></Pop>
        <Pop at={6} from="scale"><Big size={190} color={C.yellow}>quad rider 31</Big></Pop>
        <Pop at={16} style={{ marginTop: 30 }}><Big size={110}>on t'attend dimanche</Big></Pop>
        <Pop at={30} style={{ marginTop: 40 }}><Chip size={46} bg={C.white} rot={1}>toutes les infos en description</Chip></Pop>
      </Pad>
      <TireTrack y={1300} at={20} dur={40} opacity={0.14} />
      <div style={{ position: "absolute", left: x, top: 1250 }}><Quad size={300} spin={f * 18} bounce={Math.sin(f * 1.1) * 4} /></div>
    </AbsoluteFill>
  );
};

const CUTS = [110, 215, 325, 420, 540, 645];

export const QuadVideGrenierVideo: React.FC = () => (
  <AbsoluteFill style={{ background: C.ink }}>
    <Sequence durationInFrames={110}><S1Hook /></Sequence>
    <Sequence from={110} durationInFrames={105}><S2Grenier /></Sequence>
    <Sequence from={215} durationInFrames={110}><S3Bapteme /></Sequence>
    <Sequence from={325} durationInFrames={95}><S4Buvette /></Sequence>
    <Sequence from={420} durationInFrames={120}><S5Infos /></Sequence>
    <Sequence from={540} durationInFrames={105}><S6Expo /></Sequence>
    <Sequence from={645} durationInFrames={90}><S7End /></Sequence>
    <Tag />
    {CUTS.map((c) => <Wipe key={c} at={c} />)}
    <Audio src={staticFile("audio/sfx-quad.wav")} />
  </AbsoluteFill>
);
