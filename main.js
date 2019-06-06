const background = document.getElementById("gameBoard");
var ctx = background.getContext("2d");

window.addEventListener("keydown", movePlayer, false);

// Used to define initial offset of player
let deltaX = 0;
let deltaY = 0;
let deltaZ = 500;

// Describes if a player bullet is already on screen
let onScreen = false;

// Function to set boundaries, prevents elements from moving out of min and max range
const keepElementInRange = (v, min, max) => {
  return Math.min(max, Math.max(min, v));
};

// Fire player bullet
const fire = () => {
  drawBullet(5, 7);
}

// Key listener
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
    case 32:
      //space bar pressed
      if (onScreen == false) {
        onScreen = true;
        let stopBullet = setInterval(fire, 200);
        setTimeout(() => {
          clearInterval(stopBullet);
          onScreen = false;
          deltaZ = 500;
        }, 5000)
      } else {}
  }
  k.preventDefault();
  drawPlayer();
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

// Initialize alien coord, size of alien, and level on the vertical axis

// Initial position of alien
let topLeft = 60;
let level = 20;
const size = 40;
let direction = 1;

// Function to end game once alien reaches lower base
function endGame() {
  clearInterval(gameBreak)
};

const drawAlien = () => {
  ctx.clearRect(topLeft - size, level, topLeft + size, level + size);
  console.log(level);
  console.log('break');
  if (topLeft > 610) {
    direction = -1;
    level += 40
  } else if (topLeft < 30) {
    direction = 1;
    level += 40
  }
  ctx.beginPath();
  ctx.moveTo(topLeft, level);
  ctx.lineTo(topLeft, level + size);
  ctx.lineTo(topLeft + size, level + size);
  ctx.lineTo(topLeft + size, level);
  ctx.closePath();
  ctx.fillStyle = "white";
  ctx.fill();
  topLeft += (40 * direction);
  if (level > 470) {
    endGame()
  }
}

// ------STU-SKETCHPAD------------------------------------------------------

const gameBreak = setInterval(drawAlien, 100);

// setInterval(drawAlien, 100)

function drawBullet(x, y) {

  ctx.clearRect(0, 0, background.width, 500); // Clear rectangle (Coordinates top left, bottom right)
  ctx.beginPath();
  ctx.moveTo(x + 350, x + deltaZ); // Corner A  301:601
  ctx.lineTo(x + 350, y + deltaZ); // Corner B  301:610
  ctx.lineTo(y + 350, y + deltaZ); // Corner C  310:610
  ctx.lineTo(y + 350, x + deltaZ); // Corner D  310:601
  ctx.closePath();
  ctx.fillStyle = "red";
  ctx.fill();
  deltaZ += -10
}

drawPlayer();