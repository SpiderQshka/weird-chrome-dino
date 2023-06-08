import { State } from "@root/scripts/types"
import { INITIAL_STATE } from "@root/scripts/constants"
import { Controller } from "./controllers/types"

export function initializeControllerSelect(
  controllers: { [key: string]: new () => Controller },
  onStateUpdate: (state: State) => void,
) {
  const select = document.createElement("select")

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

  document.body.appendChild(select)
}

export function createPauseButton(onClick: (isGamePaused: boolean) => void) {
  let isGamePaused = INITIAL_STATE.isGamePaused

  const handleClick = () => {
    onClick(isGamePaused)

    isGamePaused = !isGamePaused
  }

  const pauseButton = document.createElement("button")

  pauseButton.innerText = "Pause / Continue"

  pauseButton.addEventListener("click", handleClick)

  document.body.appendChild(pauseButton)
}
