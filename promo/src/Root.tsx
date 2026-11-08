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
  </>
);
