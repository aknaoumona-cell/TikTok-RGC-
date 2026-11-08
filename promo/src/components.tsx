import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  OffthreadVideo,
  interpolate,
  random,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BEAT, COLORS, HANDLE } from "./config";

export const FONT = {
  display: "'Unbounded', sans-serif",
  body: "'Space Grotesk', sans-serif",
  mono: "'Space Mono', monospace",
  serif: "'DM Serif Display', serif",
};

/* ---------- helpers ---------- */
export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);

/** Pulse that peaks on every beat (1 → 0 across the beat). */
export const beatPulse = (frame: number, offset = 0) => {
  const p = ((frame - offset) % BEAT + BEAT) % BEAT;
  return Math.exp(-p / 3.5);
};

/* ---------- background: soft night + iridescent haze ---------- */
export const NightBackground: React.FC<{ intensity?: number }> = ({ intensity = 1 }) => {
  const f = useCurrentFrame();
  const a = f / 90;
  return (
    <AbsoluteFill style={{ background: COLORS.night }}>
      <AbsoluteFill
        style={{
          opacity: 0.9 * intensity,
          background: `radial-gradient(60% 40% at ${50 + 18 * Math.sin(a)}% ${30 + 8 * Math.cos(a * 0.7)}%, rgba(183,139,240,0.35), transparent 70%),
            radial-gradient(50% 35% at ${30 + 15 * Math.cos(a * 0.8)}% ${75 + 6 * Math.sin(a)}%, rgba(246,193,209,0.22), transparent 70%),
            radial-gradient(40% 30% at ${78 + 10 * Math.sin(a * 1.3)}% ${62 + 10 * Math.cos(a)}%, rgba(191,235,217,0.14), transparent 70%)`,
        }}
      />
    </AbsoluteFill>
  );
};

/* ---------- film grain + vignette (always on top) ---------- */
export const Grain: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <svg width="100%" height="100%" style={{ position: "absolute", opacity: 0.11, mixBlendMode: "overlay" }}>
        <filter id={`g${f % 6}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={f % 6} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#g${f % 6})`} />
      </svg>
      <AbsoluteFill
        style={{ background: "radial-gradient(120% 80% at 50% 45%, transparent 55%, rgba(8,6,12,0.75) 100%)" }}
      />
    </AbsoluteFill>
  );
};

