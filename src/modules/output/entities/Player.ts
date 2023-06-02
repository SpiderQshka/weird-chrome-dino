import { Position, Size } from "../types"
import { GRAVITY, JUMP_FORCE } from "../constants"

type PlayerConfig = {
  position: Position
  size: Size
  canvasHeight: number
}

export class Player {
  x: number
  y: number
  width: number
  height: number

  dy: number
  jumpForce: number
  originalHeight: number
  grounded: boolean
  gravity: number
  canvasHeight: number

  state: {
    isJumping: boolean
    isLaying: boolean
  }

  constructor({ canvasHeight, position, size }: PlayerConfig) {
    this.x = position.x
    this.y = position.y
    this.width = size.width
    this.height = size.height

    this.dy = 0
    this.jumpForce = JUMP_FORCE
    this.originalHeight = size.height
    this.grounded = false
    this.gravity = GRAVITY
    this.canvasHeight = canvasHeight

    this.state = { isJumping: false, isLaying: false }
  }

  update() {
    this.stay()

    if (this.state.isJumping) this.jump()
    if (this.state.isLaying) this.lay()

    this.y += this.dy

    const isGrounded = this.y + this.height >= this.canvasHeight

    if (isGrounded) {
      this.grounded = true
      this.dy = 0
      this.y = this.canvasHeight - this.height
    } else {
      this.grounded = false
      this.dy += this.gravity
    }
  }

  jump() {
    if (!this.grounded) return

    this.dy = -this.jumpForce
  }

  lay() {
    this.height = this.originalHeight / 2
  }

  stay() {
    this.height = this.originalHeight
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.fillStyle = "#2b2d42"
    ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.closePath()
  }

  setCanvasHeight(canvasHeight: number) {
    this.canvasHeight = canvasHeight
  }
}
