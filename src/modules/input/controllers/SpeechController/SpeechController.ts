import { State } from "../../../../types"
import { INITIAL_STATE } from "../../../../constants"
import { Controller } from "../../types"

export class SpeechController implements Controller {
  state: State
  speechRecognition: SpeechRecognition

  handleTouchStart: () => void

  constructor() {
    this.state = INITIAL_STATE

    this.speechRecognition = new webkitSpeechRecognition()

    this.speechRecognition.continuous = false
    this.speechRecognition.lang = "en-US"
    this.speechRecognition.interimResults = false
    this.speechRecognition.maxAlternatives = 20

    this.speechRecognition.onresult = e => {
      const lastSpeechRecognitionResult = e.results.item(e.resultIndex)
      const transcripts = []

      for (let i = 0; i < lastSpeechRecognitionResult.length; i++) {
        transcripts.push(lastSpeechRecognitionResult[i].transcript.trim().toLowerCase())
      }

      if (transcripts.includes("stand up")) {
        this.state.isLaying = false
      }

      if (transcripts.includes("lay down")) {
        this.state.isLaying = true
      }

      if (transcripts.includes("jump over")) {
        this.state.isJumping = true
        this.state.isLaying = false

        setTimeout(() => {
          this.state.isJumping = false
          this.onStateUpdate(this.state)
        })
      }

      this.onStateUpdate(this.state)
    }

    this.speechRecognition.onend = () => {
      setTimeout(() => {
        this.speechRecognition.start()
      }, 100)
    }

    this.handleTouchStart = () => {
      this.state.isGamePaused = !this.state.isGamePaused

      this.onStateUpdate(this.state)
    }
  }

  initialize() {
    document.addEventListener("touchstart", this.handleTouchStart)
    this.speechRecognition.start()
  }

  cleanup() {
    document.removeEventListener("touchstart", this.handleTouchStart)
    this.speechRecognition.stop()
  }

  onStateUpdate: (state: State) => void
}
