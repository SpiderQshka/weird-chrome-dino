import { PlayerState } from "@root/scripts/types"
import { INITIAL_PLAYER_STATE } from "@root/scripts/constants"
import { Controller } from "../types"

export class AmbientLightController implements Controller {
  playerState: PlayerState
  sensor: AmbientLightSensor
  initialIlluminance: number

  handleSensorRead: () => void

  constructor() {
    this.playerState = INITIAL_PLAYER_STATE
    this.sensor = new AmbientLightSensor({ frequency: 30 })
    this.initialIlluminance = null

    this.handleSensorRead = () => {
      if (this.initialIlluminance === null) this.initialIlluminance = this.sensor.illuminance

      const deltaIlluminance = this.initialIlluminance - this.sensor.illuminance

      this.playerState.isLeaping = deltaIlluminance <= -300
      this.playerState.isCrouching = deltaIlluminance >= 300

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
