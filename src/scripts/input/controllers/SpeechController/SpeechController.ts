import { State } from "@root/scripts/types"
import { INITIAL_STATE } from "@root/scripts/constants"
import { Controller } from "../types"

export class SpeechController implements Controller {
  state: State
  pauseButton: HTMLButtonElement
  speechRecognition: SpeechRecognition
  timeout: ReturnType<typeof setTimeout>

  handlePauseButtonClick: () => void

  constructor() {
    this.state = INITIAL_STATE

    this.pauseButton = document.querySelector("button")

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
      this.timeout = setTimeout(() => {
        this.speechRecognition.start()
      }, 100)
    }

    this.handlePauseButtonClick = () => {
      this.state.isGamePaused = !this.state.isGamePaused

      this.onStateUpdate(this.state)
    }
  }

  initialize() {
    this.pauseButton.addEventListener("click", this.handlePauseButtonClick)
    this.speechRecognition.start()
  }

  cleanup() {
    clearTimeout(this.timeout)
    this.pauseButton.removeEventListener("click", this.handlePauseButtonClick)
    this.speechRecognition.stop()
  }

  onStateUpdate: (state: State) => void
}
