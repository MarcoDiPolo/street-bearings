# Street Bearings

Walk from a miniature Reims station to the Porte de Mars, then decide when to read the monument’s story. The street and the local history card live in a SPECS Lens built in Lens Studio. Marc wanted to spread his thumb and index finger to open the information and pinch to close it.

The four-metre scene is a model. It uses a fixed landmark and a local history card. Labels and controls are in French. “Parcours simulé” means simulated route, “Ouvrir” means open, and “Fermer” means close.

## Walk through the scene

Open `SPECS-Project.esproj` in Lens Studio 5.23.2 and use Interactive Preview for SPECS. Use the keyboard to walk and the mouse to look and interact. The challenge lists version 5.23.2 as a supported download. [Devpost’s setup and preview instructions](https://learn-specs.devpost.com/resources)

1. Walk from the station towards the arrow marked **Monument**. Stop at the open control and try hovering over it.
2. Aim at **Ouvrir**, press and release. Read the date and look at the arch beside the card. Move the pointer away to keep reading.
3. Aim at **Fermer** and press the mouse button. Hold it briefly, then release. To read again, return to **Ouvrir** and make a fresh click.
4. Open the card and walk away. Approach once more to check that the card starts closed.

Five design-brief checks passed using simulated input in Lens Studio. An additional right-hand reach simulation failed to aim at the open control. Hardware comfort and hand targeting still need a trial with glasses. The normal scene includes its runtime packages. The optional LEAF scenarios and their scene are in a separate test folder. [Preview results and screenshots](devpost/preview-checks.md) · [Replay the scenarios](tests/leaf/README.md)

## The place

The Porte de Mars dates to the late second or early third century AD. Under its central arch, a carved calendar depicts farm work through the months. The scene compresses the journey into a few metres and uses a stylised arch. [City of Reims heritage guide](https://www.reims.fr/fileadmin/reims/MEDIA/08_La_ville_de_Reims/Reims_et_son_patrimoine/doc_patrimoine/LaissezVousConterLaPorteDeMars-web.pdf) · [Reims station, SNCF](https://www.garesetconnexions.sncf/fr/gares-services/reims)

## Design and credits

Marc chose the street navigation, monument information and two-finger gesture. The approved brief identifies the proposed design defaults and gives five acceptance checks. [French original](devpost/design-brief.md) · [English translation](devpost/design-brief.en.md)

The original Street Bearings contributions are available under the [MIT License](LICENSE). The SPECS template, packaged frameworks and Devpost planning template retain their own notices. [Third-party credits](THIRD_PARTY.md)
