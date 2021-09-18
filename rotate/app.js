import { Triangle } from "./triangle.js";

class App {
  constructor() {
    //canvas 생성
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    //현재 표시 장치의 물리적 픽셀과 CSS 픽셀의 비율을 반환합니다
    //devicePixelRatio 속성은 HiDPI/Retina 디스플레이처럼 같은 객체를 그릴 때 더 많은 픽셀을 사용해 보다 선명한 이미지를 표현하는 화면과, 표준 디스플레이의 렌더링 차이에 대응할 때 유용합니다.
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    //resize 하면 resize 이벤트 동작
    window.addEventListener("resize", this.resize.bind(this), false);

    window.requestAnimationFrame(this.animate.bind(this));

    this.isDown = false;
    this.moveX = 0;
    this.offsetX = 0;

    document.addEventListener("mousedown", this.onDown.bind(this), false);
    document.addEventListener("mousemove", this.onMove.bind(this), false);
    document.addEventListener("mouseup", this.onUp.bind(this), false);
    this.resize();
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    this.triangle = new Triangle(
      this.stageWidth / 2,
      this.stageHeight + this.stageHeight / 4,
      this.stageHeight / 1.5,
      10
    );
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.moveX *= 0.92;

    this.triangle.animate(this.ctx, this.moveX);
  }

  onDown(e) {
    this.isDown = true;
    this.moveX = 15;
    this.offsetX = e.clientX;
  }

  onUp(e) {
    this.isDown = false;
  }

  onMove(e) {
    if (this.isDown) {
      this.moveX = e.clientX - this.offsetX;
      this.offsetX = e.clientX;
    }
  }
}

window.onload = () => {
  new App();
};
