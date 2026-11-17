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
import { DISFAIS_TOTAL, DisFaisVideo } from "./videos/DisFais";
import { AMONG_TOTAL, AmongVideo } from "./videos/AmongTypes";
import { ROUE_TOTAL, RoueVideo } from "./videos/Roue";
import { COEUR_TOTAL, CoeurVideo } from "./videos/Coeur";
import { SLIDER_TOTAL, SliderVideo } from "./videos/Slider";
import { JURY_TOTAL, JuryVideo } from "./videos/Jury";
import { MOOD_TOTAL, MoodVideo } from "./videos/Mood";
import { MYMOON_TOTAL, MyMoonVideo } from "./videos/MyMoon";
import { HISTOIRE_TOTAL, HistoireVideo } from "./videos/Histoire";
import { EDIT_TOTAL, EditVideo } from "./videos/Edit";
import { CAMP_TOTAL, CampVideo } from "./videos/Camp";
import { MONTAGE_MULTI_TOTAL, MONTAGE_OW_TOTAL, MONTAGE_VALO_TOTAL, MontageMulti, MontageOw, MontageValo } from "./videos/Montage";

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
  DisFaisVideo: withSafeZone(DisFaisVideo),
  AmongVideo: withSafeZone(AmongVideo, { full: true }),
  RoueVideo: withSafeZone(RoueVideo),
  CoeurVideo: withSafeZone(CoeurVideo),
  SliderVideo: withSafeZone(SliderVideo),
  JuryVideo: withSafeZone(JuryVideo),
  MoodVideo: withSafeZone(MoodVideo),
  MyMoonVideo: withSafeZone(MyMoonVideo, { full: true }),
  HistoireVideo: withSafeZone(HistoireVideo, { full: true }),
  EditVideo: withSafeZone(EditVideo, { full: true }),
  CampVideo: withSafeZone(CampVideo, { full: true }),
  MontageMulti: withSafeZone(MontageMulti, { full: true }),
  MontageValo: withSafeZone(MontageValo, { full: true }),
  MontageOw: withSafeZone(MontageOw, { full: true }),
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
    <Composition id="RGCDisFais" component={S.DisFaisVideo} durationInFrames={DISFAIS_TOTAL} {...common} />
    <Composition id="RGCAmong" component={S.AmongVideo} durationInFrames={AMONG_TOTAL} {...common} />
    <Composition id="RGCRoue" component={S.RoueVideo} durationInFrames={ROUE_TOTAL} {...common} />
    <Composition id="RGCCoeur" component={S.CoeurVideo} durationInFrames={COEUR_TOTAL} {...common} />
    <Composition id="RGCSlider" component={S.SliderVideo} durationInFrames={SLIDER_TOTAL} {...common} />
    <Composition id="RGCJury" component={S.JuryVideo} durationInFrames={JURY_TOTAL} {...common} />
    <Composition id="RGCMood" component={S.MoodVideo} durationInFrames={MOOD_TOTAL} {...common} />
    <Composition id="RGCMyMoon" component={S.MyMoonVideo} durationInFrames={MYMOON_TOTAL} {...common} />
    <Composition id="RGCHistoire" component={S.HistoireVideo} durationInFrames={HISTOIRE_TOTAL} {...common} />
    <Composition id="RGCEdit" component={S.EditVideo} durationInFrames={EDIT_TOTAL} {...common} />
    <Composition id="RGCCamp" component={S.CampVideo} durationInFrames={CAMP_TOTAL} {...common} />
    <Composition id="RGCMontageMulti" component={S.MontageMulti} durationInFrames={MONTAGE_MULTI_TOTAL} {...common} />
    <Composition id="RGCMontageValo" component={S.MontageValo} durationInFrames={MONTAGE_VALO_TOTAL} {...common} />
    <Composition id="RGCMontageOw" component={S.MontageOw} durationInFrames={MONTAGE_OW_TOTAL} {...common} />
  </>
);
