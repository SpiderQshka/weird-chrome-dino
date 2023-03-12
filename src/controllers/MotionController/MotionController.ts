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
      this.onUpdate(this.state)
    })

    this.sensor.start()
  }

  onUpdate: (state: State) => void
}
