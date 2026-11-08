import React from "react";
import { AbsoluteFill, Img, OffthreadVideo, interpolate, random, staticFile, useCurrentFrame } from "remotion";
import { CHANNELS, CLIPS, COLORS, FPS, TEXT } from "./config";
import {
  BoxLetters,
  Bow,
  ClipFrame,
  FONT,
  NightBackground,
  RiseWords,
  Sparkles,
  Star,
  beatPulse,
  chromeStyle,
  clamp,
  easeOut,
  useShake,
  useSpring,
} from "./components";

/* =========================================================
   1. HOOK — carte vocal + « t'as pas encore trouvé ta squad ? »
   ========================================================= */
export const VoiceCard: React.FC<{ top?: number }> = ({ top = 540 }) => {
  const f = useCurrentFrame();
  const enter = useSpring(0, 14);
  const avatars = [COLORS.lilac, COLORS.blush, COLORS.mint, COLORS.butter, "#CDB4FF", "#FBD9E4"];
  return (
    <div
      style={{
        position: "absolute",
        left: 110,
        top,
        width: 860,
        borderRadius: 44,
        padding: "36px 40px 40px",
        background: COLORS.card,
        border: "2px solid rgba(231,214,255,0.25)",
        boxShadow: "0 0 80px rgba(183,139,240,0.25), 0 40px 90px rgba(0,0,0,0.45)",
        backdropFilter: "blur(10px)",
        opacity: enter,
        transform: `translateY(${(1 - enter) * 80}px) scale(${0.92 + 0.08 * enter})`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 40, color: "#fff" }}>🔊 Vocal</div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontFamily: FONT.mono,
            fontWeight: 700,
            fontSize: 26,
            color: "#fff",
            padding: "10px 18px",
            borderRadius: 999,
            background: "rgba(255,77,106,0.18)",
            border: "1.5px solid rgba(255,77,106,0.6)",
          }}
        >
          <span
            style={{
              width: 16,
              height: 16,
              borderRadius: 99,
              background: COLORS.live,
              boxShadow: `0 0 ${10 + 14 * beatPulse(f)}px ${COLORS.live}`,
            }}
          />
          REC
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 36 }}>
        {avatars.map((c, i) => {
          const speaking = random(`sp${Math.floor(f / 7)}-${i}`) > 0.55;
          const pop = interpolate(f - 6 - i * 3, [0, 10], [0, 1], { ...clamp, easing: easeOut });
          return (
            <div
              key={i}
              style={{
                width: 106,
                height: 106,
                borderRadius: 99,
                background: `radial-gradient(circle at 35% 30%, #fff, ${c} 55%, ${COLORS.lilacDeep})`,
                boxShadow: speaking ? `0 0 0 6px ${COLORS.night2}, 0 0 0 11px #7CF5B5, 0 0 30px #7CF5B5` : `0 0 0 6px ${COLORS.night2}`,
                transform: `scale(${pop})`,
              }}
            />
          );
        })}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 7, height: 120, marginTop: 30 }}>
        {new Array(44).fill(0).map((_, i) => {
          const n = random(`w${i}-${Math.floor(f / 2)}`);
          const h = 14 + (n * 70 + 30 * Math.sin(i * 0.5 + f * 0.4)) * (0.45 + 0.55 * beatPulse(f));
          return (
            <div
              key={i}
              style={{
                flex: 1,
                height: Math.max(10, h),
                borderRadius: 8,
                background: `linear-gradient(180deg, #FFFFFF, ${i % 3 === 0 ? COLORS.blush : i % 3 === 1 ? COLORS.lilac : COLORS.mint})`,
                opacity: 0.9,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export const HookScene: React.FC = () => {
  const f = useCurrentFrame();
  const big: React.CSSProperties = { fontFamily: FONT.display, fontWeight: 800, fontSize: 86, color: "#fff", lineHeight: 1.1, letterSpacing: -2 };
  return (
    <AbsoluteFill>
      <NightBackground />
      <Sparkles count={10} seed="hook" />
      <VoiceCard />
      <div style={{ position: "absolute", top: 1190, width: "100%", textAlign: "center" }}>
        <RiseWords text={TEXT.hookTop} start={10} style={big} />
        <RiseWords text={TEXT.hookBottom} start={24} style={{ ...big, marginTop: 6 }} />
      </div>
    </AbsoluteFill>
  );
};

/* =========================================================
   2. DROP — « un serveur entre filles. »
   ========================================================= */
export const DropScene: React.FC = () => {
  const f = useCurrentFrame();
  const s = useSpring(0, 9);
  const shake = useShake(0, 30);
  const bow = useSpring(10, 14);
  return (
    <AbsoluteFill style={{ transform: shake }}>
      <NightBackground intensity={1.5} />
      <Sparkles count={26} seed="burst" area={[440, 860, 640, 1060]} burstAt={0} />
      <Sparkles count={12} seed="drop" />
      <div style={{ position: "absolute", top: 720, width: "100%" }}>
        <BoxLetters text={TEXT.dropTop} start={2} size={44} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 870,
          width: "100%",
          textAlign: "center",
          transform: `scale(${1.6 - 0.6 * s})`,
          opacity: Math.min(1, s * 2),
        }}
      >
        <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 88, color: "#fff", letterSpacing: -2 }}>{TEXT.dropSmall}</div>
        <div style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 228, lineHeight: 1.05, marginTop: -10, ...chromeStyle(f) }}>
          {TEXT.dropBig}
        </div>
      </div>
      <div style={{ position: "absolute", top: 1290, left: 160 }}>
        <Bow width={760} progress={bow} />
      </div>
    </AbsoluteFill>
  );
};

