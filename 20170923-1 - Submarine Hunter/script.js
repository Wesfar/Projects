"use strict"

let canvasSea = document.getElementById("canvasSea"),
ctxSea = canvasSea.getContext("2d");

let canvasExplosion = document.getElementById("canvasExplosion"),
ctxExplosion = canvasExplosion.getContext("2d");

let width = canvasSea.width = canvasExplosion.width = window.innerWidth;
let height = canvasSea.height = canvasExplosion.height = window.innerHeight;

let mines = [];
let mineReloadTime = 2000;
let mineReloadTimer = 0;
let mineReloadStart = new Date().getTime();
let maxMines = 3;

let shots = 0;
let hits = 0;

let explosions = [];

let timeStart = new Date();
let timeElapsed;

let reloader = new Reloader(width-20, 60);

let submarines = [];
for (let i = 0; i < 15; i++) {
  submarines.push(new Submarine);
};

let boat = new Boat();

window.onload = startup();

function startup (){
//  window.statusbar= false;
//  window.toolbar = false;
  console.log("Start");
  loop();
};

// Game loop
function loop() {

  ctxExplosion.clearRect(0, 0,width, height);

  ctxSea.fillStyle = "lightblue";
  ctxSea.fillRect(0, 0,width, height);

  ctxSea.fillStyle = "blue";
  ctxSea.fillRect(0, height * 1 / 5, width, height);

  
  timeElapsed = Math.floor((new Date()-timeStart)/100)/10;

  ctxSea.lineWidth=10;
  ctxSea.fillStyle = "black";
  ctxSea.fillText("Shots: "+shots,10,20)
  ctxSea.fillText("Hits: " + hits, 10, 30)
  ctxSea.fillText("Mines: " + mines.length, 10, 40)
  ctxSea.fillText("Submarines: " + submarines.length, 10, 50)
  ctxSea.fillText("Time: "+timeElapsed,10,60)
  

  for (let i = 0; i < submarines.length; i++){
    submarines[i].move();
    submarines[i].edge();    
    submarines[i].draw();
  };

  for (let i = explosions.length-1; i >=0; i--){
    explosions[i].draw();
    if (explosions[i].exploding = false) { explosions.splice(i, 1) };
  };


  for (let i =  mines.length-1; i >=0; i--){
    mines[i].move();
    mines[i].draw();
    for (let j = submarines.length-1; j >=0 ; j--) {
      if (mines[i].hits(submarines[j])) {
        submarines.splice(j, 1);
        mines[i].hit = true;
        hits++;
        explosions.push(new Explosion(mines[i].pos._x,mines[i].pos._y));
      };
    };
    if (mines[i].pos._y + mines[i].radius > height || mines[i].hit == true) {
      mines.splice(i, 1);
    };
  };

  boat.move();
  boat.edge();
  boat.draw();

  mineTimer(new Date())
  reloader.draw();

  requestAnimationFrame(loop); //chamar a propria funcao "desenhar" sempre que o ecra esteja pronto para processar nova frame
  
  
};


document.body.addEventListener("keydown", keyDown,false);
document.body.addEventListener("keyup", keyUp,false);
document.body.addEventListener("touchend", touchEnd,false);
document.body.addEventListener("touchmove", touchMove,false);

function touchEnd(e) {
  e.preventDefault();
  let x = e.changedTouches[0].clientX;
  console.log("TouchEnd " + x);
//  touchMoving = false;
  if (varTouchX == 0) { mineTimerCheck(new Date()) };
  baseTouchX = boat.pos._x;
  varTouchX = 0;
  boat.isMovingLeft = false;
  boat.isMovingRight = false;
};

//let touchMoving = false;
let baseTouchX = boat.pos._x;
let varTouchX = 0;

function touchMove(e) {
//  e.preventDefault();  
//  touchMoving = true;
  let newTouchX = e.changedTouches[0].clientX;
  varTouchX = newTouchX - baseTouchX;

  if (varTouchX > 0) { boat.isMovingRight = true };
  if (varTouchX < 0) { boat.isMovingLeft = true };

  baseTouchX =boat.pos._x;
  console.log("Move "+newTouchX+" "+"Var "+varTouchX);
//  mineTimerCheck(new Date());
};


function keyUp(e) {
  switch (event.keyCode) {
    case 37: //left
      boat.isMovingLeft = false;
      break;
    case 39: //right
      boat.isMovingRight = false;
      break;
    default:
      break;
  };
};  

function keyDown(e) {
  switch (event.keyCode) {
    case 37: //left
      boat.isMovingLeft = true;
      break;
    case 39: //right
      boat.isMovingRight = true;
      break;
    case 40: //down
      mineTimerCheck(new Date());
        break;
    default:
        break;
  }
};

function mineTimerCheck(x) {
  mineReloadTimer = x - mineReloadStart;
  if (mineReloadTimer > mineReloadTime) {
    mines.push(new Mine(boat.pos._x + boat.width / 2));
    mineReloadStart = new Date().getTime();
    shots++;
  }
}

function mineTimer(x) {
  mineReloadTimer = x - mineReloadStart;
}