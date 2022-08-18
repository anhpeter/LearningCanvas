const canvas = document.querySelector("canvas");
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
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }
  update() {
    if (this.y + this.radius > canvas.height) {
      this.dy = -this.dy * 0.8;
    } else {
      this.dy += 1;
    }
    this.y += this.dy;
    this.draw();
  }
}
const circleArr = [];
for (let i = 0; i < 1; i++) {
  const r = Math.random() * 10 + 2;
  const x = Math.random() * (window.innerWidth - r * 2) + r;
  const y = Math.random() * (window.innerHeight - r * 2) + r;
  //   const dx = (Math.random() - 0.5) * 8;
  //   const dy = (Math.random() - 0.5) * 8;
  circleArr.push(new Circle(300, 300, 0, 2, 30));
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  circleArr.forEach((circle) => {
    circle.update();
  });
}

animate();
