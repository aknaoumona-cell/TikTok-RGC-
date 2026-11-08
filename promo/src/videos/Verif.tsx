/**
 * TikTok #15 — « pov : tu passes la vérif vocale »
 * LOOK : APPLI DE MESSAGES VOCAUX — écran de chat sombre, consignes claires, bouton micro maintenu,
 * onde d'enregistrement, électrocardiogramme, confettis.
 * La vérif = un petit MESSAGE VOCAL, tout est expliqué, c'est rapide.
 * 0–75 consignes · 75–150 stress · 150–225 coeur · 225–300 enregistrement + envoi · 300–375 validée · 375–465 fin
 */
import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, interpolate, random, staticFile, useCurrentFrame } from "remotion";
import { COLORS } from "../config";
import { FONT, Flash, RiseWords, clamp, easeOut, useSpring } from "../components";
import { EndCard, Meme, Shell } from "../memes";

export const VERIF_TOTAL = 465;

const ChatBg: React.FC<{ tint?: string }> = ({ tint = "#2B2140" }) => (
  <AbsoluteFill style={{ background: `linear-gradient(180deg, ${tint}, #0D0A14 80%)` }}>
    <AbsoluteFill style={{ background: "radial-gradient(60% 30% at 50% 25%, rgba(183,139,240,0.28), transparent 70%)" }} />
  </AbsoluteFill>
);

const Header: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 300, height: 120, display: "flex", alignItems: "center", gap: 22, padding: "0 60px", borderBottom: "2px solid rgba(255,255,255,0.08)" }}>
    <div style={{ width: 84, height: 84, borderRadius: 99, background: "#120E1A", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 24px rgba(183,139,240,0.5)" }}>
      <Img src={staticFile("brand/logo-rgc.png")} style={{ width: 66 }} />
    </div>
    <div>
      <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 40, color: "#fff" }}>vérif vocale</div>
      <div style={{ fontFamily: FONT.body, fontWeight: 500, fontSize: 26, color: "rgba(255,255,255,0.6)" }}>Rivals Girls Club</div>
    </div>
  </div>
);

/** Guide card: the steps are explained, it's quick. */
const GuideCard: React.FC<{ at: number }> = ({ at }) => {
  const f = useCurrentFrame();
  const s = useSpring(at, 11);
  const steps = ["lis les consignes", "envoie un petit message vocal", "et c'est validé"];
  return (
    <div style={{ position: "absolute", left: 60, right: 60, top: 480, padding: "34px 40px", borderRadius: 36, background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(231,214,255,0.3)", opacity: s, transform: `translateY(${(1 - s) * 50}px)` }}>
      <div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 28, letterSpacing: 4, color: COLORS.lilac }}>TOUT EST EXPLIQUÉ</div>
      {steps.map((t, i) => {
        const k = interpolate(f - at - 10 - i * 8, [0, 8], [0, 1], { ...clamp, easing: easeOut });
        return (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: 22, marginTop: 24, opacity: k, transform: `translateX(${(1 - k) * -40}px)` }}>
            <div style={{ width: 58, height: 58, borderRadius: 99, background: COLORS.lilac, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT.display, fontWeight: 800, fontSize: 30, color: "#17111F" }}>{i + 1}</div>
            <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 44, color: "#fff" }}>{t}</div>
          </div>
        );
      })}
    </div>
  );
};

