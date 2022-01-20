let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");

let ground = [];
ground.push(0,344,688);
let cloud = [];
let cactus = [];
let minX = 0;
let maxX = 14;
let minY = 0;
let maxY = 2;
let fait = 0;
let speed = 4;

let posDino = 240;
let groundDino = true;
let sautMax = 130;
let onGround = 240;
let valScore = 0;
let gameover = 0;
let dinoBox = {x:75, y:posDino, w:40, h:75}

let imageSol = new Image();
imageSol.src = './image/sol.png';
let imageCloud = new Image(); 
imageCloud.src = './image/cloud.png';
let imageCactus = new Image();
imageCactus.src = './image/cactus.png';
let imageDino = new Image();
imageDino.src = './image/dino.png';

const addSol = () => {
    for (let i = 0; i < ground.length; i++) {
        if(ground[i] <= -344)
            ground[i] = cnv.width; 
        else
            ground[i] -= speed;
        
        ctx.drawImage(imageSol,ground[i],300);
    }
}

const randXCloud = () =>{
  let min = Math.ceil(minX);
  let max = Math.floor(maxX);
  let random = 81 * Math.floor(Math.random() * (max - min +1)) + min;

  return random;
}

const randYCloud = () =>{
  let min = Math.ceil(minY);
  let max = Math.floor(maxY);
  let random = 35 * Math.floor(Math.random() * (max - min +1)) + min;

  return random;
}

const createCloudPos = () => {
    let posX;
    let posY;

    for (let i = 0; i < 10; i++) {
        posX = randXCloud();
        posY = randYCloud();
        cloud.push([posX,posY]);
    }
}

const addCloud = () => {
    for (let i = 0; i < cloud.length; i++) {
        if(cloud[i][0] <= -729){
            cloud[i][0] = 729; 
            cloud[i][1] = randYCloud();
        }
        else
            cloud[i][0] -= 1;

        ctx.drawImage(imageCloud,cloud[i][0],cloud[i][1]);
    }
}

const randXCactus = () =>{
  let min = Math.ceil(minY);
  let max = Math.floor(12);
  let random = 74 * Math.floor(Math.random() * (max - min +1)) + min;

  return random;
}

const createCactusPos = () => {
    let posX;

    for (let i = 0; i < 2; i++) {
        posX = cnv.width + randXCloud();
        let cactusBox = {x:posX, y:265, w:30, h:70}
        cactus.push([posX,cactusBox]);
    }
}

const addCactus = () => {
    for (let i = 0; i < cactus.length; i++) {
        if(cactus[i][0] <= -74){
            cactus[i][0] = cnv.width + randXCactus(); 
            cactus[i][1].x = cactus[i][0];
        }
        else{
            cactus[i][0] -= speed;
            cactus[i][1].x = cactus[i][0];
        }
        ctx.drawImage(imageCactus,cactus[i][0],260);
    }
}

const score = () => {
    valScore += 1;
    ctx.font = '20px serif';
    ctx.fillText('SCORE: ',10 ,20);
    ctx.fillText(valScore, 85, 20);
}

const scoreFinal = () => {
    ctx.font = '48px serif';
    ctx.fillText('GAME OVER',100 ,150);
    ctx.fillText('SCORE: ',150 ,200);
    ctx.fillText(valScore, 320, 200);
}

const draw = () => {
    if(fait == 0){
        createCloudPos();
        createCactusPos();
        fait = 1;
    }
    addSol();
    addCloud();
    addCactus();
    score();
}

const saut = () => {
    if(groundDino == false && posDino != sautMax)
        posDino -= 5;
    else if(posDino != onGround){
        groundDino = true;
        posDino += 5;
    }
} 

window.addEventListener('keydown', keydown_fun, false);
function keydown_fun(e) {
    switch(e.code) {
        case "Space":
            groundDino = false;
            break;
    }
}

const collision = () => {
    for (let i = 0; i < cactus.length; i++) {
        if (dinoBox.x < cactus[i][1].x + cactus[i][1].w &&
            dinoBox.x + dinoBox.w > cactus[i][1].x &&
            dinoBox.y < cactus[i][1].y + cactus[i][1].h &&
            dinoBox.h + dinoBox.y > cactus[i][1].y) {
            gameover = 1;
            break;
        }
    }
}

const update = () => {
    ctx.clearRect(0,0,cnv.width,cnv.height);

    if(gameover == 0)
        draw();
    else
        scoreFinal();

    ctx.drawImage(imageDino, 50, posDino);
    dinoBox.y = posDino;
    saut();
    collision();

    requestAnimationFrame(update);
}
requestAnimationFrame(update);