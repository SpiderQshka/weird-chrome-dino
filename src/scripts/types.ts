export interface State {
  isGamePaused?: boolean
  isJumping?: boolean
  isLaying?: boolean
}

export interface ServerToClientEvents {
  "state:updated": (state: State) => void
  "state:resetted": () => void
}

export interface ClientToServerEvents {
  "state:update": (state: State) => void
}
