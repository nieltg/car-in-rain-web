import * as Random from "random-js"
import {
  BufferAttribute,
  BufferGeometry,
  IUniform,
  LineSegments,
  ShaderMaterial
} from "three"

import rainFragShader from "./rain.f.glsl"
import rainVertShader from "./rain.v.glsl"

function* generateVertices(n: number) {
  const genCoord1 = Random.real(-10.0, 10.0)
  const genCoord2 = Random.real(0.0, 16.0)

  while (n--) {
    const coord3d = [
      genCoord1(Random.nativeMath),
      genCoord2(Random.nativeMath),
      genCoord1(Random.nativeMath)
    ]

    yield* coord3d
    yield* coord3d
  }
}

function* generateVertexTypes(n: number) {
  n *= 2

  for (let i = 0; i < n; i++) {
    yield i % 2
  }
}

export class Rain extends LineSegments {
  constructor(n: number, counterUniform: IUniform) {
    const geometry = new BufferGeometry()
    geometry.addAttribute(
      "position",
      new BufferAttribute(new Float32Array(generateVertices(n)), 3)
    )
    geometry.addAttribute(
      "vertexType",
      new BufferAttribute(new Float32Array(generateVertexTypes(n)), 1)
    )

    const material = new ShaderMaterial({
      fragmentShader: rainFragShader,
      vertexShader: rainVertShader,

      uniforms: {
        counter: counterUniform
      }
    })

    super(geometry, material)
  }
}
