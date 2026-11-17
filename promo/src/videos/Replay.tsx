/**
 * TikTok #27 — le replay décortiqué : un ACE sur Valorant, analysé comme à la télé.
 * Lecture → arrêt sur image à chaque kill (cercle sur le viseur, numéro, flèche) → ça repart → bannière ACE du jeu.
 * Kills repérés dans le fil d'éliminations du clip (≈4,0 s · 9,0 s · 12,5 s · 16,0 s), pseudos floutés.
 */
import React from "react";
import { AbsoluteFill, Easing, Freeze, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { GameVideo, SfxAudio } from "../safe";
import { FONT, Flash, clamp, easeOut } from "../components";
import { EndCard, Shell } from "../memes";

const SRC = "clips/g/ace.mp4";
const BAND_TOP = 470;
const BAND_H = 1000;
const ACCENT = "#FF4F7B";

// segments: play [from,to] seconds of the source, then freeze on `to` with kill label
const SEGS: { from: number; to: number; kill?: number }[] = [
  { from: 1.5, to: 4.0, kill: 1 },
  { from: 7.2, to: 9.0, kill: 2 },
  { from: 11.2, to: 12.5, kill: 3 },
  { from: 14.6, to: 16.0, kill: 4 },
  { from: 16.0, to: 19.6 },
];
const FREEZE = 40;
const HOOK = 50;
const timeline = (() => {
  let t = HOOK;
  return SEGS.map((s) => {
    const play = Math.round((s.to - s.from) * 30);
    const seg = { ...s, at: t, play, freezeAt: t + play };
    t += play + (s.kill ? FREEZE : 0);
    return seg;
  });
})();
const BODY_END = timeline[timeline.length - 1].freezeAt;
export const REPLAY_TOTAL = BODY_END + 90;
export const REPLAY_MARKS = timeline.map((s) => s.freezeAt);

const Video: React.FC<{ from: number; vol?: number }> = ({ from, vol = 0.6 }) => (
  <GameVideo src={staticFile(SRC)} startFrom={Math.round(from * 30)} volume={vol} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
);

const Band: React.FC<{ children: React.ReactNode; freeze?: boolean }> = ({ children, freeze }) => (
  <div style={{ position: "absolute", left: 0, top: BAND_TOP, width: 1080, height: BAND_H, overflow: "hidden", filter: freeze ? "saturate(0.35) brightness(0.8)" : "none" }}>{children}</div>
);

/** annotation drawn over the crosshair (centre of the band) */
const KillMark: React.FC<{ n: number }> = ({ n }) => {
  const f = useCurrentFrame();
  const r = interpolate(f, [0, 10], [220, 120], { ...clamp, easing: Easing.out(Easing.cubic) });
  const draw = interpolate(f, [0, 12], [0, 1], clamp);
  const lab = interpolate(f, [8, 16], [0, 1], { ...clamp, easing: easeOut });
  const cx = 540;
  const cy = BAND_TOP + BAND_H / 2;
  const C = 2 * Math.PI * r;
  return (
    <AbsoluteFill>
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={ACCENT} strokeWidth={8} strokeDasharray={C} strokeDashoffset={C * (1 - draw)} style={{ filter: `drop-shadow(0 0 12px ${ACCENT})` }} />
        <path d={`M${cx + r * 0.7} ${cy - r * 0.7} L${cx + 260} ${cy - 300}`} stroke="#fff" strokeWidth={5} strokeDasharray="14 10" opacity={lab} />
      </svg>
      <div style={{ position: "absolute", left: cx + 200, top: cy - 380, opacity: lab, transform: `scale(${0.8 + 0.2 * lab})` }}>
        <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 64, color: "#fff", background: ACCENT, padding: "6px 22px", borderRadius: 16, boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>{n}</div>
        <div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 24, color: "#fff", marginTop: 8, letterSpacing: 3, textShadow: "0 2px 8px #000" }}>KILL</div>
      </div>
    </AbsoluteFill>
  );
};

