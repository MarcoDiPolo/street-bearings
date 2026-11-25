import {Scenario} from "Leaf.lspkg/Scenarios/scenario/Scenario"
import {IKBodyInteractor} from "Leaf.lspkg/Interactors/interactor/ik/IKBodyInteractor"
import {findInteractablesByName} from "Leaf.lspkg/Interactors/InteractableUtils"
import {expect} from "Leaf.lspkg/Utils/common/Expect"
import {sleep} from "Leaf.lspkg/Utils/common/Utils"
import {DiagnosticRecorder} from "Leaf.lspkg/Diagnostic/DiagnosticRecorder"
import {displayed, withVisitor} from "./BearingsFixture"

@component
export class ReachOpening extends Scenario {
    async run(): Promise<void> {
        await withVisitor(async walkTo => {
            await walkTo(-280)
            const targets = findInteractablesByName("OpenTarget", undefined, true)
            expect(targets.length).toBe(1)
            // Exercise LEAF's arm solver locally, without loading an avatar.
            const visitor = new IKBodyInteractor()
            await visitor.ready
            const target = targets[0]
            const hand = visitor.right
            const phase = (name: string) => (event: {interactor: {currentTrigger: number}}) =>
                print("REIMS_IK " + name + " trigger=" + event.interactor.currentTrigger)
            target.onHoverEnter.add(phase("hoverEnter"))
            target.onHoverExit.add(phase("hoverExit"))
            target.onTriggerStart.add(phase("squeeze"))
            target.onTriggerEnd.add(phase("release"))
            target.onTriggerEndOutside.add(phase("outside"))
            print("REIMS_IK indirect=" + hand.isIndirect(target))
            expect(hand.isIndirect(target)).toBe(true)
            await visitor.trigger(target)
            print("REIMS_IK diagnostics=" + DiagnosticRecorder.getInstance().getAll()
                .map(entry => entry.diagnostic.message).join(", "))
            await sleep(200)
            displayed("HistoryCard", true)
        })
    }
}
