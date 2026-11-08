import React from "react";
import { Composition } from "remotion";
import { FPS, HEIGHT, TOTAL, WIDTH } from "./config";
import { RGCPromo } from "./Video";
import { SOLO_TOTAL, SoloVideo } from "./videos/Solo";
import { TYPES_TOTAL, TypesVideo } from "./videos/Types";
import { JEUX_TOTAL, JeuxVideo } from "./videos/Jeux";
import { FLAGS_TOTAL, FlagsVideo } from "./videos/Flags";

const common = { fps: FPS, width: WIDTH, height: HEIGHT };

export const Root: React.FC = () => (
  <>
    <Composition id="RGCPromo" component={RGCPromo} durationInFrames={TOTAL} {...common} />
    <Composition id="RGCSolo" component={SoloVideo} durationInFrames={SOLO_TOTAL} {...common} />
    <Composition id="RGCTypes" component={TypesVideo} durationInFrames={TYPES_TOTAL} {...common} />
    <Composition id="RGCJeux" component={JeuxVideo} durationInFrames={JEUX_TOTAL} {...common} />
    <Composition id="RGCFlags" component={FlagsVideo} durationInFrames={FLAGS_TOTAL} {...common} />
  </>
);
