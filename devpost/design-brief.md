---
status: approved
---

# Design brief: Street Bearings

Nom de travail. Marc veut pouvoir se repérer dans la rue et s’informer simplement sur un monument. Les choix marqués (default) sont des propositions modifiables.

## The one spatial moment

À la sortie de la gare, vous suivez une indication jusqu’au monument. Une fois devant lui, vous choisissez d’ouvrir sa fiche, de lire son histoire, puis de la refermer. Le trajet de travail proposé relie la gare de Reims à la porte de Mars (default). Le décor de quatre mètres schématise le parcours.

## Why it belongs on glasses

Vous gardez les yeux sur la rue pour vous orienter. Une fois arrivé, vous pouvez lire l’histoire du monument tout en gardant sa façade en vue. C’est ce lien entre le lieu regardé et l’information qui donne un intérêt aux lunettes.

## Product or overlay

La Lens ajoute des indications au décor. Dans l’aperçu, la gare, le trajet et le monument sont simulés. Le libellé « Parcours simulé » au départ et la mention « Fiche locale » sur la fiche rendent la simulation explicite (default).

Un repère placé à l’avance associe le monument à une fiche locale (default). S’en approcher rend la commande d’ouverture disponible. Une future version en rue aurait besoin d’une source de position, d’un moyen d’identifier le lieu et d’une source historique vérifiée.

## Where things live

- **Direction (default).** Depuis la gare, une flèche claire, accompagnée du mot « Monument », indique le sens de la marche. La rue simulée est droite et mesure environ 4 m. L’indication se lit dans le sens du trajet, un peu sous la ligne du regard.
- **Arrivée (default).** Une cible « Ouvrir » de 8 cm de côté se trouve au pied de la façade, sur un repère à hauteur de main. Elle devient disponible à moins de 1,5 m du monument. Le point de lecture prévu se situe à environ 1,2 m de la façade.
- **Fiche (default).** Vue depuis ce point, la fiche mesure 26 × 20 cm. Son centre se situe à 18 cm à droite de l’axe de la rue et à 8 cm sous les yeux. Elle reste liée au monument quand vous tournez la tête. Le centre de la rue reste dégagé. Le texte est clair sur un fond contrasté, avec une commande « Fermer » distincte du repère d’ouverture.

## Hands and input

Marc souhaite ouvrir les informations en écartant le pouce et l’index, puis les fermer en les rapprochant.

**Geste envisagé sur lunettes (default pour le déclenchement).** Fiche fermée, on vise « Ouvrir » à portée, on rapproche volontairement les doigts sur cette cible pour armer le geste, puis on les écarte en gardant la cible visée. La fiche s’ouvre une fois. Fiche ouverte, il faut viser « Fermer » avec les doigts écartés, puis les rapprocher pour fermer. Quitter la cible avant la fin du geste annule la commande en attente. La fermeture se déclenche dès le pincement. Son relâchement est consommé, même si le pointeur se trouve alors sur « Ouvrir ». Un nouveau pincement volontaire est nécessaire pour réarmer l’ouverture. Une main immobile, le retour au repos ou le maintien des doigts dans la même position ne commande rien.

**Équivalent souris dans Interactive Preview (default).** Un clic complet sur « Ouvrir » affiche la fiche. Sur « Fermer », l’enfoncement suivant la masque. Son relâchement ne rouvre pas la fiche. Les deux commandes occupent des emplacements distincts, se mettent en évidence au survol et acceptent chacune un clic seulement dans l’état où elle est disponible. Maintenir le bouton ou le relâcher après l’action ne déclenche aucune autre transition. Les clics permettent de tester le résultat de chaque commande. Le mouvement physique des deux doigts restera à essayer sur des lunettes. La démo se joue à la souris et au clavier (default).

## When things show

- **En chemin (default).** La flèche est visible et la fiche est fermée. Si le monument sort du champ, la flèche continue d’en indiquer la direction.
- **À portée, fiche fermée (default).** La flèche cède la place à « Ouvrir ». S’arrêter ou survoler le repère laisse la fiche fermée.
- **À portée, fiche ouverte (default).** La fiche reste visible pendant la lecture, même si le pointeur quitte la cible. Fermer fait revenir « Ouvrir ». Si vous quittez la zone, la fiche se range et la flèche revient. Une nouvelle approche recommence fiche fermée.

La fiche contient les trois renseignements demandés par Marc. Fiche locale proposée pour la démo de Reims (default). La date est approximative.

