import { io, Socket } from "socket.io-client"
import { ClientToServerEvents, ServerToClientEvents } from "./types"
import { Game } from "./game"
import { KeyboardController } from "./controllers"

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io()

switch (document.body.dataset.pageType) {
  case "controller":
    const controller = new KeyboardController()

    controller.onUpdate = state => socket.emit("state:update", state)
  case "presenter":
    const game = new Game("game")
    game.start()

    socket.on("state:updated", state => game.updateState(state))
}
