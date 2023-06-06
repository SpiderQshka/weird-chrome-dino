import { State } from "@root/scripts/types"
import { INITIAL_STATE } from "@root/scripts/constants"
import { Controller } from "../types"
import { createPauseButton } from "../../helpers"

export class AmbientLightController implements Controller {
  state: State
  sensor: AmbientLightSensor
  initialIlluminance: number
  pauseButton: HTMLButtonElement

  handleSensorRead: () => void
  handlePauseButtonClick: () => void

  constructor() {
    this.state = INITIAL_STATE
    this.sensor = new AmbientLightSensor()
    this.initialIlluminance = null

    this.pauseButton = document.querySelector("button")

    this.handleSensorRead = () => {
      if (this.initialIlluminance === null) this.initialIlluminance = this.sensor.illuminance

      const deltaIlluminance = this.initialIlluminance - this.sensor.illuminance

      this.state.isJumping = deltaIlluminance <= -100
      this.state.isLaying = deltaIlluminance >= 100

      this.onStateUpdate(this.state)
    }

    this.handlePauseButtonClick = () => {
      this.state.isGamePaused = !this.state.isGamePaused

      this.onStateUpdate(this.state)
    }
  }

  initialize() {
    this.sensor.addEventListener("reading", this.handleSensorRead)
    this.pauseButton.addEventListener("click", this.handlePauseButtonClick)

    this.sensor.start()
  }

  cleanup() {
    this.sensor.removeEventListener("reading", this.handleSensorRead)
    this.pauseButton.removeEventListener("click", this.handlePauseButtonClick)

    this.sensor.stop()
  }

  onStateUpdate: (state: State) => void
}
