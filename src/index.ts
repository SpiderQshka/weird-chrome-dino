import { io, Socket } from "socket.io-client"

import { Game } from "./entities"
import { KeyboardController } from "./controllers"
import { ClientToServerEvents, ServerToClientEvents } from "./types"

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io()

export const initializeController = () => {
  const controller = new KeyboardController()

  controller.onUpdate = state => socket.emit("state:update", state)
}

export const initializePresenter = () => {
  const game = new Game("game")

  game.start()

  socket.on("state:updated", state => game.updateState(state))
}
