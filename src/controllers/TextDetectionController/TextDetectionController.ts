import { State } from "../../types"
import { INITIAL_STATE } from "../constants"
import { Controller } from "../types"

export class TextDetectionController implements Controller {
  state: State

  constructor() {
    this.state = INITIAL_STATE

    const video = document.createElement("video")
    video.autoplay = true
    video.width = window.innerWidth
    video.height = window.innerHeight

    const canvas = document.createElement("canvas")
    canvas.hidden = true

    const ctx = canvas.getContext("2d")

    document.body.appendChild(video)
    document.body.appendChild(canvas)

    const textDetector = new (window as any).TextDetector()

    const mediaStreamConstraints = {
      video: {
        facingMode: {
          exact: "environment",
        },
      },
    }

    navigator.mediaDevices.getUserMedia(mediaStreamConstraints).then(stream => (video.srcObject = stream))

    setInterval(async () => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      const textBlocks = await textDetector.detect(canvas)

      if (textBlocks.length === 0) {
        this.state.player.isJumping = false
        this.state.player.isLaying = false

        this.onUpdate(this.state)

        return
      }

      const texts = textBlocks.map(text => text.rawValue.toLowerCase()) as string[]

      if (texts.some(word => word.includes("jump"))) this.state.player.isJumping = true
      if (texts.some(word => word.includes("lay"))) this.state.player.isLaying = true

      this.onUpdate(this.state)
    }, 1000)

    window.addEventListener("touchstart", () => {
      this.state.isPaused = !this.state.isPaused

      this.onUpdate(this.state)
    })
  }

  onUpdate: (state: State) => void
}
