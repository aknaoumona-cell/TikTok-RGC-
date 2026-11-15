/**
 * TikTok #21 — « pov : tu joues seule vs avec une mate du serveur »
 * LOOK : AVANT / APRÈS — fond nacré clair, un seul cadre partagé par un curseur vertical qui glisse :
 * à gauche la partie en solo (gris, triste), à droite la partie avec une mate (couleurs).
 * 0–90 accroche · 90–330 duo 1 · 330–570 duo 2 · 570–660 carte de fin
 */
import React from "react";
import { AbsoluteFill, Easing, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { GameVideo, SfxAudio } from "../safe";
import { FONT, Flash, RiseWords, Sparkles, clamp } from "../components";
import { EndCard, Meme, Shell } from "../memes";

export const SLIDER_TOTAL = 660;
const PAIR = 240;
const SWEEP = 120; // frame where the handle starts moving
const INK = "#2B2238";
const LILAC = "#9B6BE0";

const PAIRS = [
  { solo: "clips/mr-seule.mp4", team: "clips/mr-team.mp4", soloTxt: "seule : tu tournes en rond dans la map", teamTxt: "avec une mate : ça part en team fight", memeA: "memes/chat-dort-telephone.jpg", memeB: "memes/chat-crie-pointe.jpg" },
  { solo: "clips/val-seule.mp4", team: "clips/ow-team.mp4", soloTxt: "seule : silence total, personne en voc", teamTxt: "avec une mate : ça parle, ça rigole, ça joue", memeA: "memes/chat-casque-canette.jpg", memeB: "memes/chat-langue.jpg" },
];

const Bg: React.FC = () => (
  <AbsoluteFill style={{ background: "linear-gradient(160deg, #FFFFFF, #F1E8FF 45%, #FCEAF1)" }}>
    <Sparkles count={12} seed="slider" />
  </AbsoluteFill>
);

const X0 = 60;
const W = 960;
const H = 620;
const TOP = 560;

const Pair: React.FC<{ p: (typeof PAIRS)[number] }> = ({ p }) => {
  const f = useCurrentFrame();
  // handle position: right edge (all solo) -> left edge (all team)
  const pos = interpolate(f, [SWEEP, SWEEP + 26], [W, 0], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const team = f >= SWEEP + 13;
  const txt = team ? p.teamTxt : p.soloTxt;
  return (
    <AbsoluteFill>
      <Bg />
      <div key={team ? "t" : "s"} style={{ position: "absolute", top: 330, width: "100%", textAlign: "center", padding: "0 90px" }}>
        <RiseWords text={txt.split(" : ")[0]} start={team ? SWEEP + 13 : 2} style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 76, color: team ? LILAC : "#8E8798", lineHeight: 1.05 }} />
        <RiseWords text={txt.split(" : ")[1]} start={team ? SWEEP + 17 : 6} stagger={2} style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 50, color: INK, letterSpacing: -1.2, lineHeight: 1.12, marginTop: 6 }} />
      </div>
      <div style={{ position: "absolute", left: X0, top: TOP, width: W, height: H, borderRadius: 34, overflow: "hidden", boxShadow: "0 24px 60px rgba(43,34,56,0.25)", border: "5px solid #fff" }}>
        {/* team clip underneath, revealed from the right */}
        <Sequence from={SWEEP} layout="none">
          <GameVideo src={staticFile(p.team)} style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }} />
        </Sequence>
        {/* solo clip on top, clipped to the left of the handle */}
        <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 ${W - pos}px 0 0)` }}>
          <GameVideo src={staticFile(p.solo)} sound={false} playbackRate={0.85} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1) brightness(0.8)" }} />
        </div>
        <div style={{ position: "absolute", left: 22, top: 20, fontFamily: FONT.mono, fontWeight: 700, fontSize: 26, color: "#fff", background: "rgba(0,0,0,0.5)", padding: "6px 14px", borderRadius: 10, opacity: pos > 200 ? 1 : 0 }}>SEULE</div>
        <div style={{ position: "absolute", right: 22, top: 20, fontFamily: FONT.mono, fontWeight: 700, fontSize: 26, color: "#fff", background: LILAC, padding: "6px 14px", borderRadius: 10, opacity: pos < W - 200 ? 1 : 0 }}>AVEC UNE MATE</div>
      </div>
      {/* handle */}
      {pos > 0 && pos < W && (
        <div style={{ position: "absolute", left: X0 + pos - 4, top: TOP - 20, width: 8, height: H + 40, background: "#fff", borderRadius: 8, boxShadow: `0 0 24px ${LILAC}` }}>
          <div style={{ position: "absolute", left: -32, top: H / 2 - 16, width: 72, height: 72, borderRadius: 99, background: "#fff", border: `5px solid ${LILAC}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT.display, fontWeight: 800, fontSize: 30, color: LILAC }}>‹ ›</div>
        </div>
      )}
      <Meme src={p.memeA} at={30} until={SWEEP} x={540} y={1430} w={300} rotate={-6} />
      <Meme src={p.memeB} at={SWEEP + 30} x={540} y={1430} w={300} rotate={6} />
    </AbsoluteFill>
  );
};

const Hook: React.FC = () => (
  <AbsoluteFill>
    <Bg />
    <div style={{ position: "absolute", top: 540, width: "100%", textAlign: "center", padding: "0 80px" }}>
      <RiseWords text="pov :" start={2} style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 52, color: LILAC, letterSpacing: 4 }} />
      <RiseWords text="tu joues seule" start={6} stagger={2} style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 92, color: "#8E8798", letterSpacing: -3, lineHeight: 1.05, marginTop: 10 }} />
      <RiseWords text="vs avec une mate" start={14} stagger={2} style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 112, color: LILAC, lineHeight: 1.08 }} />
      <RiseWords text="du serveur" start={20} stagger={2} style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 70, color: INK, letterSpacing: -2 }} />
    </div>
  </AbsoluteFill>
);

export const SliderVideo: React.FC = () => (
  <Shell hideBugFrom={570} brand="center" ink="dark">
    <Sequence durationInFrames={90}>
      <Hook />
    </Sequence>
    {PAIRS.map((p, i) => (
      <Sequence key={i} from={90 + i * PAIR} durationInFrames={PAIR}>
        <Pair p={p} />
      </Sequence>
    ))}
    <Sequence from={570} durationInFrames={90}>
      <EndCard big="trouve ta mate" small="en voc, sur le serveur" />
    </Sequence>
    {PAIRS.map((_, i) => (
      <Flash key={i} at={90 + i * PAIR + SWEEP + 13} strength={0.35} color="#E7D6FF" />
    ))}
    <Flash at={570} strength={0.6} />
    <SfxAudio src={staticFile("audio/sfx-slider.wav")} />
  </Shell>
);
