import { State } from "../../types"
import { INITIAL_STATE } from "../constants"
import { Controller } from "../types"

export class TextDetectionController implements Controller {
  state: State

  constructor() {
    this.state = INITIAL_STATE

    const video = document.createElement("video")
    video.hidden = true
    video.autoplay = true

    const canvas = document.createElement("canvas")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    canvas.hidden = true

    const ctx = canvas.getContext("2d")

    document.body.appendChild(video)
    document.body.appendChild(canvas)

    const textDetector = new (window as any).TextDetector()

    navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(stream => (video.srcObject = stream))

    setInterval(async () => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      const textBlocks = await textDetector.detect(canvas)

      if (textBlocks.length < 0) return

      const texts = textBlocks.map(text => text.rawValue.toLowerCase())

      if (texts.map(text => text.rawValue.toLowerCase()).filter(word => word.includes("art"))) alert("Mama mia!")
    }, 5000)
  }

  onUpdate: (state: State) => void
}