/* =========================================================
   3. « ici, on… » — lignes + clips calés sur le beat
   ========================================================= */
const LineText: React.FC<{ lines: string[]; start: number; top?: number }> = ({ lines, start, top = 1330 }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: "absolute", top, width: "100%", textAlign: "center" }}>
      <RiseWords text={lines[0]} start={start} stagger={2} style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 66, color: "#fff", letterSpacing: -1.5 }} />
      <RiseWords
        text={lines[1]}
        start={start + 6}
        stagger={2}
        style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 96, lineHeight: 1.1 }}
        wordStyle={() => chromeStyle(f, "pearl")}
      />
    </div>
  );
};

const Header: React.FC = () => (
  <div style={{ position: "absolute", top: 470, width: "100%" }}>
    <BoxLetters text={TEXT.header} start={-100} size={40} />
  </div>
);

export const ClipLineScene: React.FC<{
  clips: { src: string; start?: number; tag: string }[];
  every: number;
  lines: string[];
  images?: boolean;
}> = ({ clips, every, lines, images }) => {
  const f = useCurrentFrame();
  const idx = Math.min(clips.length - 1, Math.floor(f / every));
  const c = clips[idx];
  return (
    <AbsoluteFill>
      <ClipFrame
        key={idx}
        src={c.src}
        startFrom={Math.round((c.start ?? 0) * FPS)}
        localFrame={f - idx * every}
        tag={c.tag}
        isImage={images}
        top={images ? 620 : 720}
      />
      <Header />
      <LineText lines={lines} start={2} top={images ? 1400 : 1380} />
    </AbsoluteFill>
  );
};

