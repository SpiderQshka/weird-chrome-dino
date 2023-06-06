import { Score } from "./Score"
import { Obstacle } from "./Obstacle"
import { Player } from "./Player"
import { GAME_SPEED, GAME_SPEED_FACTOR, INITIAL_SPAWN_TIMER, MIN_SPAWN_TIMER } from "../gameConfig"
import { State } from "@root/scripts/types"

export class Game {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  score: Score
  player: Player
  obstacles: Obstacle[]
  gameSpeed: number
  isGamePaused: boolean

  spawnTimer: number

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext("2d")

    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.canvas.style.display = "block"
    this.canvas.style.backgroundColor = "#f7f7f7"

    this.player = new Player({
      canvasHeight: this.canvas.height,
      position: { x: 25, y: this.canvas.height },
      size: { width: 100, height: 100 },
    })

    this.score = new Score({
      position: { x: 25, y: 50 },
    })

    this.obstacles = []
    this.gameSpeed = GAME_SPEED
    this.spawnTimer = INITIAL_SPAWN_TIMER

    window.addEventListener("resize", e => {
      const window = e.target as Window

      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight

      this.player.setCanvasHeight(this.canvas.height)
    })
  }

  main() {
    requestAnimationFrame(() => this.main())

    if (this.isGamePaused) return

    this.update()
    this.render()
  }

  start() {
    this.main()
  }

  update() {
    this.spawnTimer--

    // Spawn obstacle when it's time to
    if (this.spawnTimer <= 0) {
      const size = { width: 50, height: 50 }
      const isFlying = Math.random() < 0.5

      const position = {
        x: this.canvas.width - size.width,
        y: this.canvas.height - size.height,
      }

      if (isFlying) position.y = position.y - this.player.originalHeight * 0.75

      const obstacle = new Obstacle({
        gameSpeed: this.gameSpeed,
        position,
        size,
      })

      this.obstacles.push(obstacle)

      this.spawnTimer = INITIAL_SPAWN_TIMER - this.gameSpeed * GAME_SPEED_FACTOR

      if (this.spawnTimer < MIN_SPAWN_TIMER) this.spawnTimer = MIN_SPAWN_TIMER
    }

    // Remove out-of-bounds obstacles
    this.obstacles = this.obstacles.filter(({ x, width }) => x + width >= 0)

    // Calculate is game over, if so - reset score, obstacles, spawn timer and game speed
    const isGameOver = this.obstacles.some(
      ({ x, y, width, height }) =>
        this.player.x < x + width &&
        this.player.x + this.player.width > x &&
        this.player.y < y + height &&
        this.player.y + this.player.height > y,
    )

    if (isGameOver) {
      this.obstacles = []
      this.score.reset()
      this.spawnTimer = INITIAL_SPAWN_TIMER
      this.gameSpeed = GAME_SPEED
    }

    // Update player, obstacles and score
    this.obstacles.forEach(obstacle => obstacle.update())
    this.player.update()
    this.score.update()

    this.gameSpeed += 0.003
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.obstacles.forEach(obstacle => obstacle.render(this.ctx))
    this.player.render(this.ctx)
    this.score.render(this.ctx)
  }

  updateState({ isGamePaused, isJumping, isLaying }: State) {
    this.isGamePaused = isGamePaused
    this.player.state = { isJumping, isLaying }
  }
}
