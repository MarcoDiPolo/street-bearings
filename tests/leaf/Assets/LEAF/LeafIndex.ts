import {scenariosIndex} from "Leaf.lspkg/Scenarios/decorator/ScenarioIndexDecorator"
import {ScenarioMetadata} from "Leaf.lspkg/Scenarios/scenario/ScenarioMetadata"
import {StationToMonument} from "./StationToMonument"
import {NoAccidentalOpening} from "./NoAccidentalOpening"
import {ReadHistory} from "./ReadHistory"
import {CloseAndReopen} from "./CloseAndReopen"
import {DepartAndReturn} from "./DepartAndReturn"
import {ReachOpening} from "./ReachOpening"

@component
export class LeafIndex extends BaseScriptComponent {
    @scenariosIndex
    static scenariosIndex: ScenarioMetadata[] = [
        {id: "reims-departure", typename: StationToMonument.getTypeName()},
        {id: "reims-guards", typename: NoAccidentalOpening.getTypeName()},
        {id: "reims-history", typename: ReadHistory.getTypeName()},
        {id: "reims-close", typename: CloseAndReopen.getTypeName()},
        {id: "reims-return", typename: DepartAndReturn.getTypeName()},
        {id: "reims-ik-reach", typename: ReachOpening.getTypeName()},
    ]
}
