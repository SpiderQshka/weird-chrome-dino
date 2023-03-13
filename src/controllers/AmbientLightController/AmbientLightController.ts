import { State } from "../../types"
import { INITIAL_STATE } from "../constants"
import { Controller } from "../types"

export class AmbientLightController implements Controller {
  state: State
  sensor: AmbientLightSensor
  initialIlluminance: number

  constructor() {
    this.state = INITIAL_STATE
    this.sensor = new AmbientLightSensor()
    this.initialIlluminance = null

    window.addEventListener("touchstart", () => {
      this.state.isPaused = !this.state.isPaused

      this.onUpdate(this.state)
    })

    this.sensor.addEventListener("reading", () => {
      if (this.initialIlluminance === null) {
        this.initialIlluminance = this.sensor.illuminance
      }

      const deltaIlluminance = this.initialIlluminance - this.sensor.illuminance

      document.body.innerHTML = `illuminance: ${this.sensor.illuminance} <br />initialIlluminance: ${this.initialIlluminance}`

      this.state.player.isJumping = deltaIlluminance <= -100
      this.state.player.isLaying = deltaIlluminance >= 100

      this.onUpdate(this.state)
    })

    this.sensor.start()
  }

  onUpdate: (state: State) => void
}
