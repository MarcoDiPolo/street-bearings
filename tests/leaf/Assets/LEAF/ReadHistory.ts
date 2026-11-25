import {Scenario} from "Leaf.lspkg/Scenarios/scenario/Scenario"
import {sleep} from "Leaf.lspkg/Utils/common/Utils"
import WorldCameraFinderProvider from "SpectaclesInteractionKit.lspkg/Providers/CameraProvider/WorldCameraFinderProvider"
import {expect} from "Leaf.lspkg/Utils/common/Expect"
import {caption, displayed, logScreenPosition, object, VisitorPointer, withVisitor} from "./BearingsFixture"

@component
export class ReadHistory extends Scenario {
    async run(): Promise<void> {
        await withVisitor(async walkTo => {
            await walkTo(-280)
            const pointer = new VisitorPointer()
            await pointer.open()
            await pointer.aim()
            displayed("HistoryCard", true)
            displayed("OpenTarget", false)
            caption("CardSource", "Fiche locale")
            caption("MonumentName", "Porte de Mars, Reims")
            caption("MonumentPeriod", "Fin du IIᵉ ou début du IIIᵉ siècle")
            caption("HistoricalSummary", "Cette porte monumentale date de la ville gallo-romaine. Sous la voûte centrale, un calendrier sculpté représente les travaux agricoles au fil des mois.")
            caption("CloseLabel", "Fermer")
            const camera = WorldCameraFinderProvider.getInstance().getComponent()
            const card = object("HistoryCard").getTransform()
            const center = card.getWorldPosition()
            const left = camera.worldSpaceToScreenSpace(center.add(new vec3(-13, 0, 0)))
            const lowerRight = camera.worldSpaceToScreenSpace(center.add(new vec3(13, -10, 0)))
            const upperLeft = camera.worldSpaceToScreenSpace(center.add(new vec3(-13, 10, 0)))
            expect(left.x > 0.5).toBe(true)
            expect(upperLeft.y >= 0 && lowerRight.y <= 1 && lowerRight.x <= 1).toBe(true)
            print("REIMS_CAPTURE_OPEN")
            logScreenPosition("CloseTarget")
            await sleep(10000)
            displayed("HistoryCard", true)
        })
    }
}
