/**
 * ============================================================
 *  RGC PROMO — FICHIER DE CONFIG (tout ce qui se modifie est ici)
 * ============================================================
 *  - Les textes, clips, couleurs et timings du montage.
 *  - 30 images par seconde. Montage calé sur une grille de 120 BPM => 1 temps = 15 images.
 *  - Pour changer un clip : dépose le fichier dans public/clips/ et
 *    remplace son nom ci-dessous.
 */

export const FPS = 30;
export const BEAT = 15; // 1 temps à 120 BPM
export const WIDTH = 1080;
export const HEIGHT = 1920;

export const HANDLE = "@rivalsgirlsclub";

export const COLORS = {
  night: "#120F18", // fond nuit (doux, pas noir gothique)
  night2: "#1C1726",
  discord: "#1E1F22",
  card: "rgba(36, 30, 48, 0.82)",
  lilac: "#B78BF0", // violet chrome du logo
  lilacDeep: "#6E4BB8",
  pearl: "#F5F0FF",
  blush: "#F6C1D1",
  mint: "#BFEBD9",
  butter: "#F7E3A3",
  live: "#FF4D6A", // point "EN VOC"
  text: "#FFFFFF",
  textSoft: "rgba(255,255,255,0.72)",
};

/** Découpage du montage, en images (30 i/s). */
export const T = {
  hook: { from: 0, dur: 90 }, // 0.0 – 3.0 s
  drop: { from: 90, dur: 60 }, // 3.0 – 5.0 s  (DROP)
  game: { from: 150, dur: 60 }, // 5.0 – 7.0 s
  votes: { from: 210, dur: 60 }, // 7.0 – 9.0 s
  cine: { from: 270, dur: 60 }, // 9.0 – 11.0 s
  talk: { from: 330, dur: 60 }, // 11.0 – 13.0 s
  values: { from: 390, dur: 75 }, // 13.0 – 15.5 s (re-drop)
  cta: { from: 465, dur: 105 }, // 15.5 – 19.0 s (logo)
  outro: { from: 570, dur: 75 }, // 19.0 – 21.5 s
};
export const TOTAL = 645;

export const TEXT = {
  hookTop: "t'as pas encore",
  hookBottom: "trouvé ta squad ?",
  dropTop: "un serveur",
  dropSmall: "entre",
  dropBig: "filles.",
  header: "ici, on…",
  lines: {
    game: ["lance une game", "à 23h"],
    votes: ["crie pendant", "les votes"],
    cine: ["se fait des", "soirées ciné"],
    talk: ["parle livres,", "séries, mangas…"],
  },
  valuesTop: "et surtout",
  valuesBig: "une safe place.",
  pills: ["vérif vocale", "multi-jeux", "events chaque semaine", "SFW · LGBTQ+ friendly"],
  ctaName: "Rivals Girls Club",
  ctaEvents: ["soirées ciné", "soirées jeux", "mini-jeux"],
  outroBig: "rejoins-nous",
  outroLink: "lien en commentaire",
};

/** Vrais salons du serveur (repris de la liste des salons). */
export const CHANNELS = [
  "girl-talk",
  "discussion",
  "manga-anime",
  "book-lover",
  "film-série",
  "art-création",
  "à-la-cuisine",
  "animaux",
  "kiss-marry-kill",
  "birthday",
];

/** Clips (dans public/clips). start = seconde de départ dans le clip. */
export const CLIPS = {
  game: [
    { src: "clips/marvel-rivals-highlight.mp4", start: 2.2, tag: "MARVEL RIVALS" },
    { src: "clips/cod-sniper-rose.mp4", start: 1.0, tag: "CALL OF DUTY" },
    { src: "clips/overwatch-action.mp4", start: 1.5, tag: "OVERWATCH" },
    { src: "clips/marvel-rivals-jungle.mp4", start: 9.0, tag: "MARVEL RIVALS" },
  ],
  votes: [
    { src: "clips/among-us-votes.mp4", start: 0.3, tag: "AMONG US" },
    { src: "clips/among-us-votes.mp4", start: 12.6, tag: "AMONG US" },
  ],
  cine: [
    { src: "server/screen-IMG_9079.jpg", tag: "CINÉVERSE – MCU+" },
    { src: "server/screen-IMG_9091.jpg", tag: "CINÉVERSE – MCU+" },
  ],
  valuesBg: [
    "clips/overwatch-hd.mp4",
    "clips/cod-action.mp4",
    "clips/marvel-rivals-highlight.mp4",
    "clips/overwatch-action.mp4",
  ],
};

/** Bruitages seuls (pas de musique) : impacts, whooshs, pops… — généré par tools/make_sfx.py */
export const SFX = "audio/rgc-sfx.wav";
