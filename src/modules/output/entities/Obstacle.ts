import { Position, Size } from "../types"

type ObstacleConfig = {
  position: Position
  size: Size
  gameSpeed: number
}

export class Obstacle {
  x: number
  y: number
  width: number
  height: number

  dx: number

  constructor({ gameSpeed, position, size }: ObstacleConfig) {
    this.x = position.x
    this.y = position.y
    this.width = size.width
    this.height = size.height

    this.dx = -gameSpeed
  }

  update() {
    this.x += this.dx
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.fillStyle = "#2b2d42"
    ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.closePath()
  }
}
