import { PlayerState } from "@root/scripts/types"
import { INITIAL_PLAYER_STATE } from "@root/scripts/constants"
import { Controller } from "../types"

export class MotionController implements Controller {
  playerState: PlayerState
  sensor: LinearAccelerationSensor

  handleSensorRead: () => void

  constructor() {
    this.playerState = INITIAL_PLAYER_STATE

    this.sensor = new LinearAccelerationSensor({ frequency: 60 })

    this.handleSensorRead = () => {
      this.playerState.isLeaping = this.sensor.x > 15

      if (this.sensor.x < -10) {
        this.playerState.isCrouching = true

        setTimeout(() => {
          this.playerState.isCrouching = false
          this.onPlayerStateUpdate(this.playerState)
        }, 1000)
      }

      this.onPlayerStateUpdate(this.playerState)
    }
  }

  initialize() {
    this.sensor.addEventListener("reading", this.handleSensorRead)

    this.sensor.start()
  }

  cleanup() {
    this.sensor.removeEventListener("reading", this.handleSensorRead)

    this.sensor.stop()

    this.onPlayerStateUpdate(null)
  }

  onPlayerStateUpdate: (playerState: PlayerState) => void
}
