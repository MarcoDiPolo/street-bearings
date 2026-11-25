# Interactive Preview pointer check

Lens Studio 5.23.2.26081320, 25 November 2026. The real preview ran the scene using Spectacles Interaction Kit 2.0.0 and its MouseInteractor. No glasses were paired. Lens Studio's InjectPreviewGesture tool supplied native pointer down and up through the engine, separately from LEAF. The opening check used a camera position of (0, 0, -280) cm in the simulated street.

At 08:43:12.302 local time, the opener received trigger start from the mouse (input type 32, Select mask 3). The history card appeared after the release at 08:43:14.040. The opener was armed by that same interactor, the release landed inside and the event target matched the opener. At 08:43:36.397, a new press on Fermer closed the card. The release at 08:43:37.606 left it closed.

The continuous native preview capture recorded 68 frames over 70 seconds. The first open frame was sampled at 14.83 seconds and the first closed frame after it at 37.22 seconds. Later frames retained the closed state. These are sample times from the capture. Among the pointer settings, the test first placed the cursor over each target, then held and released the left button. A real hand or a live street was not part of this check.
