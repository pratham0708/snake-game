const canvas = document.getElementById("game");
const ctx = canvas.getContext('2d');
class SnakePart {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}
let speed = 7;
let tileCount = 20;
let headx = 10;
let heady = 10;
const snakePart = [];
let tailLength = 2;
let tileSize = canvas.width /tileCount - 2;
let xvelocity=0;
let yvelocity = 0;
 
let applex = 5;
let appley = 5;

let score = 0;
const gulpsound = new Audio("gulp.mp3");

function drawGame(){
    changeSnakePosition();
    let result = isGameOver();
    if(result){
        return;
    }



    clearScreen();
    
    checkAppleCollision();
    drawApple();

    drawSnake();
    drawScore();
    if(score>2){
        speed = 11;
    }
    if(score>5){
        speed = 15;
    }

        setTimeout(drawGame,1000/speed);
}
function isGameOver(){
    let gameOver = false;
    if(yvelocity===0 && xvelocity===0){
        return false;
    }
    if(headx<0){
        gameOver = true;
    }
    else if(headx===tileCount){
        gameOver = true;
    }
    else if(heady<0){
        gameOver = true;
    }
    else if(heady===tileCount){
        gameOver = true;
    }

    for(let i=0; i < snakePart.length; i++){

        let part = snakePart[i];
        
        if(part.x === headx && part.y ===heady){
        
        gameOver= true;
        
        break;
        }
    }




    if(gameOver){
        ctx.fillStyle = 'cyan';
        ctx.font = "50px verdana";

       

        ctx.fillText("Game Over!!" , canvas.width/6.5, canvas.height/2);
    }

        return gameOver;

}
function drawScore(){
    ctx.fillStyle = 'white';
    ctx.font = "10px Verdana";
    ctx.fillText("Score " + score , canvas.width-50,20);

}
function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);


}
function drawSnake(){
   
    ctx.fillStyle = 'green';
    for(let i=0;i<snakePart.length;i++){
        let part = snakePart[i];
        ctx.fillRect(part.x * tileCount, part.y *tileCount, tileSize , tileSize);


    }
    snakePart.push(new SnakePart(headx,heady));
    while(snakePart.length> tailLength){
        snakePart.shift();
    }
    ctx.fillStyle = 'orange';
    ctx.fillRect(headx*tileCount, heady*tileCount,tileSize,tileSize);

}
function changeSnakePosition(){
    headx = headx + xvelocity;
    heady = heady +yvelocity;

}


function drawApple(){
    ctx.fillStyle = "red";
    ctx.fillRect(applex * tileCount,appley * tileCount,tileSize, tileSize);
}
function checkAppleCollision(){
    if(applex == headx & appley == heady){

        applex = Math.floor(Math.random() * tileCount);
        appley = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        gulpsound.play();
    }
}
document.body.addEventListener('keydown',keyDown);
function keyDown(event){
    if(event.keyCode == 38){
        if(yvelocity == 1)
            return; 
        yvelocity = -1;
        xvelocity = 0;

    }
    if(event.keyCode == 40){
        if(yvelocity == -1)
            return; 
        yvelocity = 1;
        xvelocity = 0;

    }
    if(event.keyCode == 37){
        if(xvelocity == 1)
            return; 
        yvelocity = 0;
        xvelocity = -1;

    }
    if(event.keyCode == 39){
        if(xvelocity == -1)
            return; 
        yvelocity = 0;
        xvelocity = 1;

    }
}





drawGame();