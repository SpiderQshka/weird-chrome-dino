import { State } from "@root/scripts/types"
import { INITIAL_STATE } from "@root/scripts/constants"
import { Controller } from "../types"

export class TextDetectionController implements Controller {
  state: State

  handlePauseButtonClick: () => void

  pauseButton: HTMLButtonElement

  videoElement: HTMLVideoElement
  canvasElement: HTMLCanvasElement
  interval: ReturnType<typeof setInterval>

  constructor() {
    this.state = INITIAL_STATE

    this.pauseButton = document.querySelector("button")

    this.videoElement = document.createElement("video")
    this.videoElement.autoplay = true
    this.videoElement.width = window.innerWidth
    this.videoElement.height = window.innerHeight

    this.canvasElement = document.createElement("canvas")
    this.canvasElement.hidden = true

    this.handlePauseButtonClick = () => {
      this.state.isGamePaused = !this.state.isGamePaused

      this.onStateUpdate(this.state)
    }
  }

  initialize() {
    const mediaStreamConstraints = {
      video: {
        facingMode: {
          exact: "environment",
        },
      },
    }

    navigator.mediaDevices.getUserMedia(mediaStreamConstraints).then(stream => (this.videoElement.srcObject = stream))

    document.body.appendChild(this.videoElement)
    document.body.appendChild(this.canvasElement)

    const ctx = this.canvasElement.getContext("2d")
    const textDetector = new (window as any).TextDetector()

    this.interval = setInterval(async () => {
      ctx.drawImage(this.videoElement, 0, 0, this.canvasElement.width, this.canvasElement.height)

      const textBlocks = await textDetector.detect(this.canvasElement)

      if (textBlocks.length === 0) {
        this.state.isJumping = false
        this.state.isLaying = false

        this.onStateUpdate(this.state)

        return
      }

      const texts = textBlocks.map(text => text.rawValue.toLowerCase()) as string[]

      if (texts.some(word => word.includes("jump"))) this.state.isJumping = true
      if (texts.some(word => word.includes("lay"))) this.state.isLaying = true

      this.onStateUpdate(this.state)
    }, 1000)

    this.pauseButton.addEventListener("click", this.handlePauseButtonClick)
  }

  cleanup() {
    document.body.removeChild(this.videoElement)
    document.body.removeChild(this.canvasElement)

    clearInterval(this.interval)

    this.pauseButton.removeEventListener("click", this.handlePauseButtonClick)
  }

  onStateUpdate: (state: State) => void
}
