var FPS = 60.00;

var canvas0 = document.getElementById("canvas0");
var canvas2 = document.getElementById("canvas2");
var canvas3 = document.getElementById("canvas3");
canvas2.remove();
canvas3.remove();

var canvas = document.getElementById("canvas");
canvas.remove();

var ball = document.getElementById("ball");
var player = document.getElementById("player");
var enemy = document.getElementById("enemy");
var ballX=25, ballY=190;
var xSpd = 5, ySpd = 5;
var isTop=false, isBottom=false;

var speed = 10;

var pX=25,pY=190;
var eX=450, eY = 190;

var delay = 1.5;
var coll = 0;

var canRestart = false;

var debugMode = false;

function tick() {
    ballX+=xSpd;
    ballY+=ySpd;

    if(ballX>=500-25) {
        xSpd=-5;
    }

    if(ballX<=0) {
        xSpd=5;
    }

    if(ballY>=500-25) {
        ySpd=-5;
    }
    if(ballY<=0) {
        ySpd=5;
    }

    if(isTop) {
        pY-=speed;
    }
    if(isBottom) {
        pY+=speed;
    }

    if(pY <= 0) {
        pY=0;
    }
    if(pY >= 400) {
        pY=400;
    }

    if(ballX<=pX+25 && ballY<=pY+100 && ballY>=pY-50) {
        xSpd=5;
    }

    if(ballX>=eX-25&& ballX <= eX+25 && ballY<=eY+100 && ballY>=eY-50) {
        xSpd=-5;
        coll++;
    }

    eY = (ballY - 50) * delay;

    if(eY >= 400) {
        eY=400;
    }
    if(eY <= 0) {
        eY = 0;
    }

    if(ballX >= 500-25 && coll >= 2 && debugMode == false) {
        canvas.remove();
        document.body.appendChild(canvas2);
        canvas3.remove();
        canRestart=true;
    }

    if(ballX <= 0 && debugMode == false) {
        canvas.remove();
        document.body.appendChild(canvas3);
        canvas2.remove();
        canRestart=true;
    }

    if(debugMode==true){canRestart=true;}
}

function render() {

    document.getElementById("ball").style.marginLeft = ballX + "px";
    document.getElementById("ball").style.marginTop = ballY + "px";

    document.getElementById("player").style.marginLeft = pX + "px";
    document.getElementById("player").style.marginTop = pY + "px";

    document.getElementById("enemy").style.marginLeft = eX + "px";
    document.getElementById("enemy").style.marginTop = eY + "px";
}

addEventListener("keydown", function(e) {
    if(e.key == "a") {
        isTop=true;
    }
    if(e.key == "d") {
        isBottom=true;
    }

    if(e.keyCode == 32 && canRestart==true) {
        this.window.location.reload();
    }
});

addEventListener("keyup", function(e) {
    if(e.key == "a") {
        isTop=false;
    }
    if(e.key == "d") {
        isBottom=false;
    }
});

function startGame(dificult) {
    canvas0.remove();
    if(dificult==1){delay=20}
    if(dificult==2){delay=15}
    if(dificult==3){delay=10}
    if(dificult==4){delay=3}
    if(dificult==5){delay=1.65}
    if(dificult==6){delay=1}
    if(dificult==7) {debugMode=true;delay=2;speed=20;}
    document.body.appendChild(canvas);
    setInterval(() => {
        tick();
        render();
    }, 1000/FPS);
}

setInterval(() => {
    if(debugMode==true) {
        var line = document.createElement("div");
        line.innerHTML = `<div style="position: absolute; background-color: rgb(0, ${100 + Math.random()*255}, 0); width: 10px; height: 10px; margin-left: ${ballX}px; margin-top: ${-500+ballY}px"></div>`;
        document.body.appendChild(line);
    }
}, 10);