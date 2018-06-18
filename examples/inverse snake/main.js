let canvasInstance = new gamid.graphics.Canvas(800, 800, 'cyan');
let canvas = canvasInstance.element;

let base = new gamid.graphics.Square(100, 100, 350, 350, 1, 'black');
let baseController = new gamid.controller.Keyboard(base, [87, 65, 83, 68]);
let baseSpeed = 100;

let audioList = [
    "../../sound/musica1.wav",
    "../../sound/movie_1.mp3",
    "../../sound/faliceu-maguila.mp3",
    "../../sound/flava-flav-yeah-boy.mp3"
]

let passed = true;

let audio = new gamid.audio.Audio(base, audioList);

baseController.setOnKeyDown(65, function(){base.speedX = -baseSpeed; base.speedY = 0;});
baseController.setOnKeyDown(68, function(){base.speedX = baseSpeed; base.speedY = 0;});
baseController.setOnKeyDown(87, function(){base.speedY = -baseSpeed; base.speedX = 0;});
baseController.setOnKeyDown(83, function(){base.speedY = baseSpeed; base.speedX = 0;});
let baseCollision = new gamid.physics.SquareCollision(base);
baseCollision.hasCollision = false;
baseCollision.hasBorderCollision = false;
baseCollision.beforeBorderCollision = function(base){
    if(passed && base.height != 0){
        audio.play("../../sound/faliceu-maguila.mp3");
        passed = false;
    }

    canvas.getContext("2d").fillText("You lose!", 350, 350);
    canvasInstance.deleteObject(base);

}
baseCollision.beforeCollision = function(base, enemy){
    audio.stop("../../sound/movie_1.mp3");
    baseSpeed += 20;
    base.height -= 5;
    base.width -= 5;
    enemy.y = 1000;
    canvasInstance.deleteObject(enemy);
    audio.play("../../sound/movie_1.mp3");

    if(base.height == 0 && base.width == 0){
        audio.play("../../sound/flava-flav-yeah-boy.mp3");
    }
}

for(let i = 0; i < 20; i++){
    let enemy = new gamid.graphics.Square(10, 10, Math.random()*780, Math.random()*780, 1, 'red');
    canvasInstance.addObject(enemy);
    let enemyCollision = new gamid.physics.SquareCollision(enemy);
}

canvasInstance.addObject(base);
document.body.appendChild(canvas);

audio.loop("../../sound/musica1.wav");
