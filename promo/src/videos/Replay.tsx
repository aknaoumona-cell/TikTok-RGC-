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
const KillMark: React.FC = () => {
  const f = useCurrentFrame();
  const r = interpolate(f, [0, 10], [220, 120], { ...clamp, easing: Easing.out(Easing.cubic) });
  const draw = interpolate(f, [0, 12], [0, 1], clamp);
  const cx = 540;
  const cy = BAND_TOP + BAND_H / 2;
  const C = 2 * Math.PI * r;
  return (
    <AbsoluteFill>
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={ACCENT} strokeWidth={8} strokeDasharray={C} strokeDashoffset={C * (1 - draw)} style={{ filter: `drop-shadow(0 0 12px ${ACCENT})` }} />
      </svg>
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
            <KillMark />
          </Sequence>
        )}
      </React.Fragment>
    ))}
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
