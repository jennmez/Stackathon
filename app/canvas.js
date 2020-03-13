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
let radius = Math.floor(Math.random() * 100 + 1);

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
  console.log(radius);
  // creates a circle on the mouse click
  ctx.beginPath();
  ctx.arc(mouse.x, mouse.y, radius, 0, Math.PI * 2, false);
  ctx.strokeStyle = '#214E34';
  ctx.stroke();
});
