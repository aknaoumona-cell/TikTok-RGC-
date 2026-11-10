/**
 * Hors série — Vide-grenier de l'Association Quad Rider 31 (Longages, dim. 15 nov. 2026)
 * TikTok / Snap Spotlight / Reels, 1080×1920, 30 i/s, 24 s. Bruitages seuls (son tendance à ajouter dans l'appli).
 * V2 LOOK : PHOTOS DE TERRAIN plein écran (vraies photos), typo condensée géante, surlignage jaune, grain, coupes « punch ».
 * Zone sûre : texte entre x 70–900 et y 230–1450 (boutons TikTok/Snap à droite et en bas).
 * 0–105 accroche (vide-grenier… AVEC DES QUADS) · 105–210 intérieur/extérieur · 210–330 baptême · 330–420 buvette
 * 420–540 infos · 540–640 exposants · 640–720 fin
 */
import React from "react";
import { AbsoluteFill, Audio, Sequence, interpolate, random, staticFile, useCurrentFrame } from "remotion";
import { BigBrand, Grain, InfoRow, Line, Photo, Pill, Q, Sub, YellowTread, useSpr } from "../quad/kit";

export const QUAD_TOTAL = 720;
const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const Box: React.FC<{ top: number; children: React.ReactNode }> = ({ top, children }) => (
  <div style={{ position: "absolute", left: 70, right: 150, top }}>{children}</div>
);

/** Secousse caméra pendant n images. */
const useShake = (at: number, n = 12, amp = 22) => {
  const f = useCurrentFrame();
  const t = f - at;
  if (t < 0 || t > n) return "none";
  const a = amp * (1 - t / n);
  return `translate(${(random(`x${f}`) - 0.5) * a}px, ${(random(`y${f}`) - 0.5) * a}px)`;
};

const Flash: React.FC<{ at: number; color?: string }> = ({ at, color = "#fff" }) => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{ background: color, opacity: interpolate(f - at, [0, 1, 6], [0, 0.85, 0], cl), pointerEvents: "none" }} />;
};

/* 1 — accroche */
const BROC_FLASH = ["quad/broc-vaisselle.jpg", "quad/broc-cadres.jpg", "quad/broc-chaussures.jpg"];
const S1: React.FC = () => {
  const f = useCurrentFrame();
  const shake = useShake(40, 14, 30);
  if (f < 40) {
    const i = Math.min(2, Math.floor(f / 13));
    return (
      <AbsoluteFill>
        <Sequence from={i * 13} layout="none"><Photo src={BROC_FLASH[i]} at={i * 13} punch={0.12} dark={0.3} /></Sequence>
        <Box top={760}>
          <Line at={2} size={150} hl rot={-2}>un vide-grenier…</Line>
        </Box>
      </AbsoluteFill>
    );
  }
  return (
    <AbsoluteFill style={{ transform: shake }}>
      <Photo src="quad/quad-gerbe.jpg" at={40} punch={0.45} dark={0.3} pos="40% 50%" />
      <Box top={380}>
        <Line at={40} size={110} from="left">un vide-grenier…</Line>
        <Line at={42} size={250} color={Q.yellow} from="slam">avec</Line>
        <Line at={46} size={250} color={Q.yellow} from="slam">des quads.</Line>
      </Box>
      <Box top={1320}>
        <Pill at={62} size={44}>dimanche 15 nov · Longages</Pill>
      </Box>
      <Flash at={40} />
    </AbsoluteFill>
  );
};

/* 2 — intérieur / extérieur en écran partagé */
const S2: React.FC = () => {
  const f = useCurrentFrame();
  const split = interpolate(f, [0, 14], [0, 1], { ...cl, easing: (t) => 1 - Math.pow(1 - t, 3) });
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 960, overflow: "hidden", transform: `translateX(${(1 - split) * -1080}px)` }}>
        <Photo src="quad/broc-caisses.jpg" at={0} dur={105} dark={0.25} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 960, height: 960, overflow: "hidden", transform: `translateX(${(1 - split) * 1080}px)` }}>
        <Photo src="quad/broc-stand.jpg" at={4} dur={105} dark={0.25} pos="50% 40%" />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 948, height: 24, background: Q.yellow, transform: `scaleX(${split})` }} />
      <Box top={330}><Line at={10} size={170} hl rot={-1.5}>dedans</Line></Box>
      <Box top={1040}><Line at={22} size={170} hl rot={1.5}>et dehors</Line></Box>
      <Box top={560}><Sub at={30} size={58}>des stands dans le foyer</Sub></Box>
      <Box top={1270}><Sub at={40} size={58}>et en extérieur, toute la journée</Sub></Box>
    </AbsoluteFill>
  );
};

/* 3 — baptême de quad */
const S3: React.FC = () => {
  const shake = useShake(6, 12, 26);
  return (
    <AbsoluteFill style={{ transform: shake }}>
      <Photo src="quad/quad-face.jpg" at={0} dur={120} punch={0.4} dark={0.3} pos="50% 35%" />
      <Box top={340}>
        <Pill at={2} bg={Q.red} color={Q.white} size={42}>il y aura aussi</Pill>
        <div style={{ height: 24 }} />
        <Line at={6} size={210} from="slam">baptême</Line>
        <Line at={12} size={210} hl from="slam" rot={-2}>de quad</Line>
      </Box>
      <Box top={1130}>
        <Sub at={28} size={66} style={{ fontWeight: 800 }}>en plus du vide-grenier,</Sub>
        <Sub at={34} size={66} style={{ fontWeight: 800 }}>des baptêmes de quad</Sub>
        <Sub at={40} size={66} style={{ fontWeight: 800, color: Q.yellow }}>toute la journée !</Sub>
      </Box>
      <Flash at={0} />
    </AbsoluteFill>
  );
};

