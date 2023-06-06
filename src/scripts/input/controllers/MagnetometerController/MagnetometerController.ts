import { State } from "@root/scripts/types"
import { INITIAL_STATE } from "@root/scripts/constants"
import { Controller } from "../types"
import { createPauseButton } from "../../helpers"

export class MagnetometerController implements Controller {
  state: State
  pauseButton: HTMLButtonElement

  sensor: Magnetometer
  initialSensorState: { x: number; y: number; z: number }

  handleSensorRead: () => void
  handlePauseButtonClick: () => void

  constructor() {
    this.state = INITIAL_STATE
    this.sensor = new Magnetometer({ frequency: 30 })

    this.pauseButton = document.querySelector("button")

    this.handleSensorRead = () => {
      if (this.sensor.y < -200 || this.sensor.y > 200) return

      if (!this.initialSensorState) this.initialSensorState = { x: this.sensor.x, y: this.sensor.y, z: this.sensor.z }

      const deltaY = this.initialSensorState.y - this.sensor.y

      this.state.isJumping = deltaY > 10
      this.state.isLaying = deltaY < -10

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
