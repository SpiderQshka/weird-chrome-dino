import "@root/styles/reset.css"
import "@root/styles/input.css"

import { io, Socket } from "socket.io-client"

import {
  AmbientLightController,
  MagnetometerController,
  MotionController,
  SpeechController,
  FaceDetectionController,
  KeyboardController,
} from "./controllers"
import { ClientToServerEvents, ServerToClientEvents } from "@root/scripts/types"
import { initializePauseButton, initializeControllerSelect } from "./helpers"

const controllers = {
  AmbientLightController,
  MagnetometerController,
  MotionController,
  SpeechController,
  FaceDetectionController,
  KeyboardController,
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io()

initializeControllerSelect(
  controllers,
  playerState => socket.emit("playerState:update", playerState),
  base64 => socket.emit("photo:update", base64),
)
initializePauseButton(isPaused => socket.emit("gameState:update", { isPaused }))
