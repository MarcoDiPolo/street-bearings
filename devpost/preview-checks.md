# Preview test results

On 25 November 2026, the five acceptance scenarios from the approved design brief passed in Lens Studio 5.23.2 on Windows. The scene used the SPECS preview, Spectacles Interaction Kit 2.0.0, Spectacles UI Kit 2.0.0 and LEAF 2.0.2.

| LEAF scenario | Observed in Preview |
| --- | --- |
| `reims-departure` | The starting sign and arrow were visible. At 155 cm the arrow still showed. At 120 cm the open control appeared and the card stayed closed. |
| `reims-guards` | Standing still, hovering, clicking away and releasing a gesture after moving away all left the card closed. |
| `reims-history` | One deliberate open gesture revealed the card. The test verified the French title, period, history text and close label. The card lay to the right in the simulated camera view and remained visible after the pointer moved. |
| `reims-close` | Pressing close hid the card. Holding that press and releasing it over the open target left the card closed. A fresh open gesture showed it again. |
| `reims-return` | Walking out of range put the open card away and restored the arrow. Coming back restored the open control with the card closed. |

LEAF moved the preview camera in steps and sent synthetic pinch, hold, release and target-loss events through the interaction kit. The run used LEAF editor plugin 5.23.0. It did not send keyboard events. The captures show the station sign and direction arrow, the open control at the arch, the history card on the right, and the open control again after closing the card. [Machine-readable run results](evidence/leaf-results.json) · [Station](evidence/station.png) · [Arrival](evidence/arrival.png) · [Card open](evidence/card-open.png) · [Card closed](evidence/card-closed.png)

An additional simulated right-hand reach test, `reims-ik-reach`, failed. Its pointing ray could not converge on the open control. The five checks above establish the scene logic. Physical hand tracking and comfortable reach remain unverified. The station and arch have fixed positions in the model. Real street navigation and use in daylight have not been tested on glasses.