/* ---------- sparkle (4-point star) ---------- */
export const Star: React.FC<{ size: number; color?: string; style?: React.CSSProperties }> = ({
  size,
  color = "#fff",
  style,
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={style}>
    <path
      d="M50 0 C53 30 70 47 100 50 C70 53 53 70 50 100 C47 70 30 53 0 50 C30 47 47 30 50 0 Z"
      fill={color}
    />
  </svg>
);

export const Sparkles: React.FC<{ count?: number; seed?: string; area?: [number, number, number, number]; burstAt?: number }> = ({
  count = 14,
  seed = "s",
  area = [0, 0, 1080, 1920],
  burstAt,
}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {new Array(count).fill(0).map((_, i) => {
        const x = area[0] + random(`${seed}x${i}`) * (area[2] - area[0]);
        const y = area[1] + random(`${seed}y${i}`) * (area[3] - area[1]);
        const sz = 10 + random(`${seed}s${i}`) * 34;
        const ph = random(`${seed}p${i}`) * Math.PI * 2;
        const speed = 0.08 + random(`${seed}v${i}`) * 0.1;
        let tw = 0.5 + 0.5 * Math.sin(f * speed + ph);
        let scale = 0.4 + tw * 0.8;
        let dx = 0;
        let dy = 0;
        if (burstAt !== undefined) {
          const t = f - burstAt;
          const k = interpolate(t, [0, 24], [0, 1], { ...clamp, easing: easeOut });
          const ang = random(`${seed}a${i}`) * Math.PI * 2;
          const dist = 120 + random(`${seed}d${i}`) * 420;
          dx = Math.cos(ang) * dist * k;
          dy = Math.sin(ang) * dist * k;
          const life = interpolate(t, [0, 4, 30, 50], [0, 1, 0.8, 0], clamp);
          tw = life;
          scale = (0.6 + tw) * (t < 0 ? 0 : 1);
        }
        const colors = [COLORS.pearl, COLORS.blush, COLORS.lilac, COLORS.mint, "#fff"];
        return (
          <Star
            key={i}
            size={sz}
            color={colors[i % colors.length]}
            style={{
              position: "absolute",
              left: x + dx,
              top: y + dy,
              opacity: tw,
              transform: `scale(${scale}) rotate(${f * 0.6 + i * 20}deg)`,
              filter: "drop-shadow(0 0 8px rgba(255,255,255,0.8))",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

/* ---------- iridescent / chrome text ---------- */
export const chromeStyle = (frame: number, variant: "chrome" | "pearl" = "chrome"): React.CSSProperties => {
  const g =
    variant === "chrome"
      ? "linear-gradient(175deg, #FFFFFF 0%, #F3E8FF 22%, #C9A8FF 42%, #7B55C9 52%, #E3D2FF 64%, #FFFFFF 82%, #CDB4FF 100%)"
      : "linear-gradient(110deg, #FFFFFF 0%, #FBD9E4 18%, #E7D6FF 36%, #D3F3E8 54%, #FFFFFF 66%, #F6C1D1 84%, #E7D6FF 100%)";
  return {
    backgroundImage: g,
    backgroundSize: "220% 220%",
    backgroundPosition: `${(frame * 2.2) % 220}% 50%`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    WebkitTextFillColor: "transparent",
    filter: "drop-shadow(0 0 22px rgba(183,139,240,0.55)) drop-shadow(0 4px 0 rgba(40,20,70,0.35))",
  };
};

/** Words that rise in one by one with a soft blur (kinetic type). */
export const RiseWords: React.FC<{
  text: string;
  start: number;
  stagger?: number;
  style?: React.CSSProperties;
  wordStyle?: (i: number) => React.CSSProperties;
}> = ({ text, start, stagger = 3, style, wordStyle }) => {
  const f = useCurrentFrame();
  const words = text.split(" ");
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0 0.28em", ...style }}>
      {words.map((w, i) => {
        const t = f - start - i * stagger;
        const p = interpolate(t, [0, 10], [0, 1], { ...clamp, easing: easeOut });
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: p,
              transform: `translateY(${(1 - p) * 60}px) scale(${0.9 + 0.1 * p})`,
              filter: `blur(${(1 - p) * 12}px)`,
              ...(wordStyle ? wordStyle(i) : {}),
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};

/** The server's signature "boxed letters" style:  [R][i][v][a][l][s]  */
export const BoxLetters: React.FC<{ text: string; start: number; size?: number; style?: React.CSSProperties }> = ({
  text,
  start,
  size = 34,
  style,
}) => {
  const f = useCurrentFrame();
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: size * 0.18, flexWrap: "wrap", ...style }}>
      {text.split("").map((ch, i) => {
        const t = f - start - i * 1.2;
        const p = interpolate(t, [0, 8], [0, 1], { ...clamp, easing: easeOut });
        if (ch === " ") return <span key={i} style={{ width: size * 0.5 }} />;
        return (
          <span
            key={i}
            style={{
              fontFamily: FONT.mono,
              fontWeight: 700,
              fontSize: size,
              color: "#fff",
              lineHeight: 1,
              padding: `${size * 0.16}px ${size * 0.2}px`,
              borderRadius: size * 0.22,
              background: "rgba(56, 48, 74, 0.85)",
              border: "1.5px solid rgba(231,214,255,0.35)",
              boxShadow: "0 0 18px rgba(183,139,240,0.25)",
              opacity: p,
              transform: `translateY(${(1 - p) * -24}px) rotate(${(1 - p) * -12}deg)`,
            }}
          >
            {ch}
          </span>
        );
      })}
    </div>
  );
};

/* ---------- ribbon divider with a bow ---------- */
export const Bow: React.FC<{ width?: number; progress: number; style?: React.CSSProperties }> = ({
  width = 760,
  progress,
  style,
}) => {
  const half = (width / 2 - 60) * progress;
  return (
    <div style={{ position: "relative", width, height: 90, ...style }}>
      <div
        style={{
          position: "absolute",
          top: 44,
          left: width / 2 - 40 - half,
          width: half,
          height: 3,
          borderRadius: 3,
          background: "linear-gradient(90deg, transparent, #E7D6FF)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 44,
          left: width / 2 + 40,
          width: half,
          height: 3,
          borderRadius: 3,
          background: "linear-gradient(90deg, #E7D6FF, transparent)",
        }}
      />
      <svg
        width={110}
        height={90}
        viewBox="0 0 110 90"
        style={{ position: "absolute", left: width / 2 - 55, top: 0, transform: `scale(${progress})`, filter: "drop-shadow(0 0 10px rgba(231,214,255,0.7))" }}
      >
        <defs>
          <linearGradient id="bowg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="0.5" stopColor="#E7D6FF" />
            <stop offset="1" stopColor="#B78BF0" />
          </linearGradient>
        </defs>
        <path d="M55 45 C35 20 8 18 10 38 C12 58 38 56 55 45 Z" fill="url(#bowg)" />
        <path d="M55 45 C75 20 102 18 100 38 C98 58 72 56 55 45 Z" fill="url(#bowg)" />
        <path d="M52 47 L38 82 L46 80 L54 50 Z" fill="url(#bowg)" />
        <path d="M58 47 L72 82 L64 80 L56 50 Z" fill="url(#bowg)" />
        <circle cx="55" cy="45" r="7" fill="#fff" />
      </svg>
    </div>
  );
};

/* ---------- framed gameplay clip (blurred backdrop + punch zoom) ---------- */
export const ClipFrame: React.FC<{
  src: string;
  startFrom: number; // frames in source
  localFrame: number; // frames since this clip cut in
  tag?: string;
  isImage?: boolean;
  top?: number;
}> = ({ src, startFrom, localFrame, tag, isImage, top = 700 }) => {
  const punch = interpolate(localFrame, [0, 9], [1.14, 1], { ...clamp, easing: easeOut });
  const split = interpolate(localFrame, [0, 4], [14, 0], clamp);
  const kb = isImage ? interpolate(localFrame, [0, 60], [1.0, 1.12]) : 1;
  const media = (extra: React.CSSProperties) =>
    isImage ? (
      <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", ...extra }} />
    ) : (
      <OffthreadVideo
        src={staticFile(src)}
        startFrom={startFrom}
        muted
        style={{ width: "100%", height: "100%", objectFit: "cover", ...extra }}
      />
    );
  const W = 980;
  const H = isImage ? 700 : 552;
  return (
    <AbsoluteFill>
      {/* backdrop */}
      <AbsoluteFill style={{ transform: `scale(${1.35 * punch})`, filter: "blur(38px) brightness(0.45) saturate(1.3)" }}>
        {media({})}
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(18,15,24,0.55), rgba(18,15,24,0.15) 45%, rgba(18,15,24,0.7))" }} />
      {/* frame */}
      <div
        style={{
          position: "absolute",
          left: (1080 - W) / 2,
          top,
          width: W,
          height: H,
          borderRadius: 40,
          padding: 4,
          background: "linear-gradient(135deg, #FFFFFF, #E7D6FF 30%, #B78BF0 50%, #FBD9E4 70%, #FFFFFF)",
          boxShadow: "0 0 60px rgba(183,139,240,0.45), 0 30px 80px rgba(0,0,0,0.5)",
          transform: `scale(${punch})`,
        }}
      >
        <div style={{ width: "100%", height: "100%", borderRadius: 36, overflow: "hidden", position: "relative", background: "#000" }}>
          <div style={{ position: "absolute", inset: 0, transform: `scale(${kb})` }}>{media({})}</div>
          {split > 0.5 && (
            <>
              <div style={{ position: "absolute", inset: 0, transform: `translateX(${split}px)`, mixBlendMode: "screen", opacity: 0.6, filter: "sepia(1) hue-rotate(260deg) saturate(4)" }}>
                {media({})}
              </div>
              <div style={{ position: "absolute", inset: 0, transform: `translateX(${-split}px)`, mixBlendMode: "screen", opacity: 0.5, filter: "sepia(1) hue-rotate(120deg) saturate(4)" }}>
                {media({})}
              </div>
            </>
          )}
          <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 80px rgba(18,15,24,0.55)" }} />
        </div>
        {tag && (
          <div
            style={{
              position: "absolute",
              left: 28,
              bottom: -26,
              fontFamily: FONT.mono,
              fontWeight: 700,
              fontSize: 26,
              letterSpacing: 4,
              color: COLORS.night,
              background: "linear-gradient(90deg, #FFFFFF, #E7D6FF)",
              padding: "10px 18px",
              borderRadius: 14,
              boxShadow: "0 0 20px rgba(231,214,255,0.6)",
            }}
          >
            ✦ {tag}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

/* ---------- permanent branding: logo bug + drifting watermark ---------- */
export const Branding: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  // drifting watermark: slow lissajous path across the frame (hard to crop out)
  const x = 540 + 330 * Math.sin(f / 97);
  const y = 960 + 620 * Math.sin(f / 151 + 1.2);
  const endFade = interpolate(f, [durationInFrames - 1, durationInFrames], [1, 1], clamp);
  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity: endFade }}>
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          transform: "translate(-50%, -50%) rotate(-12deg)",
          fontFamily: FONT.mono,
          fontWeight: 700,
          fontSize: 30,
          letterSpacing: 3,
          color: "rgba(255,255,255,0.13)",
          whiteSpace: "nowrap",
        }}
      >
        ✦ {HANDLE} ✦
      </div>
      <div style={{ position: "absolute", left: 44, top: 190, display: "flex", alignItems: "center", gap: 14 }}>
        <Img src={staticFile("brand/logo-rgc.png")} style={{ width: 92, height: 92, filter: "drop-shadow(0 0 12px rgba(183,139,240,0.8))" }} />
        <div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 24, color: "rgba(255,255,255,0.85)", letterSpacing: 1.5, textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}>
          {HANDLE}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ---------- transitions ---------- */
export const Flash: React.FC<{ at: number; strength?: number; color?: string }> = ({ at, strength = 1, color = "#fff" }) => {
  const f = useCurrentFrame();
  const o = interpolate(f - at, [-1, 0, 7], [0, strength, 0], clamp);
  return <AbsoluteFill style={{ background: color, opacity: o, pointerEvents: "none", mixBlendMode: "screen" }} />;
};

/** Zoom straight through the butterfly logo (covers a cut). */
export const ButterflyZoom: React.FC<{ at: number }> = ({ at }) => {
  const f = useCurrentFrame();
  const t = f - at;
  if (t < -12 || t > 6) return null;
  const s = interpolate(t, [-12, 0, 6], [0.4, 9, 30], { ...clamp, easing: Easing.in(Easing.cubic) });
  const o = interpolate(t, [-12, -8, 2, 6], [0, 1, 1, 0], clamp);
  const r = interpolate(t, [-12, 6], [-20, 8], clamp);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
      <Img
        src={staticFile("brand/logo-rgc.png")}
        style={{ width: 700, opacity: o, transform: `scale(${s}) rotate(${r}deg)`, filter: "drop-shadow(0 0 40px rgba(183,139,240,0.9))" }}
      />
    </AbsoluteFill>
  );
};

/** Camera shake decaying after an impact. */
export const useShake = (at: number, amount = 26) => {
  const f = useCurrentFrame();
  const t = f - at;
  if (t < 0 || t > 14) return "none";
  const k = Math.exp(-t / 4) * amount;
  return `translate(${Math.sin(t * 2.7) * k}px, ${Math.cos(t * 3.3) * k}px)`;
};

export const useSpring = (at: number, damping = 12) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: f - at, fps, config: { damping, mass: 0.6, stiffness: 140 } });
};