const Hud: React.FC = () => {
  const f = useCurrentFrame();
  const frozen = timeline.some((s) => s.kill && f >= s.freezeAt && f < s.freezeAt + FREEZE);
  const kills = timeline.filter((s) => s.kill && f >= s.freezeAt).length;
  const p = interpolate(f, [HOOK, BODY_END], [0, 1], clamp);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", top: 330, width: "100%", display: "flex", justifyContent: "center", gap: 14, alignItems: "center" }}>
        <span style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 24, letterSpacing: 4, color: "#fff", background: frozen ? ACCENT : "rgba(255,255,255,0.12)", padding: "6px 14px", borderRadius: 8 }}>{frozen ? "❚❚ PAUSE" : "▶ REPLAY"}</span>
        <span style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 30, color: "#F4ECFF" }}>valorant · kills : {kills}</span>
      </div>
      {/* progress bar with kill markers */}
      <div style={{ position: "absolute", left: 140, right: 140, top: BAND_TOP + BAND_H + 40, height: 8, borderRadius: 8, background: "rgba(255,255,255,0.18)" }}>
        <div style={{ width: `${p * 100}%`, height: "100%", borderRadius: 8, background: ACCENT }} />
        {timeline.filter((s) => s.kill).map((s) => (
          <div key={s.at} style={{ position: "absolute", left: `${((s.freezeAt - HOOK) / (BODY_END - HOOK)) * 100}%`, top: -8, width: 24, height: 24, marginLeft: -12, borderRadius: 99, background: f >= s.freezeAt ? ACCENT : "#2A2433", border: "3px solid #fff" }} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const Hook: React.FC = () => {
  const f = useCurrentFrame();
  const k = interpolate(f, [2, 12], [0, 1], { ...clamp, easing: easeOut });
  return (
    <div style={{ position: "absolute", top: BAND_TOP + BAND_H / 2 - 90, width: "100%", textAlign: "center", opacity: k, transform: `scale(${0.9 + 0.1 * k})` }}>
      <div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 28, letterSpacing: 8, color: "#fff" }}>REPLAY</div>
      <div style={{ fontFamily: FONT.elegant, fontStyle: "italic", fontWeight: 700, fontSize: 76, color: "#fff", textShadow: "0 0 24px rgba(255,79,123,0.9)" }}>on décortique ce round</div>
    </div>
  );
};

export const ReplayVideo: React.FC = () => (
  <Shell hideBugFrom={BODY_END} brand="center">
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #1A0F1C, #0B0A10)" }} />
    {/* hook: frozen first frame */}
    <Sequence durationInFrames={HOOK}>
      <Band freeze>
        <Freeze frame={0}>
          <Video from={SEGS[0].from} vol={0} />
        </Freeze>
      </Band>
      <Hook />
    </Sequence>
    {timeline.map((s, i) => (
      <React.Fragment key={i}>
        <Sequence from={s.at} durationInFrames={s.play}>
          <Band>
            <Video from={s.from} />
          </Band>
        </Sequence>
        {s.kill && (
          <Sequence from={s.freezeAt} durationInFrames={FREEZE}>
            <Band freeze>
              <Freeze frame={0}>
                <Video from={s.to} vol={0} />
              </Freeze>
            </Band>
            <KillMark n={s.kill} />
          </Sequence>
        )}
      </React.Fragment>
    ))}
    <Sequence durationInFrames={BODY_END}>
      <Hud />
    </Sequence>
    <Sequence from={BODY_END} durationInFrames={90}>
      <EndCard big="viens jouer" small="la team valorant t'attend" />
    </Sequence>
    {timeline.filter((s) => s.kill).map((s) => (
      <Flash key={s.at} at={s.freezeAt} strength={0.45} color={ACCENT} />
    ))}
    <Flash at={BODY_END} strength={0.6} />
    <SfxAudio src={staticFile("audio/sfx-replay.wav")} />
  </Shell>
);
