import { io, Socket } from "socket.io-client"
import { ClientToServerEvents, State, ServerToClientEvents } from "./types"
import { Game } from "./game"
import { AmbientLightController } from "./controllers"

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io()

const { pageType } = document.body.dataset

socket.on("connect", () => {
  console.log("Connected!")
})

if (pageType === "input") {
  const controller = new AmbientLightController()
  controller.onUpdate = (state: State) => socket.emit("state:update", state)
}

if (pageType === "output") {
  const game = new Game("game")

  game.start()

  socket.on("state:updated", state => game.updateState(state))
}
