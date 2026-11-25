import {Scenario} from "Leaf.lspkg/Scenarios/scenario/Scenario"
import {sleep} from "Leaf.lspkg/Utils/common/Utils"
import {closedAtMonument, displayed, VisitorPointer, withVisitor} from "./BearingsFixture"

@component
export class CloseAndReopen extends Scenario {
    async run(): Promise<void> {
        await withVisitor(async walkTo => {
            await walkTo(-280)
            const pointer = new VisitorPointer()
            await pointer.open()
            await pointer.aim("CloseTarget")
            await pointer.squeeze()
            closedAtMonument()
            await sleep(450)
            closedAtMonument()
            await pointer.aim("OpenTarget")
            await pointer.release()
            await sleep(350)
            closedAtMonument()
            print("REIMS_CAPTURE_CLOSED")
            await sleep(10000)
            await pointer.open()
            displayed("HistoryCard", true)
            displayed("OpenTarget", false)
        })
    }
}
