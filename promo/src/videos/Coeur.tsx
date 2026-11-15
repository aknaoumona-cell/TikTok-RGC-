/**
 * TikTok #20 — « le moment exact où ton cœur lâche en game »
 * LOOK : MONITEUR CARDIAQUE — fond noir, tracé ECG rouge qui défile, BPM qui grimpe, arrêt sur image au moment du sursaut.
 * 0–90 accroche · 90–300 moment 1 (DBD) · 300–480 moment 2 (COD) · 480–570 chute · 570–660 carte de fin
 */
import React from "react";
import { AbsoluteFill, Freeze, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { GameVideo, SfxAudio } from "../safe";
import { FONT, Flash, RiseWords, clamp, easeOut, useShake } from "../components";
import { EndCard, Meme, Shell } from "../memes";

export const COEUR_TOTAL = 660;
const RED = "#FF3B5C";

/** ECG strip; bpm controls spike spacing. */
const Ecg: React.FC<{ bpm: number; top: number }> = ({ bpm, top }) => {
  const f = useCurrentFrame();
  const W = 900;
  const period = Math.max(8, (60 / bpm) * 30) * 6; // px between beats
  const pts: string[] = [];
  for (let x = 0; x <= W; x += 4) {
    const ph = ((x + f * 9) % period) / period;
    let y = 0;
    if (ph > 0.42 && ph < 0.46) y = -18;
    else if (ph >= 0.46 && ph < 0.5) y = 70;
    else if (ph >= 0.5 && ph < 0.54) y = -110;
    else if (ph >= 0.54 && ph < 0.58) y = 30;
    else if (ph > 0.7 && ph < 0.78) y = -16;
    pts.push(`${x},${y}`);
  }
  return (
    <svg width={W} height={260} style={{ position: "absolute", left: 90, top }} viewBox={`0 -130 ${W} 260`}>
      <polyline points={pts.join(" ")} fill="none" stroke={RED} strokeWidth={6} strokeLinejoin="round" style={{ filter: `drop-shadow(0 0 10px ${RED})` }} />
    </svg>
  );
};

const Bpm: React.FC<{ bpm: number; top: number }> = ({ bpm, top }) => {
  const f = useCurrentFrame();
  const beat = Math.abs(Math.sin((f * Math.PI * bpm) / 1800));
  return (
    <div style={{ position: "absolute", top, width: "100%", display: "flex", justifyContent: "center", alignItems: "baseline", gap: 16 }}>
      <svg width="54" height="50" viewBox="0 0 24 22" style={{ transform: `scale(${1 + 0.18 * beat})` }}>
        <path d="M12 21s-9-5.6-9-12.2A5 5 0 0 1 12 6a5 5 0 0 1 9 2.8C21 15.4 12 21 12 21z" fill={RED} />
      </svg>
      <span style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 80, color: "#fff" }}>{Math.round(bpm)}</span>
      <span style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 34, color: RED }}>BPM</span>
    </div>
  );
};

const Grid: React.FC = () => (
  <AbsoluteFill style={{ background: "#07070A" }}>
    <AbsoluteFill style={{ backgroundImage: "linear-gradient(rgba(255,59,92,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,59,92,0.08) 1px, transparent 1px)", backgroundSize: "45px 45px" }} />
  </AbsoluteFill>
);

