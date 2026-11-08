/**
 * TikTok #8 — « tier list : les excuses pour pas lancer la game »   LOOK : TIER LIST
 * Tableau S/A/B/C/F classique sur fond sombre, chaque excuse arrive en grand puis vole dans sa ligne.
 * 0–60    : accroche
 * 60–510  : 6 excuses × 75 images
 * 510–600 : chute
 * 600–690 : carte de fin
 */
import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { FONT, Flash, RiseWords, clamp, easeOut, useSpring } from "../components";
import { EndCard, Meme, Shell } from "../memes";

export const TIER_TOTAL = 690;
const STEP = 75;
const FLY = 52; // frame (in step) when the card flies into its row

const TIERS = [
  { t: "S", c: "#FF7F9E" },
  { t: "A", c: "#FFBF7F" },
  { t: "B", c: "#FFE17F" },
  { t: "C", c: "#9FE6A0" },
  { t: "F", c: "#9FC6FF" },
];

export const EXCUSES = [
  { q: "« j'ai faim »", tier: "A", verdict: "valide, faut manger", meme: "memes/chat-croquettes.jpg" },
  { q: "« mon wifi lag »", tier: "F", verdict: "on sait que c'est faux", meme: "memes/chat-chargement.jpg" },
  { q: "« je finis mon épisode »", tier: "C", verdict: "ça fait 3 épisodes", meme: "memes/chat-telephone-lit.jpg" },
  { q: "« j'ai taf demain »", tier: "S", verdict: "respect, l'adulte", meme: "memes/chaton-dodo.jpg" },
  { q: "« je suis trop nulle ce soir »", tier: "B", verdict: "on t'aime quand même", meme: "memes/chat-triste.jpg" },
  { q: "« j'ai pas envie »", tier: "S", verdict: "l'honnêteté, enfin", meme: "memes/chat-flemme-canape.jpg" },
];

const BOARD_TOP = 490;
const ROW_H = 170;
const LABEL_W = 150;
const TILE = 140;

/** slot position of excuse i inside its tier row */
const slot = (i: number) => {
  const tierIdx = TIERS.findIndex((t) => t.t === EXCUSES[i].tier);
  const before = EXCUSES.slice(0, i).filter((e) => e.tier === EXCUSES[i].tier).length;
  return { x: 60 + LABEL_W + 16 + before * (TILE + 14) + TILE / 2, y: BOARD_TOP + tierIdx * ROW_H + ROW_H / 2 };
};

const Board: React.FC<{ placedUpTo: number; dim?: number }> = ({ placedUpTo, dim = 0 }) => (
  <div style={{ position: "absolute", left: 60, top: BOARD_TOP, width: 960 }}>
    {TIERS.map((t) => (
      <div key={t.t} style={{ display: "flex", height: ROW_H, borderBottom: "4px solid #0B0B0F" }}>
        <div style={{ width: LABEL_W, background: t.c, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT.display, fontWeight: 800, fontSize: 80, color: "#111" }}>{t.t}</div>
        <div style={{ flex: 1, background: "#1E1E26" }} />
      </div>
    ))}
    {EXCUSES.map((e, i) => {
      if (i >= placedUpTo) return null;
      const s = slot(i);
      return (
        <div key={i} style={{ position: "absolute", left: s.x - 60 - TILE / 2, top: s.y - BOARD_TOP - TILE / 2, width: TILE, height: TILE, borderRadius: 14, overflow: "hidden", border: "4px solid #fff" }}>
          <Img src={staticFile(e.meme)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      );
    })}
    <div style={{ position: "absolute", inset: 0, background: "#000", opacity: dim, pointerEvents: "none" }} />
  </div>
);

const Title: React.FC = () => (
  <div style={{ position: "absolute", top: 300, width: "100%", textAlign: "center" }}>
    <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 44, color: "#fff", letterSpacing: -1 }}>les excuses pour pas lancer la game</div>
    <div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 28, color: "rgba(255,255,255,0.6)", letterSpacing: 6, marginTop: 8 }}>TIER LIST · CRÉDIBILITÉ</div>
  </div>
);

