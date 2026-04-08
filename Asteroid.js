const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
  width: 50,
  height: 20,
  x: canvas.width / 2 - 25,
  y: canvas.height - 40
};

function drawPlayer() {
  ctx.fillStyle = "white";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

drawPlayer();