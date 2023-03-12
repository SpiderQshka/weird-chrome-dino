const express = require("express")
const { createServer } = require("http")
const { Server } = require("socket.io")
const path = require("path")

const port = process.env.PORT || 3000

const app = express()

app.use(express.static(path.join(__dirname, "dist")))

app.get("/controller", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/controller.html"))
})

app.get("/presenter", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/presenter.html"))
})

const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: false,
  },
})

io.on("connection", socket => {
  socket.on("state:update", state => socket.broadcast.emit("state:updated", state))
})

httpServer.listen(port)
