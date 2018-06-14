let canvasInstance = new gamid.graphics.Canvas(800, 800, 'purple');
let canvas = canvasInstance.element;
// gamid.graphics.setBackgroundColor(canvas, 'red');

// square.speedX = 20;
// square.speedY = 20;
let square = new gamid.controller.Keyboard(
		new gamid.graphics.Square(50, 50, 0, 0, 1, 'blue'),
		[87, 65, 83, 68]
);
let square2 = new gamid.controller.Keyboard(
		new gamid.graphics.Square(50, 50, 150, 150, 1, 'red'),
		[87, 65, 83, 68]
);
//
canvasInstance.addObject(square);
canvasInstance.addObject(square2);

// a.setOnKeyUp(87, function(){square.speedY = 0});
square.setOnKeyDown(87, function(){
		square.decoratedObject.speedY = -100;
		square.decoratedObject.speedX = 0;
});

// a.setOnKeyUp(83, function(){square.speedY = 0});
square.setOnKeyDown(83, function(){
		square.decoratedObject.speedY = 100;
		square.decoratedObject.speedX = 0;
});

// a.setOnKeyUp(65, function(){square.speedX = 0});
square.setOnKeyDown(65, function(){
		square.decoratedObject.speedX = -100;
	square.decoratedObject.speedY = 0;
});

// a.setOnKeyUp(68, function(){square.speedX = 0});
square.setOnKeyDown(68, function(){
		square.decoratedObject.speedX = 100;
		square.decoratedObject.speedY = 0;
});






square2.setOnKeyDown(87, function(){
		square2.decoratedObject.speedY = -50;
		square2.decoratedObject.speedX = 0;
});

// a.setOnKeyUp(83, function(){square.speedY = 0});

square2.setOnKeyDown(83, function(){
		square2.decoratedObject.speedY = 50;
		square2.decoratedObject.speedX = 0;
});
// a.setOnKeyUp(65, function(){square.speedX = 0});
square2.setOnKeyDown(65, function(){
		square2.decoratedObject.speedX = -50;
		square2.decoratedObject.speedY = 0;
});

// a.setOnKeyUp(68, function(){square.speedX = 0});
square2.setOnKeyDown(68, function(){
		square2.decoratedObject.speedX = 50;
		square2.decoratedObject.speedY = 0;
});

document.body.appendChild(canvas);
