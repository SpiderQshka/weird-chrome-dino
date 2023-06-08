const express = require("express")
const { createServer } = require("http")
const { Server } = require("socket.io")
const path = require("path")

const app = express()

app.use(express.static(path.join(__dirname, "build")))

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"))
})

app.get("/input", (req, res) => {
  res.sendFile(path.join(__dirname, "build/input.html"))
})

app.get("/output", (req, res) => {
  res.sendFile(path.join(__dirname, "build/output.html"))
})

const httpServer = createServer(app)

const io = new Server(httpServer)

io.on("connection", socket => {
  socket.on("playerState:update", state => socket.broadcast.emit("playerState:updated", state))
  socket.on("gameState:update", state => socket.broadcast.emit("gameState:updated", state))

  socket.on("disconnecting", () => {
    socket.broadcast.emit("playerState:updated", null)
    socket.broadcast.emit("gameState:updated", null)
  })
})

httpServer.listen(3000)
