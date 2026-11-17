/**
 * Gameplay « en grand » pour les TikToks plein cadre :
 * - fond = le même clip, zoomé + flouté (muet) pour remplir les 1080×1920 sans bandes noires ;
 * - premier plan = le clip agrandi (bandeau très haut, recadré au centre), avec le son du jeu (GameVideo).
 */
import React from "react";
import { AbsoluteFill, staticFile } from "remotion";
import { GameVideo } from "./safe";

export const BigClip: React.FC<{
  src: string;
  start?: number; // seconds
  rate?: number;
  height?: number; // foreground band height (px). 1920 = true full screen
  top?: number; // band top; default centred
  focusX?: number; // 0..1 horizontal focus inside the clip
  zoom?: number; // extra zoom of the foreground
  volume?: number;
  sound?: boolean;
  filter?: string;
  radius?: number;
  children?: React.ReactNode; // overlays drawn in band coordinates
}> = ({ src, start = 0, rate = 1, height = 1180, top, focusX = 0.5, zoom = 1, volume = 0.7, sound = true, filter, radius = 0, children }) => {
  const t = top ?? (1920 - height) / 2;
  const from = Math.round(start * 30);
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <AbsoluteFill style={{ transform: "scale(1.25)", filter: "blur(40px) brightness(0.45) saturate(1.3)" }}>
        <GameVideo src={staticFile(src)} startFrom={from} playbackRate={rate} sound={false} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>
      <div style={{ position: "absolute", left: 0, top: t, width: 1080, height, overflow: "hidden", borderRadius: radius }}>
        <div style={{ width: "100%", height: "100%", transform: `scale(${zoom})`, filter }}>
          <GameVideo src={staticFile(src)} startFrom={from} playbackRate={rate} volume={volume} sound={sound} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: `${focusX * 100}% 50%` }} />
        </div>
        {children}
      </div>
    </AbsoluteFill>
  );
};
