import { PlayerState } from "@root/scripts/types"
import { INITIAL_PLAYER_STATE } from "@root/scripts/constants"
import { Controller } from "../types"

export class MagnetometerController implements Controller {
  playerState: PlayerState
  sensor: Magnetometer

  initialSensorState: { x: number; y: number; z: number }

  handleSensorRead: () => void

  constructor() {
    this.playerState = INITIAL_PLAYER_STATE
    this.sensor = new Magnetometer({ frequency: 30 })

    this.handleSensorRead = () => {
      if (this.sensor.y < -200 || this.sensor.y > 200) return

      if (!this.initialSensorState) this.initialSensorState = { x: this.sensor.x, y: this.sensor.y, z: this.sensor.z }

      const deltaY = this.initialSensorState.y - this.sensor.y

      this.playerState.isLeaping = deltaY > 10
      this.playerState.isCrouching = deltaY < -10

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
