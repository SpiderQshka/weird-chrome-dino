import { io, Socket } from "socket.io-client"
import { ClientToServerEvents, State, ServerToClientEvents } from "./types"
import { Game } from "./game"
import { MotionController } from "./controllers"

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io()

switch (document.body.dataset.pageType) {
  case "controller":
    const controller = new MotionController()

    controller.onUpdate = (state: State) => socket.emit("state:update", state)
  case "presenter":
    const game = new Game("game")
    game.start()

    socket.on("state:updated", state => game.updateState(state))
}
