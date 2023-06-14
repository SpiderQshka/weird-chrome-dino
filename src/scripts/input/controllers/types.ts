import { PlayerState } from "@root/scripts/types"

export interface Controller {
  playerState: PlayerState
  onPlayerStateUpdate: (playerState: PlayerState) => void
  initialize: () => void
  cleanup: () => void
  onPhoto?: (base64: string) => void
}
