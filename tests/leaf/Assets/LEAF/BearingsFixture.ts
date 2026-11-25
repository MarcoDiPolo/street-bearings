import {DefaultLeafInteractor} from "Leaf.lspkg/Interactors/interactor/DefaultLeafInteractor"
import {findInteractablesByName} from "Leaf.lspkg/Interactors/InteractableUtils"
import {findSceneObjectsByName, nextFrame, sleep} from "Leaf.lspkg/Utils/common/Utils"
import {expect} from "Leaf.lspkg/Utils/common/Expect"
import {InteractorTriggerType} from "SpectaclesInteractionKit.lspkg/Core/Interactor/Interactor"
import WorldCameraFinderProvider from "SpectaclesInteractionKit.lspkg/Providers/CameraProvider/WorldCameraFinderProvider"

export function object(name: string): SceneObject {
    const matches = findSceneObjectsByName(name)
    expect(matches.length).toBe(1)
    return matches[0]
}

export function displayed(name: string, visible: boolean): void {
    expect(object(name).isEnabledInHierarchy).toBe(visible)
}

export function logScreenPosition(name: string): void {
    const camera = WorldCameraFinderProvider.getInstance().getComponent()
    const point = camera.worldSpaceToScreenSpace(object(name).getTransform().getWorldPosition())
    print("REIMS_SCREEN " + JSON.stringify({name, x: point.x, y: point.y}))
}

export function caption(name: string, expected: string): void {
    displayed(name, true)
    const text = object(name).getComponent("Component.Text")
    expect(text.isEnabledInHierarchy).toBe(true)
    expect(text.text.replace(/\s+/g, " ").trim()).toBe(expected)
}

export function closedAtMonument(): void {
    displayed("OpenTarget", true)
    displayed("HistoryCard", false)
    displayed("DirectionArrow", false)
}

export class VisitorPointer extends DefaultLeafInteractor {
    async aim(name?: string): Promise<void> {
        if (name !== undefined) {
            const targets = findInteractablesByName(name, undefined, true)
            expect(targets.length).toBe(1)
            await this.setTarget(targets[0])
        } else {
            this.overrideInteractable = undefined
        }
        await sleep(150)
    }

    async squeeze(): Promise<void> {
        this.setTriggerType(InteractorTriggerType.Pinch)
        await sleep(200)
    }

    async release(): Promise<void> {
        this.setTriggerType(InteractorTriggerType.None)
        await sleep(200)
    }

    async open(): Promise<void> {
        await this.aim("OpenTarget")
        await this.squeeze()
        displayed("HistoryCard", false)
        await this.release()
        displayed("HistoryCard", true)
    }
}

/** Drive the same camera transform read by the route's proximity check.
 * The scenario supplies successive head positions, akin to a walking visitor.
 * Native keyboard navigation is exercised separately in Interactive Preview. */
export async function withVisitor(run: (walkTo: (z: number) => Promise<void>) => Promise<void>): Promise<void> {
    await sleep(800)
    const camera = WorldCameraFinderProvider.getInstance().getComponent()
    const transform = camera.getTransform()
    const pose = transform.getWorldTransform()
    const tracking = camera.getSceneObject().getComponent("Component.DeviceTracking")
    const wasTracking = tracking.enabled
    tracking.enabled = false
    const walkTo = async (z: number) => {
        const from = transform.getWorldPosition()
        const to = new vec3(0, 0, z)
        const steps = Math.max(1, Math.ceil(from.distance(to) / 20))
        for (let step = 1; step <= steps; step++) {
            transform.setWorldPosition(vec3.lerp(from, to, step / steps))
            await nextFrame()
        }
        await sleep(180)
        expect(Math.abs(transform.getWorldPosition().z - z) < 1).toBe(true)
    }
    try {
        transform.setWorldRotation(quat.quatIdentity())
        await walkTo(0)
        await run(walkTo)
    } finally {
        transform.setWorldTransform(pose)
        tracking.enabled = wasTracking
    }
}
