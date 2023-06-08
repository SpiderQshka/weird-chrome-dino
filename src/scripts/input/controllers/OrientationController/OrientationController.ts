import { State } from "@root/scripts/types"
import { INITIAL_STATE } from "@root/scripts/constants"
import { Controller } from "../types"

export class OrientationController implements Controller {
  state: State
  initialSensorState: { alpha: number; beta: number; gamma: number }

  handleDeviceOrientation: (e: DeviceOrientationEvent) => void

  constructor() {
    this.state = INITIAL_STATE

    this.handleDeviceOrientation = e => {
      if (!this.initialSensorState) this.initialSensorState = e

      const deltaGamma = this.initialSensorState.gamma - e.gamma

      this.state.isJumping = deltaGamma > 10
      this.state.isLaying = deltaGamma < -5

      this.onStateUpdate(this.state)
    }
  }

  initialize() {
    window.addEventListener("deviceorientation", this.handleDeviceOrientation)
  }

  cleanup() {
    window.removeEventListener("deviceorientation", this.handleDeviceOrientation)
  }

  onStateUpdate: (state: State) => void
}
