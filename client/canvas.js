import { randomIntFromRange, randomColor, getDistance } from './utils';

// makes canvas from html tag
let canvas = document.getElementById('canvas');

// adjusts the canvas w & h to the window's height & width
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// used in all the shapes created
let ctx = canvas.getContext('2d');

let colorArray = ['#D6E2BE', '#C8E087', '#FC8C41', '#FFA582'];

let gravity = 1;
let friction = 0.9;

// tracks the 'x' 'y' coordinates
let mouse = {
  x: undefined,
  y: undefined,
};

// set a ball variable so it exists in the global scope, making it available to animate
let ball;
let ballArray = [];
let miniBallArray = [];

function init(ball) {
  ball.draw();
  ballArray.push(ball);

  if (ballArray.length === 5) {
    animate();
  }
}
// event listener for a mouse click
window.addEventListener('click', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
  //// reassigns variable we created to the new ball
  ball = new Ball(
    mouse.x,
    mouse.y,
    randomIntFromRange(30, 60),
    randomColor(colorArray),
    randomIntFromRange(-2, 2),
    randomIntFromRange(-2, 2)
  );
  init(ball);
});

window.addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// event listener to resize the window as the user resizes
window.addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

class Ball {
  constructor(x, y, radius, color, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = dx;
    this.dy = dy;
  }

  update() {
    // making sure our ball recognizes the "floor"
    if (this.y + this.radius + this.dy > canvas.height) {
      // making sure our ball's velocity slows down due to friction (fraction)
      this.dy = -this.dy * friction;
      this.shatter();
    } else {
      // increases the speed as the ball falls
      this.dy += gravity;
    }
    if (
      this.x + this.radius + this.dx > canvas.width ||
      this.x - this.radius <= 0
    ) {
      // making sure our ball's velocity slows down due to friction (fraction)
      this.dx = -this.dx;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
  shatter() {
    if (this.radius - 5 > 0) {
      this.radius -= 5;
    }
    for (let i = 0; i < 7; i++) {
      miniBallArray.push(new MiniBall(this.x, this.y, 4, '#FC9652'));
    }
  }
}

class MiniBall extends Ball {
  constructor(x, y, radius, color) {
    super(x, y, radius, color);
    this.dx = randomIntFromRange(-5, 5);
    this.dy = randomIntFromRange(-15, 15);
    this.gravity = 0.2;
    this.timeToLive = 100;
  }
  update() {
    this.draw();
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * friction;
    } else {
      this.dy += this.gravity;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.timeToLive -= 1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
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

  // ballArray.filter(ball => ball.radius - 5 > 0);
  ballArray.forEach((ball, index) => {
    ball.update();
    if (
      ball.radius === 0 ||
      ball.radius === 1 ||
      ball.radius === 2 ||
      ball.radius === 3 ||
      ball.radius === 4 ||
      ball.radius === 5
    ) {
      ballArray.splice(index, 1);
    }
  });

  miniBallArray.forEach((miniBall, index) => {
    miniBall.update();
    if (miniBall.timeToLive === 0) {
      miniBallArray.splice(index, 1);
    }
  });
}
