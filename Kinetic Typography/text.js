export class Text {
  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
  }

  setText(str, density, stageWidth, stageHeight) {
    this.canvas.width = stageWidth;
    this.canvas.height = stageHeight;

    const myText = str;
    const fontWidth = 700;
    const fontSize = 800;
    const fontName = "Hind";

    this.ctx.clearRect(0, 0, stageWidth, stageHeight);
    this.ctx.font = `${fontWidth} ${fontSize}px ${fontName}`;
    this.ctx.fillStyle = `rgba(0,0,0,0.3)`;
    this.ctx.textBaseline = `middle`;

    //텍스트에 대한 정보가 담긴 텍스트 메트릭스 객체를 반환한다.
    const fontPos = this.ctx.measureText(myText);

    //캔버스에 텍스트를 그림
    this.ctx.fillText(
      myText,
      (stageWidth - fontPos.width) / 2,
      fontPos.actualBoundingBoxAscent +
        fontPos.actualBoundingBoxDescent +
        (stageHeight - fontSize) / 2
    );

    return this.dotPos(density, stageWidth, stageHeight);
  }

  dotPos(density, stageWidth, stageHeight) {
    const imageData = this.ctx.getImageData(0, 0, stageWidth, stageHeight).data;

    const particles = [];
    let i = 0;
    let width = 0;
    let pixel;

    for (let height = 0; height < stageHeight; height += density) {
      ++i;
      const slide = i % 2 == 0;
      width = 0;

      if (slide == 1) {
        width += 6;
      }

      for (width; width < stageWidth; width += density) {
        pixel = imageData[(width + height * stageWidth) * 4 - 1];
        if (
          pixel != 0 &&
          width > 0 &&
          width < stageWidth &&
          height > 0 &&
          height < stageHeight
        ) {
          particles.push({
            x: width,
            y: height,
          });
        }
      }
    }
    return particles;
  }
}
