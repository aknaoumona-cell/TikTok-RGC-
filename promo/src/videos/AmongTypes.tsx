/**
 * TikTok #18 — « Among Us entre filles : t'es laquelle ? »
 * LOOK : ÉCRAN DE VOTE PASTEL — fond lilas clair, tablette arrondie avec une scène en motion design (pas de gameplay,
 * pas de point de vue de joueuse), carte de vote qui se coche.
 * 0–90 accroche · 90–510 4 types × 105 · 510–600 carte de fin
 */
import React from "react";
import { AbsoluteFill, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SfxAudio } from "../safe";
import { FONT, Flash, RiseWords, clamp, easeOut, useSpring } from "../components";
import { EndCard, Meme, Shell } from "../memes";

export const AMONG_TOTAL = 600;
const STEP = 105;
const INK = "#2A2140";
const COLS = ["#FF8FB1", "#8FD3FF", "#B8F2A0", "#C9A7FF"];

const TYPES = [
  { t: "celle qui vote au hasard", s: "(et c'est souvent juste)", meme: "memes/chat-noir-chargement.jpg" },
  { t: "celle qui se défend trop fort", s: "(elle était innocente en plus)", meme: "memes/chat-sourire-innocent.jpg" },
  { t: "celle qui fait toutes ses tâches", s: "(pendant que les autres papotent)", meme: "memes/chat-noir-sourire.jpg" },
  { t: "l'imposteuse qui rigole en voc", s: "(et qui se grille toute seule)", meme: "memes/chat-noir-regard.jpg" },
];

const Bg: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #EFE6FF, #FBE9F2)" }}>
      <AbsoluteFill style={{ backgroundImage: "radial-gradient(rgba(42,33,64,0.08) 3px, transparent 3.5px)", backgroundSize: "54px 54px", backgroundPosition: `${f * 0.6}px ${f * 0.6}px` }} />
    </AbsoluteFill>
  );
};

/** Little crewmate-like bean drawn in SVG (generic shape, not game art). */
const Bean: React.FC<{ c: string; size?: number }> = ({ c, size = 60 }) => (
  <svg width={size} height={size * 1.1} viewBox="0 0 40 44">
    <rect x="2" y="16" width="8" height="18" rx="4" fill={c} stroke={INK} strokeWidth="2.5" />
    <path d="M8 40V16a12 12 0 0 1 24 0v24h-9v-6h-6v6z" fill={c} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
    <rect x="17" y="10" width="17" height="10" rx="5" fill="#CFEFFF" stroke={INK} strokeWidth="2.5" />
  </svg>
);


/* ---------- motion-design scenes (no gameplay, no player POV) ---------- */
const Space: React.FC<{ children: React.ReactNode; tint?: string }> = ({ children, tint = "#1B1640" }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: `radial-gradient(80% 70% at 50% 40%, ${tint}, #0C0A22)` }}>
      {new Array(40).fill(0).map((_, k) => {
        const x = (k * 197) % 800;
        const y = (k * 113) % 480;
        return <div key={k} style={{ position: "absolute", left: (x - f * (0.6 + (k % 3) * 0.4) + 1600) % 800, top: y, width: k % 4 ? 3 : 5, height: k % 4 ? 3 : 5, borderRadius: 9, background: "#fff", opacity: 0.35 + (k % 5) * 0.1 }} />;
      })}
      {children}
    </AbsoluteFill>
  );
};

const Bubble: React.FC<{ text: string; at: number; x: number; y: number; r?: number; big?: boolean }> = ({ text, at, x, y, r = 0, big }) => {
  const f = useCurrentFrame();
  const k = interpolate(f - at, [0, 6], [0, 1], { ...clamp, easing: easeOut });
  if (f < at) return null;
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%, -50%) scale(${k}) rotate(${r}deg)`, background: "#fff", color: INK, fontFamily: FONT.display, fontWeight: 800, fontSize: big ? 40 : 30, padding: "12px 22px", borderRadius: 22, border: `4px solid ${INK}`, whiteSpace: "nowrap", boxShadow: "0 8px 0 rgba(0,0,0,0.25)" }}>
      {text}
    </div>
  );
};

/** 1 — random vote: a pointer hops between beans, then lands at random */
const SceneVote: React.FC = () => {
  const f = useCurrentFrame();
  const spots = [[160, 170], [400, 170], [640, 170], [160, 340], [400, 340], [640, 340]];
  const hop = Math.min(spots.length - 1, Math.floor(f / 6) % spots.length);
  const settled = f > 52;
  const [px, py] = settled ? spots[4] : spots[(hop * 5 + 2) % spots.length];
  return (
    <Space>
      {spots.map(([x, y], k) => (
        <div key={k} style={{ position: "absolute", left: x - 90, top: y - 60, width: 180, height: 120, borderRadius: 20, background: settled && k === 4 ? "#FFE3EC" : "rgba(255,255,255,0.9)", border: `4px solid ${INK}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Bean c={[...COLS, "#FFD27A", "#FF9F7A"][k]} size={70} />
        </div>
      ))}
      <svg width="70" height="80" viewBox="0 0 24 28" style={{ position: "absolute", left: px + 30, top: py + 10, filter: "drop-shadow(0 4px 0 rgba(0,0,0,0.4))" }}>
        <path d="M3 2l17 11-8 1.5 4.5 9-3 1.5-4.5-9L3 21z" fill="#fff" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      </svg>
      <Bubble text="am stram gram…" at={4} x={400} y={438} />
      {settled && <Bubble text="VOTÉ" at={53} x={400} y={255} r={-6} big />}
    </Space>
  );
};

