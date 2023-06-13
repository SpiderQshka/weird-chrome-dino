import { PlayerState } from "@root/scripts/types"
import { INITIAL_PLAYER_STATE } from "@root/scripts/constants"
import { Controller } from "../types"

export class SpeechController implements Controller {
  playerState: PlayerState
  speechRecognition: SpeechRecognition

  handleSpeechRecognitionEnd: () => void

  constructor() {
    this.playerState = INITIAL_PLAYER_STATE

    this.speechRecognition = new webkitSpeechRecognition()

    this.speechRecognition.continuous = false
    this.speechRecognition.lang = "en-US"
    this.speechRecognition.interimResults = false
    this.speechRecognition.maxAlternatives = 20

    this.speechRecognition.onresult = e => {
      const lastSpeechRecognitionResult = Array.from(e.results.item(e.resultIndex))

      const transcripts = lastSpeechRecognitionResult.map(({ transcript }) => transcript.trim().toLowerCase())

      this.playerState.isLeaping = transcripts.includes("jump over")
      this.playerState.isCrouching = transcripts.includes("get down")

      if (this.playerState.isLeaping) {
        setTimeout(() => {
          this.playerState.isLeaping = false
          this.onPlayerStateUpdate(this.playerState)
        }, 100)
      }

      this.onPlayerStateUpdate(this.playerState)
    }

    this.handleSpeechRecognitionEnd = () => {
      setTimeout(() => {
        this.speechRecognition.start()
      }, 100)
    }
  }

  initialize() {
    this.speechRecognition.addEventListener("end", this.handleSpeechRecognitionEnd)
    this.speechRecognition.start()
  }

  cleanup() {
    this.speechRecognition.removeEventListener("end", this.handleSpeechRecognitionEnd)
    this.speechRecognition.stop()

    this.onPlayerStateUpdate(null)
  }

  onPlayerStateUpdate: (playerState: PlayerState) => void
}
