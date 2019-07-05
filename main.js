const background = document.getElementById("gameBoard");
const ctx = background.getContext("2d");

// -------------------Ellies Alerts!-------------------

alert("Space Invaders!");
alert(
  "\n Rules: \n1. Press space to shoot \n2. Kill the aliens \n3. Don't get hit! \n Press Ok to start game."
);

//............Ellies attempt at 1 life OVER!!...................

let lives = 1;
document.getElementById("lifeLeft").innerHTML = lives;

// Variable to check if aliens are at bottom of screen
let aliensReachBottom = false;

// Describes if a player bullet is already on screen
let onScreen = false;

// Storage array for key pressed
let keys = {};

// Boolean to exit game if alien destroyed
let lost = false;
let won = false;

// Initial position of alien
let initialAlienPos = {
  topLeft: 0,
  level: 20,
  size: 60,
  direction: 1
};

// To describe initial position of player
let playerOffset = {
  deltaX: 0,
  deltaY: 0,
  deltaZ: 600,
  bulletPos: []
};

// Initialise array to define coordinates of ship bottom at any one time
let shipBottom = {
  xLeft: 0,
  yLeft: 0,
  xRight: 0,
  yRight: 0
};

// Initialise array to define bullet location at any one time
let bulletLocation = {
  xPos: 0,
  yPos: 500
};

import {
  movePlayer
} from './movementFunctions.js';

// Function to end game once alien reaches lower base or alien is destroyed
function endGame() {
  if (won == true) {
    alert("Fleet destroyed, you win!");
  } else if (aliensReachBottom == true) {
    clearInterval(gameBreak);
    lost = true;
    document.getElementById("lifeLeft").innerHTML = lives - 1;
    alert("Alien invasion complete, you lose!");
  }
}

// Function to set boundaries, prevents elements from moving out of min and max range
const keepElementInRange = (v, min, max) => {
  return Math.min(max, Math.max(min, v));
};

// Fire player bullet
const fire = () => {
  drawBullet(-5, 5);
};

const killAlien = () => {
  if (
    shipBottom.xLeft <= bulletLocation.xPos && // is bullet on right of alien left side
    shipBottom.xRight >= bulletLocation.xPos && // is bullet on left of alien right side
    bulletLocation.yPos <= shipBottom.yLeft && // is bullet above bottom of ship
    shipBottom.yLeft - initialAlienPos.size <= bulletLocation.yPos // is bullet below top of ship
  ) {
    console.log("hit");
    // won = true;
    // alert("You defeated the fleet!")
  } else {}
};

window.addEventListener("keydown", function (e) {
  keys[e.keyCode] = true;
  e.preventDefault();
});
window.addEventListener("keyup", function (e) {
  delete keys[e.keyCode];
});

function playerShoot() {
  playerOffset.bulletPos.push(playerOffset.deltaX);
  bulletLocation.xPos = playerOffset.deltaX + 350;
  onScreen = true;
  let stopBullet = setInterval(fire, 5);
  setTimeout(() => {
    clearInterval(stopBullet);
    onScreen = false;
    playerOffset.deltaZ = 600;
    playerOffset.bulletPos.pop();
    bulletLocation.yPos = 500;
  }, 1550);
}

window.addEventListener("keydown", function (e) {
  if (e.keyCode == 32) {
    if (onScreen == false) {
      playerShoot(playerOffset, bulletLocation, onScreen, ctx);
    } else {}
  }
  e.preventDefault();
});

// This is a oblong placeholder representing the player element
function drawPlayer() {
  const playerPic = new Image();
  playerPic.src = "./img/Laser_Cannon.png";
  ctx.clearRect(40 + playerOffset.deltaX, 600, background.width, 60);
  ctx.beginPath();
  playerOffset.deltaX = keepElementInRange(playerOffset.deltaX, -270, 270);
  ctx.drawImage(playerPic, 310 + playerOffset.deltaX, 600, 80, 60);
  // ctx.moveTo(310 + playerOffest.deltaX, 600);
  // ctx.lineTo(390 + playerOffest.deltaX, 600);
  // ctx.lineTo(390 + playerOffest.deltaX, 540);
  // ctx.lineTo(310 + playerOffest.deltaX, 540);
  // ctx.fillStyle = "green";
  // ctx.fill();
}

const drawAlien = () => {
  const alienPic1 = new Image();
  alienPic1.src = "./img/invaderPink.png";
  ctx.clearRect(
    initialAlienPos.topLeft - initialAlienPos.size * initialAlienPos.direction,
    initialAlienPos.level,
    initialAlienPos.size,
    initialAlienPos.size
  );
  shipBottom.xLeft = initialAlienPos.topLeft;
  shipBottom.yLeft = initialAlienPos.level + initialAlienPos.size;
  shipBottom.xRight = initialAlienPos.topLeft + initialAlienPos.size;
  shipBottom.yRight = initialAlienPos.level + initialAlienPos.size;
  if (initialAlienPos.topLeft > 590) {
    initialAlienPos.direction = -1;
    initialAlienPos.level += 40;
  } else if (initialAlienPos.topLeft < 60) {
    initialAlienPos.direction = 1;
    initialAlienPos.level += 40;
  }
  ctx.beginPath();
  ctx.drawImage(
    alienPic1,
    initialAlienPos.topLeft,
    initialAlienPos.level,
    initialAlienPos.size,
    initialAlienPos.size
  );
  // ctx.moveTo(initialAlienPos.topLeft, initialAlienPos.level);
  // ctx.lineTo(initialAlienPos.topLeft, initialAlienPos.level + initialAlienPos.size);
  // ctx.lineTo(initialAlienPos.topLeft + initialAlienPos.size, initialAlienPos.level + initialAlienPos.size);
  // ctx.lineTo(initialAlienPos.topLeft + initialAlienPos.size, initialAlienPos.level);
  // ctx.closePath();
  // ctx.fillStyle = "white";
  // ctx.fill();
  initialAlienPos.topLeft += initialAlienPos.size * initialAlienPos.direction;
  if (initialAlienPos.level > 470) {
    aliensReachBottom = true;
    endGame();
  }
};

function drawBullet(x, y) {
  ctx.clearRect(
    350 + playerOffset.bulletPos[0] - 5,
    playerOffset.deltaZ,
    20,
    20
  ); // Clear rectangle (Coordinates top left, bottom right)
  ctx.beginPath();
  ctx.moveTo(x + 350 + playerOffset.bulletPos[0], x + playerOffset.deltaZ); // Top left corner of bullet
  ctx.lineTo(x + 350 + playerOffset.bulletPos[0], y + playerOffset.deltaZ); // Bottom left corner of bullet
  ctx.lineTo(y + 350 + playerOffset.bulletPos[0], y + playerOffset.deltaZ); // Bottom right corner of bullet
  ctx.lineTo(y + 350 + playerOffset.bulletPos[0], x + playerOffset.deltaZ); // Top right corner of bullet
  ctx.closePath();
  ctx.fillStyle = "red";
  ctx.fill();
  playerOffset.deltaZ -= 2;
  bulletLocation.yPos = playerOffset.deltaZ;
  killAlien();
}

// To smooth out animation for player movement
function loop() {
  movePlayer(keys, playerOffset, drawPlayer);
  drawPlayer();
  endGame();
  window.requestAnimationFrame(loop);
}

const gameBreak = setInterval(drawAlien, 300); // was 600
loop();