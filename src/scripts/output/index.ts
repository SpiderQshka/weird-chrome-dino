import "@root/styles/reset.css"

import { io, Socket } from "socket.io-client"

import { Game } from "./entities/Game"
import { ClientToServerEvents, ServerToClientEvents } from "@root/scripts/types"
import { INITIAL_STATE } from "@root/scripts/constants"

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io()

const canvas = document.createElement("canvas")
document.body.appendChild(canvas)

const game = new Game(canvas)
game.start()

socket.on("state:updated", state => game.updateState(state))
socket.on("state:resetted", () => game.updateState(INITIAL_STATE))
