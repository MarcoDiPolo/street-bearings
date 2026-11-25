# Sources and third-party notices

The [project MIT license](LICENSE) covers the original Street Bearings scripts, scene additions and documentation. The following materials retain their upstream licenses and attributions.

## SPECS Base Template and frameworks

The Lens starts from the official SPECS Base Template. It uses Spectacles Interaction Kit 2.0.0 and Spectacles UI Kit 2.0.0. The 418 and 508 files in the two packaged kits were compared with the corresponding official sample archives. The runtime code and media match. Lens Studio 5.23 changed its version metadata and the way it serializes regular font styles. The kit archives in this project preserve those editor changes. The original sample's MIT and third-party notices are included. [SPECS Base Template, pinned upstream version](https://github.com/specs-devs/samples/tree/110a145b6572a17fa94d86f18b76047278014729/Specs%20Base%20Template) · [Notices](licenses/specs-samples-5.22.md)

The lighting environment in `Assets/Render/Echopark.hdr` and the camera texture and render target come from the SPECS template. The HDR matches the upstream SHA-256 checksum. The render target and camera texture settings match the version linked here. [Official render assets](https://github.com/specs-devs/samples/tree/9209a08a783ddad5d0f4c6dc0be547bd869d3b88/Base%20Template/Assets/Render) · [Notices](licenses/specs-samples.md)

## Vertex colour material

The material and graph in `Assets/SimpleVertexBaseColor.lspkg/` come from the official CLAD mesh-building resources. Lens Studio unpacked and reserialized the material and shader on import. Specs Inc. publishes this resource under Apache License 2.0. [Pinned CLAD resource](https://github.com/lens-studio-devs/ls-extensions/blob/704a9a18def84e566cf7c2938c84e3c71f09ba21/plugins/ls-clad/skills/mesh-builder-scripting/resources/SimpleVertexBaseColor.lspkg) · [License and notices](licenses/clad-extensions.txt)

## Design brief and historical sources

The structure and the closing guidance in the two design briefs come from Devpost's `plan-lens` template, published under the MIT License. Marc's interview supplied the idea of navigating from a station, reading about a monument and opening or closing its information with a finger gesture. [Devpost skill pack](https://github.com/challengepost/learn-specs/tree/5d8bc0800346d38e468c29b15afcb7ca92280005) · [License](licenses/devpost-learn.txt)

The local history card draws on the City of Reims heritage guide. The station's public name and address come from SNCF Gares & Connexions. The monument and route geometry are original interpretations. [City of Reims](https://www.reims.fr/fileadmin/reims/MEDIA/08_La_ville_de_Reims/Reims_et_son_patrimoine/doc_patrimoine/LaissezVousConterLaPorteDeMars-web.pdf) · [SNCF Gares & Connexions](https://www.garesetconnexions.sncf/fr/gares-services/reims)
