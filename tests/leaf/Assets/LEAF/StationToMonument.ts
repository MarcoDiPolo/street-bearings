import {Scenario} from "Leaf.lspkg/Scenarios/scenario/Scenario"
import {caption, closedAtMonument, displayed, logScreenPosition, withVisitor} from "./BearingsFixture"

@component
export class StationToMonument extends Scenario {
    async run(): Promise<void> {
        await withVisitor(async walkTo => {
            caption("SimulationLabel", "Parcours simulé")
            caption("MonumentLabel", "Monument")
            displayed("DirectionArrow", true)
            displayed("OpenTarget", false)
            displayed("HistoryCard", false)
            await walkTo(-245)
            displayed("DirectionArrow", true)
            displayed("OpenTarget", false)
            await walkTo(-280)
            closedAtMonument()
            caption("OpenLabel", "Ouvrir")
            logScreenPosition("OpenTarget")
        })
    }
}
