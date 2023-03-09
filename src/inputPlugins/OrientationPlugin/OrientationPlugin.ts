import { isNull } from "lodash";
import { State } from "../../types";
import { InputPlugin } from "../types";

export class OrientationPlugin implements InputPlugin {
  state: State;
  initialSensorState: { alpha: number; beta: number; gamma: number };

  constructor() {
    this.state = {
      isPaused: false,
      player: { isJumping: false, isLaying: false },
    };

    this.initialSensorState = null;
  }

  initialize(onChange: (state: State) => void) {
    window.addEventListener("deviceorientation", (e) => {
      if (isNull(this.initialSensorState)) this.initialSensorState = e;

      const deltaGamma = this.initialSensorState.gamma - e.gamma;

      this.state.player.isJumping = deltaGamma > 10;
      this.state.player.isLaying = deltaGamma < -5;

      onChange(this.state);
    });

    window.addEventListener("touchstart", () => {
      this.state.isPaused = !this.state.isPaused;

      onChange(this.state);
    });
  }
}
