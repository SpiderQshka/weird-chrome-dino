import { PlayerState } from "@root/scripts/types"
import { INITIAL_PLAYER_STATE } from "@root/scripts/constants"
import { Controller } from "../types"

const LEAP_KEY_CODES = ["Space"]
const CROUCH_KEY_CODES = ["ShiftLeft"]

export class KeyboardController implements Controller {
  playerState: PlayerState

  handleKeyDown: (e: KeyboardEvent) => void
  handleKeyUp: (e: KeyboardEvent) => void

  constructor() {
    this.playerState = INITIAL_PLAYER_STATE

    this.handleKeyDown = ({ code }) => {
      if (LEAP_KEY_CODES.includes(code)) {
        this.playerState.isLeaping = true
      }

      if (CROUCH_KEY_CODES.includes(code)) {
        this.playerState.isCrouching = true
      }

      this.onPlayerStateUpdate(this.playerState)
    }

    this.handleKeyUp = ({ code }) => {
      if (LEAP_KEY_CODES.includes(code)) {
        this.playerState.isLeaping = false
      }

      if (CROUCH_KEY_CODES.includes(code)) {
        this.playerState.isCrouching = false
      }

      this.onPlayerStateUpdate(this.playerState)
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

  onPlayerStateUpdate: (playerState: PlayerState) => void
}
