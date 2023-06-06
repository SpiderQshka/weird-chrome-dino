import { State } from "../../../../types"
import { INITIAL_STATE } from "../../../../constants"
import { Controller } from "../../types"

export class AmbientLightController implements Controller {
  state: State
  sensor: AmbientLightSensor
  initialIlluminance: number

  handleSensorRead: () => void
  handleTouchStart: () => void

  constructor() {
    this.state = INITIAL_STATE
    this.sensor = new AmbientLightSensor()
    this.initialIlluminance = null

    this.handleSensorRead = () => {
      if (this.initialIlluminance === null) this.initialIlluminance = this.sensor.illuminance

      const deltaIlluminance = this.initialIlluminance - this.sensor.illuminance

      this.state.isJumping = deltaIlluminance <= -100
      this.state.isLaying = deltaIlluminance >= 100

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