export const TalkScene: React.FC = () => {
  const f = useCurrentFrame();
  const enter = useSpring(0, 14);
  return (
    <AbsoluteFill>
      <NightBackground intensity={1.2} />
      <Sparkles count={10} seed="talk" />
      <Header />
      <div
        style={{
          position: "absolute",
          left: 130,
          top: 600,
          width: 820,
          padding: "30px 34px",
          borderRadius: 40,
          background: COLORS.discord,
          border: "2px solid rgba(231,214,255,0.22)",
          boxShadow: "0 0 70px rgba(183,139,240,0.3), 0 40px 80px rgba(0,0,0,0.45)",
          transform: `translateY(${(1 - enter) * 120}px) rotate(${(1 - enter) * -4}deg)`,
          opacity: enter,
        }}
      >
        <div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 24, color: COLORS.textSoft, letterSpacing: 3, marginBottom: 14 }}>
          ⌄ ✦ GIRL TALK
        </div>
        {CHANNELS.slice(0, 8).map((ch, i) => {
          const p = interpolate(f - 4 - i * 3, [0, 9], [0, 1], { ...clamp, easing: easeOut });
          const active = Math.floor(f / 8) % 8 === i;
          return (
            <div
              key={ch}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "13px 18px",
                borderRadius: 16,
                marginTop: 6,
                background: active ? "rgba(183,139,240,0.22)" : "transparent",
                opacity: p,
                transform: `translateX(${(1 - p) * -60}px)`,
              }}
            >
              <span style={{ fontFamily: FONT.body, fontWeight: 600, fontSize: 40, color: active ? "#fff" : "rgba(255,255,255,0.78)" }}>
                <span style={{ color: COLORS.lilac, marginRight: 14 }}>#</span>
                {ch}
              </span>
              {i % 3 !== 2 && <span style={{ width: 14, height: 14, borderRadius: 99, background: "#fff", opacity: 0.85 }} />}
            </div>
          );
        })}
      </div>
      <LineText lines={TEXT.lines.talk} start={2} top={1450} />
    </AbsoluteFill>
  );
};

/* =========================================================
   5. VALEURS — « une safe place. » + pills sur le beat
   ========================================================= */
