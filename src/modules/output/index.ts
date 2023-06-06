import { io, Socket } from "socket.io-client"

import { Game } from "./entities/Game"
import { ClientToServerEvents, ServerToClientEvents } from "../../types"
import { INITIAL_STATE } from "../../constants"

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io()

const game = new Game()
game.start()

socket.on("state:updated", state => game.updateState(state))
socket.on("state:resetted", () => game.updateState(INITIAL_STATE))
