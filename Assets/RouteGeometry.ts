// Local coordinates are centimetres. The viewer approaches the front (+Z).
type Point = [number, number]
type Tint = [number, number, number]
const stone: Tint = [0.86, 0.72, 0.52]
const lightStone: Tint = [1, 0.87, 0.65]
const shadeStone: Tint = [0.57, 0.46, 0.37]
const blue: Tint = [0.09, 0.27, 0.35]
const cyan: Tint = [0.57, 0.95, 0.98]
const amber: Tint = [1, 0.70, 0.28]

// An extruded convex outline. Each face gets separate normals and side shading.
class Geometry {
  private vertices: number[] = []
  private indices: number[] = []

  prism(points: Point[], back: number, front: number, tint: Tint): void {
    const count = points.length
    let area = 0
    for (let i = 0; i < count; i++) {
      const a = points[i], b = points[(i + 1) % count]
      area += a[0] * b[1] - b[0] * a[1]
    }
    if (area < 0) points.reverse()
    const base = this.vertices.length / 10
    for (const z of [front, back]) {
      for (const p of points) {
        this.vertices.push(p[0], p[1], z, 0, 0, z === front ? 1 : -1, ...tint, 1)
      }
    }
    for (let i = 1; i + 1 < count; i++) {
      this.indices.push(base, base + i, base + i + 1)
      this.indices.push(base + count, base + count + i + 1, base + count + i)
    }
    for (let i = 0; i < count; i++) {
      const a = points[i], b = points[(i + 1) % count]
      const dx = b[0] - a[0], dy = b[1] - a[1]
      const length = Math.sqrt(dx * dx + dy * dy)
      const shade = 0.78 - 0.14 * dx / length
      const side = this.vertices.length / 10
      for (const [p, z] of [[a, back], [b, back], [b, front], [a, front]] as [Point, number][]) {
        this.vertices.push(p[0], p[1], z, dy / length, -dx / length, 0,
          tint[0] * shade, tint[1] * shade, tint[2] * shade, 1)
      }
      this.indices.push(side, side + 1, side + 2, side, side + 2, side + 3)
    }
  }

  box(left: number, bottom: number, right: number, top: number,
      back: number, front: number, tint: Tint): void {
    this.prism([[left, bottom], [right, bottom], [right, top], [left, top]], back, front, tint)
  }

  disc(x: number, y: number, radius: number, tint: Tint): void {
    const ring: Point[] = []
    for (let i = 0; i < 16; i++) {
      const angle = i * Math.PI / 8
      ring.push([x + radius * Math.cos(angle), y + radius * Math.sin(angle)])
    }
    this.prism(ring, 0.3, 0.5, tint)
  }

  mount(host: SceneObject, material: Material): void {
    const mesh = new MeshBuilder([
      {name: 'position', components: 3},
      {name: 'normal', components: 3},
      {name: 'color', components: 4},
    ])
    mesh.topology = MeshTopology.Triangles
    mesh.indexType = MeshIndexType.UInt16
    mesh.appendVerticesInterleaved(this.vertices)
    mesh.appendIndices(this.indices)
    const visual = host.createComponent('Component.RenderMeshVisual')
    visual.mesh = mesh.getMesh()
    visual.mainMaterial = material
    mesh.updateMesh()
  }
}

export function addStationSymbol(host: SceneObject, material: Material): void {
  const g = new Geometry()
  g.prism([[-7,-3], [-7,5], [-5,8], [5,8], [7,5], [7,-3], [5,-5], [-5,-5]], -0.5, 0.25, cyan)
  g.box(-5.2, 0.4, -0.45, 4.9, 0.25, 0.5, blue)
  g.box(0.45, 0.4, 5.2, 4.9, 0.25, 0.5, blue)
  for (const side of [-1, 1]) {
    g.disc(4.4 * side, -2.4, 1.0, amber)
    g.prism([[3.7 * side,-5],[5.2 * side,-5],[8 * side,-8],[6 * side,-8]], -0.45,0.2,cyan)
  }
  g.mount(host, material)
}

export function addDirectionArrow(host: SceneObject, material: Material): void {
  const g = new Geometry()
  g.box(-1.8,-8,1.8,1,-0.5,0.5,amber)
  g.prism([[-6,1], [6,1], [0,8]],-0.5,0.5,amber)
  g.mount(host, material)
}

export function addMonument(host: SceneObject, material: Material): void {
  const g = new Geometry()
  const openings = [{x:-61,r:17}, {x:0,r:25}, {x:61,r:17}]
  const spring = 36
  const wallTop = 78
  const piers = [[-97,-78], [-44,-25], [25,44], [78,97]]
  for (const [left,right] of piers) {
    g.box(left,0,right,wallTop,-6,5.4,stone)
    const center = (left + right) / 2
    g.box(center-5,2,center+5,60,-6.3,6.4,lightStone)
    g.box(center-7,0,center+7,4,-6.7,7,shadeStone)
    g.box(center-6.8,57,center+6.8,61,-6.7,7,lightStone)
    g.box(center-7.5,61,center+7.5,64,-7,7.1,stone)
  }
  for (const arch of openings) {
    const point = (radius: number, angle: number): Point =>
      [arch.x + radius * Math.cos(angle), spring + radius * Math.sin(angle)]
    for (let i = 0; i < 20; i++) {
      const start = i * Math.PI / 20, end = (i+1) * Math.PI / 20
      const a = point(arch.r,start), b = point(arch.r,end)
      g.prism([a,b,[b[0],wallTop],[a[0],wallTop]],-6,5.4,stone)
      // Individual voussoirs frame the opening; no backing spans its passage.
      const tint = i % 2 === 0 ? lightStone : stone
      g.prism([a,point(arch.r+4,start),point(arch.r+4,end),b],5.4,6.8,tint)
    }
  }
  g.box(-98,75,98,78,-6.7,6.7,lightStone)
  g.box(-96,78,96,87,-6,6,stone)
  g.box(-99,87,99,89,-7,7,shadeStone)
  g.box(-100,89,100,92,-7.5,7.5,lightStone)
  g.mount(host, material)
}

export function addRoute(host: SceneObject, material: Material, lengthCm: number): void {
  const g = new Geometry()
  for (const side of [-1,1]) {
    const x = side * 39
    g.box(x-0.65,-0.8,x+0.65,0,-lengthCm,0,blue)
    for (let depth = 20; depth < lengthCm - 4; depth += 30) {
      g.box(x-0.85,0,x+0.85,0.4,-depth-4,-depth,cyan)
    }
  }
  g.mount(host, material)
}
