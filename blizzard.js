let canvasInstance = new gamid.graphics.Canvas(800, 800, 'black');
let canvas = canvasInstance.element;
// gamid.graphics.setBackgroundColor(canvas, 'red');

for (let i = 0; i < 10000; i++){

    let square = new gamid.controller.Keyboard(new gamid.graphics.Square(1, 10, Math.random()*800, Math.random()*800, 'cyan'), [87, 65, 83, 68]);


		canvasInstance.addObject(square);
		// square.speedX = 20;
		// square.speedY = 20;

		// a.setOnKeyUp(87, function(){square.speedY = 0});
		square.setOnKeyDown(87, function(){
				square.decoratedObject.speedY -= Math.random()*100;
		});

		// a.setOnKeyUp(83, function(){square.speedY = 0});
		square.setOnKeyDown(83, function(){
				square.decoratedObject.speedY += Math.random()*100;
		});

		// a.setOnKeyUp(65, function(){square.speedX = 0});
		square.setOnKeyDown(65, function(){
				square.decoratedObject.speedX -= Math.random()*100;
		});

		// a.setOnKeyUp(68, function(){square.speedX = 0});
		square.setOnKeyDown(68, function(){
				square.decoratedObject.speedX += Math.random()*100;
		});

}

document.body.appendChild(canvas);


function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
