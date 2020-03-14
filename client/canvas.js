import { randomIntFromRange, randomColor } from './utils';

// makes canvas from html tag
let canvas = document.getElementById('canvas');

// adjusts the canvas w & h to the window's height & width
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// used in all the shapes created
let ctx = canvas.getContext('2d');

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

let gravity = 1;
let friction = 0.99;

// tracks the 'x' 'y' coordinates
let mouse = {
  x: undefined,
  y: undefined,
};

// event listener for a mouse move
// window.addEventListener('mousemove', function(event) {
//   mouse.x = event.x;
//   mouse.y = event.y;
// });

// set a circle variable so it exists in the global scope, making it available to animate
let circle;

// event listener for a mouse click
window.addEventListener('click', function(event) {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  mouse.x = event.x;
  mouse.y = event.y;
  //// reassigns circle to the variable we created
  circle = new Ball(mouse.x, mouse.y, 2, radius, color);
  //// draws it
  circle.draw();
  //// starts that animation!
  animate();
});

// event listener to resize the window as the user resizes
window.addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

class Ball {
  constructor(x, y, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  update() {
    // making sure our ball recognizes the "floor"
    if (this.y + this.radius + this.dy > canvas.height) {
      // making sure our ball's velocity slows down due to friction (fraction)
      this.dy = -this.dy * friction;
    } else {
      // increases the speed as the ball falls
      this.dy += gravity;
    }
    this.y += this.dy;
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
// const circle = new Ball(300, 300, 2, radius, color);

function animate() {
  // calls the animate function through request
  requestAnimationFrame(animate);
  // clears the canvas with each movement
  // without it, you'll have a trail
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circle.update();
}
