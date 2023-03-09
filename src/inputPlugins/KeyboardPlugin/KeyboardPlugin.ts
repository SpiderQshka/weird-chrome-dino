import { State } from "../../types";
import { InputPlugin } from "../types";

const JUMP_KEY_CODES = ["Space"];
const LAY_KEY_CODES = ["ShiftLeft"];
const PAUSE_KEY_CODES = ["Enter"];

export class KeyboardPlugin implements InputPlugin {
  state: State;

  constructor() {
    this.state = {
      isPaused: false,
      player: { isJumping: false, isLaying: false },
    };
  }

  initialize(onChange: (state: State) => void) {
    document.addEventListener("keydown", ({ code }) => {
      if (JUMP_KEY_CODES.includes(code)) {
        this.state.player.isJumping = true;
      }

      if (LAY_KEY_CODES.includes(code)) {
        this.state.player.isLaying = true;
      }

      if (PAUSE_KEY_CODES.includes(code)) {
        this.state.isPaused = !this.state.isPaused;
      }

      onChange(this.state);
    });

    document.addEventListener("keyup", ({ code }) => {
      if (JUMP_KEY_CODES.includes(code)) {
        this.state.player.isJumping = false;
      }

      if (LAY_KEY_CODES.includes(code)) {
        this.state.player.isLaying = false;
      }

      onChange(this.state);
    });
  }
}
