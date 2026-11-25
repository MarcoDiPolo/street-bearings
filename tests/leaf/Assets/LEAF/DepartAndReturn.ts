import {Scenario} from "Leaf.lspkg/Scenarios/scenario/Scenario"
import {caption, closedAtMonument, displayed, VisitorPointer, withVisitor} from "./BearingsFixture"

@component
export class DepartAndReturn extends Scenario {
    async run(): Promise<void> {
        await withVisitor(async walkTo => {
            await walkTo(-280)
            const pointer = new VisitorPointer()
            await pointer.open()
            await walkTo(-235)
            displayed("HistoryCard", false)
            displayed("OpenTarget", false)
            displayed("DirectionArrow", true)
            caption("MonumentLabel", "Monument")
            await walkTo(-280)
            closedAtMonument()
        })
    }
}
