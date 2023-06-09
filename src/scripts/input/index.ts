import "@root/styles/reset.css"
import "@root/styles/input.css"

import { io, Socket } from "socket.io-client"

import {
  AmbientLightController,
  MagnetometerController,
  MotionController,
  OrientationController,
  SpeechController,
  FaceDetectionController,
} from "./controllers"
import { ClientToServerEvents, ServerToClientEvents } from "@root/scripts/types"
import { initializePauseButton, initializeControllerSelect } from "./helpers"

const controllers = {
  AmbientLightController,
  MagnetometerController,
  MotionController,
  OrientationController,
  SpeechController,
  FaceDetectionController,
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io()

initializeControllerSelect(controllers, playerState => socket.emit("playerState:update", playerState))
initializePauseButton(isPaused => socket.emit("gameState:update", { isPaused }))
