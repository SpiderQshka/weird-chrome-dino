import { PlayerState } from "@root/scripts/types"
import { INITIAL_PLAYER_STATE } from "@root/scripts/constants"
import { Controller } from "../types"

export class FaceDetectionController implements Controller {
  playerState: PlayerState

  videoElement: HTMLVideoElement
  canvasElement: HTMLCanvasElement

  handlePhoto: () => void

  animationFrame: number

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

    this.handlePhoto = () => {
      faceDetector.detect(this.videoElement).then(([face]) => {
        ;(() => {
          this.playerState.isLeaping = false
          this.playerState.isCrouching = true

          if (!face) return

          const eyes = face.landmarks.filter(({ type }) => type === "eye")

          const visibleEyes = eyes.filter(eye => {
            const [{ x }] = eye.locations

            return x > GAP_SIZE && x < this.videoElement.videoWidth - GAP_SIZE
          })

          if (visibleEyes.length !== 2) return

          this.playerState.isLeaping = true
          this.playerState.isCrouching = false
        })()

        setTimeout(
          () => {
            if (this.playerState.isLeaping) this.playerState.isLeaping = false
            if (this.playerState.isCrouching) this.playerState.isCrouching = false
            this.onPlayerStateUpdate(this.playerState)
          },
          this.playerState.isLeaping ? 500 : 1000,
        )

        this.onPhoto(this.canvasElement.toDataURL("image/jpeg", 0.1))
        this.onPlayerStateUpdate(this.playerState)
      })
    }

    this.canvasElement.addEventListener("click", this.handlePhoto)

    const GAP_SIZE = 150

    const render = () => {
      context.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height)
      context.drawImage(this.videoElement, 0, 0, this.videoElement.videoWidth, this.videoElement.videoHeight)

      context.strokeStyle = "#FFFF00"
      context.lineWidth = 5

      context.beginPath()
      context.rect(
        GAP_SIZE,
        GAP_SIZE,
        this.videoElement.videoWidth - GAP_SIZE * 2,
        this.videoElement.videoHeight - GAP_SIZE * 2,
      )
      context.stroke()
      context.closePath()

      this.animationFrame = requestAnimationFrame(render)
    }

    this.animationFrame = requestAnimationFrame(render)
  }

  cleanup() {
    document.body.removeChild(this.canvasElement)

    cancelAnimationFrame(this.animationFrame)

    this.onPlayerStateUpdate(null)
  }

  onPlayerStateUpdate: (playerState: PlayerState) => void
  onPhoto: (base64: string) => void
}