const Hook: React.FC = () => {
  const f = useCurrentFrame();
  const s = useSpring(0, 10);
  return (
    <AbsoluteFill style={{ background: "#121218" }}>
      <div style={{ position: "absolute", top: 520, width: "100%", textAlign: "center", transform: `scale(${1.3 - 0.3 * s})` }}>
        <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 170, color: "#fff", letterSpacing: -6, lineHeight: 1 }}>TIER LIST</div>
      </div>
      <div style={{ position: "absolute", top: 740, width: "100%", textAlign: "center", padding: "0 60px" }}>
        <RiseWords text="les excuses pour pas lancer la game" start={8} stagger={2} style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 88, color: "#FFBF7F", lineHeight: 1.1 }} />
      </div>
      <div style={{ position: "absolute", top: 1080, width: "100%", display: "flex", justifyContent: "center", gap: 14 }}>
        {TIERS.map((t, i) => {
          const k = interpolate(f - 18 - i * 3, [0, 6], [0, 1], { ...clamp, easing: easeOut });
          return (
            <div key={t.t} style={{ width: 120, height: 120, borderRadius: 18, background: t.c, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT.display, fontWeight: 800, fontSize: 64, color: "#111", transform: `scale(${k})` }}>
              {t.t}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const Ranking: React.FC = () => {
  const f = useCurrentFrame();
  const i = Math.min(EXCUSES.length - 1, Math.floor(f / STEP));
  const lf = f - i * STEP;
  const e = EXCUSES[i];
  const s = slot(i);
  const enter = interpolate(lf, [0, 8], [0, 1], { ...clamp, easing: easeOut });
  const fly = interpolate(lf, [FLY, FLY + 10], [0, 1], { ...clamp, easing: easeOut });
  const placed = lf >= FLY + 10 ? i + 1 : i;
  const tierColor = TIERS.find((t) => t.t === e.tier)!.c;
  // big card centre -> slot
  const cx = 540 + (s.x - 540) * fly;
  const cy = 1000 + (s.y - 1000) * fly;
  const size = 520 + (TILE - 520) * fly;
  return (
    <AbsoluteFill style={{ background: "#121218" }}>
      <Title />
      <Board placedUpTo={placed} dim={0.55 * (1 - fly) * enter} />
      {lf < FLY + 10 && (
        <div style={{ position: "absolute", left: cx, top: cy, transform: `translate(-50%, -50%) scale(${0.6 + 0.4 * enter})`, opacity: enter }}>
          <div style={{ width: size, height: size, borderRadius: 30 - 16 * fly, overflow: "hidden", border: `${10 - 6 * fly}px solid #fff`, boxShadow: "0 30px 80px rgba(0,0,0,0.6)" }}>
            <Img src={staticFile(e.meme)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          {fly < 0.3 && (
            <div style={{ position: "absolute", top: size + 20, left: "50%", transform: "translateX(-50%)", width: 960, textAlign: "center", opacity: 1 - fly * 3 }}>
              <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 60, color: "#fff", letterSpacing: -1.5 }}>{e.q}</div>
            </div>
          )}
        </div>
      )}
      {lf >= 20 && (
        <div style={{ position: "absolute", top: 1430, width: "100%", textAlign: "center", opacity: interpolate(lf, [20, 26], [0, 1], clamp) }}>
          <span style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 46, color: "#111", background: tierColor, padding: "14px 30px", borderRadius: 999 }}>
            {e.tier} · {e.verdict}
          </span>
        </div>
      )}
    </AbsoluteFill>
  );
};

const Chute: React.FC = () => (
  <AbsoluteFill style={{ background: "#121218" }}>
    <Title />
    <Board placedUpTo={EXCUSES.length} dim={0.85} />
    <div style={{ position: "absolute", top: 640, width: "100%", textAlign: "center", padding: "0 60px" }}>
      <RiseWords text="mais dans notre communauté" start={2} stagger={2} style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 64, color: "#fff", letterSpacing: -1.5 }} />
      <RiseWords text="y'a toujours une mate chaude pour lancer" start={10} stagger={2} style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 92, color: "#FFBF7F", lineHeight: 1.1, marginTop: 10 }} />
    </div>
    <Meme src="memes/girly-choquee.jpg" at={24} x={540} y={1360} w={360} rotate={-5} />
  </AbsoluteFill>
);

export const TierVideo: React.FC = () => (
  <Shell hideBugFrom={600}>
    <Sequence durationInFrames={60}>
      <Hook />
    </Sequence>
    <Sequence from={60} durationInFrames={450}>
      <Ranking />
    </Sequence>
    <Sequence from={510} durationInFrames={90}>
      <Chute />
    </Sequence>
    <Sequence from={600} durationInFrames={90}>
      <EndCard big="viens lancer" small="la communauté t'attend en voc" />
    </Sequence>
    <Flash at={60} strength={0.4} />
    <Flash at={510} strength={0.4} color="#FFBF7F" />
    <Flash at={600} strength={0.6} />
    <Audio src={staticFile("audio/sfx-tier.wav")} />
  </Shell>
);
