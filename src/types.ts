export interface State {
  isPaused: boolean
  player: {
    isJumping: boolean
    isLaying: boolean
  }
}

export interface ServerToClientEvents {
  "state:updated": (state: State) => void
}

export interface ClientToServerEvents {
  "state:update": (state: State) => void
}
