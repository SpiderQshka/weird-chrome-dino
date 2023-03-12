import { State } from "../../types"
import { INITIAL_STATE } from "../constants"
import { Controller } from "../types"

export class MotionController implements Controller {
  state: State
  sensor: LinearAccelerationSensor

  constructor() {
    this.state = INITIAL_STATE

    this.sensor = new LinearAccelerationSensor()

    window.addEventListener("touchstart", () => {
      this.state.isPaused = !this.state.isPaused

      this.onUpdate(this.state)
    })

    this.sensor.addEventListener("reading", () => {
      this.state.player.isJumping = !this.state.player.isLaying && this.sensor.z > 1

      if (this.sensor.z < -1) {
        this.state.player.isLaying = true

        setTimeout(() => {
          this.state.player.isLaying = false
          this.onUpdate(this.state)
        }, 1000)
      }

      this.onUpdate(this.state)
    })

    this.sensor.start()
  }

  onUpdate: (state: State) => void
}
