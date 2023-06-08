import "@root/styles/reset.css"
import "@root/styles/input.css"

import { io, Socket } from "socket.io-client"

import {
  AmbientLightController,
  KeyboardController,
  MagnetometerController,
  MotionController,
  OrientationController,
  SpeechController,
  TextDetectionController,
} from "./controllers"
import { ClientToServerEvents, ServerToClientEvents } from "@root/scripts/types"
import { initializePauseButton, initializeControllerSelect } from "./helpers"

const controllers = {
  AmbientLightController,
  KeyboardController,
  MagnetometerController,
  MotionController,
  OrientationController,
  SpeechController,
  TextDetectionController,
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io()

initializeControllerSelect(controllers, playerState => socket.emit("playerState:update", playerState))
initializePauseButton(isPaused => socket.emit("gameState:update", { isPaused }))
