import { State } from "../../../../types"
import { INITIAL_STATE } from "../../constants"
import { Controller } from "../../types"

export class SpeechController implements Controller {
  state: State
  speechRecognition: SpeechRecognition

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
        this.state.player.isLaying = false
      }

      if (transcripts.includes("lay down")) {
        this.state.player.isLaying = true
      }

      if (transcripts.includes("jump over")) {
        this.state.player.isJumping = true
        this.state.player.isLaying = false

        setTimeout(() => {
          this.state.player.isJumping = false
          this.onUpdate(this.state)
        })
      }

      this.onUpdate(this.state)
    }

    this.speechRecognition.onend = () => {
      setTimeout(() => {
        this.speechRecognition.start()
      }, 100)
    }

    window.addEventListener("touchstart", () => {
      this.state.isPaused = !this.state.isPaused

      this.onUpdate(this.state)
    })

    this.speechRecognition.start()
  }

  onUpdate: (state: State) => void
}
