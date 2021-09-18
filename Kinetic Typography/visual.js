import { Text } from "./text.js";
import { Particle } from "./particle.js";

export const RANDOM_TEXT = "ABCMNRSTUXZ";

export class Visual {
  constructor() {
    this.text = new Text();

    this.textArr = RANDOM_TEXT.split("");

    this.particle = [];

    this.mouse = {
      x: 0,
      y: 0,
      radius: 100,
    };

    document.addEventListener("pointermove", this.onMove.bind(this), false);
  }

  show(stageWidth, stageHeight) {
    const str =
      this.textArr[Math.round(Math.random() * (this.textArr.length - 1))];
    this.pos = this.text.setText(str, 26, stageWidth, stageHeight);
    this.particle = [];

    for (let i = 0; i < this.pos.length; i++) {
      const item = new Particle(this.pos[i]);
      this.particle.push(item);
    }
  }

  animate(ctx, t) {
    for (let i = 0; i < this.particle.length; i++) {
      const item = this.particle[i];

      const dx = this.mouse.x - item.x;
      const dy = this.mouse.y - item.y;
      const dist = Math.sqrt(dx ** 2 + dy ** 2);
      const minDist = item.radius + this.mouse.radius;

      if (dist < minDist) {
        const angle = Math.atan2(dy, dx);
        const tx = item.x + Math.cos(angle) * minDist;
        const ty = item.y + Math.sin(angle) * minDist;
        const ax = tx - this.mouse.x;
        const ay = ty - this.mouse.y;

        item.vx -= ax;
        item.vy -= ay;
        item.collide();
      }
      item.draw(ctx, t);
    }
  }

  onMove(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }
}
