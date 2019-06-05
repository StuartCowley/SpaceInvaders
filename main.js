const background = document.getElementById("gameBoard");
var ctx = background.getContext("2d");
var ctx = background.getContext("2d");
ctx.moveTo(0, 0);
ctx.lineTo(200, 100);
ctx.fillStyle = "white";
ctx.stroke();
ctx.fillRect(20, 20, 80, 80);

ctx.fillStyle = "green";
ctx.beginPath();
ctx.moveTo(20, 600);
ctx.lineTo(100, 600);
ctx.lineTo(80, 540);
ctx.lineTo(40, 540);
ctx.fill();
