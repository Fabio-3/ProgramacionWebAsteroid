const canvas = document.getElementById("canvasJuego");
const contexto = canvas.getContext("2d");
const nave = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  angulo: 0,
  velocidad: 0,
  aceleracion: 0.1,
  rotacion: 0.05,
  friccion: 0.98,
  radio: 10
};
let asteroides = [];
let juegoTerminado = false;
let enExplosion = false;
let tiempoExplosion = 0;
let velocidadAsteroides = 1;
let puntuacion = 0;
let girarIzquierda = false;
let girarDerecha = false;
let acelerar = false;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") girarIzquierda = true;
  if (e.key === "ArrowRight") girarDerecha = true;
  if (e.key === "ArrowUp") acelerar = true;
  if (e.key === "Enter" && juegoTerminado) {
    reiniciarJuego();
  }
});
document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft") girarIzquierda = false;
  if (e.key === "ArrowRight") girarDerecha = false;
  if (e.key === "ArrowUp") acelerar = false;
});

function actualizarNave() {
  if (girarIzquierda) nave.angulo -= nave.rotacion;
  if (girarDerecha) nave.angulo += nave.rotacion;
  if (acelerar) nave.velocidad += nave.aceleracion;
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

function crearAsteroide() {
  const tamaño = Math.random() * 50 + 10;
  const puntos = [];
  for (let i = 0; i < 8; i++) {
    puntos.push(Math.random() * tamaño);
  }
  asteroides.push({
    x: Math.random() * canvas.width,
    y: -20,
    radio: tamaño,
    velocidad: velocidadAsteroides + Math.random(),
    forma: puntos
  });
}

function dibujarAsteroides() {
  contexto.strokeStyle = "gray";
  asteroides.forEach(a => {
    contexto.beginPath();
    for (let i = 0; i < a.forma.length; i++) {
      let angulo = (Math.PI * 2 / a.forma.length) * i;
      let r = a.forma[i];
      let x = a.x + Math.cos(angulo) * r;
      let y = a.y + Math.sin(angulo) * r;
      if (i === 0) contexto.moveTo(x, y);
      else contexto.lineTo(x, y);
    }
    contexto.closePath();
    contexto.stroke();
  });
}

function actualizarAsteroides() {
  asteroides.forEach(a => {
    a.y += a.velocidad;
  });
  asteroides = asteroides.filter(a => a.y < canvas.height + 50);
}

function detectarColisiones() {
  for (let a of asteroides) {
    let dx = nave.x - a.x;
    let dy = nave.y - a.y;
    let distancia = Math.sqrt(dx * dx + dy * dy);
    if (distancia < nave.radio + a.radio) {
      enExplosion = true;
    }
  }
}

function dibujarExplosion() {
  contexto.fillStyle = "orange";
  for (let i = 0; i < 10; i++) {
    contexto.beginPath();
    contexto.arc(
      nave.x + (Math.random() * 30 - 15),
      nave.y + (Math.random() * 30 - 15),
      Math.random() * 5,
      0,
      Math.PI * 2
    );
    contexto.fill();
  }
}

function dibujarScore() {
  contexto.fillStyle = "white";
  contexto.font = "14px 'Press Start 2P'";
  contexto.textAlign = "left";
  contexto.fillText("Score: " + puntuacion, 20, 30);
}

function limpiarCanvas() {
  contexto.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarGameOver() {
  contexto.fillStyle = "red";
  contexto.font = "30px 'Press Start 2P'";
  contexto.textAlign = "center";
  contexto.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
  contexto.fillStyle = "white";
  contexto.font = "14px 'Press Start 2P'";
  contexto.fillText(
    "Presiona ENTER para reiniciar",
    canvas.width / 2,
    canvas.height / 2 + 40
  );
}

function reiniciarJuego() {
  nave.x = canvas.width / 2;
  nave.y = canvas.height / 2;
  nave.angulo = 0;
  nave.velocidad = 0;
  asteroides = [];
  velocidadAsteroides = 1;
  puntuacion = 0;
  juegoTerminado = false;
  enExplosion = false;
  tiempoExplosion = 0;
}

function bucleJuego() {
  limpiarCanvas();
  if (!juegoTerminado) {
    actualizarNave();
    actualizarAsteroides();
    puntuacion++;
    if (!enExplosion) {
      detectarColisiones();
      dibujarNave();
    } else {
      dibujarExplosion();
      tiempoExplosion++;
      if (tiempoExplosion > 60) {
        juegoTerminado = true;
      }
    }
    dibujarAsteroides();
    dibujarScore();
  } else {
    dibujarGameOver();
  }
  requestAnimationFrame(bucleJuego);
}

setInterval(() => {
  if (!juegoTerminado) {
    crearAsteroide();
    velocidadAsteroides += 0.05;
  }
}, 1000);

bucleJuego();