const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
let miNave = {
  x: canvas.width/2,
  y: canvas.height/2,
  ang: 0,
  vel: 0};
let asteroides = [];
let terminado = false;
let izq=false, der=false, arriba=false;
document.addEventListener("keydown",function(e){
  if(e.key=="ArrowLeft") izq=true;
  if(e.key=="ArrowRight") der=true;
  if(e.key=="ArrowUp") arriba=true;});
document.addEventListener("keyup",function(e){
  if(e.key=="ArrowLeft") izq=false;
  if(e.key=="ArrowRight") der=false;
  if(e.key=="ArrowUp") arriba=false;});

function moverNave(){
  if(izq) miNave.ang-=0.05;
  if(der) miNave.ang+=0.05;
  if(arriba){
    miNave.vel+=0.1;}
  miNave.vel*=0.98;
  miNave.x+=Math.cos(miNave.ang)*miNave.vel;
  miNave.y+=Math.sin(miNave.ang)*miNave.vel;
  if(miNave.x<0) miNave.x=0;
  if(miNave.x>canvas.width) miNave.x=canvas.width;
  if(miNave.y<0) miNave.y=0;
  if(miNave.y>canvas.height) miNave.y=canvas.height;}

function mostrarNave(){
  ctx.save();
  ctx.translate(miNave.x,miNave.y);
  ctx.rotate(miNave.ang);
  ctx.beginPath();
  ctx.moveTo(15,0);
  ctx.lineTo(-10,10);
  ctx.lineTo(-10,-10);
  ctx.closePath();
  ctx.fillStyle="white";
  ctx.fill();
  ctx.restore();}

function nuevoAsteroide(){
  let r=Math.random()*30+10;
  asteroides.push({
    x:Math.random()*canvas.width,
    y:-20,
    r:r,
    v:Math.random()*2+1});
}

function moverAsteroides(){
  for(let i=0;i<asteroides.length;i++){
    asteroides[i].y+=asteroides[i].v;}
}

function pintarAsteroide(){
  ctx.fillStyle="gray";
  for(let i=0;i<asteroides.length;i++){
    ctx.beginPath();
    ctx.arc(asteroides[i].x,asteroides[i].y,asteroides[i].r,0,Math.PI*2);
    ctx.fill();}
}

function choque(){
  for(let i=0;i<asteroides.length;i++){
    let dx=miNave.x-asteroides[i].x;
    let dy=miNave.y-asteroides[i].y;
    let d=Math.sqrt(dx*dx+dy*dy);
    if(d<asteroides[i].r+10){
      terminado=true;}
  }
}

function limpiar(){
  ctx.clearRect(0,0,canvas.width,canvas.height);}

function finJuego(){
  ctx.fillStyle="red";
  ctx.font="30px Arial";
  ctx.textAlign="center";
  ctx.fillText("GAME OVER",canvas.width/2,canvas.height/2);}

function bucle(){
  limpiar();
  if(!terminado){
    moverNave();
    moverAsteroides();
    choque();
    mostrarNave();
    pintarAsteroide();
  }else{
    finJuego();}
  requestAnimationFrame(bucle);}
setInterval(function(){
  if(!terminado){
    nuevoAsteroide();}
},1000);
bucle();