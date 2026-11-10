/**
 * TikTok #7 — « 3 trucs que t'entendras jamais dans notre communauté »   LOOK : MESSAGERIE (mode clair)
 * Bulles de message d'un inconnu, tampon « PAS ICI. », memes de réaction.
 * 0–60    : accroche
 * 60–330  : 3 messages × 90 images
 * 330–420 : ici, c'est…
 * 420–510 : carte de fin
 */
import React from "react";
import {AbsoluteFill, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SfxAudio } from "../safe";
import { COLORS } from "../config";
import { FONT, Flash, RiseWords, clamp, easeOut, useSpring } from "../components";
import { EndCard, Meme, Shell } from "../memes";

export const JAMAIS_TOTAL = 510;
const ITEM = 90;
const STAMP = 36;
const PAPER = "#F6F3FA";
const INK = "#16121D";

export const MESSAGES = [
  { text: "t'es une fille ??", meme: "memes/chat-side-eye.jpg" },
  { text: "passe ton snap", meme: "memes/chat-no-no-no.jpg" },
  { text: "t'as eu de la chance là", meme: "memes/girly-yeux-au-ciel.jpg" },
];

const Phone: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ background: PAPER }}>
    <div style={{ position: "absolute", left: 0, right: 0, top: 290, height: 120, borderBottom: "2px solid #E4DDED", display: "flex", alignItems: "center", gap: 22, padding: "0 60px" }}>
      <div style={{ width: 76, height: 76, borderRadius: 99, background: "#CFC8D8", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT.display, fontWeight: 800, fontSize: 34, color: "#fff" }}>?</div>
      <div>
        <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 38, color: INK }}>inconnu</div>
        <div style={{ fontFamily: FONT.body, fontWeight: 500, fontSize: 26, color: "#8D859A" }}>serveur random · en ligne</div>
      </div>
    </div>
    {children}
  </AbsoluteFill>
);

const Typing: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <div style={{ display: "inline-flex", gap: 12, padding: "26px 32px", borderRadius: 40, background: "#E6E1EC" }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{ width: 18, height: 18, borderRadius: 99, background: "#9A92A6", transform: `translateY(${Math.sin(f / 3 + i) * 6}px)` }} />
      ))}
    </div>
  );
};

const Hook: React.FC = () => {
  const f = useCurrentFrame();
  const mark = interpolate(f, [18, 28], [0, 1], { ...clamp, easing: easeOut });
  return (
    <AbsoluteFill style={{ background: PAPER }}>
      <div style={{ position: "absolute", top: 520, width: "100%", padding: "0 70px" }}>
        <RiseWords text="3 trucs que t'entendras" start={2} stagger={2} style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 92, color: INK, letterSpacing: -3, lineHeight: 1.05, justifyContent: "flex-start" }} />
        <div style={{ position: "relative", display: "inline-block", marginTop: 10 }}>
          <div style={{ position: "absolute", left: -10, right: -10, bottom: 14, height: 46, background: COLORS.lilac, opacity: 0.55, transform: `scaleX(${mark})`, transformOrigin: "left", borderRadius: 8 }} />
          <RiseWords text="jamais" start={10} style={{ position: "relative", fontFamily: FONT.serif, fontStyle: "italic", fontSize: 180, color: INK, lineHeight: 1 }} />
        </div>
        <RiseWords text="dans notre communauté" start={16} stagger={2} style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 58, color: "#6E4BB8", marginTop: 16, justifyContent: "flex-start" }} />
      </div>
      <Meme src="memes/chat-qui-juge.jpg" at={24} x={780} y={1380} w={380} rotate={6} />
    </AbsoluteFill>
  );
};

