import { randomIntFromRange, randomColor } from './utils';

let canvas = document.getElementById('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d');

// tracks the 'x' 'y' coordinates
let mouse = {
  x: undefined,
  y: undefined,
};

// random circle size generator
let radius = randomIntFromRange(30, 60);

//random color generator
let color = randomColor([
  '#E8871E',
  '#EDB458',
  '#D4D4AA',
  '#BAD4AA',
  '#EBF5DF',
]);

// event listener for a mouse move
window.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

// event listener for a mouse click
window.addEventListener('click', function(event) {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  mouse.x = event.x;
  mouse.y = event.y;

  //// creates a circle on the mouse click
  const circle = new Ball(mouse.x, mouse.y, radius, color);
  circle.update();
});

// event listener to resize the window as the user resizes
window.addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

class Ball {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  update() {
    this.draw();
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

function animate() {
  // calls the animate function through request
  requestAnimationFrame(animate);
  // clears the canvas with each movement
  // without it, you'll have a trail
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
