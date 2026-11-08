# RGC — montage promo TikTok « un serveur entre filles »

Vidéo verticale 1080×1920, 30 i/s, 21,5 s, faite avec [Remotion](https://www.remotion.dev) (montage codé en React).

## Les vidéos (toutes avec bruitages seuls, sans musique)
| Fichier | Concept | Look |
|---|---|---|
| `out/rgc-promo.mp4` | « un serveur entre filles » | nuit nacrée, chrome lilas |
| `out/rgc-seule-vs-plusieurs.mp4` | jouer seule vs à plusieurs → viens en voc demander des mates | cinéma (image large, chapitres, sous-titres) |
| `out/rgc-types-de-joueuses.mp4` | les types de joueuses sur RGC (memes) | template meme (bandeau blanc) |
| `out/rgc-les-jeux.mp4` | les 12 jeux du serveur en rafale (clip du serveur ou image de gameplay) + « autres jeux » | affiche pop pastel |
| `out/rgc-red-green-flags.mp4` | red flags vs green flags d'un serveur Discord | bicolore rouge / vert |
| `out/rgc-ton-main.mp4` | ce que ton main dit de toi (et de ta team) | cartes holographiques |
| `out/rgc-trucs-jamais.mp4` | 3 trucs que t'entendras jamais dans notre communauté | messagerie mode clair + tampon |
| `out/rgc-tier-list-excuses.mp4` | tier list des excuses pour pas lancer la game (23 s) | tier list S/A/B/C/F |
| `out/rgc-pov-team.mp4` | pov : t'as enfin trouvé des mates qui jouent à la même heure que toi | scrapbook polaroids |
| `out/rgc-phrases-voc.mp4` | les phrases qu'on entend en voc | karaoké |
| `out/rgc-pensais-vs-realite.mp4` | ce que je pensais vs la réalité | split-screen gris / vif |
| `out/rgc-sons-discord.mp4` | les sons de discord qui nous font quelque chose | néon blurple + visualiseur |
| `out/rgc-green-flags-mate.mp4` | les green flags d'une mate de jeu | post-its sur quadrillage menthe |
| `out/rgc-dimanche.mp4` | un dimanche sur RGC | lo-fi cosy chaud |
| `out/rgc-verif-vocale.mp4` | pov : tu passes la vérif vocale (message vocal guidé) | appli de messages vocaux |
| `out/rgc-astro.mp4` | ton jeu préféré selon ton signe astro (33 s) | astro mystique, nuit étoilée + or |

Les sources : `src/Video.tsx` (promo) et `src/videos/*.tsx` (les 4 autres, textes en haut de chaque fichier).
Rendu : `npx remotion render <RGCPromo|RGCSolo|RGCTypes|RGCJeux|RGCFlags|RGCMains|RGCJamais|RGCTier|RGCPovTeam|RGCPhrases|RGCRealite|RGCSons|RGCMateFlags|RGCDimanche|RGCVerif|RGCAstro> out/<nom>.mp4`.
Bruitages : `python3 tools/make_sfx.py` (promo) et `python3 tools/make_sfx_series.py` (les 4 autres).
Memes : `public/memes/`, persos (captures in-game officielles) : `public/heroes/`, captures de jeu : `public/ingame/`, ambiances : `public/cozy/` et images de gameplay : `public/gameplay/` (trouvés sur Pinterest).

## Promo principale
- `out/rgc-promo.mp4` — avec **uniquement les bruitages** (impacts, whooshs, pops, ticks des lettres, shutter, scintillements), calés à l'image près. Pas de musique : ajoute ton son par-dessus dans TikTok / CapCut.

## Modifier le montage
Presque tout se change dans **`src/config.ts`** :
- `TEXT` : tous les textes (accroche, lignes « ici, on… », safe place + pills, CTA, « lien en commentaire »).
- `CLIPS` : quels clips sont utilisés et à quelle seconde ils démarrent.
- `CHANNELS` : les salons affichés.
- `COLORS` : la palette (nuit douce, lilas chrome du logo, nacré rose / menthe / beurre).
- `T` : le découpage du montage (en images ; 15 images = 1 temps à 120 BPM).

Les scènes sont dans `src/scenes.tsx`, les éléments graphiques réutilisables (texte chrome, lettres en cases, nœud, sparkles, cadre de clip, filigrane anti-repost, transitions) dans `src/components.tsx`.

## Lancer / rendre
```bash
npm install
npm run studio          # aperçu interactif dans le navigateur
npm run sfx             # régénère les bruitages (tools/make_sfx.py) — à relancer si tu changes les timings
npm run render          # -> out/rgc-promo.mp4
```
Sur ton PC, supprime la ligne `setBrowserExecutable` dans `remotion.config.ts` (elle pointe vers le Chromium de l'environnement cloud).

## Assets
- `public/brand/logo-rgc.png` — logo officiel détouré (fond transparent).
- `public/clips/` — clips du drive (Marvel Rivals, CoD, Overwatch, Among Us). Ce sont des versions < 10 Mo, souvent en 480p : à remplacer par les originaux HD dès que possible (mêmes noms de fichier = rien d'autre à changer).
- `public/server/` — photos de la soirée ciné (éclaircies / recadrées).
- `public/audio/rgc-sfx.wav` — piste de bruitages synthétisés (libres de droits).

## Protection anti-repost
Logo + @rivalsgirlsclub en haut à gauche en permanence, et un second filigrane « ✦ @rivalsgirlsclub ✦ » qui dérive lentement dans toute l'image (impossible à recadrer proprement).
