import { Position } from "../types"

type ScoreConfig = {
  position: Position
}

export class Score {
  score: number
  x: number
  y: number

  constructor({ position }: ScoreConfig) {
    this.score = 0
    this.x = position.x
    this.y = position.y
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.fillStyle = "#535353"
    ctx.font = "30px sans-serif"
    ctx.fillText(`${this.score}`, this.x, this.y)
    ctx.closePath()
  }

  update() {
    this.score++
  }

  reset() {
    this.score = 0
  }
}
