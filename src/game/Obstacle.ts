import { Position, Size } from "./types";

type TObstacleConfig = {
  position: Position;
  size: Size;
  gameSpeed: number;
};

export class Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;

  dx: number;

  constructor({ gameSpeed, position, size }: TObstacleConfig) {
    this.x = position.x;
    this.y = position.y;
    this.width = size.width;
    this.height = size.height;

    this.dx = -gameSpeed;
  }

  update() {
    this.x += this.dx;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = "#2484E4";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.closePath();
  }
}
