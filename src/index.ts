import { io, Socket } from "socket.io-client"
import { ClientToServerEvents, State, ServerToClientEvents } from "./types"
import { Game } from "./game"
import { AmbientLightController } from "./controllers"

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io()

switch (document.body.dataset.pageType) {
  case "controller":
    const controller = new AmbientLightController()

    controller.onUpdate = (state: State) => socket.emit("state:update", state)
  case "presenter":
    const game = new Game("game")
    game.start()

    socket.on("state:updated", state => game.updateState(state))
}
