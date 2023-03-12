const express = require("express")
const { createServer } = require("http")
const { Server } = require("socket.io")
const path = require("path")

const port = process.env.PORT || 3000

const app = express()

app.use(express.static(path.join(__dirname, "dist")))

app.get("/input", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/input.html"))
})

app.get("/output", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/output.html"))
})

const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: false,
  },
})

io.on("connection", socket => {
  const handleStateUpdate = state => {
    socket.broadcast.emit("state:updated", state)
  }

  socket.on("state:update", handleStateUpdate)
})

httpServer.listen(port)
