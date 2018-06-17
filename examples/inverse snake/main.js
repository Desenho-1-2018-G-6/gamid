let canvasInstance = new gamid.graphics.Canvas(800, 800, 'cyan');
let canvas = canvasInstance.element;

let base = new gamid.graphics.Square(100, 100, 350, 350, 1, 'black');
let baseController = new gamid.controller.Keyboard(base, [87, 65, 83, 68]);
let baseSpeed = 100;

baseController.setOnKeyDown(65, function(){base.speedX = -baseSpeed; base.speedY = 0;});
baseController.setOnKeyDown(68, function(){base.speedX = baseSpeed; base.speedY = 0;});
baseController.setOnKeyDown(87, function(){base.speedY = -baseSpeed; base.speedX = 0;});
baseController.setOnKeyDown(83, function(){base.speedY = baseSpeed; base.speedX = 0;});
let baseCollision = new gamid.physics.SquareCollision(base);
baseCollision.hasCollision = false;
baseCollision.hasBorderCollision = false;
baseCollision.beforeBorderCollision = function(base){
    canvasInstance.deleteObject(base);
    canvas.getContext("2d").fillText("You lose!", 350, 350);
}
baseCollision.beforeCollision = function(base, enemy){
    baseSpeed += 20;
    base.height -= 5;
    base.width -= 5;
    enemy.y = 1000;
    canvasInstance.deleteObject(enemy);
}

for(let i = 0; i < 20; i++){
    
    let enemy = new gamid.graphics.Square(10, 10, Math.random()*780, Math.random()*780, 1, 'red');
    canvasInstance.addObject(enemy);
    let enemyCollision = new gamid.physics.SquareCollision(enemy);
}

canvasInstance.addObject(base);
document.body.appendChild(canvas);
