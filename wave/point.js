export class Point {
  constructor(idx, x, y) {
    this.x = x;
    this.y = y;
    this.fixedY = y;
    this.speed = 0.1;
    this.cur = idx;
    this.max = Math.random() * 100 + 150;
  }

  update() {
    this.cur += this.speed;
    this.y = this.fixedY + Math.sin(this.cur) * this.max;
  }
}
