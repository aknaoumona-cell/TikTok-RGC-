/**
 * Zone sûre TikTok.
 * Sur les téléphones récents, TikTok rogne ~100 px de chaque côté d'une vidéo 1080×1920
 * (et zoome s'il voit des bandes noires). On réduit donc tout le contenu à 82 % au centre
 * (tout tient dans les 880 px visibles) et on remplit les bords avec une copie floutée
 * de la même image (pas de noir → pas de zoom).
 */
import React, { createContext, useContext } from "react";
import { AbsoluteFill, Audio } from "remotion";

export const SAFE_SCALE = 880 / 1080;

const Muted = createContext(false);

/** Use instead of <Audio> so the blurred background copy stays silent. */
export const SfxAudio: React.FC<{ src: string }> = ({ src }) => {
  const muted = useContext(Muted);
  return muted ? null : <Audio src={src} />;
};

export function withSafeZone<P extends object>(Inner: React.ComponentType<P>): React.FC<P> {
  const Wrapped: React.FC<P> = (props) => (
    <AbsoluteFill style={{ background: "#0E0B14" }}>
      <Muted.Provider value>
        <AbsoluteFill style={{ transform: "scale(1.3)", filter: "blur(36px) brightness(0.55) saturate(1.2)" }}>
          <Inner {...props} />
        </AbsoluteFill>
      </Muted.Provider>
      <AbsoluteFill style={{ transform: `scale(${SAFE_SCALE})`, boxShadow: "0 0 80px rgba(0,0,0,0.5)" }}>
        <Inner {...props} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
  return Wrapped;
}
