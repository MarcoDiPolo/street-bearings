import {Button} from "SpectaclesUIKit.lspkg/Scripts/Components/Button/Button"
import {FlexLayout} from "SpectaclesUIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexLayout"
import {FlexItem} from "SpectaclesUIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexItem"
import {FlexAlign, FlexDirection, FlexJustify} from "SpectaclesUIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexTypes"
import {RoundedRectangle} from "SpectaclesUIKit.lspkg/Scripts/Visuals/RoundedRectangle/RoundedRectangle"
import {Interactor, InteractorTriggerType} from "SpectaclesInteractionKit.lspkg/Core/Interactor/Interactor"

type RouteState = "travel" | "near" | "open"

const ivory = new vec4(1, 0.97, 0.88, 1)
const aqua = new vec4(0.60, 0.95, 0.98, 1)
const amber = new vec4(1, 0.79, 0.43, 1)
const blue = new vec4(0.09, 0.20, 0.30, 1)

function child(parent: SceneObject, name: string, x: number, y: number, z: number): SceneObject {
    const node = global.scene.createSceneObject(name)
    node.setParent(parent)
    node.layer = parent.layer
    node.getTransform().setLocalPosition(new vec3(x, y, z))
    return node
}

function plate(node: SceneObject, width: number, height: number): void {
    const shape = node.createComponent(RoundedRectangle.getTypeName()) as RoundedRectangle
    shape.size = new vec2(width, height)
    shape.cornerRadius = 0.8
    shape.gradient = false
    shape.backgroundColor = blue
    shape.border = true
    shape.borderColor = aqua
    shape.borderSize = 0.09
    shape.initialize()
}

function label(parent: SceneObject, name: string, value: string, x: number, y: number,
    width: number, height: number, size: number, color: vec4, centered = false): SceneObject {
    const node = child(parent, name, x, y, 0.45)
    const text = node.createComponent("Component.Text")
    text.text = value
    text.size = size
    text.sizeToFit = false
    text.layoutRect = Rect.create(-width / 2, width / 2, -height / 2, height / 2)
    text.horizontalAlignment = centered ? HorizontalAlignment.Center : HorizontalAlignment.Left
    text.verticalAlignment = VerticalAlignment.Center
    text.horizontalOverflow = HorizontalOverflow.Wrap
    text.verticalOverflow = VerticalOverflow.Shrink
    text.textFill.color = color
    text.setRenderOrder(5)
    return node
}

function column(node: SceneObject, width: number, height: number, topInset: number): FlexLayout {
    const layout = node.createComponent(FlexLayout.getTypeName()) as FlexLayout
    layout.direction = FlexDirection.Column
    layout.justifyContent = FlexJustify.Start
    layout.alignItems = FlexAlign.Stretch
    layout.width = width
    layout.height = height
    layout.paddingTop = topInset
    layout.rowGap = 0.12
    return layout
}

function row(layout: FlexLayout, name: string, value: string, height: number, size: number, color: vec4): void {
    const node = label(layout.getSceneObject(), name, value, 0, 0, layout.width, height, size, color)
    const item = node.createComponent(FlexItem.getTypeName()) as FlexItem
    item.overrideWidth = layout.width
    item.overrideHeight = height
    item.flexShrink = 0
}

function makeButton(node: SceneObject, width: number, height: number, name: string, caption: string): Button {
    const button = node.createComponent(Button.getTypeName()) as Button
    button.setVariant({theme: "SnapOS3", shape: "Rectangle", style: "Secondary"})
    button.size = new vec3(width, height, 0.4)
    button.initialize()
    label(node, name, caption, 0, 0, width - 0.6, height - 0.3, 75, ivory, true)
    return button
}

export class StreetBearingsUI {
    private readonly station: SceneObject
    private readonly opener: SceneObject
    private readonly card: SceneObject
    private state: RouteState = "travel"
    private armed: Interactor | null = null

    constructor(root: SceneObject, guidanceAnchor: SceneObject, onOpen: () => void, onClose: () => void) {
        this.station = child(root, "StationSign", -2, 17, -120)
        plate(this.station, 25, 12)
        const stationLayout = column(this.station, 22, 12, 2.1)
        row(stationLayout, "StationTitle", "Gare de Reims", 4.4, 110, ivory)
        row(stationLayout, "SimulationLabel", "Parcours simulé", 3.2, 83, aqua)
        stationLayout.refreshChildren()

        const direction = child(guidanceAnchor, "GuidanceLabelPlate", 0, -10, 0)
        plate(direction, 19, 4.8)
        label(direction, "MonumentLabel", "Monument", 0, 0, 17, 4.2, 93, ivory, true)

        this.opener = child(root, "OpenTarget", -8, -15, -377)
        const open = makeButton(this.opener, 8, 8, "OpenLabel", "Ouvrir").interactable
        this.card = child(root, "HistoryCard", 18, -8, -390)
        plate(this.card, 26, 20)
        const cardLayout = column(this.card, 23.6, 20, 0.98)
        row(cardLayout, "CardSource", "Fiche locale", 1.85, 64, aqua)
        row(cardLayout, "MonumentName", "Porte de Mars, Reims", 2.8, 100, ivory)
        row(cardLayout, "MonumentPeriod", "Fin du IIᵉ ou début du IIIᵉ siècle", 2.1, 63, amber)
        row(cardLayout, "HistoricalSummary",
            "Cette porte monumentale date de la ville gallo-romaine. Sous la voûte centrale, un calendrier sculpté représente les travaux agricoles au fil des mois.",
            7, 61, ivory)
        cardLayout.refreshChildren()

        const closer = child(this.card, "CloseTarget", 6, -7, 0.75)
        const close = makeButton(closer, 9, 4, "CloseLabel", "Fermer").interactable

        open.onTriggerStart.add(event => {
            if (this.state === "near" && (event.interactor.currentTrigger & InteractorTriggerType.Pinch)) {
                this.armed = event.interactor
            }
        })
        const cancel = (event: {interactor: Interactor}) => {
            if (this.armed === event.interactor) this.armed = null
        }
        open.onHoverExit.add(cancel)
        open.onTriggerCanceled.add(cancel)
        open.onTriggerEndOutside.add(cancel)
        open.onTriggerEnd.add(event => {
            const confirmed = this.state === "near" && this.armed === event.interactor &&
                event.endedInsideInteractable !== false && event.target === open
            cancel(event)
            if (confirmed) onOpen()
        })
        close.onTriggerStart.add(event => {
            if (this.state === "open" && (event.interactor.currentTrigger & InteractorTriggerType.Pinch)) {
                this.armed = null
                onClose()
            }
        })
        this.setState("travel")
    }

    setState(state: RouteState): void {
        this.state = state
        this.armed = null
        this.opener.enabled = state === "near"
        this.card.enabled = state === "open"
        this.station.enabled = state === "travel"
    }
}