/* 4 — buvette */
const S4: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      {f < 45 ? <Photo src="quad/food-tables.jpg" at={0} dur={45} dark={0.35} pos="50% 60%" /> : <Photo src="quad/food-truck.jpg" at={45} dur={50} dark={0.35} punch={0.18} />}
      <Box top={360}>
        <Line at={4} size={200}>buvette</Line>
        <Line at={10} size={170} hl rot={-1.5}>+ food truck</Line>
      </Box>
      <Box top={1200}><Sub at={22} size={62}>pour tenir de 9h à 17h30</Sub></Box>
      <Flash at={45} color="#000" />
    </AbsoluteFill>
  );
};

/* 5 — infos, fond jaune */
const S5: React.FC = () => {
  const f = useCurrentFrame();
  const big = useSpr(2, 12, 180);
  return (
    <AbsoluteFill>
      <YellowTread offset={f * 2} />
      <Box top={340}>
        <div style={{ fontFamily: Q.title, fontSize: 120, color: Q.ink, lineHeight: 1, transform: `scale(${0.7 + big * 0.3})`, opacity: big, transformOrigin: "left center" }}>DIMANCHE</div>
        <div style={{ fontFamily: Q.title, fontSize: 250, color: Q.ink, lineHeight: 0.95, transform: `scale(${0.7 + big * 0.3})`, opacity: big, transformOrigin: "left center" }}>15 NOV.</div>
        <InfoRow at={18} label="HORAIRES"><div style={{ fontFamily: Q.title, fontSize: 110, lineHeight: 1 }}>9H – 17H30</div></InfoRow>
        <InfoRow at={32} label="OÙ">
          <div style={{ fontFamily: Q.title, fontSize: 96, lineHeight: 1 }}>FOYER DU RABÉ</div>
          <div style={{ fontFamily: Q.body, fontWeight: 800, fontSize: 52, marginTop: 10 }}>chemin des Communaux</div>
          <div style={{ fontFamily: Q.body, fontWeight: 800, fontSize: 52 }}>LONGAGES (31)</div>
        </InfoRow>
      </Box>
    </AbsoluteFill>
  );
};

/* 6 — exposants */
const S6: React.FC = () => {
  const f = useCurrentFrame();
  const pulse = 1 + Math.max(0, Math.sin(f * 0.35)) * 0.04;
  return (
    <AbsoluteFill>
      <Photo src="quad/broc-buste.jpg" at={0} dur={100} dark={0.55} />
      <Box top={350}>
        <Line at={2} size={150}>ton grenier</Line>
        <Line at={6} size={150}>déborde ?</Line>
        <div style={{ height: 30 }} />
        <div style={{ transform: `scale(${pulse})`, transformOrigin: "left center" }}>
          <Line at={16} size={92} hl rot={-1.5}>prends un stand</Line>
        </div>
        <Sub at={24} size={56} style={{ marginTop: 18 }}>inscriptions jusqu'au <b style={{ color: Q.yellow }}>vendredi 13/11</b></Sub>
      </Box>
      <Box top={1050}>
        <Line at={34} size={112} from="left">06 58 34 33 78</Line>
        <Line at={40} size={112} from="left">06 80 94 24 70</Line>
      </Box>
    </AbsoluteFill>
  );
};

/* 7 — fin */
const S7: React.FC = () => (
  <AbsoluteFill>
    <Photo src="quad/quad-boue.jpg" at={0} dur={80} dark={0.4} pos="45% 50%" punch={0.3} />
    <Box top={380}>
      <Line at={2} size={190}>on t'attend</Line>
      <Line at={8} size={190} hl rot={-2}>dimanche</Line>
    </Box>
    <Box top={1150}>
      <Line at={18} size={110} color={Q.yellow}>15 nov · Longages</Line>
      <div style={{ height: 18 }} />
      <Pill at={30} size={38}>toutes les infos en description</Pill>
    </Box>
    <Flash at={0} />
  </AbsoluteFill>
);

const SCENES: [number, number, React.FC][] = [
  [0, 105, S1], [105, 105, S2], [210, 120, S3], [330, 90, S4], [420, 120, S5], [540, 100, S6], [640, 80, S7],
];

export const QuadVideGrenierVideo: React.FC = () => (
  <AbsoluteFill style={{ background: Q.ink }}>
    {SCENES.map(([from, d, S]) => (
      <Sequence key={from} from={from} durationInFrames={d}><S /></Sequence>
    ))}
    <Sequence from={0} durationInFrames={420}><BigBrand place="LONGAGES" /></Sequence>
    <Sequence from={420} durationInFrames={120}><BigBrand dark place="LONGAGES" /></Sequence>
    <Sequence from={540}><BigBrand place="LONGAGES" /></Sequence>
    <Grain />
    <Audio src={staticFile("audio/sfx-quad.wav")} />
  </AbsoluteFill>
);
