const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

//  canvas to cover whole page, correct scaling when page loads (loads once on page load)
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const partcilesArray = [];
let hue = 0;

//  handles canvas resizing when a user changes page dimensions
window.addEventListener("resize", () => {
  //  resets canvas when resize occurs
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const mouse = {
  x: undefined,
  y: undefined,
};

canvas.addEventListener("click", (event) => {
  // sets x, y coordinates globally
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 5; i++) {
    partcilesArray.push(new Particle());
  }
});

canvas.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 10; i++) {
    partcilesArray.push(new Particle());
  }
});

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random() * 15 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = "hsl(" + hue + ", 100%, 50%)";
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) {
      this.size -= 0.1;
    }
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const handleParticles = () => {
  for (let i = 0; i < partcilesArray.length; i++) {
    partcilesArray[i].update();
    partcilesArray[i].draw();

    for (let j = i; j < partcilesArray.length; j++) {
      const dx = partcilesArray[i].x - partcilesArray[j].x;
      const dy = partcilesArray[i].y - partcilesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        ctx.beginPath(); // draw a line
        ctx.strokeStyle = partcilesArray[i].color;
        ctx.lineWidth = 0.2;
        ctx.moveTo(partcilesArray[i].x, partcilesArray[i].y);
        ctx.lineTo(partcilesArray[j].x, partcilesArray[j].y);
        ctx.stroke(); // actually draw line on canvas
        ctx.closePath();
      }
    }
    if (partcilesArray[i].size <= 0.3) {
      partcilesArray.splice(i, 1);
      i--;
    }
  }
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.fillStyle = "rgba(0, 0, 0, 0.02)";
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  hue += 2;
  requestAnimationFrame(animate);
};

animate();
