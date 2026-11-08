/**
 * TikTok #15 — « pov : tu passes la vérif vocale »
 * LOOK : APPEL TÉLÉPHONE — écran d'appel entrant, logo qui pulse, électrocardiogramme,
 * chrono d'appel, confettis à la fin.
 * 0–75 appel entrant · 75–150 stress · 150–225 coeur 180 bpm · 225–300 « coucou ! » · 300–375 bienvenue · 375–465 fin
 */
import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, interpolate, random, staticFile, useCurrentFrame } from "remotion";
import { COLORS } from "../config";
import { FONT, Flash, RiseWords, clamp, useSpring } from "../components";
import { EndCard, Meme, Shell } from "../memes";

export const VERIF_TOTAL = 465;

const CallBg: React.FC<{ tint?: string }> = ({ tint = "#3B2A5C" }) => (
  <AbsoluteFill style={{ background: `linear-gradient(180deg, ${tint}, #0D0A14 75%)` }}>
    <AbsoluteFill style={{ background: "radial-gradient(60% 30% at 50% 30%, rgba(183,139,240,0.35), transparent 70%)" }} />
  </AbsoluteFill>
);

const Caller: React.FC<{ status: string; pulse?: boolean }> = ({ status, pulse }) => {
  const f = useCurrentFrame();
  const p = pulse ? 1 + 0.06 * Math.abs(Math.sin(f / 5)) : 1;
  return (
    <div style={{ position: "absolute", top: 420, width: "100%", textAlign: "center" }}>
      <div style={{ width: 300, height: 300, margin: "0 auto", borderRadius: 999, background: "#120E1A", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${p})`, boxShadow: pulse ? `0 0 0 ${16 + 20 * Math.abs(Math.sin(f / 5))}px rgba(183,139,240,0.18), 0 0 80px rgba(183,139,240,0.5)` : "0 0 60px rgba(183,139,240,0.4)" }}>
        <Img src={staticFile("brand/logo-rgc.png")} style={{ width: 230 }} />
      </div>
      <div style={{ marginTop: 40, fontFamily: FONT.body, fontWeight: 700, fontSize: 64, color: "#fff" }}>Vérif vocale</div>
      <div style={{ marginTop: 8, fontFamily: FONT.body, fontWeight: 500, fontSize: 36, color: "rgba(255,255,255,0.65)" }}>{status}</div>
    </div>
  );
};

const Buttons: React.FC<{ accepted?: boolean }> = ({ accepted }) => {
  const f = useCurrentFrame();
  const bob = Math.sin(f / 6) * 8;
  return (
    <div style={{ position: "absolute", top: 1400, width: "100%", display: "flex", justifyContent: accepted ? "center" : "space-around", padding: "0 160px" }}>
      {!accepted && (
        <div style={{ width: 150, height: 150, borderRadius: 99, background: "#FF3B5C", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="70" height="70" viewBox="0 0 24 24"><path d="M3 15c5-5 13-5 18 0l-2.5 2.5-3-2v-2.5c-2-.6-5-.6-7 0V15.5l-3 2z" fill="#fff" /></svg>
        </div>
      )}
      <div style={{ width: 150, height: 150, borderRadius: 99, background: accepted ? "#FF3B5C" : "#2ECC71", display: "flex", alignItems: "center", justifyContent: "center", transform: `translateY(${accepted ? 0 : bob}px)` }}>
        <svg width="70" height="70" viewBox="0 0 24 24" style={{ transform: accepted ? "rotate(135deg)" : "none" }}><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z" fill="#fff" /></svg>
      </div>
    </div>
  );
};

const Caption: React.FC<{ text: string; start?: number; top?: number }> = ({ text, start = 4, top = 1060 }) => (
  <div style={{ position: "absolute", top, width: "100%", textAlign: "center", padding: "0 70px" }}>
    <RiseWords text={text} start={start} stagger={2} style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 80, color: "#fff", lineHeight: 1.1 }} />
  </div>
);

const Incoming: React.FC = () => (
  <AbsoluteFill>
    <CallBg />
    <div style={{ position: "absolute", top: 320, width: "100%", textAlign: "center", fontFamily: FONT.mono, fontWeight: 700, fontSize: 36, color: COLORS.blush, letterSpacing: 4 }}>POV : TU PASSES LA VÉRIF VOCALE</div>
    <Caller status="appel entrant…" pulse />
    <Buttons />
  </AbsoluteFill>
);

const Stress: React.FC = () => (
  <AbsoluteFill>
    <CallBg />
    <Caller status="appel entrant…" pulse />
    <Caption text="t'as répété ton « coucou » 4 fois dans ta tête" />
    <Meme src="memes/chat-nervous-gulp.jpg" at={14} x={820} y={1430} w={330} rotate={7} />
  </AbsoluteFill>
);

const Heart: React.FC = () => {
  const f = useCurrentFrame();
  const W = 1080;
  const pts: string[] = [];
  for (let x = 0; x <= W; x += 6) {
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
      <CallBg tint="#4A1A2E" />
      <div style={{ position: "absolute", top: 380, width: "100%", textAlign: "center", fontFamily: FONT.display, fontWeight: 800, fontSize: 200, color: "#FF5C7A", letterSpacing: -6, transform: `scale(${1 + 0.05 * Math.abs(Math.sin(f / 4))})` }}>180</div>
      <div style={{ position: "absolute", top: 600, width: "100%", textAlign: "center", fontFamily: FONT.mono, fontWeight: 700, fontSize: 40, color: "#fff", letterSpacing: 8 }}>BPM</div>
      <svg width={1080} height={400} style={{ position: "absolute", top: 760 }} viewBox="0 -200 1080 400">
        <polyline points={pts.join(" ")} fill="none" stroke="#FF5C7A" strokeWidth={8} strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 12px #FF5C7A)" }} />
      </svg>
      <Caption text="ton cœur pendant que ça sonne" top={1220} />
    </AbsoluteFill>
  );
};

const Connected: React.FC = () => {
  const f = useCurrentFrame();
  const sec = Math.floor(f / 30) + 1;
  return (
    <AbsoluteFill>
      <CallBg />
      <Caller status={`00:0${sec}`} />
      <div style={{ position: "absolute", top: 1040, width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 110, color: "#fff", background: "rgba(255,255,255,0.08)", border: "2px solid rgba(255,255,255,0.25)", borderRadius: 40, padding: "20px 50px", transform: `scale(${useSpring(4, 9)})` }}>« coucou ! »</div>
      </div>
      <div style={{ position: "absolute", top: 1260, width: "100%", textAlign: "center", fontFamily: FONT.body, fontWeight: 600, fontSize: 40, color: "rgba(255,255,255,0.7)", opacity: interpolate(f, [24, 32], [0, 1], clamp) }}>(une octave plus haut que d'habitude)</div>
      <Buttons accepted />
    </AbsoluteFill>
  );
};

const Welcome: React.FC = () => {
  const f = useCurrentFrame();
  const s = useSpring(0, 9);
  return (
    <AbsoluteFill>
      <CallBg tint="#1F5A44" />
      {new Array(60).fill(0).map((_, i) => {
        const x = random(`cx${i}`) * 1080;
        const y = -50 + (f * (8 + random(`cv${i}`) * 10)) + random(`cy${i}`) * -400;
        const c = [COLORS.blush, COLORS.lilac, COLORS.mint, COLORS.butter, "#fff"][i % 5];
        return <div key={i} style={{ position: "absolute", left: x, top: y, width: 18, height: 28, background: c, transform: `rotate(${f * 12 + i * 30}deg)`, borderRadius: 4 }} />;
      })}
      <div style={{ position: "absolute", top: 520, width: "100%", textAlign: "center", transform: `scale(${0.6 + 0.4 * s})`, opacity: s }}>
        <div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 36, color: COLORS.mint, letterSpacing: 6 }}>VÉRIF VALIDÉE</div>
        <div style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 150, color: "#fff", lineHeight: 1.05, marginTop: 20 }}>bienvenue</div>
        <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 64, color: "#fff", letterSpacing: -1 }}>dans la communauté</div>
      </div>
      <Meme src="memes/chat-danse.jpg" at={12} x={540} y={1300} w={360} rotate={-4} />
    </AbsoluteFill>
  );
};

export const VerifVideo: React.FC = () => (
  <Shell hideBugFrom={375}>
    <Sequence durationInFrames={75}><Incoming /></Sequence>
    <Sequence from={75} durationInFrames={75}><Stress /></Sequence>
    <Sequence from={150} durationInFrames={75}><Heart /></Sequence>
    <Sequence from={225} durationInFrames={75}><Connected /></Sequence>
    <Sequence from={300} durationInFrames={75}><Welcome /></Sequence>
    <Sequence from={375} durationInFrames={90}>
      <EndCard big="à ton tour" small="vérif vocale, safe place, 100% filles" />
    </Sequence>
    <Flash at={150} strength={0.35} color="#FF5C7A" />
    <Flash at={225} strength={0.35} />
    <Flash at={300} strength={0.6} color="#7CF5B5" />
    <Flash at={375} strength={0.6} />
    <Audio src={staticFile("audio/sfx-verif.wav")} />
  </Shell>
);

