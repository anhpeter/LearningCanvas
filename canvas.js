const mouse = {
  x: undefined,
  y: undefined,
};
const canvas = document.querySelector("canvas");
canvas.addEventListener("mousemove", (e) => {
  const { x, y } = e;
  mouse.x = x;
  mouse.y = y;
});
canvas.addEventListener("mouseleave", (e) => {
  mouse.x = undefined;
  mouse.y = undefined;
});
updateCanvasSize();
window.addEventListener("resize", updateCanvasSize);
function updateCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
const c = canvas.getContext("2d");
//

class Circle {
  static colors = ["#355764", "#5A8F7B", "#FFEA11", "#81CACF"];
  constructor(x, y, dx, dy, radius) {
    this.color =
      Circle.colors[Math.floor(Math.random() * Circle.colors.length)];
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.maxRadius = 50;
    this.minRadius = radius;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = this.color;
    c.fill();
  }
  update() {
    if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    this.x += this.dx;
    //
    if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.y += this.dy;
    //
    const maxW = window.innerWidth - this.radius;
    if (this.x > maxW) {
      this.x = maxW + 0.00001;
    }
    const maxH = window.innerHeight - this.radius;
    if (this.y > maxH) {
      this.y = maxH + 0.00001;
    }
    //
    if (
      !!mouse.x &&
      mouse.y &&
      Math.abs(mouse.x - this.x) < 100 &&
      Math.abs(mouse.y - this.y) < 100
    ) {
      this.radius += this.radius < this.maxRadius ? 1 : 0;
    } else {
      this.radius -= this.radius > this.minRadius ? 1 : 0;
    }
    this.draw();
  }
}
const circleArr = [];
for (let i = 0; i < 500; i++) {
  const r = Math.random() * 10 + 2;
  const x = Math.random() * (window.innerWidth - r * 2) + r;
  const y = Math.random() * (window.innerHeight - r * 2) + r;
  const dx = (Math.random() - 0.5) * 8;
  const dy = (Math.random() - 0.5) * 8;
  circleArr.push(new Circle(x, y, dx, dy, r));
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  circleArr.forEach((circle) => {
    circle.update();
  });
}

animate();
