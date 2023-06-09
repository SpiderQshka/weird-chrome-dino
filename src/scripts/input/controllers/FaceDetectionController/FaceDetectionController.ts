import { PlayerState } from "@root/scripts/types"
import { INITIAL_PLAYER_STATE } from "@root/scripts/constants"
import { Controller } from "../types"

export class FaceDetectionController implements Controller {
  playerState: PlayerState

  videoElement: HTMLVideoElement
  canvasElement: HTMLCanvasElement
  interval: ReturnType<typeof setInterval>

  constructor() {
    this.playerState = INITIAL_PLAYER_STATE

    this.canvasElement = document.createElement("canvas")

    this.videoElement = document.createElement("video")
    this.videoElement.autoplay = true
    this.videoElement.onloadedmetadata = () => {
      this.canvasElement.width = this.videoElement.videoWidth
      this.canvasElement.height = this.videoElement.videoHeight
    }
  }

  async initialize() {
    document.body.appendChild(this.canvasElement)

    const context = this.canvasElement.getContext("2d")

    const mediaStreamConstraints = {
      video: {
        facingMode: {
          exact: "user",
        },
      },
    }

    navigator.mediaDevices.getUserMedia(mediaStreamConstraints).then(stream => (this.videoElement.srcObject = stream))

    const faceDetector = new (window as any).FaceDetector({ maxDetectedFaces: 1, fastMode: true })

    this.interval = setInterval(() => {
      faceDetector.detect(this.videoElement).then(([face]) => {
        context.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height)
        context.drawImage(this.videoElement, 0, 0, this.videoElement.videoWidth, this.videoElement.videoHeight)

        context.strokeStyle = "#FFFF00"
        context.lineWidth = 5

        context.beginPath()
        context.rect(125, 125, this.videoElement.videoWidth - 250, this.videoElement.videoHeight - 250)
        context.stroke()
        context.closePath()

        if (!face) {
          this.playerState.isLeaping = false
          this.playerState.isCrouching = true

          this.onPlayerStateUpdate(this.playerState)

          return
        }

        const eyes = face.landmarks.filter(({ type }) => type === "eye")

        const visibleEyes = eyes.filter(eye => {
          const [{ x }] = eye.locations

          return x > 125 && x < this.videoElement.videoWidth - 125
        })

        if (visibleEyes.length === 0) return

        if (visibleEyes.length === 1) {
          this.playerState.isLeaping = false
          this.playerState.isCrouching = false

          this.onPlayerStateUpdate(this.playerState)

          return
        }

        this.playerState.isLeaping = true
        this.playerState.isCrouching = false

        this.onPlayerStateUpdate(this.playerState)
      })
    }, 50)
  }

  cleanup() {
    document.body.removeChild(this.canvasElement)

    clearInterval(this.interval)

    this.onPlayerStateUpdate(null)
  }

  onPlayerStateUpdate: (playerState: PlayerState) => void
}
