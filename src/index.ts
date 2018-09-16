import { Screen } from "./Screen"

function init() {
  const canvas = document.querySelector("canvas#main")
  if (!canvas) {
    throw new Error("Canvas is missing")
  }

  const screen = new Screen(canvas as HTMLCanvasElement)

  const animate = () => {
    screen.render()
    requestAnimationFrame(animate)
  }
  requestAnimationFrame(animate)
}

init()
