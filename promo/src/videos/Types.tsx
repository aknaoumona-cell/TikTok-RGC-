/**
 * TikTok #3 — « les types de joueuses sur RGC »   LOOK : TEMPLATE MEME
 * Bandeau blanc + texte noir en haut, vidéo pleine largeur dessous, memes.
 * 0–60    : accroche
 * 60–435  : 5 types × 75 images (arrêt sur image + zoom + boom à l'image 40)
 * 435–540 : « t'es laquelle ? » + carte de fin
 */
import React from "react";
import {AbsoluteFill, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SfxAudio } from "../safe";
import { COLORS } from "../config";
import { FONT, Flash, clamp } from "../components";
import { VoiceCard } from "../scenes";
import { EndCard, Meme, MemeClip, RedCircle, Shell, Sticker } from "../memes";

export const TYPES_TOTAL = 540;
export const TYPE_DUR = 75;
export const FREEZE = 40;
const BAND = 780; // hauteur du bandeau blanc

type TypeDef = {
  text: string;
  clip?: { src: string; start: number; image?: boolean; focus?: [number, number] };
  voice?: boolean;
  meme: string;
  pill?: string;
  circle?: [number, number, number, number];
};

export const TYPES: TypeDef[] = [
  { text: "celle qui dit « allez dernière game » depuis 3h du mat'", clip: { src: "clips/marvel-rivals-jungle.mp4", start: 9.0, focus: [0.5, 0.45] }, meme: "memes/chat-epuise.jpg", pill: "03:47" },
  { text: "celle qui accuse tout le monde aux votes alors que c'est elle l'imposteur", clip: { src: "clips/among-us-votes.mp4", start: 0.3, focus: [0.5, 0.4] }, meme: "memes/chat-qui-accuse.jpg", circle: [540, BAND + 300, 560, 320] },
  { text: "celle qui joue avec un skin tout rose et qui te one-shot quand même", clip: { src: "clips/cod-sniper-rose.mp4", start: 1.0, focus: [0.5, 0.85] }, meme: "memes/chat-lunettes-soleil.jpg" },
  { text: "celle qui est en voc mais mute depuis 2h", voice: true, meme: "memes/chat-bonnet-3h.jpg", circle: [205, BAND + 300, 190, 190] },
  { text: "celle qui vient « juste regarder le film » et commente chaque scène", clip: { src: "server/screen-IMG_9090.jpg", start: 0, image: true, focus: [0.55, 0.45] }, meme: "memes/chat-lunettes-actually.jpg" },
];

const WhiteBand: React.FC<{ label?: string; text: string; big?: boolean }> = ({ label, text, big }) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 5], [0, 1], clamp);
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: big ? 1920 : BAND, background: "#FFFFFF" }}>
      <div style={{ position: "absolute", left: 70, right: 70, top: big ? 520 : 300, bottom: big ? undefined : 40, display: "flex", flexDirection: "column", justifyContent: big ? "flex-start" : "center", opacity: o }}>
        {label && (
          <div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 32, color: COLORS.lilacDeep, letterSpacing: 4, marginBottom: 18 }}>{label}</div>
        )}
        <div style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: big ? 92 : 60, lineHeight: 1.18, color: "#111", letterSpacing: -1 }}>{text}</div>
      </div>
    </div>
  );
};

const Hook: React.FC = () => (
  <AbsoluteFill>
    <WhiteBand big label="POV" text="les types de joueuses que tu croises sur RGC" />
    <Meme src="memes/chat-setup-rose.jpg" at={14} x={540} y={1330} w={760} rotate={-3} />
  </AbsoluteFill>
);

const TypeScene: React.FC<{ t: TypeDef; n: number }> = ({ t, n }) => {
  const f = useCurrentFrame();
  const frozen = f >= FREEZE;
  const shake = frozen && f < FREEZE + 8 ? `translate(${Math.sin(f * 3) * 10}px, ${Math.cos(f * 2.6) * 8}px)` : "none";
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <AbsoluteFill style={{ transform: shake }}>
        {t.clip && <MemeClip bare src={t.clip.src} start={t.clip.start} freezeAt={FREEZE} image={t.clip.image} focus={t.clip.focus} top={BAND} />}
        {t.voice && (
          <AbsoluteFill style={{ filter: frozen ? "saturate(0.4) contrast(1.1)" : "none" }}>
            <VoiceCard top={BAND + 90} />
          </AbsoluteFill>
        )}
      </AbsoluteFill>
      <WhiteBand label={`TYPE N°${n}`} text={t.text} />
      {t.circle && <RedCircle at={FREEZE + 2} x={t.circle[0]} y={t.circle[1]} w={t.circle[2]} h={t.circle[3]} />}
      {t.pill && (
        <Sticker at={FREEZE + 2} x={300} y={BAND + 520} size={180} pill rotate={-8}>
          {t.pill}
        </Sticker>
      )}
      <Meme src={t.meme} at={FREEZE + 3} x={780} y={BAND + 640} w={420} rotate={7} />
    </AbsoluteFill>
  );
};

export const TypesVideo: React.FC = () => (
  <Shell hideBugFrom={435} ink="dark">
    <Sequence durationInFrames={60}>
      <Hook />
    </Sequence>
    {TYPES.map((t, i) => (
      <Sequence key={i} from={60 + i * TYPE_DUR} durationInFrames={TYPE_DUR}>
        <TypeScene t={t} n={i + 1} />
      </Sequence>
    ))}
    <Sequence from={435} durationInFrames={105}>
      <EndCard big="t'es laquelle ?" small="elles sont toutes sur RGC" />
    </Sequence>
    {TYPES.map((_, i) => (
      <Flash key={i} at={60 + i * TYPE_DUR + FREEZE} strength={0.5} />
    ))}
    <Flash at={435} strength={0.7} />
    <SfxAudio src={staticFile("audio/sfx-types.wav")} />
  </Shell>
);

