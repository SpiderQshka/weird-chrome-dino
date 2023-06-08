import { Position, Size } from "../types"
import { GRAVITY, LEAP_FORCE } from "../gameConfig"

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
  leapForce: number
  originalHeight: number
  grounded: boolean
  gravity: number
  canvasHeight: number

  state: {
    isLeaping: boolean
    isCrouching: boolean
  }

  constructor({ canvasHeight, position, size }: PlayerConfig) {
    this.x = position.x
    this.y = position.y
    this.width = size.width
    this.height = size.height

    this.dy = 0
    this.leapForce = LEAP_FORCE
    this.originalHeight = size.height
    this.grounded = false
    this.gravity = GRAVITY
    this.canvasHeight = canvasHeight

    this.state = { isLeaping: false, isCrouching: false }
  }

  update() {
    this.stay()

    if (this.state.isLeaping) this.leap()
    if (this.state.isCrouching) this.crouch()

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

  leap() {
    if (!this.grounded) return

    this.dy = -this.leapForce
  }

  crouch() {
    this.height = this.originalHeight / 2
  }

  stay() {
    this.height = this.originalHeight
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.fillStyle = "#535353"
    ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.closePath()
  }

  setCanvasHeight(canvasHeight: number) {
    this.canvasHeight = canvasHeight
  }
}
