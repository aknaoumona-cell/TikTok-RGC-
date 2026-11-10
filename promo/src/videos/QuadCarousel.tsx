/**
 * Carrousel TikTok (mode photo) / Snap — Vide-grenier Quad Rider 31. 5 slides 1080×1920.
 * Chaque image de la composition = une slide : npx remotion still QuadCarousel out/carrousel/slide-N.png --frame=N-1
 */
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { BigBrand, Grain, InfoRow, Line, Photo, Pill, Q, Sub, YellowTread } from "../quad/kit";

export const CAROUSEL_SLIDES = 5;
const S = { still: true };
/** Texte réduit (×0,66) et marges larges : TikTok zoome un peu les photos à la publication. */
const K = 0.66;
const Box: React.FC<{ top: number; children: React.ReactNode }> = ({ top, children }) => (
  <div style={{ position: "absolute", left: 120, top, width: (1080 - 120 - 170) / K, transform: `scale(${K})`, transformOrigin: "left top" }}>{children}</div>
);
const Count: React.FC<{ n: number; dark?: boolean }> = ({ n, dark }) => (
  <div style={{ position: "absolute", right: 120, top: 190, fontFamily: Q.body, fontWeight: 800, fontSize: 34, letterSpacing: 3, color: dark ? Q.ink : Q.white, opacity: 0.85 }}>{n}/{CAROUSEL_SLIDES}</div>
);
const Swipe: React.FC = () => (
  <div style={{ position: "absolute", left: 120, top: 1380, display: "flex", alignItems: "center", gap: 18 }}>
    <span style={{ fontFamily: Q.body, fontWeight: 800, fontSize: 36, letterSpacing: 4, color: Q.white, textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}>GLISSE</span>
    <svg width="90" height="34" viewBox="0 0 90 34"><path d="M0 17 H80 M64 3 L82 17 L64 31" stroke={Q.yellow} strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
  </div>
);

const Slide1 = () => (
  <AbsoluteFill>
    <Photo src="quad/quad-foret.jpg" {...S} dark={0.3} pos="55% 50%" />
    <Box top={380}>
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
    <Box top={380}><Line {...S} size={170} hl rot={-1.5}>vide-grenier</Line><Sub {...S} size={58} style={{ marginTop: 20 }}>dans le foyer du Rabé…</Sub></Box>
    <Box top={1040}><Line {...S} size={170} hl rot={1.5}>et dehors</Line><Sub {...S} size={58} style={{ marginTop: 20 }}>de 9h à 17h30</Sub></Box>
  </AbsoluteFill>
);

const Slide3 = () => (
  <AbsoluteFill>
    <Photo src="quad/quad-gerbe.jpg" {...S} dark={0.3} pos="40% 50%" />
    <Box top={380}>
      <Pill {...S} bg={Q.red} color={Q.white} size={42}>il y aura aussi</Pill>
      <div style={{ height: 24 }} />
      <Line {...S} size={210}>baptême</Line>
      <Line {...S} size={210} hl rot={-2}>de quad</Line>
    </Box>
    <Box top={1150}><Sub {...S} size={66} style={{ fontWeight: 800 }}>en plus du vide-grenier,</Sub><Sub {...S} size={66} style={{ fontWeight: 800 }}>des baptêmes de quad</Sub><Sub {...S} size={66} style={{ fontWeight: 800, color: Q.yellow }}>toute la journée !</Sub></Box>
  </AbsoluteFill>
);

const Slide4 = () => (
  <AbsoluteFill>
    <Photo src="quad/food-tables.jpg" {...S} dark={0.35} pos="50% 60%" />
    <Box top={380}><Line {...S} size={200}>buvette</Line><Line {...S} size={170} hl rot={-1.5}>+ food truck</Line></Box>
    <Box top={1180}><Sub {...S} size={62}>de quoi manger et boire sur place</Sub></Box>
  </AbsoluteFill>
);

/** Slide finale : infos + exposants + rendez-vous, tout sur un écran jaune très lisible. */
const Slide5 = () => (
  <AbsoluteFill>
    <YellowTread />
    <Box top={370}>
      <div style={{ fontFamily: Q.title, fontSize: 170, color: Q.ink, lineHeight: 1 }}>DIMANCHE 15 NOV.</div>
      <InfoRow {...S} label="HORAIRES"><div style={{ fontFamily: Q.title, fontSize: 110, lineHeight: 1 }}>9H – 17H30</div></InfoRow>
      <InfoRow {...S} label="OÙ">
        <div style={{ fontFamily: Q.title, fontSize: 100, lineHeight: 1 }}>FOYER DU RABÉ</div>
        <div style={{ fontFamily: Q.body, fontWeight: 800, fontSize: 56, marginTop: 10 }}>chemin des Communaux, LONGAGES (31)</div>
      </InfoRow>
      <InfoRow {...S} label="SUR PLACE">
        <div style={{ fontFamily: Q.body, fontWeight: 800, fontSize: 64, lineHeight: 1.15 }}>baptêmes de quad · buvette · food truck</div>
      </InfoRow>
      <div style={{ height: 10, background: Q.ink, margin: "70px 0 56px" }} />
      <div style={{ display: "inline-block", background: Q.ink, color: Q.yellow, fontFamily: Q.title, fontSize: 96, padding: "4px 28px", lineHeight: 1.1 }}>EXPOSANTS</div>
      <div style={{ fontFamily: Q.body, fontWeight: 800, fontSize: 64, color: Q.ink, marginTop: 24 }}>inscription avant le vendredi 13/11 :</div>
      <div style={{ fontFamily: Q.title, fontSize: 120, color: Q.ink, lineHeight: 1.08, marginTop: 10 }}>06 58 34 33 78</div>
      <div style={{ fontFamily: Q.title, fontSize: 120, color: Q.ink, lineHeight: 1.08 }}>06 80 94 24 70</div>
      <div style={{ fontFamily: Q.body, fontWeight: 600, fontSize: 52, color: Q.ink, marginTop: 14 }}>associationquadrider31@gmail.com</div>
    </Box>
    <Box top={1430}>
      <div style={{ display: "inline-block", background: Q.ink, color: Q.white, fontFamily: Q.title, fontSize: 130, padding: "0 30px", transform: "rotate(-2deg)" }}>ON T'ATTEND !</div>
    </Box>
  </AbsoluteFill>
);

const SLIDES = [Slide1, Slide2, Slide3, Slide4, Slide5];

export const QuadCarousel: React.FC = () => {
  const f = useCurrentFrame();
  const i = Math.min(SLIDES.length - 1, f);
  const Cur = SLIDES[i];
  const dark = i === 4;
  return (
    <AbsoluteFill style={{ background: Q.ink }}>
      <Cur />
      <BigBrand dark={dark} left={120} top={170} size={76} />
      <Count n={i + 1} dark={dark} />
      <Grain seed={3} opacity={0.18} />
    </AbsoluteFill>
  );
};
