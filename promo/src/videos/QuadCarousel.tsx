/**
 * Carrousel TikTok (mode photo) / Snap — Vide-grenier Quad Rider 31. 7 slides 1080×1920.
 * Chaque image de la composition = une slide : npx remotion still QuadCarousel out/carrousel/slide-N.png --frame=N-1
 */
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Brand, Grain, InfoRow, Line, Photo, Pill, Q, Sub, YellowTread } from "../quad/kit";

export const CAROUSEL_SLIDES = 7;
const S = { still: true };
const Box: React.FC<{ top: number; children: React.ReactNode }> = ({ top, children }) => (
  <div style={{ position: "absolute", left: 70, right: 150, top }}>{children}</div>
);
const Count: React.FC<{ n: number; dark?: boolean }> = ({ n, dark }) => (
  <div style={{ position: "absolute", right: 70, top: 116, fontFamily: Q.body, fontWeight: 800, fontSize: 34, letterSpacing: 3, color: dark ? Q.ink : Q.white, opacity: 0.85 }}>{n}/{CAROUSEL_SLIDES}</div>
);
const Swipe: React.FC = () => (
  <div style={{ position: "absolute", left: 70, top: 1420, display: "flex", alignItems: "center", gap: 18 }}>
    <span style={{ fontFamily: Q.body, fontWeight: 800, fontSize: 44, letterSpacing: 4, color: Q.white }}>GLISSE</span>
    <svg width="90" height="34" viewBox="0 0 90 34"><path d="M0 17 H80 M64 3 L82 17 L64 31" stroke={Q.yellow} strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
  </div>
);

const Slide1 = () => (
  <AbsoluteFill>
    <Photo src="quad/quad-foret.jpg" {...S} dark={0.3} pos="55% 50%" />
    <Box top={330}>
      <Line {...S} size={115}>un vide-grenier…</Line>
      <Line {...S} size={240} color={Q.yellow}>avec</Line>
      <Line {...S} size={240} color={Q.yellow}>des quads.</Line>
    </Box>
    <Box top={1180}><Pill {...S} size={46}>dim. 15 nov · Longages</Pill></Box>
    <Swipe />
  </AbsoluteFill>
);

const Slide2 = () => (
  <AbsoluteFill>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 960, overflow: "hidden" }}><Photo src="quad/broc-vaisselle.jpg" {...S} dark={0.22} /></div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 960, height: 960, overflow: "hidden" }}><Photo src="quad/broc-chaussures.jpg" {...S} dark={0.22} /></div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 948, height: 24, background: Q.yellow }} />
    <Box top={300}><Line {...S} size={170} hl rot={-1.5}>vide-grenier</Line><Sub {...S} size={58} style={{ marginTop: 20 }}>dans le foyer du Rabé…</Sub></Box>
    <Box top={1040}><Line {...S} size={170} hl rot={1.5}>et dehors</Line><Sub {...S} size={58} style={{ marginTop: 20 }}>de 9h à 17h30, viens chiner</Sub></Box>
  </AbsoluteFill>
);

const Slide3 = () => (
  <AbsoluteFill>
    <Photo src="quad/quad-gerbe.jpg" {...S} dark={0.3} pos="40% 50%" />
    <Box top={300}>
      <Pill {...S} bg={Q.red} color={Q.white} size={42}>le truc en plus</Pill>
      <div style={{ height: 24 }} />
      <Line {...S} size={210}>baptême</Line>
      <Line {...S} size={210} hl rot={-2}>de quad</Line>
    </Box>
    <Box top={1180}><Sub {...S} size={68} style={{ fontWeight: 800 }}>toute la journée.</Sub><Sub {...S} size={58}>tu viens chiner, tu repars avec des sensations.</Sub></Box>
  </AbsoluteFill>
);

