import { PlayerState } from "@root/scripts/types"
import { INITIAL_GAME_STATE } from "@root/scripts/constants"
import { Controller } from "./controllers/types"

export function initializeControllerSelect(
  controllers: { [key: string]: new () => Controller },
  onPlayerStateUpdate: (playerState: PlayerState) => void,
  onPhoto: (base64: string) => void,
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
    controller.onPlayerStateUpdate = onPlayerStateUpdate
    controller.onPhoto = onPhoto
  }

  document.body.appendChild(select)
}

export function initializePauseButton(onClick: (isPaused: boolean) => void) {
  let isPaused = INITIAL_GAME_STATE.isPaused

  const pauseButton = document.createElement("button")

  pauseButton.innerText = "Pause / Continue"

  pauseButton.addEventListener("click", () => onClick((isPaused = !isPaused)))

  document.body.appendChild(pauseButton)
}
