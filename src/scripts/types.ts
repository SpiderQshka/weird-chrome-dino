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
  "photo:updated": (base64: string) => void
}

export interface ClientToServerEvents {
  "playerState:update": (playerState: PlayerState) => void
  "gameState:update": (gameState: GameState) => void
  "photo:update": (base64: string) => void
}
