import { State } from "../../types";
import { InputPlugin } from "../types";

export class AmbientLightPlugin implements InputPlugin {
  state: State;
  sensor: AmbientLightSensor;

  constructor() {
    this.state = {
      isPaused: false,
      player: { isJumping: false, isLaying: false },
    };

    this.sensor = new AmbientLightSensor();
  }

  initialize(onChange: (state: State) => void) {
    window.addEventListener("touchstart", () => {
      this.state.isPaused = !this.state.isPaused;

      onChange(this.state);
    });

    this.sensor.addEventListener("reading", () => {
      document.body.innerHTML = `illuminance: ${this.sensor.illuminance}`;

      onChange(this.state);
    });

    this.sensor.start();
  }
}
