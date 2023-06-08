import { PlayerState } from "@root/scripts/types"
import { INITIAL_PLAYER_STATE } from "@root/scripts/constants"
import { Controller } from "../types"

export class TextDetectionController implements Controller {
  playerState: PlayerState

  videoElement: HTMLVideoElement
  canvasElement: HTMLCanvasElement
  interval: ReturnType<typeof setInterval>

  constructor() {
    this.playerState = INITIAL_PLAYER_STATE

    this.videoElement = document.createElement("video")
    this.videoElement.autoplay = true
  }

  async initialize() {
    document.body.appendChild(this.videoElement)

    const mediaStreamConstraints = {
      video: {
        facingMode: {
          exact: "user",
        },
      },
    }

    navigator.mediaDevices.getUserMedia(mediaStreamConstraints).then(stream => (this.videoElement.srcObject = stream))

    const faceDetector = new (window as any).FaceDetector()

    setInterval(() => {
      faceDetector.detect(this.videoElement).then(faces => {
        if (faces.length === 0) {
          alert("No faces")

          return
        }

        alert(
          faces[0].landmarks
            .map(
              ({ type, boundingBox: { top, left, width, height } }) =>
                `${type}. H: ${height}, W: ${width}, T: ${top}, L: ${left}`,
            )
            .join(", "),
        )
      })
    }, 5000)
  }

  // initialize() {
  //   const mediaStreamConstraints = {
  //     video: {
  //       facingMode: {
  //         exact: "user",
  //       },
  //     },
  //   }

  //   navigator.mediaDevices.getUserMedia(mediaStreamConstraints).then(stream => (this.videoElement.srcObject = stream))

  //   document.body.appendChild(this.videoElement)
  //   document.body.appendChild(this.canvasElement)

  //   const ctx = this.canvasElement.getContext("2d")
  //   const faceDetector = new (window as any).FaceDetector()

  //   this.interval = setInterval(async () => {
  //     ctx.drawImage(this.videoElement, 0, 0, this.canvasElement.width, this.canvasElement.height)

  //     const faces = await faceDetector.detect(this.canvasElement)

  //     // if(faces.length === 0){
  //     //   alert("No faces detected")

  //     //   return
  //     // }

  //     alert(faces.length)

  //     // if (textBlocks.length === 0) {
  //     //   this.playerState.isLeaping = false
  //     //   this.playerState.isCrouching = false

  //     //   this.onPlayerStateUpdate(this.playerState)

  //     //   return
  //     // }

  //     // const texts = textBlocks.map(text => text.rawValue.toLowerCase()) as string[]

  //     // if (texts.some(word => word.includes("leap"))) this.playerState.isLeaping = true
  //     // if (texts.some(word => word.includes("crouch"))) this.playerState.isCrouching = true

  //     // this.onPlayerStateUpdate(this.playerState)
  //   }, 3000)
  // }

  cleanup() {
    document.body.removeChild(this.videoElement)
    document.body.removeChild(this.canvasElement)

    clearInterval(this.interval)
  }

  onPlayerStateUpdate: (playerState: PlayerState) => void
}
