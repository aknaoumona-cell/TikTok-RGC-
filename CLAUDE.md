# RGC — TikToks du serveur Discord « Rivals Girls Club »

## Objectif
Attirer des **filles gameuses actives sur Discord** pour qu'elles rejoignent le serveur (100% filles, multi-jeux, vérif vocale, safe place, SFW, LGBTQ+ friendly). On parle uniquement à des filles : accorder au féminin (« pour chacune », « toutes »…).

## Façon de travailler (demandé par l'utilisatrice)
- **Trouver des solutions soi-même** avant de demander. Si un asset manque ou qu'un outil bloque, chercher une alternative (Pinterest, autre source, recréer en motion design…) et la proposer déjà faite. Ne poser une question que si c'est vraiment une décision à elle.
- Montrer le résultat (vidéo rendue), pas seulement des conseils ou du code.
- Demander de valider le **thème/concept** avant de monter une nouvelle série de vidéos.

## Ton & langage
- Cible : jeunes femmes **18+** (le serveur est réservé aux majeures) — **ne jamais écrire « 18+ » ni parler d'âge dans les vidéos/descriptions** (sinon certaines mentent sur leur âge aux candidatures).
- Parler comme elles : **langage Gen Z français naturel**, mature, drôle, complice (ex. « la vibe », « c'est carré », « en vrai », « jsp », « pov », « t'es laquelle », « on est d'accord que… », « le mood »). Pas de vocabulaire d'ado, pas de ton « pub » ni corporate.
- Vocabulaire : **« team »** pour les équipes en jeu, **« communauté »** pour parler du serveur. Ne plus dire « squad ».
- **Éviter le générique** : des situations précises et vécues par les gameuses (le « dernière game » à 3h, le skin rose qui one-shot, mute en voc…) plutôt que des slogans vagues.

## Règles de contenu
- **Pas de musique de fond** : seulement des bruitages (transitions, impacts, pops…). Elle ajoute le son tendance elle-même dans TikTok.
- **Garder le son des clips gameplay** (ça marche bien) : utiliser `<GameVideo>` (`promo/src/safe.tsx`) au lieu de `<OffthreadVideo>` — le son ne joue qu'une fois (copie floutée muette). Couper/normaliser les clips avec ffmpeg en gardant l'audio (`loudnorm`).
- **Among Us : ne jamais utiliser un clip où apparaît le pseudo « Nelfy »** (vérifier image par image, y compris la liste du vocal Discord). IMG_1134 et IMG_1131 écartés pour ça.
- **Pas d'emojis** dans les vidéos : utiliser des **memes** (chats, Among Us, réactions girly) à la place.
- **Logo RGC obligatoire** + filigrane @rivalsgirlsclub qui bouge (anti-repost). Nouvelles vidéos : `<Shell brand="center">` → logo + nom **centrés en haut** (police Cormorant Garamond italique) et filigrane **centré dès le début** (dérive seulement de haut en bas). Garder le haut (y < 300) libre pour ce logo.
- **Chaque TikTok doit avoir son propre look** (ne pas refaire la même DA à chaque fois).
- Mélanger **clips + motion design** marche bien (animations par-dessus le gameplay).
- Persos/jeux : utiliser des **captures in-game / rendus officiels du jeu**, jamais des fan arts (pas l'autorisation des artistes).
- **Ne JAMAIS réutiliser un visuel déjà utilisé dans une autre vidéo** (clips, images, memes). Chercher des visuels neufs (Pinterest…) plutôt que reprendre l'existant, même si ça prend plus de temps. Vérifier avant le rendu : `python3 tools/check_reuse.py src/videos/<Nouvelle>.tsx` (dans `promo/`).
- **Laisser le temps de lire** : ~3 s minimum par écran de texte.
- **Pas de grandes bandes noires** (haut/bas) : TikTok les recadre et ça zoome. Toujours remplir les 1080×1920 (fond flouté, couleur…).
- **Zone sûre / format** (mis à jour) : l'utilisatrice préfère **ne plus réduire le cadre**. Nouvelles compositions : `withSafeZone(X, { full: true })` dans `Root.tsx` (plein cadre, pas de bord flouté) + **police plus petite** (titres ~48–70 px au lieu de 60–90) et textes/éléments importants entre x≈120 et x≈960. Même si TikTok zoome un peu, ce n'est pas grave. Toujours utiliser `<SfxAudio>` au lieu de `<Audio>`. Vérifier en simulant : `ffmpeg -i out/x.mp4 -vf crop=880:1920:100:0 …`.
- Le lien du serveur est **en commentaire** (pas « lien en bio », pas « dis-le en com »).
- Ne jamais inventer : pas de faux chiffres, faux témoignages ou fausses captures du serveur.
- Infos à ne PAS dire : nombre de membres, « events chaque semaine » (dire « chaque mois »), « embrouilles », « on cherche des bavardes », « tu dis bonjour en arrivant ».
- Le vocal s'appelle juste « Vocal » (pas de nom de salon), **sans badge REC**.
- **Pas de compteurs / indicateurs de suivi** à l'écran : pas de « 1/6 », « carte 2/4 », « manche 1/3 », « kill 1 », « kills : 3 », barres de progression… Le contenu parle de lui-même.
- La vérif vocale = **un message vocal** à envoyer (pas un appel) ; tout est expliqué, on guide, c'est rapide.
- Images d'ambiance : **vraies photos**, pas d'images générées par IA.

## DA
Logo papillon chrome lilas (`promo/public/brand/logo-rgc.png`). Serveur au style girly doux : nacré, perles, nœuds, papillons, sparkles, lettres en cases `R i v a l s`. Féminin mais pas enfantin, pas de rose kitsch avec des cœurs partout.

## Technique
- Projet Remotion dans `promo/` (voir `promo/README.md`). Rendu : `npx remotion render <Composition> out/<nom>.mp4`.
- Bruitages synthétisés : `promo/tools/sfxlib.py`, `make_sfx.py`, `make_sfx_series.py`.
- Clips lourds du Drive : si les dossiers sont partagés « tous les utilisateurs avec le lien », télécharger via `https://drive.usercontent.google.com/download?id=<ID>&export=download&confirm=t` (hosts autorisés dans l'environnement), puis découper/compresser avec ffmpeg (720p, en gardant le son).
- Drive du serveur (connecteur Google Drive) : dossiers par jeu + SERVEUR. Le connecteur ne télécharge pas les fichiers > ~7 Mo (limite réelle, base64) → utiliser les plus petits, sinon trouver une alternative (images de gameplay sur Pinterest, etc.).
- Pinterest est autorisé dans l'environnement : recherche via Playwright (`pin.js`-style, user-agent navigateur), images sur `i.pinimg.com`.
