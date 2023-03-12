import { Position } from "./types"

type TScoreConfig = {
  position: Position
}

export class Score {
  score: number
  x: number
  y: number

  constructor({ position }: TScoreConfig) {
    this.score = 0
    this.x = position.x
    this.y = position.y
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.fillStyle = "#212121"
    ctx.font = "20px sans-serif"
    ctx.fillText(`Score: ${this.score}`, this.x, this.y)
    ctx.closePath()
  }

  update() {
    this.score++
  }

  reset() {
    this.score = 0
  }
}
