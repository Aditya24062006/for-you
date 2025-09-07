let highestZ = 1;

class Paper {
  constructor(paper) {
    this.paper = paper;
    this.holding = false;
    this.touchX = 0;
    this.touchY = 0;
    this.prevX = 0;
    this.prevY = 0;
    this.velX = 0;
    this.velY = 0;
    this.rotation = Math.random() * 30 - 15;
    this.posX = 0;
    this.posY = 0;

    this.init();
  }

  move(x, y) {
    this.velX = x - this.prevX;
    this.velY = y - this.prevY;

    if (this.holding) {
      this.posX += this.velX;
      this.posY += this.velY;
      this.paper.style.transform = `translate(${this.posX}px, ${this.posY}px) rotate(${this.rotation}deg)`;
    }

    this.prevX = x;
    this.prevY = y;
  }

  init() {
    // Mouse events
    this.paper.addEventListener('mousedown', (e) => {
      this.holding = true;
      this.paper.style.zIndex = highestZ++;
      this.prevX = e.clientX;
      this.prevY = e.clientY;
    });

    document.addEventListener('mousemove', (e) => {
      this.move(e.clientX, e.clientY);
    });

    document.addEventListener('mouseup', () => {
      this.holding = false;
    });

    // Touch events
    this.paper.addEventListener('touchstart', (e) => {
      this.holding = true;
      this.paper.style.zIndex = highestZ++;
      const touch = e.touches[0];
      this.prevX = touch.clientX;
      this.prevY = touch.clientY;
    });

    document.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      this.move(touch.clientX, touch.clientY);
    });

    document.addEventListener('touchend', () => {
      this.holding = false;
    });
  }
}

document.querySelectorAll('.paper').forEach(paper => new Paper(paper));