const Item: React.FC<{ m: (typeof MESSAGES)[number]; n: number }> = ({ m, n }) => {
  const f = useCurrentFrame();
  const bubble = useSpring(14, 11);
  const stamp = interpolate(f - STAMP, [0, 5], [2.4, 1], { ...clamp, easing: easeOut });
  const stamped = f >= STAMP;
  const strike = interpolate(f - STAMP, [0, 6], [0, 1], clamp);
  const shake = stamped && f < STAMP + 8 ? `translate(${Math.sin(f * 3) * 9}px, ${Math.cos(f * 2.5) * 7}px)` : "none";
  return (
    <Phone>
      <AbsoluteFill style={{ transform: shake }}>
        <div style={{ position: "absolute", top: 470, width: "100%", textAlign: "center", fontFamily: FONT.mono, fontWeight: 700, fontSize: 32, letterSpacing: 6, color: "#8D859A" }}>
          {n} / 3
        </div>
        <div style={{ position: "absolute", left: 60, top: 600 }}>
          {f < 14 ? (
            <Typing />
          ) : (
            <div
              style={{
                position: "relative",
                display: "inline-block",
                maxWidth: 820,
                padding: "34px 44px",
                borderRadius: "48px 48px 48px 14px",
                background: "#E6E1EC",
                fontFamily: FONT.body,
                fontWeight: 600,
                fontSize: 66,
                color: INK,
                opacity: stamped ? 0.55 : 1,
                transform: `scale(${0.7 + 0.3 * bubble})`,
                transformOrigin: "left bottom",
              }}
            >
              {m.text}
              <div style={{ position: "absolute", left: 30, right: 30, top: "52%", height: 8, background: "#FF3B5C", borderRadius: 8, transform: `scaleX(${strike})`, transformOrigin: "left" }} />
            </div>
          )}
        </div>
        {stamped && (
          <div
            style={{
              position: "absolute",
              left: 540,
              top: 900,
              transform: `translate(-50%, -50%) scale(${stamp}) rotate(-12deg)`,
              fontFamily: FONT.display,
              fontWeight: 800,
              fontSize: 150,
              letterSpacing: -4,
              color: COLORS.lilacDeep,
              border: `12px solid ${COLORS.lilacDeep}`,
              borderRadius: 30,
              padding: "6px 40px",
              whiteSpace: "nowrap",
              background: "rgba(246,243,250,0.85)",
            }}
          >
            PAS ICI.
          </div>
        )}
        <Meme src={m.meme} at={STAMP + 8} x={n % 2 ? 760 : 320} y={1360} w={400} rotate={n % 2 ? 7 : -7} />
      </AbsoluteFill>
    </Phone>
  );
};

const Ici: React.FC = () => {
  const pills = ["100% filles", "vérif vocale à l'entrée", "une communauté qui joue pour de vrai"];
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: PAPER }}>
      <div style={{ position: "absolute", top: 520, width: "100%", textAlign: "center" }}>
        <RiseWords text="ici c'est" start={2} style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 96, color: INK, letterSpacing: -3 }} />
      </div>
      <div style={{ position: "absolute", top: 700, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
        {pills.map((p, i) => {
          const k = interpolate(f - 12 - i * 12, [0, 8], [0, 1], { ...clamp, easing: easeOut });
          return (
            <div key={p} style={{ maxWidth: 940, textAlign: "center", fontFamily: FONT.display, fontWeight: 700, fontSize: 46, color: "#fff", background: i === 1 ? COLORS.lilacDeep : INK, padding: "22px 44px", borderRadius: 999, opacity: k, transform: `translateY(${(1 - k) * 40}px) rotate(${(i % 2 ? 1 : -1) * 2}deg)` }}>
              {p}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const JamaisVideo: React.FC = () => (
  <Shell hideBugFrom={420} ink="dark">
    <Sequence durationInFrames={60}>
      <Hook />
    </Sequence>
    {MESSAGES.map((m, i) => (
      <Sequence key={i} from={60 + i * ITEM} durationInFrames={ITEM}>
        <Item m={m} n={i + 1} />
      </Sequence>
    ))}
    <Sequence from={330} durationInFrames={90}>
      <Ici />
    </Sequence>
    <Sequence from={420} durationInFrames={90}>
      <EndCard big="rejoins-nous" small="communauté gaming 100% filles" />
    </Sequence>
    {MESSAGES.map((_, i) => (
      <Flash key={i} at={60 + i * ITEM + STAMP} strength={0.35} color="#CDB4FF" />
    ))}
    <Flash at={420} strength={0.6} />
    <SfxAudio src={staticFile("audio/sfx-jamais.wav")} />
  </Shell>
);
