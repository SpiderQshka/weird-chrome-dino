import { State } from "../types"

export const INITIAL_STATE: State = {
  isPaused: false,
  player: { isJumping: false, isLaying: false },
}
