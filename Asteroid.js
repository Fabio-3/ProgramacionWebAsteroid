const canvas = document.getElementById("canvasJuego");
const contexto = canvas.getContext("2d");
const nave = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  angulo: 0,         
  velocidad: 0,      
  aceleracion: 0.1,  
  rotacion: 0.05,    
  friccion: 0.98     
};

let girarIzquierda = false;
let girarDerecha = false;
let acelerar = false;
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") girarIzquierda = true;
  if (e.key === "ArrowRight") girarDerecha = true;
  if (e.key === "ArrowUp") acelerar = true;
});
document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft") girarIzquierda = false;
  if (e.key === "ArrowRight") girarDerecha = false;
  if (e.key === "ArrowUp") acelerar = false;
});

function actualizarNave() {
  if (girarIzquierda) {
    nave.angulo -= nave.rotacion;
  }
  if (girarDerecha) {
    nave.angulo += nave.rotacion;
  }
  if (acelerar) {
    nave.velocidad += nave.aceleracion;
  }
  nave.velocidad *= nave.friccion;
  nave.x += Math.cos(nave.angulo) * nave.velocidad;
  nave.y += Math.sin(nave.angulo) * nave.velocidad;
  if (nave.x < 0) nave.x = 0;
  if (nave.x > canvas.width) nave.x = canvas.width;
  if (nave.y < 0) nave.y = 0;
  if (nave.y > canvas.height) nave.y = canvas.height;
}

function dibujarNave() {
  contexto.save(); 
  contexto.translate(nave.x, nave.y); 
  contexto.rotate(nave.angulo);       
  contexto.beginPath();
  contexto.moveTo(15, 0);  
  contexto.lineTo(-10, 10);
  contexto.lineTo(-10, -10);
  contexto.closePath();
  contexto.fillStyle = "white";
  contexto.fill();
  contexto.restore(); 
}

function limpiarCanvas() {
  contexto.clearRect(0, 0, canvas.width, canvas.height);
}

function bucleJuego() {
  limpiarCanvas();
  actualizarNave();
  dibujarNave();
  requestAnimationFrame(bucleJuego);
}
bucleJuego();