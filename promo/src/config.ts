/**
 * ============================================================
 *  RGC PROMO — FICHIER DE CONFIG (tout ce qui se modifie est ici)
 * ============================================================
 *  - Les textes, clips, couleurs et timings du montage.
 *  - 30 images par seconde. Musique guide à 120 BPM => 1 temps = 15 images.
 *  - Pour changer un clip : dépose le fichier dans public/clips/ et
 *    remplace son nom ci-dessous.
 */

export const FPS = 30;
export const BEAT = 15; // 1 temps à 120 BPM
export const WIDTH = 1080;
export const HEIGHT = 1920;

export const HANDLE = "@rivalsgirlsclub";

/** Afficher le pseudo complet des membres dans les bulles de chat ?
 *  false = initiale seulement (par défaut, en attendant leur accord). */
export const SHOW_MEMBER_NAMES = false;

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
  bavardes: { from: 90, dur: 60 }, // 3.0 – 5.0 s  (DROP)
  game: { from: 150, dur: 60 }, // 5.0 – 7.0 s
  votes: { from: 210, dur: 60 }, // 7.0 – 9.0 s
  cine: { from: 270, dur: 60 }, // 9.0 – 11.0 s
  talk: { from: 330, dur: 60 }, // 11.0 – 13.0 s
  chat: { from: 390, dur: 120 }, // 13.0 – 17.0 s (breakdown)
  values: { from: 510, dur: 75 }, // 17.0 – 19.5 s (re-drop)
  cta: { from: 585, dur: 105 }, // 19.5 – 23.0 s (logo)
  outro: { from: 690, dur: 75 }, // 23.0 – 25.5 s
};
export const TOTAL = 765;

export const TEXT = {
  hookTop: "on cherche pas",
  hookBottom: "des membres.",
  bavardesTop: "on cherche",
  bavardes: "des bavardes.",
  cellesQui: "celles qui…",
  lines: {
    game: ["lancent une game", "à 23h"],
    votes: ["crient pendant", "les votes"],
    cine: ["commentent", "le film du dimanche"],
    talk: ["parlent livres,", "séries, mangas…"],
  },
  chatTitle: "un dimanche soir sur RGC",
  chatCaption: "vrais messages · soirée ciné du serveur",
  members: 711,
  membersLabel: "membres",
  pills: ["100% filles", "vérif vocale", "12 jeux", "SFW · LGBTQ+ friendly"],
  ctaName: "Rivals Girls Club",
  ctaEvents: ["soirées ciné", "soirées jeux", "mini-jeux"],
  ctaHello: "et tu dis bonjour en arrivant 😌",
  outroLink: "lien en bio",
  outroQuestion: "ton jeu de ce soir ?",
  outroQuestion2: "dis-le en com 👇",
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

/** Vrais messages (capture de la soirée ciné « Cinéverse – MCU+ »). */
export const CHAT = [
  {
    name: "Mels",
    color: "#B78BF0",
    text: "On va passer plus de temps à parler de James Buchanan Barnes que de regarder le film 🤣",
    reaction: "🤣 1",
  },
  { name: "noirya", color: "#BFEBD9", text: "mais il est si charismatique...", reaction: "" },
  { name: "Heloise", color: "#F6C1D1", text: "Han l'agent carter est trop belle", reaction: "" },
  {
    name: "Tiph",
    color: "#F7E3A3",
    text: "Salut moi aussiii !! Je suis arrivée il y a trois jours tu sais, enchanté et bienvenue !!",
    reaction: "",
  },
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

export const MUSIC = "audio/rgc-beat-120.wav";
