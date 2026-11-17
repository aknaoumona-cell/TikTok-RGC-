/**
 * TikTok #24 — trend « my moon… my maaaan » (le « man », c'est le serveur). Son de la trend ajouté dans TikTok.
 * 1) « my moon… » : slideshow plein écran « jouer seule » (3 slides)
 * 2) transition « je tourne la page » de DROITE à GAUCHE
 * 3) « my maaaan » : le serveur en motion design — interface façon Discord, moderne : les salons apparaissent,
 *    un curseur clique sur #rôles (rôles jeux), #événements (soirée Overwatch), puis Vocal (REC).
 *    Noms de salons/rôles/event repris des vraies captures du serveur ; aucun pseudo, aucun chiffre.
 * Plein cadre, textes petits, éléments entre x≈120 et x≈960.
 * 0–120 slides · 120–142 page tournée · 142–432 serveur animé · 432–522 carte de fin
 */
import React from "react";
import { AbsoluteFill, Easing, Freeze, Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { GameVideo, SfxAudio } from "../safe";
import { FONT, Flash, clamp, easeOut, useSpring } from "../components";
import { EndCard, Meme, Shell } from "../memes";

export const MYMOON_TOTAL = 522;
const PEARL = "#F4ECFF";
const LILAC = "#B79BFF";
const UI_BG = "#17141F";
const UI_PANEL = "#211D2C";
const MUTED = "rgba(244,236,255,0.55)";

/* ---------------- 1) slideshow « jouer seule » ---------------- */
const SLIDES = [
  { clip: "clips/solo-ecran-nuit.mp4", cap: "2h du mat', seule devant l'écran" },
  { clip: "clips/solo-training.mp4", cap: "le training… toute seule", zoom: 1.32 },
  { clip: "clips/solo-lobby.mp4", cap: "lobby vide, voc vide" },
];
const SLIDE = 40;

const Slide: React.FC<{ s: (typeof SLIDES)[number] }> = ({ s }) => {
  const f = useCurrentFrame();
  const z = (s as { zoom?: number }).zoom ?? 1.08; // training clip: zoomed so the player name at the top is out of frame
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <AbsoluteFill style={{ transform: `scale(${z + f * 0.0015})`, filter: "saturate(0.75) brightness(0.8)" }}>
        <GameVideo src={staticFile(s.clip)} volume={0.25} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.55), transparent 30%, transparent 65%, rgba(0,0,0,0.7))" }} />
      <div style={{ position: "absolute", bottom: 420, width: "100%", textAlign: "center", padding: "0 140px", fontFamily: FONT.body, fontWeight: 600, fontSize: 36, color: PEARL, opacity: interpolate(f, [4, 10], [0, 1], clamp) }}>{s.cap}</div>
    </AbsoluteFill>
  );
};

const MoonTitle: React.FC = () => (
  <div style={{ position: "absolute", top: 330, width: "100%", textAlign: "center" }}>
    <div style={{ fontFamily: FONT.elegant, fontStyle: "italic", fontWeight: 700, fontSize: 80, color: PEARL, textShadow: "0 2px 18px rgba(0,0,0,0.7)" }}>my moon…</div>
    <div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 26, letterSpacing: 6, color: MUTED, marginTop: 4 }}>JOUER SEULE</div>
  </div>
);

const Slideshow: React.FC = () => (
  <AbsoluteFill>
    {SLIDES.map((s, i) => (
      <Sequence key={s.clip} from={i * SLIDE} durationInFrames={i === SLIDES.length - 1 ? 200 : SLIDE} layout="none">
        <Slide s={s} />
      </Sequence>
    ))}
    <MoonTitle />
  </AbsoluteFill>
);

