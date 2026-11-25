---
status: approved
language: en
translation_of: design-brief.md
---

# Street Bearings design brief

English translation of the [approved French brief](design-brief.md). The French labels below are the ones the user sees in the Lens.

Street Bearings is a working title. Marc wants to find his bearings in the street and learn about a monument. Choices marked “default” are suggestions that can be changed.

## The one spatial moment

As you leave the station, a direction marker guides you to the monument. Once in front of it, you choose when to open its card, read its history and close it. The proposed setting runs from Reims station to the Porte de Mars (default). A four-metre scene stands in for the route.

## Why it belongs on glasses

You can keep your eyes on the street to find your way. When you arrive, you can read the monument’s history while its façade remains in view. The glasses connect the information to the place you are looking at.

## Product or overlay

The Lens adds directions to the scene. The station, path and monument are simulated in Preview. The starting label “Parcours simulé” (simulated route) and the card label “Fiche locale” (local information card) make this clear (default).

A marker placed in advance connects the monument to a local card (default). Walking up to it makes the open control available. A future street version would need a source of position data, a way to identify the place and a verified source for its history.

## Where things live

**Direction (default).** At the station, a bright arrow and the word “Monument” point the way. The simulated street is straight and about four metres long. You read the sign facing the direction of travel, a little below eye level.

**Arrival (default).** An 8 cm square “Ouvrir” (open) target sits on a hand-height marker at the foot of the façade. It becomes available within 1.5 m of the monument. The intended reading position is about 1.2 m from the façade.

**Card (default).** From that position, the card measures 26 × 20 cm. Its centre sits 18 cm to the right of the street axis and 8 cm below your eyes. It stays with the monument when you turn your head. The centre of the street remains clear. Light text appears against a contrasting background. A separate “Fermer” (close) control closes the card.

## Hands and input

Marc wants to open the information by spreading his thumb and index finger, then close it by bringing them together.

**Proposed gesture on glasses (default trigger).** With the card closed, aim at “Ouvrir” within range. Deliberately bring the fingers together on the target to arm the gesture, then spread them while continuing to aim at it. The card opens once. With the card open, aim at “Fermer” with your fingers apart, then pinch to close. Leaving the target before completing a gesture cancels the pending command. The close action fires on the pinch. Releasing that pinch is consumed, even if the pointer has moved back over “Ouvrir”. Opening again takes a fresh, deliberate pinch. Resting the hand, returning to rest or holding the fingers in place triggers nothing.

**Mouse equivalent in Interactive Preview (default).** A complete click on “Ouvrir” displays the card. Pressing the mouse button on “Fermer” hides it. Releasing the button leaves the card closed. The two controls occupy distinct positions. Each highlights on hover and accepts clicks only when available. Holding the button or releasing it after an action causes no further transition. Clicks let us test the result of each command. Physical finger movements still need to be tested on glasses. The demo uses the mouse and keyboard (default).

## When things show

**On the way (default).** The arrow is visible and the card is closed. The arrow keeps pointing towards the monument when it goes out of view.

**Within range, card closed (default).** “Ouvrir” takes the place of the arrow. Stopping or hovering over the marker leaves the card closed.

**Within range, card open (default).** The card stays visible while you read, even when the pointer leaves the target. Closing it brings “Ouvrir” back. Leaving the zone puts the card away and brings the arrow back. Approaching again starts with the card closed.

The card contains the three details Marc asked for. This is the proposed local card for the Reims demo (default). The date is approximate.

| Name | Construction period | Short history |
| --- | --- | --- |
| Porte de Mars, Reims | Late second or early third century AD | This monumental gateway dates from the Gallo-Roman city. Under the central arch, a carved calendar shows farm work through the months. |

[City of Reims heritage guide](https://www.reims.fr/fileadmin/reims/MEDIA/08_La_ville_de_Reims/Reims_et_son_patrimoine/doc_patrimoine/LaissezVousConterLaPorteDeMars-web.pdf) and [SNCF, Reims station](https://www.garesetconnexions.sncf/fr/gares-services/reims).

## Done criteria

Run these five checks in Interactive Preview after the build.

1. At the station, read “Parcours simulé” and “Monument”. Follow the arrow towards the marker using the keyboard. On arrival, “Ouvrir” appears and the card stays closed.
2. Stop in front of the marker, hover over it, then click the street beside it. The card stays closed in all three cases.
3. Click “Ouvrir” once. One card appears on the right. From the reading position, you can see “Fiche locale”, the name, the period and both historical sentences while the centre of the street remains in view. Move the pointer away. The text stays visible.
4. Press “Fermer”, hold the button briefly, then release it. The card remains closed after the click and at rest. A fresh click on “Ouvrir” opens it once.
5. With the card open, step back out of the zone. The card disappears and the arrow returns. Approach again. “Ouvrir” is available and the card is closed.

## Out of scope

Live GPS, navigation in traffic, camera recognition and live information are ideas for a later version. The preview uses only the simulated scene and its example card.

## Risks and open questions

Real glasses are needed to see whether deliberate finger movement is distinct enough from rest and whether the card is comfortable to read. The card’s side, size and height, the target sizes, the activation distance and the length of the route can all be adjusted (default). Marc’s approval of the brief comes before the move to CLAD in a new chat.

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
