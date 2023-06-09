import { PlayerState } from "@root/scripts/types"
import { INITIAL_PLAYER_STATE } from "@root/scripts/constants"
import { Controller } from "../types"

export class OrientationController implements Controller {
  playerState: PlayerState
  initialSensorState: { alpha: number; beta: number; gamma: number }

  handleDeviceOrientation: (e: DeviceOrientationEvent) => void

  constructor() {
    this.playerState = INITIAL_PLAYER_STATE

    this.handleDeviceOrientation = e => {
      if (!this.initialSensorState) this.initialSensorState = e

      const deltaGamma = this.initialSensorState.gamma - e.gamma

      this.playerState.isLeaping = deltaGamma > 10
      this.playerState.isCrouching = deltaGamma < -5

      this.onPlayerStateUpdate(this.playerState)
    }
  }

  initialize() {
    window.addEventListener("deviceorientation", this.handleDeviceOrientation)
  }

  cleanup() {
    window.removeEventListener("deviceorientation", this.handleDeviceOrientation)

    this.onPlayerStateUpdate(null)
  }

  onPlayerStateUpdate: (playerState: PlayerState) => void
}
