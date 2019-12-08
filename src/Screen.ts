import { PerspectiveCamera, Scene, WebGLRenderer } from "three"

import * as THREE from "three"
import "three/examples/js/controls/OrbitControls"

import { Rain } from "./rain/Rain"

export class Screen {
  public readonly renderer: WebGLRenderer
  public readonly control: any

  public readonly scene = new Scene()
  public readonly camera = new PerspectiveCamera(75, 1, 1, 10)

  public readonly counterUniform = { value: 1.0 }

  public readonly rain = new Rain(10000, this.counterUniform)

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new WebGLRenderer({ canvas })
    this.canvasToDisplaySize(true)

    this.control = new (THREE as any).OrbitControls(this.camera, canvas)

    this.renderer.setClearColor(0xffffff)
    this.camera.position.z = 1

    this.scene.add(this.rain)
  }

  public render() {
    this.counterUniform.value = (performance.now() * 8) % 65536

    this.canvasToDisplaySize()
    this.renderer.render(this.scene, this.camera)
  }

  private canvasToDisplaySize(force = false) {
    const canvas = this.renderer.domElement

    const width = canvas.clientWidth
    const height = canvas.clientHeight

    if (force || width !== canvas.width || height !== canvas.height) {
      this.renderer.setSize(width, height, false)

      this.camera.aspect = width / height
      this.camera.updateProjectionMatrix()
    }
  }
}
