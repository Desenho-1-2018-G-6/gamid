let canvasInstance = new gamid.graphics.Canvas(800, 800, 'purple');
let canvas = canvasInstance.element;
// gamid.graphics.setBackgroundColor(canvas, 'red');

// square.speedX = 20;
// square.speedY = 20;
let square = new gamid.graphics.Square(50, 50, 0, 0, 50, 'blue');
let keyboard = new gamid.controller.Keyboard(square, [87, 65, 83, 68]);
let squarecollision = new gamid.physics.SquareCollision(square);
squarecollision.afterCollision = function(object, collided){
	if(collided.color == "black"){
		collided.color = "red";
	}else{
		collided.color = "black"
	}

	if(object.color == "blue"){
		object.color = "gray";
	}else{
		object.color = "blue";
	}
}
// new gamid.controller.Keyboard(
// 		new gamid.graphics.Square(50, 50, 0, 0, 1, 'blue'),
// 		[87, 65, 83, 68]
//);
let square2 = new gamid.graphics.Square(50, 50, 150, 150, 1, 'red');
let keyboard2 = new gamid.controller.Keyboard(square2, [73, 74, 75, 76]);
let square2collision = new gamid.physics.SquareCollision(square2);

let square3 = new gamid.graphics.Square(50, 50, 300, 300, 1, 'red');
let keyboard3 = new gamid.controller.Keyboard(square3, [73, 74, 75, 76]);
let square3collision = new gamid.physics.SquareCollision(square3);


canvasInstance.addObject(square);
canvasInstance.addObject(square2);
canvasInstance.addObject(square3);

// a.setOnKeyUp(87, function(){square.speedY = 0});
keyboard.setOnKeyDown(87, function(){
		square.speedY = -100;
		// square.speedX = 0;
});

// a.setOnKeyUp(83, function(){square.speedY = 0});
keyboard.setOnKeyDown(83, function(){
		square.speedY = 100;
		// square.speedX = 0;
});

// a.setOnKeyUp(65, function(){square.speedX = 0});
keyboard.setOnKeyDown(65, function(){
		square.speedX = -100;
		// square.speedY = 0;
});

// a.setOnKeyUp(68, function(){square.speedX = 0});
keyboard.setOnKeyDown(68, function(){
		square.speedX = 100;
		// square.speedY = 0;
});






keyboard2.setOnKeyDown(73, function(){
		square2.speedY = -50;
		square2.speedX = 0;
});

// a.setOnKeyUp(83, function(){square.speedY = 0});

keyboard2.setOnKeyDown(75, function(){
		square2.speedY = 50;
		square2.speedX = 0;
});
// a.setOnKeyUp(65, function(){square.speedX = 0});
keyboard2.setOnKeyDown(74, function(){
		square2.speedX = -50;
		square2.speedY = 0;
});

// a.setOnKeyUp(68, function(){square.speedX = 0});
keyboard2.setOnKeyDown(76, function(){
		square2.speedX = 50;
		square2.speedY = 0;
});

document.body.appendChild(canvas);
