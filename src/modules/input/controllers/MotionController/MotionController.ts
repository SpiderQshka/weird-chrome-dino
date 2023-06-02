import { State } from "../../../../types"
import { INITIAL_STATE } from "../../constants"
import { Controller } from "../../types"

export class MotionController implements Controller {
  state: State
  sensor: LinearAccelerationSensor

  constructor() {
    this.state = INITIAL_STATE
    this.sensor = new LinearAccelerationSensor({ frequency: 60 })

    this.sensor.addEventListener("reading", () => {
      if (this.state.isPaused) return

      this.state.player.isJumping = this.sensor.x > 15

      if (this.sensor.x < -10) {
        this.state.player.isLaying = true

        setTimeout(() => {
          this.state.player.isLaying = false
          this.onUpdate(this.state)
        }, 1000)
      }

      this.onUpdate(this.state)
    })

    window.addEventListener("touchstart", () => {
      this.state.isPaused = !this.state.isPaused

      this.onUpdate(this.state)
    })

    this.sensor.start()
  }

  onUpdate: (state: State) => void
}