const Moment: React.FC<{ title: string; clip: string; start: number; scareAt: number; dur: number; meme: string }> = ({ title, clip, start, scareAt, dur, meme }) => {
  const f = useCurrentFrame();
  const bpm = interpolate(f, [0, scareAt, scareAt + 8, dur], [78, 120, 186, 172], clamp);
  const shake = useShake(scareAt, 22);
  const frozen = f >= scareAt;
  const zoom = interpolate(f - scareAt, [0, 6], [1, 1.25], { ...clamp, easing: easeOut });
  const video = <GameVideo src={staticFile(clip)} startFrom={Math.round(start * 30)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />;
  return (
    <AbsoluteFill style={{ transform: shake }}>
      <Grid />
      <div style={{ position: "absolute", top: 320, width: "100%", textAlign: "center", padding: "0 80px" }}>
        <RiseWords text={title} start={2} stagger={2} style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 60, color: "#fff", letterSpacing: -1.5, lineHeight: 1.1 }} />
      </div>
      <div style={{ position: "absolute", top: 580, left: 60, width: 960, height: 540, borderRadius: 24, overflow: "hidden", border: `4px solid ${frozen ? RED : "rgba(255,255,255,0.25)"}` }}>
        <div style={{ width: "100%", height: "100%", transform: `scale(${frozen ? zoom : 1})`, filter: frozen ? "contrast(1.2) saturate(1.3)" : "none" }}>{frozen ? <Freeze frame={scareAt}>{video}</Freeze> : video}</div>
        {frozen && <AbsoluteFill style={{ background: `radial-gradient(transparent 45%, ${RED}88)` }} />}
      </div>
      <Ecg bpm={bpm} top={1150} />
      <Bpm bpm={bpm} top={1420} />
      <Meme src={meme} at={scareAt + 10} x={860} y={600} w={250} rotate={9} />
    </AbsoluteFill>
  );
};

const Hook: React.FC = () => (
  <AbsoluteFill>
    <Grid />
    <div style={{ position: "absolute", top: 480, width: "100%", textAlign: "center", padding: "0 80px" }}>
      <RiseWords text="le moment exact où" start={2} stagger={2} style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 80, color: "#fff", letterSpacing: -3, lineHeight: 1.05 }} />
      <RiseWords text="ton cœur lâche en game" start={10} stagger={2} style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 110, color: RED, lineHeight: 1.08, marginTop: 6 }} />
    </div>
    <Ecg bpm={72} top={1000} />
    <Bpm bpm={72} top={1280} />
  </AbsoluteFill>
);

const Chute: React.FC = () => (
  <AbsoluteFill>
    <Grid />
    <div style={{ position: "absolute", top: 560, width: "100%", textAlign: "center", padding: "0 80px" }}>
      <RiseWords text="au moins en voc" start={2} stagger={2} style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 80, color: "#fff", letterSpacing: -2 }} />
      <RiseWords text="on crie ensemble" start={10} stagger={2} style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 120, color: RED, lineHeight: 1.1 }} />
    </div>
    <Meme src="memes/chat-noir-saut.jpg" at={20} x={540} y={1320} w={360} rotate={-5} />
  </AbsoluteFill>
);

export const CoeurVideo: React.FC = () => (
  <Shell hideBugFrom={570} brand="center">
    <Sequence durationInFrames={90}>
      <Hook />
    </Sequence>
    <Sequence from={90} durationInFrames={210}>
      <Moment title="quand tu te retournes et que le tueur est juste là" clip="clips/dbd-tueur.mp4" start={0} scareAt={138} dur={210} meme="memes/chat-dos-rond.jpg" />
    </Sequence>
    <Sequence from={300} durationInFrames={180}>
      <Moment title="quand quelqu'un surgit de nulle part" clip="clips/cod-surgit.mp4" start={0.6} scareAt={152} dur={180} meme="memes/chat-yeux-ronds.jpg" />
    </Sequence>
    <Sequence from={480} durationInFrames={90}>
      <Chute />
    </Sequence>
    <Sequence from={570} durationInFrames={90}>
      <EndCard big="viens crier" small="avec nous, en voc" />
    </Sequence>
    <Flash at={90 + 138} strength={0.7} color={RED} />
    <Flash at={300 + 152} strength={0.7} color={RED} />
    <Flash at={480} strength={0.3} />
    <Flash at={570} strength={0.6} />
    <SfxAudio src={staticFile("audio/sfx-coeur.wav")} />
  </Shell>
);
