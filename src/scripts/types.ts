export interface PlayerState {
  isLeaping: boolean
  isCrouching: boolean
}

export interface GameState {
  isPaused: boolean
}

export interface ServerToClientEvents {
  "playerState:updated": (playerState: PlayerState) => void
  "gameState:updated": (gameState: GameState) => void
}

export interface ClientToServerEvents {
  "playerState:update": (playerState: PlayerState) => void
  "gameState:update": (gameState: GameState) => void
}
