/**
 * TikTok #26 — edits gameplay cinématiques (COD validé ; même rythme pour Valorant, Overwatch, Marvel Rivals). Presque pas de texte : coupes rythmées, zooms « punch »,
 * accélérations / ralentis, flashs. Le son tendance est ajouté dans TikTok (ici : son du jeu bas + bruitages).
 * Plein écran (1080×1920). 0–405 shots · 405–495 carte de fin
 */
import React from "react";
import { AbsoluteFill, Easing, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { GameVideo, SfxAudio } from "../safe";
import { FONT, Flash, clamp } from "../components";
import { EndCard, Shell } from "../memes";

type EShot = { src: string; dur: number; rate?: number; start?: number };
type ECfg = { dir: string; game: string; end: string; shots: EShot[]; wide?: boolean };
const RATES = [1, 1.4, 1.2, 0.7, 1.3, 1, 0.6, 1.4, 1, 0.75, 1.5, 1, 0.6];
const DURS = [40, 30, 24, 36, 24, 30, 36, 22, 28, 34, 22, 30, 49];
/** same rhythm as the validated COD edit */
const rhythm = (dir: string, srcs: string[]): EShot[] => srcs.map((src, i) => ({ src: `${dir}/${src}`, dur: DURS[i % DURS.length], rate: RATES[i % RATES.length] }));

const COD: ECfg = {
  dir: "g",
  game: "CALL OF DUTY",
  end: "une team cod t'attend",
  shots: [
    { src: "g/e01", dur: 40, rate: 1 },
    { src: "g/e02", dur: 30, rate: 1.4 },
    { src: "g/e03", dur: 24, rate: 1.2 },
    { src: "g/e04", dur: 36, rate: 0.7 },
    { src: "g/e06", dur: 24, rate: 1.3 },
    { src: "g/e08", dur: 30, rate: 1 },
    { src: "g/e05", dur: 36, rate: 0.6 },
    { src: "g/e10", dur: 22, rate: 1.4 },
    { src: "g/e07", dur: 28, rate: 1 },
    { src: "g/e09", dur: 34, rate: 0.75, start: 1.5 },
    { src: "g/e12", dur: 22, rate: 1.5 },
    { src: "g/e13", dur: 30, rate: 1 },
    { src: "g/e11", dur: 49, rate: 0.6, start: 1 },
  ],
};
const VALO: ECfg = { dir: "m", game: "VALORANT", end: "une team valo t'attend", shots: rhythm("m", ["v06", "v02", "v12", "v05", "v08", "v03", "v09", "v13", "v04", "v10", "v01", "v11"]) };
const OW: ECfg = { dir: "m", game: "OVERWATCH", end: "une team overwatch t'attend", shots: rhythm("m", ["o09", "o01", "o12", "o03", "w11", "w17", "w12"]) };
const MR: ECfg = { dir: "m", game: "MARVEL RIVALS", end: "une team rivals t'attend", wide: true, shots: rhythm("m", ["r05", "r09", "r12", "r04", "r16", "r10", "r06", "r14", "r11", "r17", "r13", "r03", "r18"]) };

const sum = (c: ECfg) => c.shots.reduce((a, s) => a + s.dur, 0);
const cuts = (c: ECfg) => c.shots.reduce<number[]>((acc, s, i) => [...acc, i ? acc[i - 1] + c.shots[i - 1].dur : 0], []);

const Shot: React.FC<{ s: EShot; i: number; wide?: boolean }> = ({ s, i, wide }) => {
  const f = useCurrentFrame();
  const punch = interpolate(f, [0, 8], [1.22, 1.06], { ...clamp, easing: Easing.out(Easing.cubic) });
  const drift = 1 + f * 0.0012;
  const shakeX = f < 6 ? Math.sin(f * 3.1) * (6 - f) * 2 : 0;
  const slow = (s.rate ?? 1) < 0.9;
  const video = (sound: boolean) => (
    <GameVideo src={staticFile(`clips/${s.src}.mp4`)} startFrom={Math.round((s.start ?? 0) * 30)} playbackRate={s.rate ?? 1} volume={0.45} sound={sound} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
  );
  const fx = { transform: `translateX(${shakeX}px) scale(${punch * drift}) rotate(${i % 2 ? 0.6 : -0.6}deg)`, filter: slow ? "contrast(1.12) saturate(1.15)" : "contrast(1.05)" };
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {wide ? (
        <>
          {/* third-person games: wide band so the whole fight is visible, blurred copy fills the frame */}
          <AbsoluteFill style={{ transform: "scale(1.3)", filter: "blur(36px) brightness(0.5) saturate(1.3)" }}>{video(false)}</AbsoluteFill>
          <div style={{ position: "absolute", left: 0, top: 440, width: 1080, height: 1040, overflow: "hidden" }}>
            <AbsoluteFill style={fx}>{video(true)}</AbsoluteFill>
          </div>
        </>
      ) : (
        <AbsoluteFill style={fx}>{video(true)}</AbsoluteFill>
      )}
      {/* cinematic vignette + light leak on slow-mo shots */}
      <AbsoluteFill style={{ background: "radial-gradient(75% 60% at 50% 50%, transparent 55%, rgba(0,0,0,0.55))" }} />
      {slow && <AbsoluteFill style={{ background: "linear-gradient(120deg, rgba(183,155,255,0.18), transparent 40%, transparent 70%, rgba(255,170,120,0.14))", mixBlendMode: "screen" }} />}
    </AbsoluteFill>
  );
};