const MicBar: React.FC<{ recording?: boolean; elapsed?: number }> = ({ recording, elapsed = 0 }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: "absolute", left: 50, right: 50, top: 1420, height: 130, borderRadius: 999, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", padding: "0 20px 0 40px", gap: 20 }}>
      {recording ? (
        <>
          <span style={{ width: 22, height: 22, borderRadius: 99, background: COLORS.live, opacity: Math.floor(f / 8) % 2 ? 0.3 : 1 }} />
          <span style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 34, color: "#fff", width: 90 }}>0:0{Math.min(9, Math.floor(elapsed / 30))}</span>
          <div style={{ flex: 1, height: 70, display: "flex", alignItems: "center", gap: 6 }}>
            {new Array(34).fill(0).map((_, i) => (
              <div key={i} style={{ flex: 1, borderRadius: 6, background: COLORS.lilac, height: 10 + random(`r${i}-${Math.floor(f / 2)}`) * 60 * Math.min(1, elapsed / 10) }} />
            ))}
          </div>
        </>
      ) : (
        <div style={{ flex: 1, fontFamily: FONT.body, fontWeight: 500, fontSize: 34, color: "rgba(255,255,255,0.45)" }}>maintiens pour enregistrer…</div>
      )}
      <div style={{ width: 100, height: 100, borderRadius: 99, background: recording ? COLORS.live : COLORS.lilac, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${recording ? 1.15 + 0.05 * Math.sin(f / 3) : 1})`, boxShadow: recording ? `0 0 40px ${COLORS.live}` : "none" }}>
        <svg width="46" height="46" viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="12" rx="3" fill="#fff" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
      </div>
    </div>
  );
};

const Caption: React.FC<{ text: string; start?: number; top?: number }> = ({ text, start = 4, top = 1060 }) => (
  <div style={{ position: "absolute", top, width: "100%", textAlign: "center", padding: "0 70px" }}>
    <RiseWords text={text} start={start} stagger={2} style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 80, color: "#fff", lineHeight: 1.1 }} />
  </div>
);

const Guide: React.FC = () => (
  <AbsoluteFill>
    <ChatBg />
    <Header />
    <div style={{ position: "absolute", top: 1180, width: "100%", textAlign: "center", fontFamily: FONT.mono, fontWeight: 700, fontSize: 34, color: COLORS.blush, letterSpacing: 4 }}>POV : TU PASSES LA VÉRIF VOCALE</div>
    <GuideCard at={4} />
    <MicBar />
  </AbsoluteFill>
);

const Stress: React.FC = () => (
  <AbsoluteFill>
    <ChatBg />
    <Header />
    <Caption text="t'as répété ton « coucou » 4 fois dans ta tête avant d'appuyer" top={600} />
    <Meme src="memes/chat-nervous-gulp.jpg" at={14} x={540} y={1100} w={360} rotate={-5} />
    <MicBar />
  </AbsoluteFill>
);

const Heart: React.FC = () => {
  const f = useCurrentFrame();
  const pts: string[] = [];
  for (let x = 0; x <= 1080; x += 6) {
    const ph = ((x + f * 14) % 270) / 270;
    let y = 0;
    if (ph > 0.42 && ph < 0.46) y = -160;
    else if (ph >= 0.46 && ph < 0.5) y = 120;
    else if (ph >= 0.5 && ph < 0.53) y = -40;
    y += Math.sin(x / 30 + f) * 3;
    pts.push(`${x},${y}`);
  }
  return (
    <AbsoluteFill>
      <ChatBg tint="#4A1A2E" />
      <div style={{ position: "absolute", top: 380, width: "100%", textAlign: "center", fontFamily: FONT.display, fontWeight: 800, fontSize: 200, color: "#FF5C7A", letterSpacing: -6, transform: `scale(${1 + 0.05 * Math.abs(Math.sin(f / 4))})` }}>180</div>
      <div style={{ position: "absolute", top: 600, width: "100%", textAlign: "center", fontFamily: FONT.mono, fontWeight: 700, fontSize: 40, color: "#fff", letterSpacing: 8 }}>BPM</div>
      <svg width={1080} height={400} style={{ position: "absolute", top: 760 }} viewBox="0 -200 1080 400">
        <polyline points={pts.join(" ")} fill="none" stroke="#FF5C7A" strokeWidth={8} strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 12px #FF5C7A)" }} />
      </svg>
      <Caption text="ton cœur quand t'appuies sur le micro" top={1220} />
    </AbsoluteFill>
  );
};

const Recording: React.FC = () => {
  const f = useCurrentFrame();
  const sent = f >= 44;
  const bubble = useSpring(46, 10);
  const word = useSpring(6, 9);
  return (
    <AbsoluteFill>
      <ChatBg />
      <Header />
      {!sent && (
        <div style={{ position: "absolute", top: 760, width: "100%", display: "flex", justifyContent: "center" }}>
          <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 110, color: "#fff", transform: `scale(${word})` }}>« coucou ! »</div>
        </div>
      )}
      {!sent && <div style={{ position: "absolute", top: 920, width: "100%", textAlign: "center", fontFamily: FONT.body, fontWeight: 600, fontSize: 40, color: "rgba(255,255,255,0.7)", opacity: interpolate(f, [18, 26], [0, 1], clamp) }}>(une octave plus haut que d'habitude)</div>}
      {sent && (
        <div style={{ position: "absolute", right: 60, top: 1180, display: "flex", alignItems: "center", gap: 20, padding: "26px 34px", borderRadius: "40px 40px 12px 40px", background: COLORS.lilacDeep, transform: `scale(${bubble})`, transformOrigin: "right bottom" }}>
          <div style={{ width: 64, height: 64, borderRadius: 99, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="30" height="30" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill={COLORS.lilacDeep} /></svg>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, height: 50 }}>
            {new Array(22).fill(0).map((_, i) => <div key={i} style={{ width: 8, borderRadius: 4, background: "#fff", height: 10 + random(`b${i}`) * 40 }} />)}
          </div>
          <div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 30, color: "#fff" }}>0:04</div>
        </div>
      )}
      {sent && <div style={{ position: "absolute", top: 1310, right: 70, fontFamily: FONT.body, fontWeight: 600, fontSize: 28, color: "rgba(255,255,255,0.6)" }}>envoyé</div>}
      <MicBar recording={!sent} elapsed={f} />
    </AbsoluteFill>
  );
};

const Welcome: React.FC = () => {
  const f = useCurrentFrame();
  const s = useSpring(0, 9);
  return (
    <AbsoluteFill>
      <ChatBg tint="#1F5A44" />
      {new Array(60).fill(0).map((_, i) => {
        const x = random(`cx${i}`) * 1080;
        const y = -50 + f * (8 + random(`cv${i}`) * 10) + random(`cy${i}`) * -400;
        const c = [COLORS.blush, COLORS.lilac, COLORS.mint, COLORS.butter, "#fff"][i % 5];
        return <div key={i} style={{ position: "absolute", left: x, top: y, width: 18, height: 28, background: c, transform: `rotate(${f * 12 + i * 30}deg)`, borderRadius: 4 }} />;
      })}
      <div style={{ position: "absolute", top: 480, width: "100%", textAlign: "center", transform: `scale(${0.6 + 0.4 * s})`, opacity: s }}>
        <div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 36, color: COLORS.mint, letterSpacing: 6 }}>VÉRIF VALIDÉE</div>
        <div style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 150, color: "#fff", lineHeight: 1.05, marginTop: 20 }}>bienvenue</div>
        <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 64, color: "#fff", letterSpacing: -1 }}>dans la communauté</div>
        <div style={{ marginTop: 26, fontFamily: FONT.body, fontWeight: 600, fontSize: 40, color: "rgba(255,255,255,0.8)", opacity: interpolate(f, [16, 24], [0, 1], clamp) }}>(c'était rapide en vrai)</div>
      </div>
      <Meme src="memes/chat-danse.jpg" at={12} x={540} y={1330} w={340} rotate={-4} />
    </AbsoluteFill>
  );
};

export const VerifVideo: React.FC = () => (
  <Shell hideBugFrom={375}>
    <Sequence durationInFrames={75}><Guide /></Sequence>
    <Sequence from={75} durationInFrames={75}><Stress /></Sequence>
    <Sequence from={150} durationInFrames={75}><Heart /></Sequence>
    <Sequence from={225} durationInFrames={75}><Recording /></Sequence>
    <Sequence from={300} durationInFrames={75}><Welcome /></Sequence>
    <Sequence from={375} durationInFrames={90}>
      <EndCard big="à ton tour" small="un petit vocal et c'est bon" />
    </Sequence>
    <Flash at={150} strength={0.35} color="#FF5C7A" />
    <Flash at={225} strength={0.3} />
    <Flash at={300} strength={0.6} color="#7CF5B5" />
    <Flash at={375} strength={0.6} />
    <Audio src={staticFile("audio/sfx-verif.wav")} />
  </Shell>
);
