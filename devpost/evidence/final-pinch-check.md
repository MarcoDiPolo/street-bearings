# Final pinch and regression checks

On 25 November 2026, all six scenarios passed in Lens Studio 5.23.2.26081320 with LEAF 2.0.2 and Spectacles Interaction Kit 2.0.0. Runtime buttons use direct and indirect targeting. A fingertip passing through a button can no longer preempt a pinch with a poke.

## Arm test in Interactive Preview

The original long-range right-arm test could not aim at the opening control. A second test moved the camera to z = -345 cm and used the left hand. The target was within reach. With the generic button settings, the synthetic hand delivered a poke (trigger 2) and the Lens correctly kept the card closed. That run failed its opening assertion at 08:45:40 local time.

After the buttons were configured for pinch targeting, the same short-range test reached OpenTarget. At 08:48:08.060 the target reported hover, at 08:48:08.151 pinch (trigger 1) and at 08:48:08.392 release (trigger 0). The history card became visible and LEAF passed the assertion. No physical glasses or hands were used.

| Final scenario | Lens Studio completion, local time | Result |
| --- | --- | --- |
| reims-ik-reach | 08:48:09.143 | Passed |
| reims-departure | 08:48:52.251 | Passed |
| reims-guards | 08:49:22.579 | Passed |
| reims-history | 08:50:02.534 | Passed |
| reims-close | 08:50:36.596 | Passed |
| reims-return | 08:51:02.291 | Passed |

## Independent pointer check

After refreshing the ordinary preview, the native mouse opened the card on release, closed it on the next press, and left it closed after release. Lens Studio supplied the pointer events through InjectPreviewGesture. We visually checked four native 1392 × 1843 captures. The arrival image and open card each matched their earlier reference pixel for pixel. The two later closed images each differed from the original arrival view at one pixel out of 2,565,456. The route and card shown in the demonstration still represent the final project.
