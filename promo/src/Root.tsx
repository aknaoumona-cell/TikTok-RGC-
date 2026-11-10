import React from "react";
import { Composition } from "remotion";
import { FPS, HEIGHT, TOTAL, WIDTH } from "./config";
import { RGCPromo } from "./Video";
import { withSafeZone } from "./safe";
import { SOLO_TOTAL, SoloVideo } from "./videos/Solo";
import { TYPES_TOTAL, TypesVideo } from "./videos/Types";
import { JEUX_TOTAL, JeuxVideo } from "./videos/Jeux";
import { FLAGS_TOTAL, FlagsVideo } from "./videos/Flags";
import { MAINS_TOTAL, MainsVideo } from "./videos/Mains";
import { JAMAIS_TOTAL, JamaisVideo } from "./videos/Jamais";
import { TIER_TOTAL, TierVideo } from "./videos/Tier";
import { POVTEAM_TOTAL, PovTeamVideo } from "./videos/PovTeam";
import { PHRASES_TOTAL, PhrasesVideo } from "./videos/Phrases";
import { REALITE_TOTAL, RealiteVideo } from "./videos/Realite";
import { SONS_TOTAL, SonsVideo } from "./videos/Sons";
import { MATEFLAGS_TOTAL, MateFlagsVideo } from "./videos/MateFlags";
import { DIMANCHE_TOTAL, DimancheVideo } from "./videos/Dimanche";
import { VERIF_TOTAL, VerifVideo } from "./videos/Verif";
import { ASTRO_TOTAL, AstroVideo } from "./videos/Astro";

const common = { fps: FPS, width: WIDTH, height: HEIGHT };

// Every video is wrapped in the TikTok safe zone (see src/safe.tsx).
const S = {
  RGCPromo: withSafeZone(RGCPromo),
  SoloVideo: withSafeZone(SoloVideo),
  TypesVideo: withSafeZone(TypesVideo),
  JeuxVideo: withSafeZone(JeuxVideo),
  FlagsVideo: withSafeZone(FlagsVideo),
  MainsVideo: withSafeZone(MainsVideo),
  JamaisVideo: withSafeZone(JamaisVideo),
  TierVideo: withSafeZone(TierVideo),
  PovTeamVideo: withSafeZone(PovTeamVideo),
  PhrasesVideo: withSafeZone(PhrasesVideo),
  RealiteVideo: withSafeZone(RealiteVideo),
  SonsVideo: withSafeZone(SonsVideo),
  MateFlagsVideo: withSafeZone(MateFlagsVideo),
  DimancheVideo: withSafeZone(DimancheVideo),
  VerifVideo: withSafeZone(VerifVideo),
  AstroVideo: withSafeZone(AstroVideo),
};

export const Root: React.FC = () => (
  <>
    <Composition id="RGCPromo" component={S.RGCPromo} durationInFrames={TOTAL} {...common} />
    <Composition id="RGCSolo" component={S.SoloVideo} durationInFrames={SOLO_TOTAL} {...common} />
    <Composition id="RGCTypes" component={S.TypesVideo} durationInFrames={TYPES_TOTAL} {...common} />
    <Composition id="RGCJeux" component={S.JeuxVideo} durationInFrames={JEUX_TOTAL} {...common} />
    <Composition id="RGCFlags" component={S.FlagsVideo} durationInFrames={FLAGS_TOTAL} {...common} />
    <Composition id="RGCMains" component={S.MainsVideo} durationInFrames={MAINS_TOTAL} {...common} />
    <Composition id="RGCJamais" component={S.JamaisVideo} durationInFrames={JAMAIS_TOTAL} {...common} />
    <Composition id="RGCTier" component={S.TierVideo} durationInFrames={TIER_TOTAL} {...common} />
    <Composition id="RGCPovTeam" component={S.PovTeamVideo} durationInFrames={POVTEAM_TOTAL} {...common} />
    <Composition id="RGCPhrases" component={S.PhrasesVideo} durationInFrames={PHRASES_TOTAL} {...common} />
    <Composition id="RGCRealite" component={S.RealiteVideo} durationInFrames={REALITE_TOTAL} {...common} />
    <Composition id="RGCSons" component={S.SonsVideo} durationInFrames={SONS_TOTAL} {...common} />
    <Composition id="RGCMateFlags" component={S.MateFlagsVideo} durationInFrames={MATEFLAGS_TOTAL} {...common} />
    <Composition id="RGCDimanche" component={S.DimancheVideo} durationInFrames={DIMANCHE_TOTAL} {...common} />
    <Composition id="RGCVerif" component={S.VerifVideo} durationInFrames={VERIF_TOTAL} {...common} />
    <Composition id="RGCAstro" component={S.AstroVideo} durationInFrames={ASTRO_TOTAL} {...common} />
  </>
);
