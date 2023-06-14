import "@root/styles/reset.css"
import "@root/styles/output.css"

import { io, Socket } from "socket.io-client"

import { Game } from "./entities/Game"
import { ClientToServerEvents, ServerToClientEvents } from "@root/scripts/types"
import { INITIAL_GAME_STATE, INITIAL_PLAYER_STATE } from "@root/scripts/constants"
import { initializePhotoElement } from "./helpers"

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io()

const canvas = document.createElement("canvas")
document.body.appendChild(canvas)

const game = new Game(canvas)
game.start()

socket.on("playerState:updated", playerState => game.updatePlayerState(playerState || INITIAL_PLAYER_STATE))
socket.on("gameState:updated", gameState => game.updateGameState(gameState || INITIAL_GAME_STATE))

const photoElement = initializePhotoElement()

socket.on("photo:updated", base64 => {
  photoElement.src = base64
  photoElement.style.opacity = base64 ? "0.5" : "0"
})
