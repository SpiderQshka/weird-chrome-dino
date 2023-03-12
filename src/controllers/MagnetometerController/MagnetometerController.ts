import { State } from "../../types"
import { INITIAL_STATE } from "../constants"
import { Controller } from "../types"

export class MagnetometerController implements Controller {
  state: State
  sensor: Magnetometer
  initialSensorState: { x: number; y: number; z: number }

  constructor() {
    this.state = INITIAL_STATE
    this.sensor = new Magnetometer()
    this.initialSensorState = null

    window.addEventListener("touchstart", () => {
      this.state.isPaused = !this.state.isPaused

      this.onUpdate(this.state)
    })

    this.sensor.addEventListener("reading", () => {
      if (!this.initialSensorState)
        setTimeout(
          () =>
            (this.initialSensorState = {
              x: this.sensor.x,
              y: this.sensor.y,
              z: this.sensor.z,
            }),
          500,
        )

      const deltaY = this.initialSensorState.y - this.sensor.y

      this.state.player.isJumping = deltaY > 20
      this.state.player.isLaying = deltaY < -5

      this.onUpdate(this.state)
    })

    this.sensor.start()
  }

  onUpdate: (state: State) => void
}
