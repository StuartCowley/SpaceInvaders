const background = document.getElementById("gameBoard");
var ctx = background.getContext("2d");

window.addEventListener("keydown", movePlayer, false);

// Used to define initial offset off player and set boundaries, preventing player moving out of range
let deltaX = 0;
let deltaY = 0;
const keepElementInRange = (v, min, max) => {
  return Math.min(max, Math.max(min, v));
};

// console.log(keepPlayerInRange(00, 20, 100));

function movePlayer(k) {
  switch (k.keyCode) {
    case 37:
      // left key pressed
      deltaX -= 10;
      break;
    case 39:
      // right key pressed
      deltaX += 10;
      break;
  }
  k.preventDefault();
  drawPlayer();
}

// This is a square placeholder representing an alien element
function drawAlien() {
  ctx.clearRect(0, 0, background.width, 500);
  ctx.beginPath();
  ctx.moveTo(20 + deltaX, 20 + deltaY);
  ctx.lineTo(20 + deltaX, 60 + deltaY);
  ctx.lineTo(60 + deltaX, 60 + deltaY);
  ctx.lineTo(60 + deltaX, 20 + deltaY);
  ctx.closePath();
  ctx.fillStyle = "white";
  ctx.fill();
}

// This is a oblong placeholder representing the player element
function drawPlayer() {
  ctx.clearRect(0, 500, background.width, background.height);
  ctx.beginPath();
  deltaX = keepElementInRange(deltaX, -270, 270);
  ctx.moveTo(310 + deltaX, 600 + deltaY);
  ctx.lineTo(390 + deltaX, 600 + deltaY);
  ctx.lineTo(390 + deltaX, 540 + deltaY);
  ctx.lineTo(310 + deltaX, 540 + deltaY);
  ctx.fillStyle = "green";
  ctx.fill();
}
// ----------STU-SKETCHPAD------------------------------------------------------
// FUNCTION TO DESTROY ALIEN (called inside draw alien function?)
// Takes in coordinates of bullet, and reads position of aliens
// bulletPos = (X, Y)
// alienPos = (leftSide, bottom, rightSide)

// function killAlien(bulletPos, alienPos) {
//   if (
//     alienPos.left <= bulletPos.X &&
//     bulletPos.X <= alienPos.right &&
//     bulletPos.Y == alienPos.bottom
//   ) {
//     // kill alien
//   }
// }
// ----------------------------------------------------------------------------

// ----------STU-SKETCHPAD------------------------------------------------------
// MOVEMENT PATTERN FOR SINGLE ALIEN:
// Start position at top left, move right by 10% of page per time interval.
// When hit the end, move down by 10%. Then move left by 10% of page per time interval.
// Repeat until at alien hits a defined point (80% from top?)

// Modified version of drawAlien function which accepts coordinates on each run
// Initialize start coords
// let topLeft = 20;
// let bottomRight = 60;
// const size = 40;

// function modDrawAlien() {
//   ctx.clearRect(0, 0, background.width, 500);
//   ctx.beginPath();
//   ctx.moveTo(topLeft, topLeft);
//   ctx.lineTo(topLeft, topLeft + size);
//   ctx.lineTo(topLeft + size, topLeft + size);
//   ctx.lineTo(topLeft + size, topLeft);
//   ctx.closePath();
//   ctx.fillStyle = "white";
//   ctx.fill();
//   topLeft += 40;
// }

// setTimeout(modDrawAlien(), 10);

// -------------------------------------------------------------------------

// drawAlien();
// drawPlayer();
