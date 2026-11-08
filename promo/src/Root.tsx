import React from "react";
import { Composition } from "remotion";
import { FPS, HEIGHT, TOTAL, WIDTH } from "./config";
import { RGCPromo } from "./Video";

export const Root: React.FC = () => (
  <Composition id="RGCPromo" component={RGCPromo} durationInFrames={TOTAL} fps={FPS} width={WIDTH} height={HEIGHT} />
);
