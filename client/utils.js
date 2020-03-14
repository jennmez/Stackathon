//** The purpose of this file is to make easy-to-call functions for actions that will be repeated. */

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

module.exports = { randomIntFromRange, randomColor };