/** 2 — over-defending: the bean shakes, bubbles pile up */
const SceneDefend: React.FC = () => {
  const f = useCurrentFrame();
  const sh = Math.sin(f * 2.3) * 6;
  return (
    <Space tint="#2A1640">
      <div style={{ position: "absolute", left: 400 - 80 + sh, top: 230, transform: `rotate(${sh / 2}deg)` }}>
        <Bean c={COLS[1]} size={160} />
      </div>
      <Bubble text="c'était PAS moi" at={6} x={210} y={110} r={-6} />
      <Bubble text="j'étais en élec !!" at={22} x={600} y={90} r={5} />
      <Bubble text="je vous jure" at={38} x={190} y={300} r={-4} />
      <Bubble text="REGARDEZ MES TÂCHES" at={54} x={530} y={250} r={6} />
      <Bubble text="pourquoi vous me croyez pas" at={70} x={400} y={430} />
    </Space>
  );
};

/** 3 — task queen: progress bar fills, tasks tick while chat bubbles fly */
const SceneTasks: React.FC = () => {
  const f = useCurrentFrame();
  const fill = interpolate(f, [4, 80], [0.08, 1], clamp);
  const tasks = ["réparer les câbles", "vider les poubelles", "scanner la carte", "télécharger les données"];
  return (
    <Space tint="#13304A">
      <div style={{ position: "absolute", left: 50, top: 40, width: 700, height: 44, borderRadius: 12, background: "rgba(255,255,255,0.15)", border: "4px solid #fff", overflow: "hidden" }}>
        <div style={{ width: `${fill * 100}%`, height: "100%", background: "#7CE0A0" }} />
      </div>
      <div style={{ position: "absolute", left: 60, top: 110, display: "flex", flexDirection: "column", gap: 14 }}>
        {tasks.map((t, k) => {
          const done = f > 14 + k * 18;
          return (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: FONT.body, fontWeight: 700, fontSize: 30, color: done ? "#7CE0A0" : "#fff" }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, border: "3px solid #fff", background: done ? "#7CE0A0" : "transparent" }} />
              <span style={{ textDecoration: done ? "line-through" : "none" }}>{t}</span>
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", left: 590, top: 250 }}>
        <Bean c={COLS[2]} size={130} />
      </div>
      <Bubble text="mdrrr" at={20} x={600} y={150} r={6} />
      <Bubble text="attends quoi ?" at={44} x={560} y={420} r={-4} />
      <Bubble text="t'as vu son skin" at={64} x={300} y={440} r={3} />
    </Space>
  );
};

/** 4 — the giggling impostor: red glow, giggles, then ejected */
const SceneImpostor: React.FC = () => {
  const f = useCurrentFrame();
  const eject = interpolate(f, [58, 96], [0, 1], clamp);
  return (
    <Space tint={f < 58 ? "#3A1028" : "#0C0A22"}>
      <div style={{ position: "absolute", left: 400 - 70 + eject * 520, top: 200 - eject * 60, transform: `rotate(${eject * 540}deg) scale(${1 - eject * 0.4})`, filter: f < 58 ? "drop-shadow(0 0 24px #FF3B5C)" : "none" }}>
        <Bean c={COLS[3]} size={140} />
      </div>
      {f < 58 && (
        <>
          <Bubble text="hihihi" at={6} x={200} y={130} r={-8} />
          <Bubble text="non mais rien" at={22} x={600} y={120} r={6} />
          <Bubble text="*rire nerveux*" at={38} x={400} y={420} big />
        </>
      )}
      {f >= 62 && (
        <div style={{ position: "absolute", top: 380, width: "100%", textAlign: "center", fontFamily: FONT.display, fontWeight: 800, fontSize: 40, color: "#fff", opacity: interpolate(f, [62, 70], [0, 1], clamp) }}>elle s'est grillée toute seule.</div>
      )}
    </Space>
  );
};

const SCENES = [SceneVote, SceneDefend, SceneTasks, SceneImpostor];

const Ballot: React.FC<{ active: number; lf: number }> = ({ active, lf }) => (
  <div style={{ position: "absolute", top: 1130, left: 90, right: 90, background: "#fff", borderRadius: 30, padding: "18px 22px", border: `4px solid ${INK}`, boxShadow: "0 16px 0 rgba(42,33,64,0.18)" }}>
    {TYPES.map((t, i) => {
      const on = i === active;
      const done = i < active;
      const check = on ? interpolate(lf, [40, 48], [0, 1], { ...clamp, easing: easeOut }) : done ? 1 : 0;
      return (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 18, padding: "10px 12px", borderRadius: 18, background: on ? `${COLS[i]}55` : "transparent", opacity: on || done ? 1 : 0.45 }}>
          <Bean c={COLS[i]} size={46} />
          <div style={{ flex: 1, fontFamily: FONT.body, fontWeight: 700, fontSize: 34, color: INK }}>{t.t}</div>
          <div style={{ width: 52, height: 52, borderRadius: 14, border: `3px solid ${INK}`, display: "flex", alignItems: "center", justifyContent: "center", background: check ? "#7CE0A0" : "#fff" }}>
            <svg width="30" height="30" viewBox="0 0 24 24" style={{ transform: `scale(${check})` }}>
              <path d="M5 12.5l4.5 4.5L19 7.5" stroke={INK} strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      );
    })}
  </div>
);

