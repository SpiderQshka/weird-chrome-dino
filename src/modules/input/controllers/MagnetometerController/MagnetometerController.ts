import { State } from "../../../../types"
import { INITIAL_STATE } from "../../constants"
import { Controller } from "../../types"

export class MagnetometerController implements Controller {
  state: State
  sensor: Magnetometer
  initialSensorState: { x: number; y: number; z: number }

  constructor() {
    this.state = INITIAL_STATE
    this.sensor = new Magnetometer({ frequency: 30 })

    this.sensor.addEventListener("reading", () => {
      if (this.sensor.y < -200 || this.sensor.y > 200) return

      if (!this.initialSensorState) this.initialSensorState = { x: this.sensor.x, y: this.sensor.y, z: this.sensor.z }

      const deltaY = this.initialSensorState.y - this.sensor.y

      this.state.player.isJumping = deltaY > 10
      this.state.player.isLaying = deltaY < -10

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
