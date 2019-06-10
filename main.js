const background = document.getElementById("gameBoard");
var ctx = background.getContext("2d");

// -------------------Ellies Alerts!-------------------

alert("Space Invaders!");
alert(
  "\n Rules: \n1. Press space to shoot \n2. Kill the aliens \n3. Don't get hit! \n Press Ok to start game."
);

//............Ellies attempt at 1 life OVER!!...................

let lives = 1;
document.getElementById("lifeLeft").innerHTML = lives;

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

// Used to define initial offset of player
let deltaX = 0;
let deltaY = 0;
let deltaZ = 600;
let bulletPos = [];

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

// Variable to check if aliens are at bottom of screen
let aliensReachBottom = false;

// Describes if a player bullet is already on screen
let onScreen = false;

// Storage array for key pressed
let keys = {};

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
};

const killAlien = () => {
  if (
    shipBottom.xLeft <= bulletLocation.xPos && // is bullet on right of alien left side
    shipBottom.xRight >= bulletLocation.xPos && // is bullet on left of alien right side
    bulletLocation.yPos <= shipBottom.yLeft && // is bullet above bottom of ship
    shipBottom.yLeft - size <= bulletLocation.yPos // is bullet below top of ship
  ) {
    console.log("hit");
    // won = true;
    // alert("You defeated the fleet!")
  } else {
  }
};

window.addEventListener("keydown", function(e) {
  keys[e.keyCode] = true;
  e.preventDefault();
});
window.addEventListener("keyup", function(e) {
  delete keys[e.keyCode];
});

window.addEventListener("keydown", function(e) {
  if (e.keyCode == 32) {
    if (onScreen == false) {
      bulletPos.push(deltaX);
      bulletLocation.xPos = deltaX + 350;
      onScreen = true;
      let stopBullet = setInterval(fire, 5);
      setTimeout(() => {
        clearInterval(stopBullet);
        onScreen = false;
        deltaZ = 600;
        bulletPos.pop();
        bulletLocation.yPos = 500;
      }, 1550);
    } else {
    }
  }
  e.preventDefault();
});

// Key listener for player movement
function movePlayer() {
  if (37 in keys) {
    deltaX -= 10;
  } else if (39 in keys) {
    deltaX += 10;
  }
  drawPlayer();
}

// This is a oblong placeholder representing the player element
function drawPlayer() {
  const playerPic = new Image();
  playerPic.src = "./img/Laser_Cannon.png";
  ctx.clearRect(40 + deltaX, 600, background.width, 60);
  ctx.beginPath();
  deltaX = keepElementInRange(deltaX, -270, 270);
  ctx.drawImage(playerPic, 310 + deltaX, 600, 80, 60);
  // ctx.moveTo(310 + deltaX, 600);
  // ctx.lineTo(390 + deltaX, 600);
  // ctx.lineTo(390 + deltaX, 540);
  // ctx.lineTo(310 + deltaX, 540);
  // ctx.fillStyle = "green";
  // ctx.fill();
}

// Initial position of alien
let topLeft = 0;
let level = 20;
const size = 60;
let direction = 1;

const drawAlien = () => {
  const alienPic1 = new Image();
  alienPic1.src = "./img/invaderPink.png";
  ctx.clearRect(topLeft - size * direction, level, size, size);
  shipBottom.xLeft = topLeft;
  shipBottom.yLeft = level + size;
  shipBottom.xRight = topLeft + size;
  shipBottom.yRight = level + size;
  if (topLeft > 590) {
    direction = -1;
    level += 40;
  } else if (topLeft < 60) {
    direction = 1;
    level += 40;
  }
  ctx.beginPath();
  ctx.drawImage(alienPic1, topLeft, level, size, size);
  // ctx.moveTo(topLeft, level);
  // ctx.lineTo(topLeft, level + size);
  // ctx.lineTo(topLeft + size, level + size);
  // ctx.lineTo(topLeft + size, level);
  // ctx.closePath();
  // ctx.fillStyle = "white";
  // ctx.fill();
  topLeft += size * direction;
  if (level > 470) {
    aliensReachBottom = true;
    endGame();
  }
};

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
  bulletLocation.yPos = deltaZ;
  killAlien();
}

// To smooth out animation for player movement
function loop() {
  movePlayer();
  drawPlayer();
  endGame();
  window.requestAnimationFrame(loop);
}

const gameBreak = setInterval(drawAlien, 300); // was 600
loop();
