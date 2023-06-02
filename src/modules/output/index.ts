import { io, Socket } from "socket.io-client"

import { Game } from "./entities/Game"
import { ClientToServerEvents, ServerToClientEvents } from "../../types"

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io()

const game = new Game("game")
game.start()

socket.on("state:updated", state => game.updateState(state))
