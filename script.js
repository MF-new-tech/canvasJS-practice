const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

//  canvas to cover whole page, correct scaling when page loads (loads once on page load)
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const partcilesArray = [];

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
});

canvas.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

class Particle {
  constructor() {
    // this.x = mouse.x;
    // this.y = mouse.y;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5
    this.speedY = Math.random() * 3 - 1.5
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  draw() {
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 50, 0, Math.PI * 2);
    ctx.fill();
  }
}

const init = () => {
  for (let i = 0; i < 100; i++) {
    partcilesArray.push(new Particle())
  }
}

init()

const handleParticles = () => {
  for (let i = 0; i < partcilesArray.length; i++) {
    partcilesArray[i].update();
    partcilesArray[i].draw()
  }
}

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles()
  requestAnimationFrame(animate)
}

animate()