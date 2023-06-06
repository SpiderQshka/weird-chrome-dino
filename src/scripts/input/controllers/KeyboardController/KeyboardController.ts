import { State } from "@root/scripts/types"
import { INITIAL_STATE } from "@root/scripts/constants"
import { Controller } from "../types"
import { createPauseButton } from "../../helpers"

const JUMP_KEY_CODES = ["Space"]
const LAY_KEY_CODES = ["ShiftLeft"]
const PAUSE_KEY_CODES = ["Enter"]

export class KeyboardController implements Controller {
  state: State
  pauseButton: HTMLButtonElement

  handleKeyDown: (e: KeyboardEvent) => void
  handleKeyUp: (e: KeyboardEvent) => void
  handlePauseButtonClick: () => void

  constructor() {
    this.state = INITIAL_STATE

    this.pauseButton = document.querySelector("button")

    this.handleKeyDown = ({ code }) => {
      if (JUMP_KEY_CODES.includes(code)) {
        this.state.isJumping = true
      }

      if (LAY_KEY_CODES.includes(code)) {
        this.state.isLaying = true
      }

      if (PAUSE_KEY_CODES.includes(code)) {
        this.state.isGamePaused = !this.state.isGamePaused
      }

      this.onStateUpdate(this.state)
    }

    this.handleKeyUp = ({ code }) => {
      if (JUMP_KEY_CODES.includes(code)) {
        this.state.isJumping = false
      }

      if (LAY_KEY_CODES.includes(code)) {
        this.state.isLaying = false
      }

      this.onStateUpdate(this.state)
    }

    this.handlePauseButtonClick = () => {
      this.state.isGamePaused = !this.state.isGamePaused

      this.onStateUpdate(this.state)
    }
  }

  initialize() {
    document.addEventListener("keydown", this.handleKeyDown)
    document.addEventListener("keyup", this.handleKeyUp)
    this.pauseButton.addEventListener("click", this.handlePauseButtonClick)
  }

  cleanup() {
    document.removeEventListener("keydown", this.handleKeyDown)
    document.removeEventListener("keyup", this.handleKeyUp)

    this.pauseButton.removeEventListener("click", this.handlePauseButtonClick)
  }

  onStateUpdate: (state: State) => void
}
