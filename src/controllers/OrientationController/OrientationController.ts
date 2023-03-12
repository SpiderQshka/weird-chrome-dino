import { State } from "../../types"
import { INITIAL_STATE } from "../constants"
import { Controller } from "../types"

export class OrientationController implements Controller {
  state: State
  initialSensorState: { alpha: number; beta: number; gamma: number }

  constructor() {
    this.state = INITIAL_STATE

    window.addEventListener("deviceorientation", e => {
      if (!this.initialSensorState) this.initialSensorState = e

      const deltaGamma = this.initialSensorState.gamma - e.gamma

      this.state.player.isJumping = deltaGamma > 10
      this.state.player.isLaying = deltaGamma < -5

      this.onUpdate(this.state)
    })

    window.addEventListener("touchstart", () => {
      this.state.isPaused = !this.state.isPaused

      this.onUpdate(this.state)
    })
  }

  onUpdate: (state: State) => void
}
