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
const VALO: ECfg = { dir: "e2", game: "VALORANT", end: "une team valo t'attend", shots: rhythm("e2", ["va-12", "va-02", "va-08", "va-05", "va-10", "va-01", "va-13", "va-09", "va-06", "va-11", "va-03", "va-07", "va-04"]) };
const OW: ECfg = { dir: "e2", game: "OVERWATCH", end: "une team overwatch t'attend", shots: rhythm("e2", ["ow-03", "ow-09", "ow-01", "ow-07", "ow-13", "ow-02", "ow-10", "ow-14", "ow-05", "ow-15", "ow-06", "ow-12", "ow-04", "ow-16", "ow-08", "ow-11"]) };
/** un passage de chaque clip du dossier Drive du jeu (consigne) */
const MR: ECfg = { dir: "e2", game: "MARVEL RIVALS", end: "une team rivals t'attend", wide: true, shots: rhythm("e2", ["mr-09", "mr-02", "mr-13", "mr-04", "mr-16", "mr-07", "mr-01", "mr-10", "mr-15", "mr-05", "mr-11", "mr-03", "mr-14", "mr-06", "mr-12", "mr-08"]) };

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
export const EditValo = makeEdit(VALO, "audio/sfx-edit-13.wav");
export const EDIT_OW_TOTAL = sum(OW) + 90;
export const EditOw = makeEdit(OW, "audio/sfx-edit-16.wav");
export const EDIT_MR_TOTAL = sum(MR) + 90;
export const EditMr = makeEdit(MR, "audio/sfx-edit-16.wav");