/* ---------------- 3) le serveur animé ---------------- */
const CATS: { cat: string; items: { name: string; voice?: boolean }[] }[] = [
  { cat: "BIENVENUE", items: [{ name: "règlement" }, { name: "rôles" }, { name: "actualités" }, { name: "événements" }] },
  { cat: "COMMUNAUTÉ", items: [{ name: "level" }, { name: "no-mic" }] },
  { cat: "STARK SOUND & CINEMA", items: [{ name: "Cinéverse – MCU+", voice: true }] },
  { cat: "VOCAUX", items: [{ name: "Vocal", voice: true }, { name: "PRIVATE ROOM", voice: true }] },
];
const ROLES = ["Call of Duty", "Dead by Daylight", "Fortnite", "Marvel Rivals", "Overwatch", "Roblox", "Valorant", "Among us", "Minecraft", "League of Legends", "Aniimo", "Disney Dreamlight Valley", "GTA 6", "Lethal Company", "Phasmophobia", "Les Sims 4", "Stardew Valley", "Rocket League"];
const ROLE_COLS = ["#F9C9D6", "#DCCBFF", "#C8F0DF", "#FBE7A9", "#FFD3BA", "#C9E4FF"];

// local timeline of the UI (frames inside ManPart). The server part starts UI_OFFSET frames in,
// so the page turn already reveals the interface underneath.
const UI_OFFSET = 16;
const T_LIST = 14; // channels cascade
const T_ROLES = 64; // click #rôles
const T_EVENT = 150; // click #événements
const T_VOICE = 212; // click Vocal

const Hash: React.FC = () => <span style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 30, color: MUTED, width: 26, display: "inline-block" }}>#</span>;
const Speaker: React.FC = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" style={{ marginRight: 2 }}>
    <path d="M4 9h4l5-4v14l-5-4H4z" fill={MUTED} />
    <path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" stroke={MUTED} strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

/** channel row positions (inside the list) */
const rows: { y: number; cat?: string; name?: string; voice?: boolean; idx: number }[] = [];
(() => {
  let y = 0;
  let idx = 0;
  for (const c of CATS) {
    rows.push({ y, cat: c.cat, idx: idx++ });
    y += 54;
    for (const it of c.items) {
      rows.push({ y, name: it.name, voice: it.voice, idx: idx++ });
      y += 62;
    }
    y += 16;
  }
})();
const rowY = (name: string) => rows.find((r) => r.name === name)!.y;

const LIST_X = 230; // channel list left (inside panel)
const LIST_TOP = 230; // inside panel

