import "@root/styles/reset.css"

import { io, Socket } from "socket.io-client"

import { Game } from "./entities/Game"
import { ClientToServerEvents, ServerToClientEvents } from "@root/scripts/types"
import { INITIAL_GAME_STATE, INITIAL_PLAYER_STATE } from "@root/scripts/constants"

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io()

const canvas = document.createElement("canvas")
document.body.appendChild(canvas)

const game = new Game(canvas)
game.start()

socket.on("playerState:updated", playerState => game.updatePlayerState(playerState || INITIAL_PLAYER_STATE))
socket.on("gameState:updated", gameState => game.updateGameState(gameState || INITIAL_GAME_STATE))
