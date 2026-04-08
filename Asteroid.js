const canvas = document.getElementById("canvasJuego");
const contexto = canvas.getContext("2d");
const nave = {
  width: 50,
  height: 20,
  x: canvas.width / 2 - 25,
  y: canvas.height - 40
};
function dibujarNave() {
  contexto.fillStyle = "white";
  contexto.fillRect(nave.x, nave.y, nave.width, nave.height);
}
dibujarNave();