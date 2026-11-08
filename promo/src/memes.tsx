import React from "react";
import { AbsoluteFill, Freeze, Img, OffthreadVideo, interpolate, staticFile, useCurrentFrame } from "remotion";
import { COLORS } from "./config";
import {
  Bow,
  Branding,
  FONT,
  Grain,
  NightBackground,
  RiseWords,
  Sparkles,
  Star,
  beatPulse,
  chromeStyle,
  clamp,
  easeOut,
  useSpring,
} from "./components";

/** Wraps a video with the permanent logo bug, drifting watermark and grain. */
export const Shell: React.FC<{ children: React.ReactNode; hideBugFrom?: number; ink?: "light" | "dark" }> = ({ children, hideBugFrom, ink = "light" }) => {
  const f = useCurrentFrame();
  const bug = hideBugFrom === undefined ? 1 : interpolate(f, [hideBugFrom - 4, hideBugFrom], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ background: COLORS.night }}>
      {children}
      <AbsoluteFill style={{ opacity: bug }}>
        <Branding ink={ink} />
      </AbsoluteFill>
      <Grain />
    </AbsoluteFill>
  );
};

/** Emoji / text sticker that pops in with an overshoot and a tilt. */
export const Sticker: React.FC<{
  at: number;
  x: number;
  y: number;
  children: React.ReactNode;
  size?: number;
  rotate?: number;
  pill?: boolean;
}> = ({ at, x, y, children, size = 140, rotate = -10, pill = false }) => {
  const f = useCurrentFrame();
  const s = useSpring(at, 8);
  if (f < at) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${s}) rotate(${rotate + Math.sin(f / 6) * 3}deg)`,
        fontSize: size,
        lineHeight: 1,
        filter: "drop-shadow(0 10px 24px rgba(0,0,0,0.55))",
        ...(pill
          ? {
              fontFamily: FONT.display,
              fontWeight: 800,
              fontSize: size * 0.42,
              color: COLORS.night,
              background: "linear-gradient(120deg, #FFFFFF, #FBD9E4)",
              padding: `${size * 0.12}px ${size * 0.26}px`,
              borderRadius: 999,
              whiteSpace: "nowrap",
              border: "4px solid #fff",
            }
          : {}),
      }}
    >
      {children}
    </div>
  );
};

/** Hand-drawn red circle that draws itself (meme style). */
export const RedCircle: React.FC<{ at: number; x: number; y: number; w?: number; h?: number }> = ({ at, x, y, w = 300, h = 220 }) => {
  const f = useCurrentFrame();
  const p = interpolate(f - at, [0, 8], [0, 1], { ...clamp, easing: easeOut });
  if (f < at) return null;
  const len = 1200;
  return (
    <svg width={w + 40} height={h + 40} style={{ position: "absolute", left: x - (w + 40) / 2, top: y - (h + 40) / 2, overflow: "visible" }}>
      <ellipse
        cx={(w + 40) / 2}
        cy={(h + 40) / 2}
        rx={w / 2}
        ry={h / 2}
        fill="none"
        stroke="#FF2D4A"
        strokeWidth={12}
        strokeLinecap="round"
        strokeDasharray={len}
        strokeDashoffset={len * (1 - p)}
        transform={`rotate(-8 ${(w + 40) / 2} ${(h + 40) / 2})`}
        style={{ filter: "drop-shadow(0 0 8px rgba(255,45,74,0.7))" }}
      />
    </svg>
  );
};

/**
 * Framed clip with a meme freeze-frame: at `freezeAt` (local frame) the image
 * stops, zooms dramatically toward (fx, fy) and loses its colours.
 */
export const MemeClip: React.FC<{
  src: string;
  start: number; // seconds in source
  freezeAt: number;
  image?: boolean;
  focus?: [number, number]; // 0..1 inside the frame
  top?: number;
  grey?: boolean;
  playbackRate?: number;
  bare?: boolean;
}> = ({ src, start, freezeAt, image, focus = [0.5, 0.5], top = 640, grey, playbackRate = 1, bare }) => {
  const f = useCurrentFrame();
  const frozen = f >= freezeAt;
  const zoom = interpolate(f - freezeAt, [0, 6], [1, 1.45], { ...clamp, easing: easeOut });
  const kb = image ? interpolate(f, [0, 90], [1, 1.1]) : 1;
  const W = bare ? 1080 : 980;
  const H = bare ? (image ? 760 : 608) : image ? 700 : 552;
  const media = image ? (
    <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
  ) : (
    <OffthreadVideo src={staticFile(src)} startFrom={Math.round(start * 30)} playbackRate={playbackRate} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
  );
  const content = frozen && !image ? <Freeze frame={freezeAt}>{media}</Freeze> : media;
  const filter = grey ? "grayscale(1) brightness(0.75) contrast(0.9)" : frozen ? "saturate(0.35) contrast(1.15) brightness(0.9)" : "none";
  return (
    <AbsoluteFill>
      {!bare && <AbsoluteFill style={{ transform: "scale(1.35)", filter: `blur(38px) brightness(0.4) ${grey ? "grayscale(1)" : "saturate(1.3)"}` }}>{content}</AbsoluteFill>}
      <div
        style={{
          position: "absolute",
          left: (1080 - W) / 2,
          top,
          width: W,
          height: H,
          borderRadius: bare ? 0 : 40,
          padding: bare ? 0 : 4,
          background: bare ? "#000" : grey ? "#777" : "linear-gradient(135deg, #FFFFFF, #E7D6FF 30%, #B78BF0 50%, #FBD9E4 70%, #FFFFFF)",
          boxShadow: bare ? "none" : grey ? "0 30px 80px rgba(0,0,0,0.5)" : "0 0 60px rgba(183,139,240,0.45), 0 30px 80px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ width: "100%", height: "100%", borderRadius: bare ? 0 : 36, overflow: "hidden", position: "relative", background: "#000" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: `scale(${zoom * kb})`,
              transformOrigin: `${focus[0] * 100}% ${focus[1] * 100}%`,
              filter,
            }}
          >
            {content}
          </div>
          {frozen && <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle, transparent 35%, rgba(0,0,0,0.75) 100%)" }} />}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** Two-line caption: plain line + chrome/pearl serif punchline. */
export const Caption: React.FC<{ a: string; b?: string; start: number; top: number; grey?: boolean; bVariant?: "chrome" | "pearl" }> = ({
  a,
  b,
  start,
  top,
  grey,
  bVariant = "pearl",
}) => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: "absolute", top, width: "100%", textAlign: "center", padding: "0 50px" }}>
      <RiseWords text={a} start={start} stagger={2} style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 58, color: grey ? "#A9A3B3" : "#fff", letterSpacing: -1.2, lineHeight: 1.15 }} />
      {b && (
        <RiseWords
          text={b}
          start={start + 6}
          stagger={2}
          style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 80, lineHeight: 1.1, marginTop: 4 }}
          wordStyle={(i) => (grey ? { color: "#8E8899" } : /\p{Extended_Pictographic}/u.test(b.split(" ")[i]) ? {} : chromeStyle(f, bVariant))}
        />
      )}
    </div>
  );
};

/** Final card: logo + 1-2 lines + "lien en commentaire 👇" pill. */
export const EndCard: React.FC<{ big: string; small?: string; extra?: string }> = ({ big, small, extra }) => {
  const f = useCurrentFrame();
  const s = useSpring(0, 10);
  const bow = useSpring(30, 14);
  const pulse = beatPulse(f);
  return (
    <AbsoluteFill>
      <NightBackground intensity={1.5} />
      <Sparkles count={26} seed="endburst" area={[440, 440, 640, 640]} burstAt={0} />
      <Sparkles count={14} seed="end" />
      <div style={{ position: "absolute", top: 330, width: "100%", display: "flex", justifyContent: "center" }}>
        <Img
          src={staticFile("brand/logo-rgc.png")}
          style={{ width: 380, transform: `scale(${0.4 + 0.6 * s}) rotate(${(1 - s) * -20}deg)`, filter: `drop-shadow(0 0 ${36 + 20 * pulse}px rgba(183,139,240,0.9))` }}
        />
      </div>
      <div style={{ position: "absolute", top: 790, width: "100%", textAlign: "center", padding: "0 50px" }}>
        <RiseWords text={big} start={6} stagger={3} style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 128, lineHeight: 1.05 }} wordStyle={() => chromeStyle(f)} />
        {small && <RiseWords text={small} start={14} stagger={2} style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 54, color: "#fff", marginTop: 14, letterSpacing: -1 }} />}
        {extra && (
          <RiseWords
            text={extra}
            start={20}
            stagger={2}
            style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 76, marginTop: 6 }}
            wordStyle={(i) => (/\p{Extended_Pictographic}/u.test(extra.split(" ")[i]) ? {} : chromeStyle(f, "pearl"))}
          />
        )}
      </div>
      <div style={{ position: "absolute", top: 1210, left: 160 }}>
        <Bow width={760} progress={bow} />
      </div>
      <div style={{ position: "absolute", top: 1330, width: "100%", display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontFamily: FONT.display,
            fontWeight: 700,
            fontSize: 44,
            color: COLORS.night,
            padding: "20px 42px",
            borderRadius: 999,
            background: "linear-gradient(120deg, #FFFFFF, #E7D6FF 50%, #FBD9E4)",
            boxShadow: `0 0 ${24 + 30 * pulse}px rgba(231,214,255,0.8)`,
            transform: `scale(${1 + 0.04 * pulse})`,
            opacity: interpolate(f, [30, 38], [0, 1], clamp),
          }}
        >
          <Star size={30} color={COLORS.lilacDeep} /> lien en commentaire <Star size={30} color={COLORS.lilacDeep} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** Meme image as a sticker: white border, rounded, pops in with a tilt. */
export const Meme: React.FC<{
  src: string;
  at: number;
  x: number;
  y: number;
  w?: number;
  rotate?: number;
  until?: number;
}> = ({ src, at, x, y, w = 380, rotate = -6, until }) => {
  const f = useCurrentFrame();
  const s = useSpring(at, 9);
  if (f < at || (until !== undefined && f >= until)) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        transform: `translate(-50%, -50%) scale(${s}) rotate(${rotate + Math.sin(f / 7) * 2}deg)`,
        padding: 10,
        background: "#fff",
        borderRadius: 30,
        boxShadow: "0 18px 50px rgba(0,0,0,0.5)",
      }}
    >
      <Img src={staticFile(src)} style={{ width: "100%", display: "block", borderRadius: 22 }} />
    </div>
  );
};
