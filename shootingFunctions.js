// // Fire player bullet
// const fire = () => {
//     drawBullet(-5, 5);
// };

// export function playerShoot(playerOffset, bulletLocation, onScreen, ctx) {
//     playerOffset.bulletPos.push(playerOffset.deltaX);
//     bulletLocation.xPos = playerOffset.deltaX + 350;
//     onScreen = true;
//     let stopBullet = setInterval(fire(), 5);
//     setTimeout(() => {
//         clearInterval(stopBullet);
//         onScreen = false;
//         playerOffset.deltaZ = 600;
//         playerOffset.bulletPos.pop();
//         bulletLocation.yPos = 500;
//     }, 1550);
// }

// export function drawBullet(x, y, playerOffset, bulletLocation, ctx) {
//     ctx.clearRect(
//         350 + playerOffset.bulletPos[0] - 5,
//         playerOffset.deltaZ,
//         20,
//         20
//     ); // Clear rectangle (Coordinates top left, bottom right)
//     ctx.beginPath();
//     ctx.moveTo(x + 350 + playerOffset.bulletPos[0], x + playerOffset.deltaZ); // Top left corner of bullet
//     ctx.lineTo(x + 350 + playerOffset.bulletPos[0], y + playerOffset.deltaZ); // Bottom left corner of bullet
//     ctx.lineTo(y + 350 + playerOffset.bulletPos[0], y + playerOffset.deltaZ); // Bottom right corner of bullet
//     ctx.lineTo(y + 350 + playerOffset.bulletPos[0], x + playerOffset.deltaZ); // Top right corner of bullet
//     ctx.closePath();
//     ctx.fillStyle = "red";
//     ctx.fill();
//     playerOffset.deltaZ -= 2;
//     bulletLocation.yPos = playerOffset.deltaZ;
//     killAlien();
// }