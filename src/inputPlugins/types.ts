import { State } from "../types";

export type PlayerState = {
  isJumping: boolean;
  isLaying: boolean;
};

export interface InputPlugin {
  initialize: (onChange: (state: State) => void) => void;
}
