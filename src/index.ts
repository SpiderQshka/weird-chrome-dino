import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, State, ServerToClientEvents } from "./types";
import { Game } from "./game";
import { MotionPlugin } from "./inputPlugins";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();

const { pageType } = document.body.dataset;

socket.on("connect", () => {
  console.log("Connected!");
});

if (pageType === "input") {
  const handleChange = (state: State) => socket.emit("state:update", state);

  const inputPlugin = new MotionPlugin();

  inputPlugin.initialize(handleChange);
}

if (pageType === "output") {
  const game = new Game("game");

  game.start();

  socket.on("state:updated", (state) => game.updateState(state));
}
