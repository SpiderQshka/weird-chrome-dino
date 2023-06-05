import { State } from "../../../../types"
import { INITIAL_STATE } from "../../constants"
import { Controller } from "../../types"

export class OrientationController implements Controller {
  state: State
  initialSensorState: { alpha: number; beta: number; gamma: number }

  handleDeviceOrientation: (e: DeviceOrientationEvent) => void
  handleTouchStart: () => void

  constructor() {
    this.state = INITIAL_STATE

    this.handleDeviceOrientation = e => {
      if (!this.initialSensorState) this.initialSensorState = e

      const deltaGamma = this.initialSensorState.gamma - e.gamma

      this.state.player.isJumping = deltaGamma > 10
      this.state.player.isLaying = deltaGamma < -5

      this.onStateUpdate(this.state)
    }

    this.handleTouchStart = () => {
      this.state.isPaused = !this.state.isPaused

      this.onStateUpdate(this.state)
    }
  }

  initialize() {
    window.addEventListener("deviceorientation", this.handleDeviceOrientation)
    window.addEventListener("touchstart", this.handleTouchStart)
  }

  cleanup() {
    window.removeEventListener("deviceorientation", this.handleDeviceOrientation)
    window.removeEventListener("touchstart", this.handleTouchStart)
  }

  onStateUpdate: (state: State) => void
}