const Slide4 = () => (
  <AbsoluteFill>
    <Photo src="quad/food-tables.jpg" {...S} dark={0.35} pos="50% 60%" />
    <Box top={320}><Line {...S} size={200}>buvette</Line><Line {...S} size={170} hl rot={-1.5}>+ food truck</Line></Box>
    <Box top={1200}><Sub {...S} size={62}>de quoi manger et boire sur place</Sub></Box>
  </AbsoluteFill>
);

const Slide5 = () => (
  <AbsoluteFill>
    <YellowTread />
    <Box top={290}>
      <div style={{ fontFamily: Q.title, fontSize: 120, color: Q.ink, lineHeight: 1 }}>DIMANCHE</div>
      <div style={{ fontFamily: Q.title, fontSize: 250, color: Q.ink, lineHeight: 0.95 }}>15 NOV.</div>
      <InfoRow {...S} label="HORAIRES"><div style={{ fontFamily: Q.title, fontSize: 110, lineHeight: 1 }}>9H – 17H30</div></InfoRow>
      <InfoRow {...S} label="OÙ">
        <div style={{ fontFamily: Q.title, fontSize: 96, lineHeight: 1 }}>FOYER DU RABÉ</div>
        <div style={{ fontFamily: Q.body, fontWeight: 800, fontSize: 52, marginTop: 10 }}>chemin des Communaux</div>
        <div style={{ fontFamily: Q.body, fontWeight: 800, fontSize: 52 }}>LONGAGES (31)</div>
      </InfoRow>
    </Box>
    <Box top={1330}><div style={{ fontFamily: Q.body, fontWeight: 800, fontSize: 46, color: Q.ink, letterSpacing: 2 }}>ENREGISTRE CE POST POUR NE PAS L'OUBLIER</div></Box>
  </AbsoluteFill>
);

const Slide6 = () => (
  <AbsoluteFill>
    <Photo src="quad/broc-buste.jpg" {...S} dark={0.55} />
    <Box top={300}>
      <Line {...S} size={150}>ton grenier</Line>
      <Line {...S} size={150}>déborde ?</Line>
      <div style={{ height: 30 }} />
      <Line {...S} size={92} hl rot={-1.5}>prends un stand</Line>
      <Sub {...S} size={56} style={{ marginTop: 18 }}>inscriptions jusqu'au <b style={{ color: Q.yellow }}>vendredi 13/11</b></Sub>
    </Box>
    <Box top={1050}>
      <Line {...S} size={112}>06 58 34 33 78</Line>
      <Line {...S} size={112}>06 80 94 24 70</Line>
      <Sub {...S} size={40} style={{ marginTop: 14 }}>associationquadrider31@gmail.com</Sub>
    </Box>
  </AbsoluteFill>
);

const Slide7 = () => (
  <AbsoluteFill>
    <Photo src="quad/quad-boue.jpg" {...S} dark={0.4} pos="45% 50%" />
    <Box top={330}><Line {...S} size={190}>on t'attend</Line><Line {...S} size={190} hl rot={-2}>dimanche</Line></Box>
    <Box top={1100}>
      <Sub {...S} size={48} style={{ letterSpacing: 4, fontWeight: 800 }}>ASSOCIATION</Sub>
      <Line {...S} size={120} color={Q.yellow}>quad rider 31</Line>
      <div style={{ height: 18 }} />
      <Pill {...S} size={36}>partage à ton pote qui chine</Pill>
    </Box>
  </AbsoluteFill>
);

const SLIDES = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7];

export const QuadCarousel: React.FC = () => {
  const f = useCurrentFrame();
  const i = Math.min(SLIDES.length - 1, f);
  const Cur = SLIDES[i];
  const dark = i === 4;
  return (
    <AbsoluteFill style={{ background: Q.ink }}>
      <Cur />
      <Brand dark={dark} />
      <Count n={i + 1} dark={dark} />
      <Grain seed={3} opacity={0.18} />
    </AbsoluteFill>
  );
};
