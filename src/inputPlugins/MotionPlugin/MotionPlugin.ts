import { State } from "../../types";
import { InputPlugin } from "../types";

export class MotionPlugin implements InputPlugin {
  state: State;
  sensor: LinearAccelerationSensor;
  summaryZAcceleration: number;

  constructor() {
    this.state = {
      isPaused: false,
      player: { isJumping: false, isLaying: false },
    };

    this.sensor = new LinearAccelerationSensor();

    this.summaryZAcceleration = 0;
  }

  initialize(onChange: (state: State) => void) {
    window.addEventListener("touchstart", () => {
      this.state.isPaused = !this.state.isPaused;

      onChange(this.state);
    });

    this.sensor.addEventListener("reading", () => {
      const { z } = this.sensor;

      this.summaryZAcceleration += z;

      document.body.innerHTML = `${this.summaryZAcceleration}`;

      const isJumping = this.summaryZAcceleration > 10;
      const isLaying = this.summaryZAcceleration < -10;

      // this.state.player.isJumping = z > 5;
      this.state.player.isJumping = isJumping;

      // if (!this.state.player.isLaying && z < -5) {
      //   this.state.player.isLaying = true;

      //   setTimeout(() => {
      //     this.state.player.isLaying = false;
      //     onChange(this.state);
      //   }, 1000);
      // }

      if (!this.state.player.isLaying && isLaying) {
        this.state.player.isLaying = true;

        setTimeout(() => {
          this.state.player.isLaying = false;
          onChange(this.state);
        }, 1000);
      }

      if (isJumping || isLaying) this.summaryZAcceleration = 0;

      onChange(this.state);
    });

    this.sensor.start();
  }
}
