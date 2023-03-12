import { State } from "../../types";
import { INITIAL_STATE } from "../constants";
import { Controller } from "../types";

const JUMP_KEY_CODES = ["Space"];
const LAY_KEY_CODES = ["ShiftLeft"];
const PAUSE_KEY_CODES = ["Enter"];

export class KeyboardController implements Controller {
  state: State;

  constructor() {
    this.state = INITIAL_STATE;

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

      this.onUpdate(this.state);
    });

    document.addEventListener("keyup", ({ code }) => {
      if (JUMP_KEY_CODES.includes(code)) {
        this.state.player.isJumping = false;
      }

      if (LAY_KEY_CODES.includes(code)) {
        this.state.player.isLaying = false;
      }

      this.onUpdate(this.state);
    });
  }

  onUpdate: (state: State) => void;
}