const Cursor: React.FC<{ f: number }> = ({ f }) => {
  const pts: [number, number, number][] = [
    [0, 700, 1100],
    [T_ROLES - 14, 420, LIST_TOP + rowY("rôles") - 30],
    [T_EVENT - 14, 440, LIST_TOP + rowY("événements") - 30],
    [T_VOICE - 14, 400, LIST_TOP + rowY("Vocal") - 30],
  ];
  let x = pts[0][1];
  let y = pts[0][2];
  for (let i = 1; i < pts.length; i++) {
    const p = interpolate(f, [pts[i][0] - 12, pts[i][0]], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
    x = x + (pts[i][1] - x) * p;
    y = y + (pts[i][2] - y) * p;
  }
  const click = [T_ROLES, T_EVENT, T_VOICE].some((t) => f >= t - 14 && f < t - 10);
  return (
    <svg width="54" height="62" viewBox="0 0 24 28" style={{ position: "absolute", left: x, top: y, transform: `scale(${click ? 0.85 : 1})`, filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.5))", zIndex: 20 }}>
      <path d="M3 2l17 11-8 1.5 4.5 9-3 1.5-4.5-9L3 21z" fill="#fff" stroke="#17141F" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
};

const Card: React.FC<{ at: number; until: number; children: React.ReactNode; title: string; icon: React.ReactNode }> = ({ at, until, children, title, icon }) => {
  const f = useCurrentFrame();
  const inn = interpolate(f, [at, at + 10], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const out = interpolate(f, [until - 8, until], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  if (f < at || f > until) return null;
  return (
    <div style={{ position: "absolute", left: LIST_X - 20, top: 150, right: 30, bottom: 30, background: UI_PANEL, borderRadius: 24, border: "1.5px solid rgba(244,236,255,0.12)", boxShadow: "0 30px 60px rgba(0,0,0,0.45)", padding: "28px 30px", transform: `translateX(${(1 - inn) * 120 - out * 140}px)`, opacity: inn * (1 - out), zIndex: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: FONT.body, fontWeight: 700, fontSize: 32, color: PEARL, paddingBottom: 18, borderBottom: "1.5px solid rgba(244,236,255,0.1)", marginBottom: 22 }}>
        {icon}
        {title}
      </div>
      {children}
    </div>
  );
};

const ServerUI: React.FC = () => {
  const f = useCurrentFrame();
  const panel = useSpring(0, 14);
  const active = f >= T_VOICE - 10 ? "Vocal" : f >= T_EVENT - 10 ? "événements" : f >= T_ROLES - 10 ? "rôles" : "";
  return (
    <div style={{ position: "absolute", left: 120, top: 470, width: 840, height: 1180, borderRadius: 34, overflow: "hidden", background: UI_BG, border: "1.5px solid rgba(244,236,255,0.14)", boxShadow: "0 40px 90px rgba(0,0,0,0.55), 0 0 80px rgba(183,155,255,0.18)", transform: `translateY(${(1 - panel) * 80}px) scale(${0.94 + 0.06 * panel})`, opacity: panel }}>
      {/* icon rail */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 150, background: "#110F17", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 34, gap: 22 }}>
        <div style={{ width: 92, height: 92, borderRadius: 30, background: "linear-gradient(145deg, #2B2340, #1A1626)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 0 3px ${LILAC}` }}>
          <Img src={staticFile("brand/logo-rgc.png")} style={{ width: 70 }} />
        </div>
        {[0, 1, 2].map((k) => (
          <div key={k} style={{ width: 78, height: 78, borderRadius: 999, background: "rgba(244,236,255,0.06)" }} />
        ))}
      </div>
      {/* server header */}
      <div style={{ position: "absolute", left: 150, right: 0, top: 0, height: 140, display: "flex", alignItems: "center", paddingLeft: 40, borderBottom: "1.5px solid rgba(244,236,255,0.08)" }}>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {"Rivals Girls Club".split("").map((ch, i) => {
            const p = interpolate(f - 4 - i * 0.9, [0, 6], [0, 1], { ...clamp, easing: easeOut });
            if (ch === " ") return <span key={i} style={{ width: 14 }} />;
            return (
              <span key={i} style={{ width: 34, height: 40, borderRadius: 7, background: "#2A2536", border: "1.5px solid rgba(244,236,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT.mono, fontWeight: 700, fontSize: 24, color: PEARL, opacity: p, transform: `translateY(${(1 - p) * 10}px)` }}>
                {ch}
              </span>
            );
          })}
        </div>
      </div>
      {/* channel list */}
      <div style={{ position: "absolute", left: LIST_X - 60, top: LIST_TOP - 60 }}>
        {rows.map((r) => {
          const p = interpolate(f - T_LIST - r.idx * 3, [0, 8], [0, 1], { ...clamp, easing: easeOut });
          if (r.cat)
            return (
              <div key={r.idx} style={{ position: "absolute", top: r.y, left: 0, width: 600, fontFamily: FONT.mono, fontWeight: 700, fontSize: 22, letterSpacing: 4, color: LILAC, opacity: p }}>
                ✦ {r.cat}
              </div>
            );
          const on = active === r.name;
          return (
            <div key={r.idx} style={{ position: "absolute", top: r.y, left: 10, width: 560, height: 54, borderRadius: 14, display: "flex", alignItems: "center", gap: 8, paddingLeft: 14, background: on ? "rgba(183,155,255,0.18)" : "transparent", fontFamily: FONT.body, fontWeight: 600, fontSize: 32, color: on ? PEARL : "rgba(244,236,255,0.8)", opacity: p, transform: `translateX(${(1 - p) * 30}px)` }}>
              {r.voice ? <Speaker /> : <Hash />}
              {r.name}
              
            </div>
          );
        })}
      </div>

      {/* #rôles */}
      <Card at={T_ROLES} until={T_EVENT - 4} title="jeux : rôles" icon={<Hash />}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {ROLES.map((r, i) => {
            const p = interpolate(f - T_ROLES - 6 - i * 1.8, [0, 7], [0, 1], { ...clamp, easing: Easing.out(Easing.back(1.6)) });
            return (
              <span key={r} style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 24, color: "#1A1424", background: ROLE_COLS[i % ROLE_COLS.length], padding: "9px 16px", borderRadius: 999, transform: `scale(${p})`, opacity: p }}>
                @{r}
              </span>
            );
          })}
        </div>
        <div style={{ marginTop: 26, fontFamily: FONT.body, fontWeight: 600, fontSize: 26, color: MUTED }}>prends ton rôle, trouve ta team</div>
      </Card>

      {/* #événements */}
      <Card at={T_EVENT} until={T_VOICE - 4} title="événements" icon={<Hash />}>
        <div style={{ borderRadius: 20, overflow: "hidden", background: "linear-gradient(135deg, #3A2B5C, #6B4E9E)", padding: "26px 26px 30px" }}>
          <div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 20, letterSpacing: 3, color: "rgba(255,255,255,0.75)" }}>VENDREDI · 21H00</div>
          <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 46, color: "#fff", marginTop: 8, letterSpacing: -1 }}>Soirée Overwatch</div>
          <div style={{ fontFamily: FONT.body, fontWeight: 600, fontSize: 26, color: "rgba(255,255,255,0.85)", marginTop: 14, lineHeight: 1.45 }}>
            parties rapides
            <br />
            tester les différents modes
            <br />
            parties personnalisées 5v5
          </div>
          <div style={{ marginTop: 20, display: "inline-block", fontFamily: FONT.body, fontWeight: 700, fontSize: 24, color: "#1A1424", background: PEARL, padding: "10px 20px", borderRadius: 999, transform: `scale(${f > T_EVENT + 30 ? 1 : 0.9})` }}>INTÉRESSÉE</div>
        </div>
      </Card>

      {/* Vocal */}
      <Card at={T_VOICE} until={600} title="Vocal" icon={<Speaker />}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 18, justifyContent: "center", marginTop: 10 }}>
          {ROLE_COLS.map((c, i) => {
            const p = interpolate(f - T_VOICE - 8 - i * 6, [0, 8], [0, 1], { ...clamp, easing: Easing.out(Easing.back(1.8)) });
            const talk = Math.abs(Math.sin(f / 4 + i * 1.7)) > 0.6;
            return (
              <div key={c} style={{ width: 120, height: 120, borderRadius: 999, background: `radial-gradient(circle at 35% 30%, #fff, ${c})`, boxShadow: talk && p === 1 ? "0 0 0 5px #3BD67F" : "0 0 0 3px rgba(244,236,255,0.15)", transform: `scale(${p})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Img src={staticFile("brand/logo-rgc.png")} style={{ width: 56, opacity: 0.55 }} />
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center", height: 80, marginTop: 30, justifyContent: "center" }}>
          {new Array(26).fill(0).map((_, i) => (
            <div key={i} style={{ width: 10, height: 16 + 56 * Math.abs(Math.sin(f / 3.5 + i * 0.7)) * (f > T_VOICE + 30 ? 1 : 0.2), borderRadius: 6, background: i % 2 ? LILAC : PEARL }} />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 16, fontFamily: FONT.body, fontWeight: 600, fontSize: 26, color: MUTED }}>des filles en voc pour jouer</div>
      </Card>

      <Cursor f={f} />
    </div>
  );
};

const ManPart: React.FC = () => {
  const f = useCurrentFrame();
  const nA = Math.min(7, 1 + Math.floor(f / 5));
  return (
    <AbsoluteFill style={{ background: "radial-gradient(80% 60% at 50% 40%, #2A2140, #0F0C16)" }}>
      <AbsoluteFill style={{ backgroundImage: "radial-gradient(rgba(244,236,255,0.06) 2px, transparent 2.5px)", backgroundSize: "36px 36px" }} />
      <div style={{ position: "absolute", top: 320, width: "100%", textAlign: "center" }}>
        <span style={{ fontFamily: FONT.elegant, fontStyle: "italic", fontWeight: 700, fontSize: 86, color: PEARL, textShadow: "0 0 24px rgba(183,155,255,0.8)" }}>{`my m${"a".repeat(nA)}n`}</span>
      </div>
      <ServerUI />
      <Meme src="memes/chat-emu.jpg" at={40} until={T_ROLES} x={880} y={1690} w={180} rotate={8} />
      <Meme src="memes/chaton-pouce.jpg" at={T_VOICE + 20} x={200} y={1700} w={180} rotate={-7} />
    </AbsoluteFill>
  );
};

/* ---------------- 2) page tournée de droite à gauche ---------------- */
const PageTurn: React.FC = () => {
  const f = useCurrentFrame();
  const a = interpolate(f, [0, 22], [0, -180], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const shade = Math.sin((Math.abs(a) * Math.PI) / 180);
  return (
    <AbsoluteFill style={{ perspective: 2600 }}>
      {/* next page underneath (first frame of the server part) */}
      <Freeze frame={UI_OFFSET}>
        <ManPart />
      </Freeze>
      <AbsoluteFill style={{ background: `rgba(0,0,0,${0.5 * (1 - Math.abs(a) / 180)})` }} />
      {/* current page turning around its LEFT edge: the right side lifts and goes to the left */}
      {a > -90 && (
        <AbsoluteFill style={{ transformOrigin: "0% 50%", transform: `rotateY(${a}deg)`, boxShadow: `${-40 * shade}px 0 80px rgba(0,0,0,${0.6 * shade})` }}>
          <Freeze frame={SLIDE - 1}>
            <Slide s={SLIDES[2]} />
          </Freeze>
          <MoonTitle />
          <AbsoluteFill style={{ background: `linear-gradient(90deg, rgba(0,0,0,0) 40%, rgba(0,0,0,${0.55 * shade}))` }} />
        </AbsoluteFill>
      )}
      {/* back of the page (pearl paper) for the second half of the turn */}
      {a <= -90 && (
        <AbsoluteFill style={{ transformOrigin: "0% 50%", transform: `rotateY(${a + 180}deg) scaleX(-1)`, background: "linear-gradient(90deg, #E9DEFA, #F7F1FF 60%, #FFFFFF)", boxShadow: `${40 * shade}px 0 80px rgba(0,0,0,${0.5 * shade})` }} />
      )}
    </AbsoluteFill>
  );
};

export const MyMoonVideo: React.FC = () => (
  <Shell hideBugFrom={432} brand="center">
    <Sequence durationInFrames={120}>
      <Slideshow />
    </Sequence>
    <Sequence from={120} durationInFrames={22}>
      <PageTurn />
    </Sequence>
    <Sequence from={142} durationInFrames={290}>
      <Sequence from={-UI_OFFSET} layout="none">
        <ManPart />
      </Sequence>
    </Sequence>
    <Sequence from={432} durationInFrames={90}>
      <EndCard big="ton maaan aussi ?" small="serveur discord 100% filles" />
    </Sequence>
    <Flash at={40} strength={0.15} />
    <Flash at={80} strength={0.15} />
    <Flash at={432} strength={0.6} />
    <SfxAudio src={staticFile("audio/sfx-mymoon.wav")} />
  </Shell>
);
