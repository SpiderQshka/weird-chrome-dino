import { GameState, PlayerState } from "./types"

export const INITIAL_PLAYER_STATE: PlayerState = {
  isLeaping: false,
  isCrouching: false,
}

export const INITIAL_GAME_STATE: GameState = {
  isPaused: true,
}
