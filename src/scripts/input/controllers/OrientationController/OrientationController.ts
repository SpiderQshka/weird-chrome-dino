import { State } from "@root/scripts/types"
import { INITIAL_STATE } from "@root/scripts/constants"
import { Controller } from "../types"

export class OrientationController implements Controller {
  state: State
  pauseButton: HTMLButtonElement
  initialSensorState: { alpha: number; beta: number; gamma: number }

  handleDeviceOrientation: (e: DeviceOrientationEvent) => void
  handlePauseButtonClick: () => void

  constructor() {
    this.state = INITIAL_STATE

    this.pauseButton = document.querySelector("button")

    this.handleDeviceOrientation = e => {
      if (!this.initialSensorState) this.initialSensorState = e

      const deltaGamma = this.initialSensorState.gamma - e.gamma

      this.state.isJumping = deltaGamma > 10
      this.state.isLaying = deltaGamma < -5

      this.onStateUpdate(this.state)
    }

    this.handlePauseButtonClick = () => {
      this.state.isGamePaused = !this.state.isGamePaused

      this.onStateUpdate(this.state)
    }
  }

  initialize() {
    window.addEventListener("deviceorientation", this.handleDeviceOrientation)
    this.pauseButton.addEventListener("click", this.handlePauseButtonClick)
  }

  cleanup() {
    window.removeEventListener("deviceorientation", this.handleDeviceOrientation)
    this.pauseButton.removeEventListener("click", this.handlePauseButtonClick)
  }

  onStateUpdate: (state: State) => void
}
