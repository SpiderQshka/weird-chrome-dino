import { State } from "../../types"
import { Controller } from "./types"

export function initializeControllersSelect(
  controllers: { [key: string]: new () => Controller },
  onStateUpdate: (state: State) => void,
) {
  const select: HTMLSelectElement = document.querySelector("select")

  const emptyOption = document.createElement("option")

  emptyOption.value = null
  emptyOption.innerText = "Choose your fighter!"

  select.appendChild(emptyOption)

  Object.keys(controllers).forEach(key => {
    const option = document.createElement("option")

    option.value = key
    option.innerText = key

    select.appendChild(option)
  })

  let controller: Controller

  select.onchange = e => {
    controller?.cleanup()

    const target = e.target as HTMLSelectElement

    const Controller = controllers[target.value]

    if (!Controller) return

    controller = new Controller()

    controller.initialize()
    controller.onStateUpdate = onStateUpdate
  }
}
