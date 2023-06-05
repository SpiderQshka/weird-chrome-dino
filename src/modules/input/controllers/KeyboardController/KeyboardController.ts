import { State } from "../../../../types"
import { INITIAL_STATE } from "../../constants"
import { Controller } from "../../types"

const JUMP_KEY_CODES = ["Space"]
const LAY_KEY_CODES = ["ShiftLeft"]
const PAUSE_KEY_CODES = ["Enter"]

export class KeyboardController implements Controller {
  state: State

  handleKeyDown: (e: KeyboardEvent) => void
  handleKeyUp: (e: KeyboardEvent) => void

  constructor() {
    this.state = INITIAL_STATE

    this.handleKeyDown = ({ code }) => {
      if (JUMP_KEY_CODES.includes(code)) {
        this.state.player.isJumping = true
      }

      if (LAY_KEY_CODES.includes(code)) {
        this.state.player.isLaying = true
      }

      if (PAUSE_KEY_CODES.includes(code)) {
        this.state.isPaused = !this.state.isPaused
      }

      this.onStateUpdate(this.state)
    }

    this.handleKeyUp = ({ code }) => {
      if (JUMP_KEY_CODES.includes(code)) {
        this.state.player.isJumping = false
      }

      if (LAY_KEY_CODES.includes(code)) {
        this.state.player.isLaying = false
      }

      this.onStateUpdate(this.state)
    }
  }

  initialize() {
    document.addEventListener("keydown", this.handleKeyDown)
    document.addEventListener("keyup", this.handleKeyUp)
  }

  cleanup() {
    document.removeEventListener("keydown", this.handleKeyDown)
    document.removeEventListener("keyup", this.handleKeyUp)
  }

  onStateUpdate: (state: State) => void
}
