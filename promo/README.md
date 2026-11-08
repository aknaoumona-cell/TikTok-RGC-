# RGC — montage promo TikTok « un serveur entre filles »

Vidéo verticale 1080×1920, 30 i/s, 21,5 s, faite avec [Remotion](https://www.remotion.dev) (montage codé en React).

## Fichiers prêts à publier
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
