import { io, Socket } from "socket.io-client"

import { Game } from "./entities"
import { TextDetectionController } from "./controllers"
import { ClientToServerEvents, ServerToClientEvents } from "./types"

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io()

switch (document.body.dataset.pageType) {
  case "controller":
    const controller = new TextDetectionController()

    controller.onUpdate = state => socket.emit("state:update", state)
  case "presenter":
    const game = new Game("game")
    game.start()

    socket.on("state:updated", state => game.updateState(state))
}
