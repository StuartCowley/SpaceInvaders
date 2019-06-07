const background = document.getElementById("gameBoard");
var ctx = background.getContext("2d");

window.addEventListener("keydown", movePlayer, false);

// -------------------Ellies Alerts!-------------------

alert("Space Invaders!")
alert("\n Rules: \n1. Press enter to shoot \n2. Kill the aliens \n3. Don't get hit! \n Press Ok to start game.")
// alert("Winner!")

//............Ellies attempt at 1 life OVER!!...................

let lives = 1;
document.getElementById("lifeLeft").innerHTML = lives;

// Function to end game once alien reaches lower base
function endGame() {
  document.getElementById("lifeLeft").innerHTML = lives - 1
  alert("Alien invasion complete, you lose!", window.location.reload())
};


// Used to define initial offset of player
let deltaX = 0;
let deltaY = 0;
let deltaZ = 500;
let bulletPos = [];

// Initialise array to define coordinates of ship bottom at any one time
let shipBottom = {
  xLeft: 0,
  yLeft: 0,
  xRight: 0,
  yRight: 0
}

// Initialise array to define bullet location at any one time
let bulletLocation = {
  xPos: 0,
  yPos: 0
};

// Describes if a player bullet is already on screen
let onScreen = false;

// Boolean to exit game if alien destroyed 
let lost = false;
let won = false;

// Function to set boundaries, prevents elements from moving out of min and max range
const keepElementInRange = (v, min, max) => {
  return Math.min(max, Math.max(min, v));
};

// Fire player bullet
const fire = () => {
  drawBullet(-5, 5);
}

const killAlien = () => {
  // console.log(shipBottom.xLeft);
  // console.log(bulletLocation.yPos);
  // console.log('break');
  if (
    (shipBottom.xLeft < bulletLocation.xPos) &&
    (shipBottom.xRight > bulletLocation.xPos) &&
    (bulletLocation.yPos < shipBottom.yLeft) &&
    (shipBottom.yleft >= bulletLocation.yPos) &&
    (shipBottom.yleft - 120 <= bulletLocation.yPos)
  ) {
    console.log('winner!')
  } else {}
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
        bulletPos.push(deltaX);
        bulletLocation.xPos = deltaX + 350;
        onScreen = true;
        let stopBullet = setInterval(fire, 10);
        setTimeout(() => {
          clearInterval(stopBullet);
          onScreen = false;
          deltaZ = 500;
          bulletPos.pop()
          bulletLocation.yPos = 0;
        }, 2600)
      } else {}
  }
  k.preventDefault();
  drawPlayer();
}

// This is a oblong placeholder representing the player element
function drawPlayer() {
  ctx.clearRect(40 + deltaX, 540, background.width, 60);
  ctx.beginPath();
  deltaX = keepElementInRange(deltaX, -270, 270);
  ctx.moveTo(310 + deltaX, 600);
  ctx.lineTo(390 + deltaX, 600);
  ctx.lineTo(390 + deltaX, 540);
  ctx.lineTo(310 + deltaX, 540);
  ctx.fillStyle = "green";
  ctx.fill();
}

// Initial position of alien
let topLeft = 60;
let level = 20;
const size = 40;
let direction = 1;

// Function to end game once alien reaches lower base
function endGame() {
  clearInterval(gameBreak)
  lost = true;
  alert("Alien invasion complete, you lose!")
};

const drawAlien = () => {
  ctx.clearRect(topLeft - (size * direction), level, 40, 40);
  shipBottom.xLeft = topLeft;
  shipBottom.yLeft = level + size;
  shipBottom.xRight = topLeft + size;
  shipBottom.yRight = level + size;
  if (topLeft > 610) {
    direction = -1;
    level += 40
  } else if (topLeft < 60) {
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
  killAlien()
  if (level > 470) {
    endGame()
  }

}

const gameBreak = setInterval(drawAlien, 200);

function drawBullet(x, y) {

  ctx.clearRect(350 + bulletPos[0] - 5, deltaZ, 20, 20); // Clear rectangle (Coordinates top left, bottom right)
  ctx.beginPath();
  ctx.moveTo(x + 350 + bulletPos[0], x + deltaZ); // Top left corner of bullet
  ctx.lineTo(x + 350 + bulletPos[0], y + deltaZ); // Bottom left corner of bullet
  ctx.lineTo(y + 350 + bulletPos[0], y + deltaZ); // Bottom right corner of bullet
  ctx.lineTo(y + 350 + bulletPos[0], x + deltaZ); // Top right corner of bullet
  ctx.closePath();
  ctx.fillStyle = "red";
  ctx.fill();
  deltaZ -= 2;
  // console.log(deltaZ);
  bulletLocation.yPos = (deltaZ)
}

drawPlayer();