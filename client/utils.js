//** The purpose of this file is to make easy-to-call functions for actions that will be repeated. */

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function getDistance(x1, y1, x2, y2) {
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;

  // Pythagorean theorem to get the distance between the two points
  // Find the square root(distance raised to power of 2 for x & y)
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

module.exports = { randomIntFromRange, randomColor };
