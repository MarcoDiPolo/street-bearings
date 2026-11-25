import {Scenario} from "Leaf.lspkg/Scenarios/scenario/Scenario"
import {sleep} from "Leaf.lspkg/Utils/common/Utils"
import {closedAtMonument, VisitorPointer, withVisitor} from "./BearingsFixture"

@component
export class NoAccidentalOpening extends Scenario {
    async run(): Promise<void> {
        await withVisitor(async walkTo => {
            await walkTo(-280)
            const pointer = new VisitorPointer()
            await sleep(600)
            closedAtMonument()
            await pointer.aim("OpenTarget")
            closedAtMonument()
            await pointer.aim()
            await pointer.squeeze()
            await pointer.release()
            closedAtMonument()
            await pointer.aim("OpenTarget")
            await pointer.squeeze()
            await pointer.aim()
            await pointer.release()
            closedAtMonument()
        })
    }
}
