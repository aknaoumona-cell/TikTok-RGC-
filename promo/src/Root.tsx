import React from "react";
import { Composition } from "remotion";
import { FPS, HEIGHT, TOTAL, WIDTH } from "./config";
import { RGCPromo } from "./Video";
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
import { QUAD_TOTAL, QuadVideGrenierVideo } from "./videos/QuadVideGrenier";
import { CAROUSEL_SLIDES, QuadCarousel } from "./videos/QuadCarousel";
import { AFFICHE_H, AFFICHE_W, QuadAffiche } from "./videos/QuadAffiche";

const common = { fps: FPS, width: WIDTH, height: HEIGHT };

export const Root: React.FC = () => (
  <>
    <Composition id="RGCPromo" component={RGCPromo} durationInFrames={TOTAL} {...common} />
    <Composition id="RGCSolo" component={SoloVideo} durationInFrames={SOLO_TOTAL} {...common} />
    <Composition id="RGCTypes" component={TypesVideo} durationInFrames={TYPES_TOTAL} {...common} />
    <Composition id="RGCJeux" component={JeuxVideo} durationInFrames={JEUX_TOTAL} {...common} />
    <Composition id="RGCFlags" component={FlagsVideo} durationInFrames={FLAGS_TOTAL} {...common} />
    <Composition id="RGCMains" component={MainsVideo} durationInFrames={MAINS_TOTAL} {...common} />
    <Composition id="RGCJamais" component={JamaisVideo} durationInFrames={JAMAIS_TOTAL} {...common} />
    <Composition id="RGCTier" component={TierVideo} durationInFrames={TIER_TOTAL} {...common} />
    <Composition id="RGCPovTeam" component={PovTeamVideo} durationInFrames={POVTEAM_TOTAL} {...common} />
    <Composition id="RGCPhrases" component={PhrasesVideo} durationInFrames={PHRASES_TOTAL} {...common} />
    <Composition id="RGCRealite" component={RealiteVideo} durationInFrames={REALITE_TOTAL} {...common} />
    <Composition id="RGCSons" component={SonsVideo} durationInFrames={SONS_TOTAL} {...common} />
    <Composition id="RGCMateFlags" component={MateFlagsVideo} durationInFrames={MATEFLAGS_TOTAL} {...common} />
    <Composition id="RGCDimanche" component={DimancheVideo} durationInFrames={DIMANCHE_TOTAL} {...common} />
    <Composition id="RGCVerif" component={VerifVideo} durationInFrames={VERIF_TOTAL} {...common} />
    <Composition id="RGCAstro" component={AstroVideo} durationInFrames={ASTRO_TOTAL} {...common} />
    <Composition id="QuadVideGrenier" component={QuadVideGrenierVideo} durationInFrames={QUAD_TOTAL} {...common} />
    <Composition id="QuadCarousel" component={QuadCarousel} durationInFrames={CAROUSEL_SLIDES} {...common} />
    <Composition id="QuadAffiche" component={QuadAffiche} durationInFrames={1} fps={30} width={AFFICHE_W} height={AFFICHE_H} />
  </>
);
