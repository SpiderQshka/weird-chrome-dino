import { io, Socket } from "socket.io-client"

import { TextDetectionController } from "./controllers"
import { ClientToServerEvents, ServerToClientEvents } from "../../types"

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io()

const controller = new TextDetectionController()

controller.onUpdate = state => socket.emit("state:update", state)