export const ValuesScene: React.FC = () => {
  const f = useCurrentFrame();
  const shake = useShake(0, 22);
  const bgIdx = Math.floor(f / 8) % CLIPS.valuesBg.length;
  return (
    <AbsoluteFill style={{ transform: shake }}>
      <AbsoluteFill style={{ filter: "blur(16px) brightness(0.35) saturate(1.4)", transform: "scale(1.3)" }}>
        <OffthreadVideo key={bgIdx} src={staticFile(CLIPS.valuesBg[bgIdx])} startFrom={30 + bgIdx * 20} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "radial-gradient(70% 50% at 50% 45%, rgba(110,75,184,0.45), rgba(18,15,24,0.85))" }} />
      <Sparkles count={24} seed="vburst" area={[440, 640, 640, 840]} burstAt={0} />
      <div style={{ position: "absolute", top: 520, width: "100%", textAlign: "center" }}>
        <BoxLetters text={TEXT.valuesTop} start={2} size={44} />
        <div style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 150, lineHeight: 1.05, marginTop: 30, padding: "0 40px", transform: `scale(${1.3 - 0.3 * useSpring(0, 9)})`, ...chromeStyle(f) }}>
          {TEXT.valuesBig}
        </div>
      </div>
      <div style={{ position: "absolute", top: 1060, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
        {TEXT.pills.map((p, i) => {
          const at = 15 + i * 13;
          const k = interpolate(f - at, [0, 8], [0, 1], { ...clamp, easing: easeOut });
          const hit = interpolate(f - at, [0, 2, 10], [0, 1, 0], clamp);
          const colors = [COLORS.blush, COLORS.lilac, COLORS.mint, COLORS.butter];
          return (
            <div
              key={p}
              style={{
                fontFamily: FONT.display,
                fontWeight: 700,
                fontSize: 52,
                color: COLORS.night,
                padding: "18px 40px",
                borderRadius: 999,
                background: `linear-gradient(120deg, #FFFFFF, ${colors[i]})`,
                boxShadow: `0 0 ${20 + 40 * hit}px ${colors[i]}`,
                opacity: k,
                transform: `scale(${0.6 + 0.4 * k + 0.08 * hit}) rotate(${(i % 2 ? 1 : -1) * 2}deg)`,
              }}
            >
              ✦ {p}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* =========================================================
   6. CTA — logo révélé + events
   ========================================================= */
export const CtaScene: React.FC = () => {
  const f = useCurrentFrame();
  const s = useSpring(0, 10);
  const shine = interpolate(f, [8, 34], [-60, 160], clamp);
  return (
    <AbsoluteFill>
      <NightBackground intensity={1.6} />
      <Sparkles count={30} seed="cburst" area={[440, 640, 640, 840]} burstAt={0} />
      <Sparkles count={16} seed="cta" />
      <div
        style={{
          position: "absolute",
          left: 540 - 330,
          top: 380,
          width: 660,
          height: 660,
          transform: `scale(${0.3 + 0.7 * s}) rotate(${(1 - s) * -25}deg)`,
          opacity: Math.min(1, s * 1.5),
        }}
      >
        <Img
          src={staticFile("brand/logo-rgc.png")}
          style={{ width: "100%", height: "100%", filter: `drop-shadow(0 0 ${40 + 20 * beatPulse(f)}px rgba(183,139,240,0.9))` }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            WebkitMaskImage: `url(${staticFile("brand/logo-rgc.png")})`,
            WebkitMaskSize: "100% 100%",
            background: `linear-gradient(115deg, transparent ${shine - 18}%, rgba(255,255,255,0.95) ${shine}%, transparent ${shine + 18}%)`,
            mixBlendMode: "screen",
          }}
        />
      </div>
      <div style={{ position: "absolute", top: 1090, width: "100%" }}>
        <BoxLetters text={TEXT.ctaName} start={14} size={44} />
      </div>
      <div style={{ position: "absolute", top: 1230, width: "100%", display: "flex", justifyContent: "center", gap: 18 }}>
        {TEXT.ctaEvents.map((e, i) => {
          const k = interpolate(f - 36 - i * 6, [0, 8], [0, 1], { ...clamp, easing: easeOut });
          return (
            <div
              key={e}
              style={{
                fontFamily: FONT.body,
                fontWeight: 700,
                fontSize: 36,
                color: "#fff",
                padding: "14px 26px",
                borderRadius: 999,
                background: "rgba(183,139,240,0.18)",
                border: "1.5px solid rgba(231,214,255,0.45)",
                opacity: k,
                transform: `translateY(${(1 - k) * 30}px)`,
              }}
            >
              {e}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* =========================================================
   7. OUTRO — « rejoins-nous » + lien en commentaire
   ========================================================= */
export const OutroScene: React.FC = () => {
  const f = useCurrentFrame();
  const bow = useSpring(24, 14);
  const pulse = beatPulse(f);
  return (
    <AbsoluteFill>
      <NightBackground intensity={1.3} />
      <Sparkles count={18} seed="out" />
      <div style={{ position: "absolute", top: 400, width: "100%", display: "flex", justifyContent: "center" }}>
        <Img src={staticFile("brand/logo-rgc.png")} style={{ width: 300, filter: `drop-shadow(0 0 ${30 + 20 * pulse}px rgba(183,139,240,0.9))` }} />
      </div>
      <div style={{ position: "absolute", top: 780, width: "100%", textAlign: "center", padding: "0 60px" }}>
        <RiseWords text={TEXT.outroBig} start={4} stagger={4} style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 150, lineHeight: 1.1 }} wordStyle={() => chromeStyle(f)} />
      </div>
      <div style={{ position: "absolute", top: 1170, left: 160 }}>
        <Bow width={760} progress={bow} />
      </div>
      <div style={{ position: "absolute", top: 1300, width: "100%", display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontFamily: FONT.display,
            fontWeight: 700,
            fontSize: 46,
            color: COLORS.night,
            padding: "20px 44px",
            borderRadius: 999,
            background: "linear-gradient(120deg, #FFFFFF, #E7D6FF 50%, #FBD9E4)",
            boxShadow: `0 0 ${24 + 30 * pulse}px rgba(231,214,255,0.8)`,
            transform: `scale(${1 + 0.04 * pulse})`,
            opacity: interpolate(f, [28, 36], [0, 1], clamp),
          }}
        >
          <Star size={34} color={COLORS.lilacDeep} /> {TEXT.outroLink} 👇 <Star size={34} color={COLORS.lilacDeep} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
