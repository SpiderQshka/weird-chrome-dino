import { isNull } from "lodash";
import { State } from "../../types";
import { InputPlugin } from "../types";

export class MagnetometerPlugin implements InputPlugin {
  state: State;
  sensor: Magnetometer;
  initialSensorState: { x: number; y: number; z: number };

  constructor() {
    this.state = {
      isPaused: false,
      player: { isJumping: false, isLaying: false },
    };

    this.sensor = new Magnetometer();
    this.initialSensorState = null;
  }

  initialize() {
    window.addEventListener("touchstart", () => {
      this.state.isPaused = !this.state.isPaused;
    });

    this.sensor.addEventListener("reading", () => {
      if (isNull(this.initialSensorState))
        setTimeout(
          () =>
            (this.initialSensorState = {
              x: this.sensor.x,
              y: this.sensor.y,
              z: this.sensor.z,
            }),
          500
        );

      const deltaY = this.initialSensorState.y - this.sensor.y;

      this.state.player.isJumping = deltaY > 20;
      this.state.player.isLaying = deltaY < -5;
    });

    this.sensor.start();
  }
}
