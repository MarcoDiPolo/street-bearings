import {addDirectionArrow, addMonument, addRoute, addStationSymbol} from "../RouteGeometry"
import {StreetBearingsUI} from "./StreetBearingsUI"

type RouteState = "travel" | "near" | "open"

/** The scene camera supplies the visitor's position in the four-metre model. */
@component
export class StreetBearingsMain extends BaseScriptComponent {
    @input cameraObject!: SceneObject
    @input geometryMaterial!: Material

    private state: RouteState = "travel"
    private ui!: StreetBearingsUI
    private guidance!: SceneObject
    private arrow!: SceneObject
    private readonly destination = new vec3(0, 0, -400)

    onAwake(): void {
        this.createEvent("OnStartEvent").bind(() => this.startRoute())
    }

    private place(name: string, parent: SceneObject, x: number, y: number, z: number): SceneObject {
        const node = global.scene.createSceneObject(name)
        node.setParent(parent)
        node.getTransform().setLocalPosition(new vec3(x, y, z))
        return node
    }

    private startRoute(): void {
        if (isNull(this.cameraObject) || isNull(this.geometryMaterial)) {
            throw new Error("Street Bearings requires a camera and vertex colour material.")
        }
        const root = this.getSceneObject()
        addRoute(this.place("Rue de Reims", root, 0, -58, 0), this.geometryMaterial, 400)
        addMonument(this.place("PorteDeMars", root, 0, -58, -400), this.geometryMaterial)
        addStationSymbol(this.place("StationSymbol", root, -24, 17, -120), this.geometryMaterial)
        this.guidance = this.place("Guidance", root, 0, -9, -95)
        this.arrow = this.place("DirectionArrow", this.guidance, 0, 0, 0)
        addDirectionArrow(this.arrow, this.geometryMaterial)
        this.ui = new StreetBearingsUI(root, this.guidance,
            () => { if (this.state === "near") this.show("open") },
            () => { if (this.state === "open") this.show("near") })
        this.show("travel")
        this.updateRoute()
        this.createEvent("UpdateEvent").bind(() => this.updateRoute())
        print("Street Bearings ready")
    }

    private show(state: RouteState): void {
        this.state = state
        this.guidance.enabled = state === "travel"
        this.ui.setState(state)
    }

    private updateRoute(): void {
        const camera = this.cameraObject.getTransform()
        const eye = camera.getWorldPosition()
        const toMonument = this.destination.sub(eye)
        const near = toMonument.x * toMonument.x + toMonument.z * toMonument.z < 150 * 150
        if (near && this.state === "travel") this.show("near")
        if (!near && this.state !== "travel") this.show("travel")
        if (this.state !== "travel") return

        const rotation = camera.getWorldRotation()
        const local = rotation.invert().multiplyVec3(new vec3(toMonument.x, 0, toMonument.z))
        const bearing = Math.atan2(local.x, -local.z)
        const offset = new vec3(Math.max(-17, Math.min(17, bearing * 24)), -9, -95)
        this.guidance.getTransform().setWorldPosition(eye.add(rotation.multiplyVec3(offset)))
        this.guidance.getTransform().setWorldRotation(rotation)
        this.arrow.getTransform().setLocalRotation(quat.fromEulerAngles(0, 0, -bearing))
    }
}
