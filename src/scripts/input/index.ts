import "@root/styles/reset.css"

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
import { initializeControllersSelect } from "./helpers"

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

initializeControllersSelect(controllers, state => socket.emit("state:update", state))