const Types: React.FC = () => {
  const f = useCurrentFrame();
  const i = Math.min(TYPES.length - 1, Math.floor(f / STEP));
  const lf = f - i * STEP;
  const t = TYPES[i];
  const s = useSpring(i * STEP, 10);
  return (
    <AbsoluteFill>
      <Bg />
      <div key={`h${i}`} style={{ position: "absolute", top: 320, width: "100%", textAlign: "center", padding: "0 80px" }}>
        <RiseWords text={t.t} start={i * STEP + 2} stagger={2} style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 58, color: INK, letterSpacing: -1.5, lineHeight: 1.08 }} />
        <RiseWords text={t.s} start={i * STEP + 10} stagger={2} style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 50, color: "#8A5CC9", marginTop: 6 }} />
      </div>
      <div style={{ position: "absolute", top: 560, left: 140, width: 800, height: 480, borderRadius: 36, overflow: "hidden", border: `6px solid ${INK}`, boxShadow: `0 14px 0 ${COLS[i]}`, transform: `rotate(${(1 - s) * -4}deg) scale(${0.92 + 0.08 * s})` }}>
        {SCENES.map((Scene, k) => (
          <Sequence key={k} from={k * STEP} durationInFrames={STEP} layout="none">
            <Scene />
          </Sequence>
        ))}
      </div>
      <Ballot active={i} lf={lf} />
      <Meme key={`m${i}`} src={t.meme} at={i * STEP + 26} until={(i + 1) * STEP} x={i % 2 ? 250 : 830} y={1640} w={260} rotate={i % 2 ? -10 : 10} />
    </AbsoluteFill>
  );
};

const Hook: React.FC = () => (
  <AbsoluteFill>
    <Bg />
    <div style={{ position: "absolute", top: 520, width: "100%", textAlign: "center", padding: "0 80px" }}>
      <RiseWords text="among us entre filles" start={2} stagger={2} style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 82, color: INK, letterSpacing: -3, lineHeight: 1.05 }} />
      <RiseWords text="t'es laquelle ?" start={12} stagger={2} style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 140, color: "#8A5CC9", lineHeight: 1.1, marginTop: 10 }} />
    </div>
    <div style={{ position: "absolute", top: 1060, width: "100%", display: "flex", justifyContent: "center", gap: 30 }}>
      {COLS.map((c, i) => (
        <div key={c} style={{ transform: `translateY(${Math.sin(i + 0) * 10}px)` }}>
          <Bean c={c} size={120} />
        </div>
      ))}
    </div>
  </AbsoluteFill>
);

export const AmongVideo: React.FC = () => (
  <Shell hideBugFrom={510} brand="center" ink="dark">
    <Sequence durationInFrames={90}>
      <Hook />
    </Sequence>
    <Sequence from={90} durationInFrames={420}>
      <Types />
    </Sequence>
    <Sequence from={510} durationInFrames={90}>
      <EndCard big="viens jouer" small="on vote ensemble en voc" />
    </Sequence>
    {TYPES.map((_, i) => (
      <Flash key={i} at={90 + i * STEP} strength={0.3} color="#C9A7FF" />
    ))}
    <Flash at={510} strength={0.6} />
    <SfxAudio src={staticFile("audio/sfx-among.wav")} />
  </Shell>
);
