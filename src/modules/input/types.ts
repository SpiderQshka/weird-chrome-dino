import { State } from "../../types"

export interface Controller {
  onUpdate: (state: State) => void
}
