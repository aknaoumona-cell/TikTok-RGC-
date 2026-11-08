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
- **Pas d'emojis** dans les vidéos : utiliser des **memes** (chats, Among Us, réactions girly) à la place.
- **Logo RGC obligatoire** + filigrane @rivalsgirlsclub qui bouge (anti-repost).
- **Chaque TikTok doit avoir son propre look** (ne pas refaire la même DA à chaque fois).
- Persos/jeux : utiliser des **captures in-game / rendus officiels du jeu**, jamais des fan arts (pas l'autorisation des artistes).
- **Varier les clips/images** d'une vidéo à l'autre (ne pas réutiliser toujours les mêmes, ex. la photo de la soirée film).
- Le lien du serveur est **en commentaire** (pas « lien en bio », pas « dis-le en com »).
- Ne jamais inventer : pas de faux chiffres, faux témoignages ou fausses captures du serveur.
- Infos à ne PAS dire : nombre de membres, « events chaque semaine » (dire « chaque mois »), « embrouilles », « on cherche des bavardes », « tu dis bonjour en arrivant ».
- Le vocal s'appelle juste « Vocal » avec un badge REC (pas de nom de salon).

## DA
Logo papillon chrome lilas (`promo/public/brand/logo-rgc.png`). Serveur au style girly doux : nacré, perles, nœuds, papillons, sparkles, lettres en cases `R i v a l s`. Féminin mais pas enfantin, pas de rose kitsch avec des cœurs partout.

## Technique
- Projet Remotion dans `promo/` (voir `promo/README.md`). Rendu : `npx remotion render <Composition> out/<nom>.mp4`.
- Bruitages synthétisés : `promo/tools/sfxlib.py`, `make_sfx.py`, `make_sfx_series.py`.
- Drive du serveur (connecteur Google Drive) : dossiers par jeu + SERVEUR. Le connecteur ne télécharge pas les fichiers > ~7 Mo (limite réelle, base64) → utiliser les plus petits, sinon trouver une alternative (images de gameplay sur Pinterest, etc.).
- Pinterest est autorisé dans l'environnement : recherche via Playwright (`pin.js`-style, user-agent navigateur), images sur `i.pinimg.com`.