const Intro: React.FC<{ game: string }> = ({ game }) => {
  const f = useCurrentFrame();
  const k = interpolate(f, [4, 14, 32, 40], [0, 1, 1, 0], clamp);
  return (
    <div style={{ position: "absolute", top: 860, width: "100%", textAlign: "center", opacity: k, letterSpacing: interpolate(f, [0, 40], [18, 30]) }}>
      <div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 34, color: "#fff", textShadow: "0 2px 16px rgba(0,0,0,0.9)" }}>{game}</div>
      <div style={{ fontFamily: FONT.elegant, fontStyle: "italic", fontWeight: 700, fontSize: 40, color: "#E7D6FF", letterSpacing: 2 }}>by rivals girls club</div>
    </div>
  );
};

const makeEdit = (c: ECfg, sfx: string): React.FC => {
  const end = sum(c);
  const cs = cuts(c);
  const V: React.FC = () => (
    <Shell hideBugFrom={end} brand="center">
      {c.shots.map((s, i) => (
        <Sequence key={s.src} from={cs[i]} durationInFrames={s.dur}>
          <Shot s={s} i={i} wide={c.wide} />
        </Sequence>
      ))}
      <Sequence durationInFrames={40}>
        <Intro game={c.game} />
      </Sequence>
      <Sequence from={end} durationInFrames={90}>
        <EndCard big="viens jouer" small={c.end} />
      </Sequence>
      {cs.slice(1).map((x, i) => (
        <Flash key={x} at={x} strength={i % 3 === 2 ? 0.55 : 0.22} />
      ))}
      <Flash at={end} strength={0.6} />
      <SfxAudio src={staticFile(sfx)} />
    </Shell>
  );
  return V;
};

export const EDIT_TOTAL = sum(COD) + 90;
export const EditVideo = makeEdit(COD, "audio/sfx-edit.wav");
export const EDIT_VALO_TOTAL = sum(VALO) + 90;
export const EditValo = makeEdit(VALO, "audio/sfx-edit-12.wav");
export const EDIT_OW_TOTAL = sum(OW) + 90;
export const EditOw = makeEdit(OW, "audio/sfx-edit-7.wav");
export const EDIT_MR_TOTAL = sum(MR) + 90;
export const EditMr = makeEdit(MR, "audio/sfx-edit.wav");
