import { State } from "../../types"
import { INITIAL_STATE } from "../constants"
import { Controller } from "../types"

export class AmbientLightController implements Controller {
  state: State
  sensor: AmbientLightSensor

  constructor() {
    this.state = INITIAL_STATE
    this.sensor = new AmbientLightSensor()

    window.addEventListener("touchstart", () => {
      this.state.isPaused = !this.state.isPaused

      this.onUpdate(this.state)
    })

    this.sensor.addEventListener("reading", () => {
      const { illuminance } = this.sensor

      // Add calibration logic
      this.state.player.isJumping = illuminance < 200
      this.state.player.isLaying = illuminance > 800

      this.onUpdate(this.state)
    })

    this.sensor.start()
  }

  onUpdate: (state: State) => void
}
