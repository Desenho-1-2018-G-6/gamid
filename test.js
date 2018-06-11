let canvasInstance = new gamid.graphics.Canvas(800, 800, 'purple');
let canvas = canvasInstance.element;
// gamid.graphics.setBackgroundColor(canvas, 'red');

let square = new gamid.graphics.Square(50, 50, 0, 0, 'blue');
canvasInstance.addObject(square);
// square.speedX = 20;
// square.speedY = 20;
a = new gamid.controller.Keyboard(square, [87, 65, 83, 68]);

// a.setOnKeyUp(87, function(){square.speedY = 0});
a.setOnKeyDown(87, function(){square.speedY = -100; square.speedX = 0});

// a.setOnKeyUp(83, function(){square.speedY = 0});
a.setOnKeyDown(83, function(){square.speedY = 100; square.speedX = 0});

// a.setOnKeyUp(65, function(){square.speedX = 0});
a.setOnKeyDown(65, function(){square.speedX = -100; square.speedY = 0});

// a.setOnKeyUp(68, function(){square.speedX = 0});
a.setOnKeyDown(68, function(){square.speedX = 100; square.speedY = 0});


document.body.appendChild(canvas);
