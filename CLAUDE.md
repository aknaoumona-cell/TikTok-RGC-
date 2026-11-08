# RGC — TikToks du serveur Discord « Rivals Girls Club »

## Objectif
Attirer des **filles gameuses actives sur Discord** pour qu'elles rejoignent le serveur (100% filles, multi-jeux, vérif vocale, safe place, SFW, LGBTQ+ friendly). On parle uniquement à des filles : accorder au féminin (« pour chacune », « toutes »…).

## Façon de travailler (demandé par l'utilisatrice)
- **Trouver des solutions soi-même** avant de demander. Si un asset manque ou qu'un outil bloque, chercher une alternative (Pinterest, autre source, recréer en motion design…) et la proposer déjà faite. Ne poser une question que si c'est vraiment une décision à elle.
- Montrer le résultat (vidéo rendue), pas seulement des conseils ou du code.
- Demander de valider le **thème/concept** avant de monter une nouvelle série de vidéos.

## Règles de contenu
- **Pas de musique de fond** : seulement des bruitages (transitions, impacts, pops…). Elle ajoute le son tendance elle-même dans TikTok.
- **Pas d'emojis** dans les vidéos : utiliser des **memes** (chats, Among Us, réactions girly) à la place.
- **Logo RGC obligatoire** + filigrane @rivalsgirlsclub qui bouge (anti-repost).
- **Chaque TikTok doit avoir son propre look** (ne pas refaire la même DA à chaque fois).
- Le lien du serveur est **en commentaire** (pas « lien en bio », pas « dis-le en com »).
- Ne jamais inventer : pas de faux chiffres, faux témoignages ou fausses captures du serveur.
- Infos à ne PAS dire : nombre de membres, « events chaque semaine » (dire « chaque mois »), « embrouilles », « on cherche des bavardes », « tu dis bonjour en arrivant ».
- Le vocal s'appelle juste « Vocal » avec un badge REC (pas de nom de salon).

## DA
Logo papillon chrome lilas (`promo/public/brand/logo-rgc.png`). Serveur au style girly doux : nacré, perles, nœuds, papillons, sparkles, lettres en cases `R i v a l s`. Féminin mais pas enfantin, pas de rose kitsch avec des cœurs partout.

## Technique
- Projet Remotion dans `promo/` (voir `promo/README.md`). Rendu : `npx remotion render <Composition> out/<nom>.mp4`.
- Bruitages synthétisés : `promo/tools/sfxlib.py`, `make_sfx.py`, `make_sfx_series.py`.
- Drive du serveur (connecteur Google Drive) : dossiers par jeu + SERVEUR. Le connecteur ne télécharge pas les fichiers > 10 Mo → utiliser les plus petits, sinon trouver une alternative (images de gameplay sur Pinterest, etc.).
- Pinterest est autorisé dans l'environnement : recherche via Playwright (`pin.js`-style, user-agent navigateur), images sur `i.pinimg.com`.
