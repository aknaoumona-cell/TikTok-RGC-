# RGC — montage promo TikTok « On cherche des bavardes »

Vidéo verticale 1080×1920, 30 i/s, 25,5 s, faite avec [Remotion](https://www.remotion.dev) (montage codé en React).

## Fichiers prêts à publier
- `out/rgc-promo.mp4` — avec la musique guide originale (120 BPM, libre de droits, composée pour le montage).
- `out/rgc-promo-sans-musique.mp4` — sans son, pour ajouter un son tendance directement dans TikTok.

## Modifier le montage
Presque tout se change dans **`src/config.ts`** :
- `TEXT` : tous les textes (accroche, lignes « celles qui… », pills, CTA, question finale).
- `CLIPS` : quels clips sont utilisés et à quelle seconde ils démarrent.
- `CHAT` : les vrais messages affichés ; `SHOW_MEMBER_NAMES` affiche les pseudos complets (à mettre à `true` seulement avec l'accord des membres).
- `CHANNELS` : les salons affichés.
- `COLORS` : la palette (nuit douce, lilas chrome du logo, nacré rose / menthe / beurre).
- `T` : le découpage du montage (en images ; 15 images = 1 temps à 120 BPM).

Les scènes sont dans `src/scenes.tsx`, les éléments graphiques réutilisables (texte chrome, lettres en cases, nœud, sparkles, cadre de clip, filigrane anti-repost, transitions) dans `src/components.tsx`.

## Lancer / rendre
```bash
npm install
npm run studio          # aperçu interactif dans le navigateur
npm run render          # -> out/rgc-promo.mp4
npm run render:nomusic  # -> out/rgc-promo-sans-musique.mp4
python3 tools/make_beat.py public/audio/rgc-beat-120.wav   # régénère la musique guide
```
Sur ton PC, supprime la ligne `setBrowserExecutable` dans `remotion.config.ts` (elle pointe vers le Chromium de l'environnement cloud).

## Assets
- `public/brand/logo-rgc.png` — logo officiel détouré (fond transparent).
- `public/clips/` — clips du drive (Marvel Rivals, CoD, Overwatch, Among Us). Ce sont des versions < 10 Mo, souvent en 480p : à remplacer par les originaux HD dès que possible (mêmes noms de fichier = rien d'autre à changer).
- `public/server/` — photos de la soirée ciné (éclaircies / recadrées). Les messages de `CHAT` sont recopiés mot pour mot depuis `chat-9083.jpg`.

## Protection anti-repost
Logo + @rivalsgirlsclub en haut à gauche en permanence, et un second filigrane « ✦ @rivalsgirlsclub ✦ » qui dérive lentement dans toute l'image (impossible à recadrer proprement).
