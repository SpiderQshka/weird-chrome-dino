import { State } from "@root/scripts/types"

export interface Controller {
  state: State
  onStateUpdate: (state: State) => void
  initialize: () => void
  cleanup: () => void
}
