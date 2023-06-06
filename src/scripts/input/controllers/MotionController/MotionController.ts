import { State } from "@root/scripts/types"
import { INITIAL_STATE } from "@root/scripts/constants"
import { Controller } from "../types"

export class MotionController implements Controller {
  state: State
  sensor: LinearAccelerationSensor

  handleSensorRead: () => void
  handleTouchStart: () => void

  constructor() {
    this.state = INITIAL_STATE
    this.sensor = new LinearAccelerationSensor({ frequency: 60 })

    this.handleSensorRead = () => {
      if (this.state.isGamePaused) return

      this.state.isJumping = this.sensor.x > 15

      if (this.sensor.x < -10) {
        this.state.isLaying = true

        setTimeout(() => {
          this.state.isLaying = false
          this.onStateUpdate(this.state)
        }, 1000)
      }

      this.onStateUpdate(this.state)
    }

    this.handleTouchStart = () => {
      this.state.isGamePaused = !this.state.isGamePaused

      this.onStateUpdate(this.state)
    }
  }

  initialize() {
    this.sensor.addEventListener("reading", this.handleSensorRead)
    document.addEventListener("touchstart", this.handleTouchStart)

    this.sensor.start()
  }

  cleanup() {
    this.sensor.removeEventListener("reading", this.handleSensorRead)
    document.removeEventListener("touchstart", this.handleTouchStart)

    this.sensor.stop()
  }

  onStateUpdate: (state: State) => void
}
