import sound from './beep-1.mp3';

class Element {
  constructor(x, y, w, h, style) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.dirX = 1;
    this.dirY = 1;
    this.style = style;
  }
  get x2() {
    return this.x+this.w;
  }
  get y2() {
    return this.y+this.h;
  }

  clear() {
    ctx.clearRect(this.x, this.y, this.w, this.h);
  }

  draw() {
    ctx.fillStyle=this.style;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  intersects(el) {
    return (this.x <= el.x2 && this.x2 >= el.x && this.y <= el.y2 && this.y2 >= el.y);
  }
}

class Player extends Element {
  constructor(x, y, w, h) {
    super(x, y, w, h, 'black');
    this.score = 0;
  }
}

var canvas = document.getElementById("myCanvas");
const score = document.getElementById('score');
canvas.addEventListener('keydown', doKeyDown, true);
var ctx = canvas.getContext("2d");
var boxes = [];

var player = new Player(50, 50, 50, 50);

function rand(max, min = 0) {
  return Math.floor(Math.random() * (max - min) + min);
}

function generateBoxes() {
  while (boxes.length < 5) {
    const w = rand(50, 20), h = rand(50, 20);
    const box = new Element(
      rand(canvas.width * 0.98 - w),
      rand(canvas.height * 0.98 - h),
      w,
      h,
      "#FF00FF"
    )
    if (!boxes.some(b => b.intersects(box))) {
      boxes.push(box);
    }
  }
}

function doKeyDown(e){
  player.clear();
  switch(event.keyCode) {
    case 37: { // Left Arrow
      player.x -= 10;
      break;
    }
    case 38: { // Up Arrow
      player.y -= 10;
      break;
    }
    case 39: { // Right Arrow
      player.x += 10;
      break;
    }
    case 40: { // Down Arrow
      player.y += 10;
      break;
    }
  }
  player.draw();
}


function canvasCollition(box) {
  const maxH = canvas.height * 0.98, minH = canvas.height * 0.02;
  const maxW = canvas.width * 0.98, minW = canvas.width * 0.02;
  if (box.x2 > maxW || box.x < minW) {
    box.dirX *= -1;
  }
  if (box.y2 > maxH || box.y < minH) {
    box.dirY *= -1;
  }
}

function updateCanvas(moveBoxes = false) {
  for (let i = 0; i < boxes.length; i++) {
    const box = boxes[i];
    box.clear();
    if (box.intersects(player)) {
      boxes.splice(i, 1);
      playSound(sound);
      player.score++;
      score.innerHTML = player.score;
      player.draw();
    } else {
      if (moveBoxes) {
        canvasCollition(box);
        box.x += box.dirX * rand(6, 3);
        box.y += box.dirY * rand(6, 3);
      }
      box.draw();
    }
  }
}

function playSound(soundfile)
{
  document.getElementById("dummy").innerHTML=
  "<embed src=\""+soundfile+"\" hidden=\"true\" autostart=\"true\" loop=\"false\" />";
}

generateBoxes();
player.draw();
setInterval(() => updateCanvas(true), 100);