| Nom | Époque de construction | Courte synthèse historique |
| --- | --- | --- |
| Porte de Mars, Reims | Fin du IIᵉ ou début du IIIᵉ siècle | Cette porte monumentale date de la ville gallo-romaine. Sous la voûte centrale, un calendrier sculpté représente les travaux agricoles au fil des mois. |

[Notice de la Ville de Reims](https://www.reims.fr/fileadmin/reims/MEDIA/08_La_ville_de_Reims/Reims_et_son_patrimoine/doc_patrimoine/LaissezVousConterLaPorteDeMars-web.pdf) et [gare de Reims, SNCF](https://www.garesetconnexions.sncf/fr/gares-services/reims).

## Done criteria

Ces cinq vérifications se font dans Interactive Preview après la construction.

1. Depuis la gare, lire « Parcours simulé » et « Monument », puis suivre la flèche au clavier jusqu’au repère. À l’arrivée, « Ouvrir » apparaît et la fiche reste fermée.
2. S’arrêter devant le repère, le survoler, puis cliquer dans la rue à côté. La fiche reste fermée dans les trois cas.
3. Cliquer une fois sur « Ouvrir ». Une seule fiche apparaît à droite. Depuis le point de lecture, on peut lire « Fiche locale », le nom, l’époque et les deux phrases historiques tout en voyant le centre de la rue. Éloigner le pointeur laisse le texte visible.
4. Cliquer sur « Fermer » en maintenant brièvement le bouton avant de le relâcher. À la fin du clic, la fiche est fermée et le reste au repos. Un nouveau clic sur « Ouvrir » la rouvre une seule fois.
5. Avec la fiche ouverte, reculer hors de la zone. La fiche se range et la flèche revient. Revenir au monument rend « Ouvrir » disponible, fiche fermée.

## Out of scope

Le GPS réel, le guidage dans la circulation, la reconnaissance par caméra et les informations en direct relèvent d’une éventuelle version ultérieure. L’aperçu utilise exclusivement le décor et la fiche d’exemple.

## Risks and open questions

Sur de vraies lunettes, il restera à vérifier si l’écartement et le rapprochement volontaires se distinguent du repos, ainsi que le confort de lecture en situation. Le côté de la fiche, ses dimensions, sa hauteur, la taille des cibles, la distance d’activation et la longueur du trajet sont des réglages réversibles (default). La validation du cahier par Marc précède le passage à CLAD dans un nouveau fil.

## Build notes for CLAD
- Build for SPECS so it runs and can be demonstrated in Lens Studio's preview. No SPECS device is available.
- Use Spectacles Interaction Kit (SIK) and UI Kit for all interactions, so they work with the mouse in Interactive Preview and with LEAF.
- Build any stand-in exactly as described above, and keep it obvious in the scene.
- Use real-world scale in centimeters. Keep content inside the user's view during the main task.
- The display is additive: black renders as transparent. Don't rely on black or very dark content to be seen; keep text light and readable from where the user stands.
- Get the basic flow working first, then add detail.
- Write LEAF scenarios for each done criterion, run them in preview, and report which pass. Say which criteria have no test.
- Don't record, identify, or follow people.

## After the build: judge it
This part is for you, after CLAD finishes.

1. **Does it work?** Ask your agent which LEAF tests passed and which done criteria have no test.
2. **Walk around it.** Open the preview in Interactive Preview. Use WASD to move, Q and E to go down and up, and right-drag (or hold Shift) to look around. Clicking acts as a pinch. Stand where a user would and look at the task.
3. **Ask the three questions.**
   - Does it use what I'm looking at?
   - Does it put something in my space, where it belongs?
   - Does it free my hands or let me keep my eyes up?
   - Would it be just as good on a phone? If so, what would make it need the glasses?
4. **Check comfort.**
   - Everything I need is in view while I do the task. Nothing sits at the edges, behind me, or stuck to my face.
   - Every control is within reach of someone standing there.
   - Text reads easily from where I stand. No dark UI disappearing.
   - Things show when needed and get out of the way.
5. **Label what you know.** Write "logic proven" next to anything the tests and preview show working, and "feel unproven" next to anything only real glasses could tell you (comfort over time, real hand tracking, real recognition).
6. **Fix with design notes, not code.** Tell your agent what to change in design terms, for example: "Move the step card 15 cm lower and next to the pan. Make the Next button twice as big. Re-run the tests." If a fix takes under a minute, like nudging a panel, do it yourself in the scene.
7. **Submit.** Record a video under 3 minutes of your Lens in the preview, public on YouTube. Make your repo public with your Lens Studio project and this `devpost/` folder. Details are on the hackathon site: https://learn-specs.devpost.com/resources
